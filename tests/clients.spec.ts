import { test, expect } from "@playwright/test";

for (const width of [390, 768, 1440, 1920]) {
  test(`clients: gallery and section order at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("http://localhost:3000/#clients");
    const section = page.locator("#clients");
    await section.scrollIntoViewIfNeeded();
    await expect(section.getByRole("heading", { level: 2 })).toHaveText("Наши клиенты");
    await expect(section.locator("li")).toHaveCount(4);
    expect(await section.evaluate((element) => element.nextElementSibling?.id)).toBe("contact");
    for (const image of await section.locator("img").all()) {
      await expect(image).toHaveAttribute("alt", /.+/);
      await image.evaluate((element: HTMLImageElement) => element.decode());
    }
    const gallery = section.getByRole("list");
    const dimensions = await gallery.evaluate((element) => ({
      right: element.getBoundingClientRect().right,
      width: element.clientWidth,
      scrollWidth: element.scrollWidth,
    }));
    expect(dimensions.right).toBeLessThanOrEqual(width);
    expect(dimensions.scrollWidth).toBeGreaterThan(dimensions.width);
    await gallery.focus();
    await expect(gallery).toBeFocused();
    await gallery.press("ArrowRight");
    await expect.poll(() => gallery.evaluate((element) => element.scrollLeft)).toBeGreaterThan(0);
    await gallery.evaluate((element) => { element.scrollLeft = 0; });
    await section.screenshot({ path: `test-results/clients-${width}.png` });
  });
}
