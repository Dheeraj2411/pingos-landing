import { test, expect } from '@playwright/test';

test.describe('Crawlers & Sitemaps', () => {
  test('robots.txt returns valid content', async ({ request }) => {
    const response = await request.get('/robots.txt');
    expect(response.status()).toBe(200);
    
    const text = await response.text();
    expect(text).toContain('User-Agent: *');
    expect(text).toContain('Allow: /');
    expect(text).toContain('Disallow: /api/');
    expect(text).toContain('Sitemap: https://pingos.ai/sitemap.xml');
  });

  test('sitemap.xml returns valid content', async ({ request }) => {
    const response = await request.get('/sitemap.xml');
    expect(response.status()).toBe(200);
    
    const text = await response.text();
    expect(text).toContain('<?xml');
    expect(text).toContain('<urlset');
    expect(text).toContain('https://pingos.ai');
    expect(text).toContain('https://pingos.ai/privacy');
    expect(text).toContain('https://pingos.ai/terms');
    expect(text).toContain('https://pingos.ai/cookies');
  });
});
