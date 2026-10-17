import { test, expect } from "@playwright/test";

test("about: artwork and text match the design", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("http://localhost:3000/#about");
  const section = page.locator("#about");
  await section.scrollIntoViewIfNeeded();
  await expect(section.locator("img")).toHaveCount(3);
  await expect(section.locator("p strong")).toHaveText("Наша команда уже более 15 лет");
  await expect(section.locator("blockquote")).toHaveCSS("font-style", "italic");
  const experience = await section.locator("p").first().boundingBox();
  const mission = await section.locator("h3").locator("..").boundingBox();
  expect(experience!.width / mission!.width).toBeCloseTo(472 / 956, 1);
});
