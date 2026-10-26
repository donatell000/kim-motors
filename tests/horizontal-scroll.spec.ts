import { test, expect } from "@playwright/test";

for (const [width, height] of [[390, 844], [844, 390], [1440, 900]]) {
  test(`${width}x${height}: no horizontal scrolling`, async ({ page }) => {
    await page.setViewportSize({ width, height });
    await page.goto("http://localhost:3000");
    await expect(page.locator("h1")).toBeVisible();
    const scrolling = await page.evaluate(() => {
      return [...document.querySelectorAll<HTMLElement>("html, body, #about")].flatMap(element => {
        if (element.scrollWidth <= element.clientWidth + 1) return [];
        element.scrollLeft = 100;
        const left = element.scrollLeft;
        element.scrollLeft = 0;
        return left > 0 ? [{ element: element.tagName + "." + element.className, left }] : [];
      });
    });
    expect(scrolling).toEqual([]);
    await page.locator("#contact").scrollIntoViewIfNeeded();
    await expect(page.locator("#contact")).toBeInViewport();
  });
}
