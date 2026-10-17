import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  use: { channel: "chrome", reducedMotion: "reduce" },
  workers: 1,
  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
  },
});
