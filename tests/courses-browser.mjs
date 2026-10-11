import assert from "node:assert/strict";
import { chromium } from "@playwright/test";
const browser = await chromium.launch({
  headless: true,
  ...(process.env.BROWSER_PATH
    ? { executablePath: process.env.BROWSER_PATH }
    : process.platform === "win32"
      ? {
          executablePath:
            "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
        }
      : {}),
});
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));
const nav = async (name) =>
  page.locator(".sidebar").getByTitle(name, { exact: true }).click();
const url = process.env.TEST_URL ?? "http://127.0.0.1:5175";
try {
  await page.goto(url);
  await page.getByRole("heading", { name: "Building momentum" }).waitFor();
  await page.screenshot({
    path: ".sites-runtime/noted-dashboard.png",
    fullPage: true,
  });
  await nav("Quiz Builder");
  await page
    .locator(".subject-option")
    .filter({ hasText: "AP World History" })
    .click();
  const count = async () =>
    parseInt(await page.locator(".match-number").innerText());
  const standard = await count();
  await page
    .getByLabel("AP World quiz mode", { exact: true })
    .selectOption("expanded");
  assert.equal(await count(), standard + 16);
  await page
    .locator("details")
    .filter({
      has: page.locator("summary").filter({ hasText: "Historical periods" }),
    })
    .locator("summary")
    .click();
  await page.getByRole("button", { name: "600–1200", exact: true }).click();
  assert.equal(await count(), 16);
  await page
    .getByLabel("AP World quiz mode", { exact: true })
    .selectOption("standard");
  assert.equal(await count(), standard);
  assert.equal(
    await page.getByRole("button", { name: "600–1200", exact: true }).count(),
    0,
  );
  await nav("Subjects");
  await page
    .locator(".course-card")
    .filter({ hasText: "AP World History" })
    .click();
  await page
    .locator(".unit-card")
    .first()
    .getByRole("button", { name: "Study unit" })
    .click();
  await page
    .getByRole("heading", { name: "East Asia", exact: true })
    .waitFor();
  await page.getByRole("button", { name: "Mark notes read" }).click();
  await page.screenshot({
    path: ".sites-runtime/noted-lesson.png",
    fullPage: true,
  });
  await nav("Settings");
  const before = await page.evaluate(() =>
    JSON.parse(localStorage.getItem("studycraft.v1")),
  );
  const dl = page.waitForEvent("download");
  await page.getByRole("button", { name: "Export full backup" }).click();
  await (await dl).saveAs(".sites-runtime/noted-backup.json");
  await page
    .getByLabel("Restore full backup")
    .setInputFiles(".sites-runtime/noted-backup.json");
  await page
    .getByRole("dialog", { name: "Restore backup" })
    .getByRole("button", { name: "Restore workspace" })
    .click();
  await page.getByRole("heading", { name: "Building momentum" }).waitFor();
  assert.deepEqual(
    await page.evaluate(() =>
      JSON.parse(localStorage.getItem("studycraft.v1")),
    ),
    before,
  );
  await nav("Settings");
  await page
    .getByLabel("Restore full backup")
    .setInputFiles({
      name: "invalid.json",
      mimeType: "application/json",
      buffer: Buffer.from("{}"),
    });
  await page.getByRole("alert").waitFor();
  assert.deepEqual(
    await page.evaluate(() =>
      JSON.parse(localStorage.getItem("studycraft.v1")),
    ),
    before,
  );
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByLabel("Open navigation").click();
  await nav("Subjects");
  await page
    .locator(".course-card")
    .filter({ hasText: "AP World History" })
    .click();
  await page
    .locator(".unit-card")
    .first()
    .getByRole("button", { name: "Study unit" })
    .click();
  assert.ok(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  );
  await page.screenshot({
    path: ".sites-runtime/noted-mobile-lesson.png",
    fullPage: true,
  });
  assert.deepEqual(errors, []);
  console.log(
    "PASS: AP World quiz mode and period visibility, substantive notes, reading progress, validated full-backup restore, rejected invalid backup, mobile lesson layout, and no uncaught errors.",
  );
} catch (e) {
  await page.screenshot({
    path: ".sites-runtime/courses-failure.png",
    fullPage: true,
  });
  console.log((await page.locator("body").innerText()).slice(0, 2500));
  throw e;
} finally {
  await browser.close();
}
