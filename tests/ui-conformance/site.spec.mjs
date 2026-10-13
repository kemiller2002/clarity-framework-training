import { expect, test } from "@playwright/test";
import {
  CONTRACT_WIDTHS,
  expectActionOutcome,
  expectDestinationClearOfHeader,
  expectLabelIntact,
  expectNoOverflow,
  expectPeerAlignment,
  inventoryActions,
  scaleDefaultText,
  settleFontsAndFrames
} from "./forma-conformance/index.mjs";
import { BUTTON_PAIRS, LANDMARKS, PAGES, groupActions, headingOf } from "./inventory.mjs";

// Clarity Framework Training conformance to visual-engineering/UI-LAYOUT-INTERACTION@1.0.0.
// Surfaces: every HTML page GitHub Pages publishes from the repository root.
// Annotations (surface, action, alignment) feed tests/ui-conformance/evidence-reporter.mjs.

// Content-driven breakpoints from style.css: 560px (35em) and 980px (61.25em).
const WIDTHS = Object.freeze([...CONTRACT_WIDTHS, 560, 980]);
const DESKTOP = 1280;
const BODY_BACKGROUND = "rgb(11, 17, 28)"; // --bg in style.css: proves the shared stylesheet loaded

const annotate = (type, value) => test.info().annotations.push({ type, description: typeof value === "string" ? value : JSON.stringify(value) });

const open = async (page, path, width, { textScale = 1 } = {}) => {
  await page.setViewportSize({ width, height: 900 });
  const response = await page.goto(`/${path}`);
  if (textScale !== 1) await scaleDefaultText(page, textScale);
  await settleFontsAndFrames(page);
  return response;
};

const landmark = (page, role) => page.getByRole(role);
const destinationPattern = (path, destination) =>
  destination.startsWith("#")
    ? new RegExp(`/${path.replace(".", "\\.")}${destination}$`)
    : new RegExp(`/${destination.replace(".", "\\.")}$`);

const expectArrived = async (page, path, destination) => {
  if (destination.startsWith("#")) {
    await expectDestinationClearOfHeader(page, page.locator(destination), page.getByRole("banner"));
    return;
  }
  await expect(page.getByRole("heading", { level: 1, name: headingOf(destination), exact: true })).toBeVisible();
};

for (const entry of PAGES) {
  test.describe(entry.path, () => {
    test(`ULI-A01: the page is published and its shared stylesheet applies`, async ({ page }) => {
      annotate("surface", entry.path);
      const response = await open(page, entry.path, DESKTOP);
      expect(response.status()).toBe(200);
      await expect(page.getByRole("heading", { level: 1, name: entry.heading, exact: true })).toBeVisible();
      await expect(page.locator("body")).toHaveCSS("background-color", BODY_BACKGROUND);
    });

    for (const width of WIDTHS) {
      test(`ULI-L05/L09 @${width}px: no horizontal overflow or escaping text`, async ({ page }) => {
        annotate("surface", entry.path);
        annotate("viewport", String(width));
        await open(page, entry.path, width);
        await expectNoOverflow(page);
        await expectLabelIntact(page.getByRole("navigation", { name: "Primary navigation" }));
      });
    }

    for (const width of [320, 390, 768, DESKTOP]) {
      test(`ULI-L05 @${width}px: 200% default text stays inside its containers`, async ({ page }) => {
        annotate("surface", entry.path);
        annotate("viewport", String(width));
        await open(page, entry.path, width, { textScale: 2 });
        await expectNoOverflow(page);
      });
    }

    test("ULI-A01/A10: every visible action is declared in the inventory", async ({ page }) => {
      annotate("surface", entry.path);
      const declared = [...entry.banner, ...entry.main, ...entry.contentinfo].map(([name]) => `link ${name}`);
      for (const width of [320, DESKTOP]) {
        await open(page, entry.path, width);
        const found = (await inventoryActions(page))
          .map(item => `${item.role} ${item.name}`)
          .filter(item => item !== "link Skip to content");
        expect(found.sort(), `actions at ${width}px`).toEqual([...declared].sort());
      }
    });

    test("ULI-A06/A08: the skip link appears on focus and moves to the main content", async ({ page }) => {
      annotate("surface", entry.path);
      annotate("action", { id: `${entry.path}#skip`, control: { role: "link", name: "Skip to content" }, intent: "Skip repeated navigation", expectedOutcome: "URL fragment #main; main content in view" });
      await open(page, entry.path, DESKTOP);
      const skip = page.getByRole("link", { name: "Skip to content" });
      const width = async () => (await skip.boundingBox())?.width ?? 0;
      expect(await width(), "visually hidden before focus").toBeLessThanOrEqual(1);
      await page.keyboard.press("Tab");
      await expect(skip).toBeFocused();
      await expect.poll(width, { message: "shown on focus" }).toBeGreaterThan(40);
      await expect(skip).toBeInViewport();
      await expectLabelIntact(skip);
      await page.keyboard.press("Enter");
      await expect(page).toHaveURL(/#main$/);
      await expect(page.getByRole("main")).toBeInViewport();
    });

    for (const role of LANDMARKS) {
      for (const { name, destination, count } of groupActions(entry[role])) {
        const widths = role === "banner" ? [DESKTOP, 320] : [DESKTOP];
        for (const width of widths) {
          test(`ULI-A01/A02 @${width}px: ${role} link "${name}" reaches ${destination}${count > 1 ? ` (${count} instances)` : ""}`, async ({ page }) => {
            annotate("surface", entry.path);
            annotate("action", {
              id: `${entry.path}:${role}:${name}`,
              control: { role: "link", name },
              intent: `Navigate to ${destination}`,
              expectedOutcome: destination.startsWith("#")
                ? `URL fragment ${destination}; the target section is in view and clear of the sticky header`
                : `URL ends with /${destination}; that page's level-1 heading "${headingOf(destination)}" is visible`
            });
            await open(page, entry.path, width);
            const links = landmark(page, role).getByRole("link", { name, exact: true });
            await expect(links).toHaveCount(count);
            for (const index of Array.from({ length: count }, (_, i) => i)) {
              if (index > 0) await open(page, entry.path, width);
              if (count === 1 && destination !== entry.path) {
                await expectActionOutcome(page, {
                  ruleId: "ULI-A02",
                  action: { role: "link", name, scope: landmark(page, role) },
                  outcome: { kind: "url", expected: destinationPattern(entry.path, destination) }
                });
              } else {
                // Repeated instances, and links to the page already shown
                // (whose URL cannot change), are asserted per instance.
                await links.nth(index).click();
                await expect(page).toHaveURL(destinationPattern(entry.path, destination));
              }
              await expectArrived(page, entry.path, destination);
            }
          });
        }
      }
    }
  });
}

test.describe("alignment groups", () => {
  for (const [path, unique, partner] of BUTTON_PAIRS) {
    for (const width of [768, DESKTOP]) {
      test(`ULI-L02/L07/L10 @${width}px: ${path} "${unique}" and "${partner}" share top and bottom edges`, async ({ page }) => {
        const id = `${path}:actions:${unique}`;
        annotate("surface", path);
        annotate("alignment", { id, relation: "top-edge", targets: [{ role: "link", name: unique }, { role: "link", name: partner }], rationale: "Peer call-to-action buttons in one hero/action row" });
        await open(page, path, width);
        const main = page.getByRole("main");
        const row = main.getByRole("link", { name: unique, exact: true }).locator("xpath=..");
        const peers = [{ role: "link", name: unique, scope: row }, { role: "link", name: partner, scope: row }];
        await expectPeerAlignment(page, { ruleId: "ULI-L10", id: `${id}:top`, edge: "top", toleranceCssPx: 1, peers });
        await expectPeerAlignment(page, { ruleId: "ULI-L02", id: `${id}:bottom`, edge: "bottom", toleranceCssPx: 1, peers });
        await expectPeerAlignment(page, { ruleId: "ULI-L07", id: `${id}:center`, edge: "center", toleranceCssPx: 1, peers });
      });
    }
  }

  test("ULI-L07/L10 @1280px: header brand, primary navigation and call to action share a centerline", async ({ page }) => {
    annotate("surface", "index.html");
    const targets = [{ role: "link", name: "Clarity Framework Training" }, { role: "link", name: "Training" }, { role: "link", name: "Engage" }, { role: "link", name: "Request an Invite" }];
    annotate("alignment", { id: "index.html:header-row", relation: "centerline", targets, rationale: "Single header row: brand, primary navigation and call to action" });
    await open(page, "index.html", DESKTOP);
    const banner = page.getByRole("banner");
    await expectPeerAlignment(page, { ruleId: "ULI-L07", id: "header-row", edge: "center", toleranceCssPx: 1, peers: targets.map(target => ({ ...target, scope: banner })) });
  });

  test("ULI-L01 @1280px: the three problem cards start at one top edge", async ({ page }) => {
    annotate("surface", "index.html");
    const targets = ["Debating solutions", "Urgency as a mask", "Declared alignment"].map(name => ({ role: "heading", name }));
    annotate("alignment", { id: "index.html:problem-cards", relation: "top-edge", targets, rationale: "Three peer cards in one grid row" });
    await open(page, "index.html", DESKTOP);
    await expectPeerAlignment(page, { ruleId: "ULI-L01", id: "problem-cards", edge: "top", toleranceCssPx: 1, peers: targets });
  });

  test("ULI-L01 @1280px: the three engagement steps start at one top edge", async ({ page }) => {
    annotate("surface", "index.html");
    const names = ["Request an Invite", "Fit Call (15–30 min)", "Schedule"];
    annotate("alignment", { id: "index.html:engage-steps", relation: "top-edge", targets: names.map(name => ({ role: "heading", name })), rationale: "Three numbered peer steps in one grid row" });
    await open(page, "index.html", DESKTOP);
    // The intake region repeats the "Request an Invite" heading; scope to the steps row.
    const steps = page.getByRole("heading", { name: "Fit Call (15–30 min)", exact: true }).locator("xpath=../..");
    await expectPeerAlignment(page, { ruleId: "ULI-L01", id: "engage-steps", edge: "top", toleranceCssPx: 1, peers: names.map(name => ({ role: "heading", name, scope: steps })) });
  });
});

test.describe("states and recovery", () => {
  test("ULI-A07/A09: the invite intake is honest that it is not open and offers nothing to submit", async ({ page }) => {
    for (const path of ["index.html", "engage.html"]) {
      annotate("surface", path);
      await open(page, path, DESKTOP);
      await page.getByRole("banner").getByRole("link", { name: "Request an Invite", exact: true }).click();
      const intake = page.getByRole("region", { name: "Request an Invite" });
      await expect(intake).toBeInViewport();
      await expect(intake.getByRole("note")).toHaveText(/The online intake is not open yet\./);
      await expect(page.getByRole("button")).toHaveCount(0);
      await expect(page.locator("form")).toHaveCount(0);
    }
  });

  test("ULI-A07/A10: a missing page answers 404 with the styled not-found page, and its link recovers to the home page", async ({ page }) => {
    annotate("surface", "404.html");
    await page.setViewportSize({ width: 390, height: 900 });
    const response = await page.goto("/no-such-page.html");
    expect(response.status()).toBe(404);
    await expect(page.getByRole("heading", { level: 1, name: headingOf("404.html"), exact: true })).toBeVisible();
    await expect(page.locator("body")).toHaveCSS("background-color", BODY_BACKGROUND);
    await page.getByRole("main").getByRole("link", { name: "Go to the homepage", exact: true }).click();
    await expect(page).toHaveURL(/\/index\.html$/);
    await expect(page.getByRole("heading", { level: 1, name: headingOf("index.html"), exact: true })).toBeVisible();
  });

  test("ULI-A01: the former boundries.html address forwards to the Boundaries page", async ({ page }) => {
    annotate("surface", "boundries.html");
    await page.goto("/boundries.html");
    await expect(page).toHaveURL(/\/boundaries\.html$/);
    await expect(page.getByRole("heading", { level: 1, name: headingOf("boundaries.html"), exact: true })).toBeVisible();
  });

  test("ULI-L08: hover motion is removed under reduced motion", async ({ page }) => {
    annotate("surface", "index.html");
    await page.emulateMedia({ reducedMotion: "reduce" });
    await open(page, "index.html", DESKTOP);
    const cta = page.getByRole("banner").getByRole("link", { name: "Request an Invite", exact: true });
    await cta.hover();
    await expect(cta).toHaveCSS("transform", "none");
  });
});
