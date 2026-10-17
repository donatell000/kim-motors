import { test, expect } from "@playwright/test";

for (const width of [390, 768, 1440, 1920]) {
  test(`platforms: compact and responsive at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("http://localhost:3000/#platforms");
    const section = page.locator("#platforms");
    await section.scrollIntoViewIfNeeded();
    await expect(section.getByRole("heading", { level: 2 })).toHaveText("Прямой доступк площадкам");
    await expect(section.locator("img")).toHaveCount(6);
    const box = await section.boundingBox();
    expect(box!.width).toBeLessThanOrEqual(width);
    if (width > 900) expect(box!.height).toBeCloseTo(270, 0);
    for (const image of await section.locator("img").all()) {
      await expect(image).toHaveAttribute("alt", /\S+/);
      await expect.poll(() => image.evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth > 0)).toBe(true);
      const logo = await image.boundingBox();
      expect(logo!.x).toBeGreaterThanOrEqual(box!.x);
      expect(logo!.x + logo!.width).toBeLessThanOrEqual(box!.x + box!.width + 1);
    }
  });
}
