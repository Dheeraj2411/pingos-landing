import { test, expect } from "@playwright/test";

test.describe("Contact Form Modal Alignment & Behavior Suite", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");
  });

  test("opens modal via FAQ 'Get in Touch' and closes with close button", async ({ page }) => {
    const getInTouchBtn = page.locator('#faq button:has-text("Get in Touch")');
    await getInTouchBtn.scrollIntoViewIfNeeded();
    await expect(getInTouchBtn).toBeVisible({ timeout: 15000 });
    await getInTouchBtn.click();

    const modal = page.locator('[data-testid="contact-modal"]');
    await expect(modal).toBeVisible();

    const closeBtn = page.locator('[data-testid="modal-close-button"]');
    await expect(closeBtn).toBeVisible();
    await expect(closeBtn).toHaveAttribute("aria-label", "Close modal");

    await closeBtn.click();
    await expect(modal).not.toBeVisible();
  });

  test("closes modal when Escape key is pressed", async ({ page }) => {
    const getInTouchBtn = page.locator('#faq button:has-text("Get in Touch")');
    await getInTouchBtn.scrollIntoViewIfNeeded();
    await expect(getInTouchBtn).toBeVisible({ timeout: 15000 });
    await getInTouchBtn.click();

    const modal = page.locator('[data-testid="contact-modal"]');
    await expect(modal).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(modal).not.toBeVisible();
  });

  test("locks document.documentElement and document.body scroll while open and restores when closed", async ({ page }) => {
    const getInTouchBtn = page.locator('#faq button:has-text("Get in Touch")');
    await getInTouchBtn.scrollIntoViewIfNeeded();
    await expect(getInTouchBtn).toBeVisible({ timeout: 15000 });
    await getInTouchBtn.click();

    const modal = page.locator('[data-testid="contact-modal"]');
    await expect(modal).toBeVisible();

    // Check BOTH documentElement (html) and body overflow are locked to prevent browser propagation bug
    const overflowStatus = await page.evaluate(() => ({
      html: document.documentElement.style.overflow,
      body: document.body.style.overflow,
      scrollY: window.scrollY,
    }));
    expect(overflowStatus.html).toBe("hidden");
    expect(overflowStatus.body).toBe("hidden");

    // Attempt to scroll mouse wheel over the backdrop
    await page.mouse.wheel(0, 500);
    await page.waitForTimeout(100);

    const scrollYAfterWheel = await page.evaluate(() => window.scrollY);
    expect(scrollYAfterWheel).toBe(overflowStatus.scrollY);

    // Close modal
    await page.keyboard.press("Escape");
    await expect(modal).not.toBeVisible();

    // Check both are restored
    const restoredStatus = await page.evaluate(() => ({
      html: document.documentElement.style.overflow,
      body: document.body.style.overflow,
    }));
    expect(restoredStatus.html).not.toBe("hidden");
    expect(restoredStatus.body).not.toBe("hidden");
  });

  test("synchronizes plan selection prop when opened from pricing cards", async ({ page }) => {
    // Scroll to pricing section and click Request Pro
    const requestProBtn = page.locator('#pricing button:has-text("Request Pro")');
    await requestProBtn.scrollIntoViewIfNeeded();
    await expect(requestProBtn).toBeVisible({ timeout: 15000 });
    await requestProBtn.click();

    const modal = page.locator('[data-testid="contact-modal"]');
    await expect(modal).toBeVisible();

    const planSelect = page.locator('select[name="plan"]');
    await expect(planSelect).toHaveValue("pro");

    // Close and click Enterprise Request Enterprise
    await page.keyboard.press("Escape");
    await expect(modal).not.toBeVisible();

    const enterpriseBtn = page.locator('#pricing button:has-text("Request Enterprise")');
    await enterpriseBtn.scrollIntoViewIfNeeded();
    await expect(enterpriseBtn).toBeVisible({ timeout: 15000 });
    await enterpriseBtn.click();

    await expect(modal).toBeVisible();
    await expect(planSelect).toHaveValue("enterprise");
  });

  test("submit button is directly visible in viewport without scrolling on desktop", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    const getInTouchBtn = page.locator('#faq button:has-text("Get in Touch")');
    await getInTouchBtn.scrollIntoViewIfNeeded();
    await expect(getInTouchBtn).toBeVisible({ timeout: 15000 });
    await getInTouchBtn.click();

    const modal = page.locator('[data-testid="contact-modal"]');
    await expect(modal).toBeVisible();

    const submitBtn = modal.locator('button[type="submit"]');
    await expect(submitBtn).toBeInViewport();
    await expect(submitBtn).toBeVisible();
  });
});
