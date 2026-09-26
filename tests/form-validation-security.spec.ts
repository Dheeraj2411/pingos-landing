import { test, expect } from "@playwright/test";

test.describe("Security, Anti-Abuse & Form Validation Suite", () => {
  const validPayload = {
    name: "Dheeraj Sharma",
    email: "dheeraj.audit@example.com",
    company: "PingOS Testing Inc",
    phone: "+15551234567",
    plan: "pro",
    message: "This is a legitimate inquiry regarding WhatsApp CRM features and integration.",
    formLoadedAt: Date.now() - 5000, // 5 seconds ago
    website: "", // honeypot empty
  };

  test("rejects invalid or too short names", async ({ request }) => {
    const res = await request.post("/api/inquiry", {
      data: { ...validPayload, name: "A" },
    });
    expect(res.status()).toBe(400);
    const json = await res.json();
    expect(json.error).toContain("Name must be at least 2 characters");
  });

  test("rejects malformed email addresses", async ({ request }) => {
    const res = await request.post("/api/inquiry", {
      data: { ...validPayload, email: "invalid-email-format" },
    });
    expect(res.status()).toBe(400);
    const json = await res.json();
    expect(json.error).toContain("valid email");
  });

  test("rejects disposable / throwaway burner emails", async ({ request }) => {
    const res = await request.post("/api/inquiry", {
      data: { ...validPayload, email: "hacker@mailinator.com" },
    });
    expect(res.status()).toBe(400);
    const json = await res.json();
    expect(json.error).toContain("Disposable or temporary email");
  });

  test("rejects messages shorter than 10 characters or excessively long", async ({ request }) => {
    // Too short
    const shortRes = await request.post("/api/inquiry", {
      data: { ...validPayload, message: "Hi!" },
    });
    expect(shortRes.status()).toBe(400);

    // Excessively long
    const hugeRes = await request.post("/api/inquiry", {
      data: { ...validPayload, message: "A".repeat(3500) },
    });
    expect(hugeRes.status()).toBe(400);
    const json = await hugeRes.json();
    expect(json.error).toContain("Message is too long");
  });

  test("traps automated bots filling the invisible honeypot field", async ({ request }) => {
    const res = await request.post("/api/inquiry", {
      data: {
        ...validPayload,
        email: `bot-${Date.now()}@example.com`,
        website: "https://spam-bot-automated.ru", // Bot filled honeypot!
      },
    });
    // Should return 200 to not alert the bot, but with silent drop flag
    expect(res.status()).toBe(200);
    const json = await res.json();
    expect(json.success).toBe(true);
    expect(json.dropped).toBe(true);
  });

  test("flags suspicious bot speed trap (submitted under 1.5 seconds)", async ({ request }) => {
    const res = await request.post("/api/inquiry", {
      data: {
        ...validPayload,
        email: `speed-${Date.now()}@example.com`,
        formLoadedAt: Date.now() - 200, // Submitted in 200ms
      },
    });
    expect(res.status()).toBe(400);
    const json = await res.json();
    expect(json.error).toContain("Suspicious automated submission speed");
  });

  test("prevents duplicate form submissions within deduplication window", async ({ request }) => {
    const uniqueEmail = `idempotent-${Date.now()}@example.com`;
    const payload = {
      ...validPayload,
      email: uniqueEmail,
      message: "Testing duplicate idempotent submission prevention.",
    };

    // First submission
    const res1 = await request.post("/api/inquiry", { data: payload });
    expect(res1.status()).toBe(200);
    const json1 = await res1.json();
    expect(json1.success).toBe(true);
    expect(json1.duplicate).toBeUndefined();

    // Immediate duplicate submission with identical content
    const res2 = await request.post("/api/inquiry", { data: payload });
    expect(res2.status()).toBe(200);
    const json2 = await res2.json();
    expect(json2.success).toBe(true);
    expect(json2.duplicate).toBe(true);
    expect(json2.message).toContain("already received");
  });

  test("sanitizes CRLF and SMTP injection characters from single-line fields", async ({ request }) => {
    const res = await request.post("/api/inquiry", {
      data: {
        ...validPayload,
        email: `clean-${Date.now()}@example.com`,
        name: "Attacker\r\nBcc: victim@example.com\r\nSubject: Injected",
        company: "EvilCorp\n\rSneaky",
      },
    });
    expect(res.status()).toBe(200);
    const json = await res.json();
    expect(json.success).toBe(true);
  });

  test("client-side rapid double-click on InquirySection dispatches only one request", async ({ page }) => {
    await page.goto("/contact");
    const inquirySection = page.locator("#inquiry");
    await expect(inquirySection).toBeVisible();

    // Fill form
    await page.fill('#inquiry input[name="name"]', "Test User");
    await page.fill('#inquiry input[name="email"]', `click-test-${Date.now()}@example.com`);
    await page.fill('#inquiry textarea[name="message"]', "This is a legitimate message for double-click test.");

    let apiCallCount = 0;
    page.on("request", (req) => {
      if (req.url().includes("/api/inquiry") && req.method() === "POST") {
        apiCallCount++;
      }
    });

    const submitBtn = page.locator('#inquiry button[type="submit"]');
    // Rapidly double click
    await submitBtn.click({ clickCount: 2 });

    await page.waitForTimeout(1000);
    expect(apiCallCount).toBe(1);
  });

  test("client-side honeypot field is invisible and inaccessible to normal tab navigation", async ({ page }) => {
    await page.goto("/contact");
    const honeypot = page.locator('#inquiry input[name="website"]');
    await expect(honeypot).toBeAttached();
    await expect(honeypot).not.toBeVisible();
    await expect(honeypot).toHaveAttribute("tabindex", "-1");
  });
});

