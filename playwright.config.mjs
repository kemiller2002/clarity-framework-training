import { defineConfig } from "@playwright/test";

// UI conformance suite for visual-engineering/UI-LAYOUT-INTERACTION@1.0.0.
// Serves the repository root, which is what GitHub Pages publishes.
const port = Number(process.env.UI_CONFORMANCE_PORT ?? 4317);
const executablePath = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE || undefined;

export default defineConfig({
  testDir: "./tests/ui-conformance",
  testMatch: /.*\.spec\.mjs/,
  fullyParallel: true,
  workers: 2,
  forbidOnly: Boolean(process.env.CI),
  retries: 0,
  reporter: [
    process.env.CI ? ["line"] : ["list"],
    ...(process.env.CI ? [["html", { open: "never", outputFolder: "playwright-report" }]] : []),
    ["./tests/ui-conformance/evidence-reporter.mjs"]
  ],
  use: {
    baseURL: `http://127.0.0.1:${port}`,
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    launchOptions: { executablePath }
  },
  projects: [{ name: "chromium", use: { browserName: "chromium" } }],
  webServer: {
    command: "node tools/serve.mjs .",
    env: { PORT: String(port) },
    url: `http://127.0.0.1:${port}/`,
    reuseExistingServer: false
  }
});
