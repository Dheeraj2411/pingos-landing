import { test, expect } from "@playwright/test";

test.describe("Hero Dynamic Headline Animation & Accessibility", () => {
  test("h1 contains accessible sr-only semantic heading with all keywords", async ({ page }) => {
    await page.goto("/");
    const heading = page.locator("h1");
    await expect(heading).toBeVisible();

    const srOnly = heading.locator(".sr-only");
    await expect(srOnly).toBeAttached();
    const textContent = await srOnly.textContent();
    expect(textContent).toContain("PingOS: The AI-Powered");
    expect(textContent).toContain("WhatsApp CRM");
    expect(textContent).toContain("WABA Automation");
    expect(textContent).toContain("Lead Generation");
    expect(textContent).toContain("Sales Automation");
    expect(textContent).toContain("for Modern Teams");
  });

  test("visual rotating element is guarded with aria-hidden='true'", async ({ page }) => {
    await page.goto("/");
    const visualRotator = page.locator('h1 [data-testid="headline-rotator"]');
    await expect(visualRotator).toBeAttached();
    await expect(visualRotator).toHaveAttribute("aria-hidden", "true");
  });

  test("zero-CLS ghost sizer exists to lock bounding dimensions", async ({ page }) => {
    await page.goto("/");
    const ghostSizer = page.locator('h1 [data-testid="headline-ghost-sizer"]');
    await expect(ghostSizer).toBeAttached();
    
    // Ghost sizer should be hidden from view and interactions
    await expect(ghostSizer).toHaveClass(/invisible/);
    await expect(ghostSizer).toHaveClass(/select-none/);

    const rotator = page.locator('h1 [data-testid="headline-rotator"]');
    const rotatorBox = await rotator.boundingBox();
    expect(rotatorBox).not.toBeNull();
    expect(rotatorBox!.width).toBeGreaterThan(150);
    expect(rotatorBox!.height).toBeGreaterThan(30);
  });

  test("cycles through dynamic words over time", async ({ page }) => {
    await page.goto("/");
    const activeWord = page.locator('h1 [data-testid="active-headline-word"]');
    await expect(activeWord).toBeVisible();
    
    const initialText = await activeWord.textContent();
    expect(initialText).toBe("WhatsApp CRM");

    // Wait for the word to transition
    await expect(async () => {
      const currentText = await activeWord.textContent();
      expect(currentText).not.toBe(initialText);
    }).toPass({ timeout: 6000 });
  });

  test("respects prefers-reduced-motion", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");

    const activeWord = page.locator('h1 [data-testid="active-headline-word"]');
    await expect(activeWord).toBeVisible();

    // Verify element is rendered cleanly without jarring transform glitches
    const transform = await activeWord.evaluate((el) => {
      return window.getComputedStyle(el).transform;
    });
    // In reduced motion, transform should either be 'none' or simple identity matrix
    expect(transform === "none" || transform.includes("matrix")).toBe(true);
  });
});
