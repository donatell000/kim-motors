import { test, expect } from "@playwright/test";

for (const width of [390, 768, 1440, 1920]) {
  test(`selection: content and layout at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("http://localhost:3000/#delivery");
    const section = page.locator("#delivery");
    await section.scrollIntoViewIfNeeded();
    await expect(section.getByRole("heading", { level: 2 })).toHaveText("Вы уже выбрали авто");
    await expect(section.locator("ol li")).toHaveCount(4);
    await expect(section.locator("ul li")).toHaveCount(3);
    await expect(section.locator("img")).toHaveAttribute("src", /selection-cars\.webp/);
    await section.locator("img").evaluate((image: HTMLImageElement) => image.decode());
    const dimensions = await section.locator("img").evaluate((image: HTMLImageElement) => ({ width: image.naturalWidth, height: image.naturalHeight }));
    expect(dimensions.width).toBeGreaterThan(0);
    expect(Math.abs(dimensions.height - dimensions.width * 884 / 1780)).toBeLessThanOrEqual(1);
    for (const link of await section.getByRole("link").all()) {
      await expect(link).toHaveAttribute("href", "#contact");
    }
    const overflow = await section.evaluate((element) => {
      const bounds = element.getBoundingClientRect();
      return Array.from(element.querySelectorAll("h2, h3, h4, p, li, a")).some((child) => {
        const box = child.getBoundingClientRect();
        return box.left < bounds.left || box.right > bounds.right || box.bottom > bounds.bottom;
      });
    });
    expect(overflow).toBe(false);
    await section.screenshot({ path: `test-results/selection-${width}.png` });
    await section.getByRole("link", { name: "Рассчитать стоимость" }).click();
    await expect(page).toHaveURL(/#contact$/);
  });
}
