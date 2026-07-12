import { test, expect } from "@playwright/test";

test.describe("SEO Metadata Validation", () => {
  test("homepage has correct title and description", async ({ page }) => {
    await page.goto("/");

    // Check Title
    await expect(page).toHaveTitle(/PingOS \| WhatsApp CRM, Business Messaging & WABA Automation/);

    // Check Meta Description
    const metaDescription = page.locator('meta[name="description"]');
    await expect(metaDescription).toHaveAttribute(
      "content",
      /PingOS is a specialized WhatsApp Business OS/,
    );
  });

  test("homepage has correct OpenGraph tags", async ({ page }) => {
    await page.goto("/");

    // Check OG Title
    const ogTitle = page.locator('meta[property="og:title"]');
    await expect(ogTitle).toHaveAttribute("content", /PingOS \| WhatsApp CRM, Business Messaging & WABA Automation/);

    // Check OG URL
    const ogUrl = page.locator('meta[property="og:url"]');
    // It should match the base url or localhost if running locally
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://pingos.me";
    const expectedUrl = new RegExp(baseUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    await expect(ogUrl).toHaveAttribute("content", expectedUrl);
  });

  test("homepage has canonical tag", async ({ page }) => {
    await page.goto("/");

    const canonical = page.locator('link[rel="canonical"]');
    // Next.js uses metadataBase to build the canonical URL
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://pingos.me";
    const expectedUrl = new RegExp(`${baseUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\/?`);
    await expect(canonical).toHaveAttribute("href", expectedUrl);
  });

  test("homepage contains JSON-LD structured data", async ({ page }) => {
    await page.goto("/");

    const jsonLdScripts = page.locator('script[type="application/ld+json"]');
    const count = await jsonLdScripts.count();

    expect(count).toBeGreaterThanOrEqual(3);

    const firstScriptText = await jsonLdScripts.nth(0).textContent();
    expect(firstScriptText).toBeTruthy();

    const data = JSON.parse(firstScriptText || "{}");
    expect(data["@context"]).toBe("https://schema.org");
  });
});
