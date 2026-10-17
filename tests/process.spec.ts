import { test, expect } from "@playwright/test";

for (const width of [390, 768, 1440, 1920]) {
  test(`process: content and layout at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("http://localhost:3000/#process");
    const section = page.locator("#process");
    await section.scrollIntoViewIfNeeded();
    await expect(section.getByRole("heading", { level: 2 })).toHaveText("От покупки до получения— всё под контролем");
    await expect(section.locator("ol > li")).toHaveCount(4);
    await expect(section.getByRole("heading", { level: 3 })).toHaveText([
      "Консультация", "Подбор автомобилей", "Заключаем договор", "Доставка и таможня",
    ]);
    for (const image of await section.locator("img").all()) {
      await image.scrollIntoViewIfNeeded();
      await image.evaluate((element: HTMLImageElement) => element.decode());
      await expect(image).toHaveAttribute("alt", "");
    }
    expect(await section.evaluate((element) => {
      const bounds = element.getBoundingClientRect();
      return Array.from(element.querySelectorAll("h2, h3, p, li")).some((child) => {
        const box = child.getBoundingClientRect();
        return box.left < bounds.left || box.right > bounds.right || box.bottom > bounds.bottom;
      });
    })).toBe(false);
    for (const card of await section.locator("ol > li").all()) {
      expect(await card.evaluate((element) => {
        const bounds = element.getBoundingClientRect();
        const heading = element.querySelector("h3")!.getBoundingClientRect();
        return heading.top >= bounds.top && heading.bottom <= bounds.bottom;
      })).toBe(true);
    }
    await section.screenshot({ path: `test-results/process-${width}.png` });
  });
}
