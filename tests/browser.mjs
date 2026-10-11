import assert from "node:assert/strict";
import { chromium } from "@playwright/test";
import fs from "node:fs";
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
const url = process.env.TEST_URL ?? "http://127.0.0.1:5175";
const nav = async (name) => {
  await page.locator(".sidebar").getByTitle(name, { exact: true }).click();
};
const chip = async (text) =>
  page
    .locator("details")
    .filter({
      has: page.locator("summary").filter({ hasText: "Topics & skills" }),
    })
    .getByRole("button", { name: text, exact: true })
    .click();
try {
  await page.goto(url);
  await page.getByRole("heading", { name: "Building momentum" }).waitFor();
  await nav("Quiz Builder");
  await page.locator(".subject-option").filter({ hasText: "SAT" }).click();
  await page
    .locator(".subject-option")
    .filter({ hasText: "AMC 10 / 12" })
    .click();
  await page.getByText("Topics & skills", { exact: false }).first().click();
  await chip("Algebra");
  await chip("Equations");
  await page
    .locator("details")
    .filter({
      has: page.locator("summary").filter({ hasText: "Question collections" }),
    })
    .locator("summary")
    .click();
  await page
    .getByRole("button", { name: "Core curriculum", exact: true })
    .click();
  await page.getByLabel("Question count", { exact: true }).fill("5");
  assert.equal(
    await page.locator(".match-number").innerText(),
    "4\nmatching questions",
  );
  await page.getByRole("button", { name: "Start practicing" }).click();
  await page
    .getByRole("alert")
    .getByText("Choose a valid count", { exact: false })
    .waitFor();
  await page.getByLabel("Question count", { exact: true }).fill("4");
  await page.getByLabel("Preset name").fill("SAT + AMC algebra");
  await page.getByTitle("Save preset").click();
  await page.getByRole("button", { name: "Start practicing" }).click();
  for (let i = 0; i < 4; i++) {
    const text = await page.locator(".question-text").innerText();
    const answer = text.includes("Solve")
      ? "5"
      : text.includes("slope")
        ? "2"
        : text.includes("a+b")
          ? "58"
          : "7";
    await page.getByLabel("Your answer", { exact: true }).fill(answer);
    await page.getByRole("button", { name: "Check answer" }).click();
    await page.getByText("Nicely done.", { exact: true }).waitFor();
    if (i < 3)
      await page.getByRole("button", { name: "Next question" }).click();
  }
  await page
    .getByRole("button", { name: "Finish session", exact: false })
    .click();
  await page.getByText("100%", { exact: true }).waitFor();
  const state = await page.evaluate(() =>
    JSON.parse(localStorage.getItem("studycraft.v1")),
  );
  assert.equal(state.attempts.length, 1);
  assert.equal(state.attempts[0].questions.length, 4);
  assert.ok(
    state.attempts[0].questions.every(
      (q) =>
        ["sat", "amc"].includes(q.subject) &&
        ["Algebra", "Equations"].includes(q.topic),
    ),
  );
  await page.reload();
  await page
    .getByText("A fresh page. A focused mind.", { exact: true })
    .waitFor();
  await nav("Progress & Analytics");
  await page.getByRole("heading", { name: "Session history" }).waitFor();
  assert.equal(
    await page.locator(".stat-card").first().innerText(),
    "Assessed questions\n4",
  );
  await nav("Question Banks");
  const template = {
    id: "original",
    subject: "sat",
    unit: "Math",
    topic: "Algebra",
    subtopic: "Linear equations",
    difficulty: "Easy",
    type: "Numerical",
    prompt: "Original import exercise: solve 4x = 28.",
    answer: "7",
    explanation: "Divide both sides by four.",
    hint: "Undo multiplication.",
    tags: [],
    collection: "Browser test import",
  };
  await page.locator("input[type=file]").setInputFiles({
    name: "questions.json",
    mimeType: "application/json",
    buffer: Buffer.from(JSON.stringify([template])),
  });
  await page
    .getByRole("status")
    .getByText("Imported 1 questions.", { exact: false })
    .waitFor();
  await page.getByLabel("Search questions").fill("Original import exercise");
  assert.equal(await page.locator(".bank-question").count(), 1);
  const dl = page.waitForEvent("download");
  await page.getByRole("button", { name: "JSON", exact: true }).click();
  const download = await dl;
  await download.saveAs(".sites-runtime/browser-export.json");
  assert.equal(
    JSON.parse(fs.readFileSync(".sites-runtime/browser-export.json", "utf8"))[0]
      .answer,
    "7",
  );
  const csvDl = page.waitForEvent("download");
  await page.getByRole("button", { name: "CSV", exact: true }).click();
  const csv = await csvDl;
  await csv.saveAs(".sites-runtime/browser-export.csv");
  await page
    .locator("input[type=file]")
    .setInputFiles(".sites-runtime/browser-export.csv");
  await page
    .getByRole("status")
    .getByText("Imported 1 questions.", { exact: false })
    .waitFor();
  assert.equal(await page.locator(".bank-question").count(), 2);
  await page.locator("input[type=file]").setInputFiles({
    name: "invalid.json",
    mimeType: "application/json",
    buffer: Buffer.from('[{"prompt":"broken"}]'),
  });
  await page
    .getByRole("alert")
    .getByText("Question 1:", { exact: false })
    .waitFor();
  await page.getByRole("button", { name: "Add question" }).click();
  const editor = page.getByRole("dialog", { name: "Question editor" });
  await editor.getByLabel("Format", { exact: true }).selectOption("Numerical");
  await editor
    .getByLabel("Question · use $…$ for LaTeX", { exact: true })
    .fill("Manual creation: what is 6 times 7?");
  await editor.getByLabel("Correct answer", { exact: false }).fill("42");
  await editor
    .getByLabel("Explanation", { exact: true })
    .fill("Six groups of seven total forty-two.");
  await editor.getByLabel("Hint", { exact: true }).fill("Use multiplication.");
  await editor.getByRole("button", { name: "Save question" }).click();
  await page
    .getByRole("status")
    .getByText("Question saved.", { exact: true })
    .waitFor();
  await nav("FRQ Grading");
  await page
    .getByText("No server-side Gemini API key", { exact: false })
    .first()
    .waitFor();
  await page
    .locator("textarea")
    .fill(
      "Seasonal monsoon winds made sailing routes predictable. Merchants timed voyages and remained in port between wind changes.",
    );
  await page.getByRole("button", { name: "Review with manual rubric" }).click();
  await page
    .getByRole("status")
    .getByText("Award points using the rubric", { exact: false })
    .waitFor();
  for (const select of await page.locator(".rubric-item select").all())
    await select.selectOption("1");
  await page.getByRole("button", { name: "Save rubric review" }).click();
  await page.getByRole("button", { name: "Review saved" }).waitFor();
  const status = await page.request.get(url + "/api/grade");
  assert.equal((await status.json()).available, false);
  const fallback = await page.request.post(url + "/api/grade", {
    data: {
      question: {
        ...template,
        type: "SAQ",
        answer: "",
        rubric: [
          {
            criterion: "Reasoning",
            points: 1,
            guidance: "Explain accurately.",
          },
        ],
      },
      response: "A real response",
    },
  });
  assert.equal(fallback.status(), 503);
  // Mock the adapter boundary to verify the successful AI UI and immutable revisions.
  await nav("Dashboard");
  await page.route("**/api/grade", async (route) => {
    if (route.request().method() === "GET") {
      await route.fulfill({ json: { available: true, provider: "Gemini" } });
      return;
    }
    const body = route.request().postDataJSON();
    const breakdown = body.question.rubric.map((r, i) => ({
      criterion: r.criterion,
      points: i === 0 ? 1 : 0,
      max: r.points,
      evidence: i === 0 ? "Seasonal monsoon winds" : "",
      missing: i === 0 ? "" : "Expand the explanation.",
      suggestion: "Explain the causal mechanism.",
    }));
    await route.fulfill({
      json: {
        label: "Gemini estimate — unofficial, not an AP score",
        provider: "gemini",
        model: "test-only",
        points: breakdown.map((r) => r.points),
        breakdown,
        feedback: "Relevant evidence with room to improve.",
        improvements: "Explain the causal mechanism.",
        example: "A stronger original response.",
      },
    });
  });
  await nav("FRQ Grading");
  await page.getByRole("button", { name: "Get Gemini estimate" }).waitFor();
  await page
    .getByLabel("Your response", { exact: true })
    .fill("Seasonal monsoon winds made travel predictable.");
  await page.getByRole("button", { name: "Get Gemini estimate" }).click();
  await page
    .getByText("Relevant evidence with room to improve.", { exact: true })
    .waitFor();
  let aiState = await page.evaluate(() =>
    JSON.parse(localStorage.getItem("studycraft.v1")),
  );
  assert.equal(aiState.gradingHistory.at(-1).estimate.provider, "gemini");
  const previous = aiState.gradingHistory.at(-1).id;
  await page
    .getByLabel("Your response", { exact: true })
    .fill(
      "Seasonal monsoon winds made travel predictable. Merchants planned departures.",
    );
  await page.getByRole("button", { name: "Get Gemini estimate" }).click();
  await page.getByRole("button", { name: "Review saved" }).waitFor();
  aiState = await page.evaluate(() =>
    JSON.parse(localStorage.getItem("studycraft.v1")),
  );
  assert.equal(aiState.gradingHistory.at(-1).previousId, previous);
  assert.ok(
    aiState.attempts.at(-1).results.every((r) => r.gradingMethod === "gemini"),
  );
  await page.unroute("**/api/grade");
  await page.getByLabel("Toggle dark mode").click();
  await page.reload();
  await page.locator(".app-shell.dark").waitFor();
  await nav("Dashboard");
  await page.getByLabel("Goal name").fill("Solve 20 questions");
  await page.getByLabel("Goal question target").fill("20");
  await page.getByRole("button", { name: "Add goal", exact: true }).click();
  await page.getByText("Solve 20 questions", { exact: true }).waitFor();
  await nav("Subjects");
  await page
    .locator(".course-card")
    .filter({ hasText: "AP World History" })
    .click();
  assert.equal(await page.locator(".unit-card").count(), 9);
  await page
    .getByLabel("AP World historical mode", { exact: true })
    .selectOption("expanded");
  assert.equal(await page.locator(".unit-card").count(), 10);
  await page
    .locator(".unit-card")
    .filter({ hasText: "600" })
    .getByRole("button", { name: "Study unit" })
    .click();
  await page.getByRole("button", { name: "Mark notes read" }).click();
  await page
    .getByLabel("AP World historical mode", { exact: true })
    .selectOption("standard");
  assert.equal(await page.locator(".unit-card").count(), 9);
  const preserved = await page.evaluate(() =>
    JSON.parse(localStorage.getItem("studycraft.v1")),
  );
  assert.equal(preserved.completedLessons.length, 1);
  assert.ok(preserved.gradingHistory.length);
  assert.equal(preserved.attempts.length, 4);
  await nav("Practice Exams");
  await page.getByRole("button", { name: "Customize exam" }).first().click();
  assert.equal(
    await page
      .locator("select")
      .filter({
        has: page.locator("option:checked", { hasText: "Exam Simulation" }),
      })
      .count(),
    1,
  );

  // Exam feedback stays hidden, then the total timer submits unanswered work.
  await page.getByLabel("Question count", { exact: true }).fill("2");
  await page.getByLabel("Minutes in total", { exact: false }).fill("0.25");
  await page.clock.install();
  await page.getByRole("button", { name: "Start practicing" }).click();
  assert.equal(
    await page.getByRole("button", { name: "Check answer" }).count(),
    0,
  );
  await page.clock.fastForward(16000);
  await page
    .getByText("You showed up. That matters.", { exact: true })
    .waitFor();
  assert.equal(
    (
      await page.evaluate(
        () => JSON.parse(localStorage.getItem("studycraft.v1")).attempts,
      )
    ).at(-1).questions.length,
    2,
  );
  // A per-question timer advances exactly once and gives each question its own allowance.
  await nav("Quiz Builder");
  await page.getByLabel("Question count", { exact: true }).fill("2");
  await page
    .locator("label")
    .filter({ hasText: /^Time limit/ })
    .locator("select")
    .selectOption("Per question");
  await page.getByLabel("Minutes per question", { exact: false }).fill("0.25");
  await page.getByRole("button", { name: "Start practicing" }).click();
  const field = page
    .locator(".practice-layout textarea,.practice-layout input")
    .first();
  if (await field.count()) {
    await field.fill("draft response");
    await nav("Dashboard");
    await nav("Practice");
    assert.equal(await field.inputValue(), "draft response");
  }
  await page.clock.fastForward(16000);
  await page.getByText("QUESTION 2 OF 2", { exact: true }).waitFor();
  assert.equal(
    await page
      .getByText("You showed up. That matters.", { exact: true })
      .count(),
    0,
  );
  await page.clock.fastForward(16000);
  await page
    .getByText("You showed up. That matters.", { exact: true })
    .waitFor();

  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByLabel("Open navigation").click();
  await nav("Dashboard");
  assert.ok(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  );
  await page.screenshot({ path: ".sites-runtime/mobile.png", fullPage: true });
  assert.deepEqual(errors, []);
  console.log(
    "PASS: browser multi-topic quiz, shortage, grading, preset, persistence, JSON/CSV import/export, manual creation, validation, FRQ fallback/review, goals, exam settings, dark mode, mobile layout; no uncaught errors.",
  );
} catch (e) {
  console.log("Browser errors:", errors);
  console.log((await page.locator("body").innerText()).slice(0, 5000));
  await page.screenshot({ path: ".sites-runtime/failure.png", fullPage: true });
  throw e;
} finally {
  await browser.close();
}
