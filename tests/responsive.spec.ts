import { test, expect } from "@playwright/test";

for (const [width, height] of [[1024, 768], [1280, 720], [1366, 768], [1440, 900], [1920, 1080], [1920, 650], [2560, 1440]]) {
  test(`${width}x${height}: desktop sections fit screen`, async ({ page }) => {
    await page.setViewportSize({ width, height });
    await page.goto("http://localhost:3000");
    await page.waitForTimeout(2200);
    for (const id of ["advantages", "about"]) {
      const section = page.locator(`#${id}`);
      await section.scrollIntoViewIfNeeded();
      const dimensions = await section.evaluate(element => {
        const box = element.getBoundingClientRect();
        const outside = [...element.querySelectorAll("*")].filter(child => {
          const rect = child.getBoundingClientRect();
          return rect.width > 0 && (rect.top < box.top - 1 || rect.bottom > box.bottom + 1);
        }).map(child => child.tagName + "." + child.className);
        return { height: box.height, outside, overflow: element.scrollHeight > element.clientHeight + 1 };
      });
      expect(dimensions).toEqual({ height, outside: [], overflow: false });
      await section.screenshot({ path: `test-results/${id}-screen-${width}-${height}.png` });
    }
  });
}

for (const [width, height] of [[320, 568], [360, 640], [375, 667], [390, 844], [412, 915], [430, 932], [844, 390], [768, 1024], [1440, 900], [1920, 1080]]) {
  test(`${width}x${height}: layout and navigation`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", error => errors.push(error.message));
    page.on("console", message => {
      if (message.type() === "error") errors.push(message.text());
    });
    await page.setViewportSize({ width, height });
    await page.goto("http://localhost:3000");
    await page.waitForTimeout(2200);
    await expect(page.locator("h1")).toHaveCount(1);
    const problems = await page.evaluate(() => {
      const ids = [...document.querySelectorAll("[id]")].map(el => el.id);
      const overflow = [...document.querySelectorAll("#hero *, #advantages *, #about *")].filter(el => {
        const rect = el.getBoundingClientRect();
        return rect.width > 0 && (rect.left < -1 || rect.right > innerWidth + 1);
      }).map(el => el.tagName + "." + el.className);
      return { duplicateIds: ids.filter((id, i) => ids.indexOf(id) !== i), overflow };
    });
    expect(problems).toEqual({ duplicateIds: [], overflow: [] });
    await expect(page.locator("h1 span")).toHaveCSS("color", "rgb(255, 0, 9)");
    await page.locator('nav a[href="#advantages"]').click();
    await expect(page.locator("#advantages-title")).toBeInViewport();
    await page.screenshot({ path: `test-results/advantages-${width}.png` });
    await page.locator("#about-title").scrollIntoViewIfNeeded();
    await expect(page.getByRole("heading", { name: "Кто мы?", level: 2 })).toBeInViewport();
    await expect(page.locator("#about")).toContainText("уже более 15 лет");
    await expect(page.locator("#about blockquote")).toContainText("при первом заказе Audi");
    await expect(page.locator('#about img[alt="Владимир Ким, основатель Kim Motors"]')).toBeVisible();
    await expect.poll(() => page.locator("#about img").evaluateAll(images => images.every(image => (image as HTMLImageElement).complete && (image as HTMLImageElement).naturalWidth > 0))).toBe(true);
    await page.locator("#about").screenshot({ path: `test-results/about-${width}.png` });
    await page.evaluate(() => {
      window.scrollTo(0, 0);
      document.querySelector(".snap-container")?.scrollTo({ top: 0, behavior: "instant" });
    });
    await page.locator("#hero").screenshot({ path: `test-results/hero-${width}.png` });
    expect(errors).toEqual([]);
  });
}

test("about: motion keeps content accessible", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("http://localhost:3000/#about");
  await page.locator("#about-title").scrollIntoViewIfNeeded();
  await expect(page.locator("#about-title")).toBeInViewport();
  await expect(page.locator("#about > div")).toHaveCSS("transform", "none");
  await page.locator("#about blockquote").scrollIntoViewIfNeeded();
  await expect(page.locator("#about blockquote")).toBeInViewport();
});
