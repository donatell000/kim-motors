import { test, expect } from "@playwright/test";

for (const width of [390, 768, 1440, 1920]) {
  test(`contact: form and layout at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("http://localhost:3000/#contact");
    const section = page.locator("#contact");

    // Check heading
    await expect(section.getByRole("heading", { level: 2 })).toContainText(/заказать/i);
    await expect(section.getByRole("heading", { level: 2 })).toContainText("автомобиль");

    // Check form fields
    await expect(section.getByLabel("Желаемый автомобиль")).toBeVisible();
    await expect(page.locator("input#car")).toHaveAttribute("placeholder", "Желаемый автомобиль");
    await expect(page.locator("input#name")).toBeVisible();
    await expect(page.locator("input#budget")).toBeVisible();
    await expect(page.locator("input#phone")).toBeVisible();
    await expect(section.locator("button[type='submit']")).toContainText("Оставить заявку");

    // Check socials
    await expect(section.locator("a[href*='instagram.com']")).toBeVisible();
    await expect(section.locator("a[href*='youtube.com']")).toBeVisible();
    await expect(section.locator("a[href*='wa.me']")).toBeVisible();

    // Check phone and tagline
    await expect(section.locator("text=+996 500 668 685")).toBeVisible();

    // Screenshot
    for (const image of await section.locator("img").all()) {
      await image.evaluate((element: HTMLImageElement) => element.decode());
    }
    expect(await section.evaluate((element) => {
      const bounds = element.getBoundingClientRect();
      return Array.from(element.querySelectorAll("input, button, h2, a")).every((child) => {
        const box = child.getBoundingClientRect();
        return box.left >= bounds.left && box.right <= bounds.right;
      });
    })).toBe(true);
    await section.screenshot({ path: `test-results/contact-${width}.png` });
  });
}

test("contact: validates required fields and prepares WhatsApp request", async ({ page }) => {
  await page.goto("http://localhost:3000/#contact");
  const section = page.locator("#contact");
  await section.getByRole("button", { name: "Оставить заявку" }).click();
  expect(await section.locator("form").evaluate((form: HTMLFormElement) => form.checkValidity())).toBe(false);
  await section.getByLabel("Желаемый автомобиль").fill("BMW & Hyundai");
  await section.getByLabel("Ваше имя").fill("Тест");
  await section.getByLabel("Бюджет ОТ и ДО ($)").fill("20000–30000");
  await section.getByLabel("Ваш номер телефона").fill("+996500000000");
  await page.route("https://wa.me/**", (route) => route.fulfill({ status: 200, contentType: "text/plain", body: "Test intercepted" }));
  const request = page.waitForRequest((request) => request.url().startsWith("https://wa.me/"));
  await section.getByRole("button", { name: "Оставить заявку" }).click();
  const url = new URL((await request).url());
  expect(url.pathname).toBe("/996500668685");
  for (const value of ["BMW & Hyundai", "Тест", "20000–30000", "+996500000000"]) {
    expect(url.searchParams.get("text")).toContain(value);
  }
});
