import { expect, test } from "@playwright/test";

const found = {
  number: "TBJU1234567",
  point: 6,
  text: "До Бишкека осталось 600 км. Ожидайте новых обновлений по данному контейнеру.",
  updatedAt: "2026-10-23T10:31:08Z",
};

for (const viewport of [{ width: 390, height: 844 }, { width: 768, height: 1024 }, { width: 1920, height: 1080 }]) {
  test(`logistics layout and search at ${viewport.width}px`, async ({ page }) => {
    // Ответ бэка подменяем, чтобы тест не зависел от данных в WordPress.
    await page.route("**/api/track?number=*", (route) => {
      const number = new URL(route.request().url()).searchParams.get("number");
      return number === found.number
        ? route.fulfill({ json: found })
        : route.fulfill({ status: 404, json: { error: "not_found" } });
    });

    await page.setViewportSize(viewport);
    await page.goto("http://localhost:3000");
    const section = page.locator("#logistics");
    await section.scrollIntoViewIfNeeded();
    await expect(section.getByRole("heading", { name: "логистика" })).toBeVisible();
    const input = section.getByRole("textbox", { name: "Номер контейнера" });
    const submit = section.getByRole("button", { name: "найти" });

    // Пустое поле не отправляется.
    await submit.click();
    expect(await input.evaluate((element: HTMLInputElement) => element.validity.valid)).toBe(false);

    // Неизвестный номер.
    await input.fill("XXXX0000000");
    await input.press("Enter");
    await expect(section.getByRole("status")).toContainText("не найден");

    // Найденный контейнер: текст, маршрут, карта, номер в адресе.
    await input.fill(found.number.toLowerCase());
    await submit.click();
    await expect(section.getByRole("article", { name: `Контейнер ${found.number}` })).toBeVisible();
    await expect(section.getByText(found.text)).toBeVisible();
    await expect(section.locator("[aria-current=step]")).toContainText("Кашгар");
    await expect(section.locator(".leaflet-container")).toBeVisible();
    expect(new URL(page.url()).searchParams.get("track")).toBe(found.number);

    const bounds = await section.boundingBox();
    expect(bounds!.x).toBeGreaterThanOrEqual(0);
    expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(viewport.width);
    expect(await section.evaluate(element => element.scrollWidth <= element.clientWidth)).toBe(true);
    await page.screenshot({ path: `test-results/logistics-${viewport.width}.png` });
  });
}

test("link with ?track= opens the result", async ({ page }) => {
  await page.route("**/api/track?number=*", (route) => route.fulfill({ json: found }));
  await page.goto(`http://localhost:3000/?track=${found.number}`);
  await expect(page.getByRole("article", { name: `Контейнер ${found.number}` })).toBeVisible();
});
