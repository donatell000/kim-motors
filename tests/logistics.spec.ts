import { expect, test } from "@playwright/test";

for (const viewport of [{ width: 390, height: 844 }, { width: 768, height: 1024 }, { width: 1920, height: 1080 }]) {
  test(`logistics layout and form at ${viewport.width}px`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await page.goto("http://localhost:3000");
    const section = page.locator("#logistics");
    await section.scrollIntoViewIfNeeded();
    await expect(section.getByRole("heading", { name: "логистика" })).toBeVisible();
    const input = section.getByRole("textbox", { name: "Номер трека" });
    const submit = section.getByRole("button", { name: "найти" });
    await submit.click();
    expect(await input.evaluate((element: HTMLInputElement) => element.validity.valid)).toBe(false);
    await input.fill("   ");
    await submit.click();
    await expect(section.getByRole("status")).toBeEmpty();
    await input.fill("KM-12345");
    await input.press("Enter");
    await expect(section.getByRole("status")).toContainText("Онлайн-поиск пока не подключён");
    await input.fill("KM-67890");
    await expect(section.getByRole("status")).toBeEmpty();
    const bounds = await section.boundingBox();
    expect(bounds!.x).toBeGreaterThanOrEqual(0);
    expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(viewport.width);
    expect(await section.evaluate(element => element.scrollWidth <= element.clientWidth)).toBe(true);
    await page.screenshot({ path: `test-results/logistics-${viewport.width}.png` });
  });
}
