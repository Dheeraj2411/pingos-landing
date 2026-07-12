import { test, expect } from "@playwright/test";

test.describe("Crawlers & Sitemaps", () => {
  test("robots.txt returns valid content", async ({ request }) => {
    const response = await request.get("/robots.txt");
    expect(response.status()).toBe(200);

    const text = await response.text();
    expect(text).toContain("User-Agent: *");
    expect(text).toContain("Allow: /");
    expect(text).toContain("Disallow: /api/");
    
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://pingos.ai";
    const normalizedBaseUrl = baseUrl.replace(/\/$/, "");
    expect(text).toContain(`Sitemap: ${normalizedBaseUrl}/sitemap.xml`);
  });

  test("sitemap.xml returns valid content", async ({ request }) => {
    const response = await request.get("/sitemap.xml");
    expect(response.status()).toBe(200);

    const text = await response.text();
    expect(text).toContain("<?xml");
    expect(text).toContain("<urlset");
    
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://pingos.ai";
    const normalizedBaseUrl = baseUrl.replace(/\/$/, "");
    
    expect(text).toContain(normalizedBaseUrl);
    expect(text).toContain(`${normalizedBaseUrl}/privacy`);
    expect(text).toContain(`${normalizedBaseUrl}/terms`);
    expect(text).toContain(`${normalizedBaseUrl}/cookies`);
  });
});
