import assert from "node:assert/strict";
import { bank } from "../lib/study/bank";
import { subjects } from "../lib/study/subjects";
import {
  accuracy,
  generate,
  grade,
  matching,
  topicStats,
} from "../lib/study/engine";
import { exportCSV, importFile, validateQuestions } from "../lib/study/import";
import { defaultConfig, type Attempt } from "../lib/study/types";
import { emptyStore, repository } from "../lib/study/storage";
import { configuredProvider } from "../lib/study/ai.server";
const validated = validateQuestions(bank, "Preloaded");
assert.equal(validated.length, 84);
for (const s of subjects) {
  assert.equal(bank.filter((q) => q.subject === s.id).length, 12);
  for (const u of s.units)
    assert.ok(
      bank.some((q) => q.subject === s.id && q.unit === u.name),
      `${s.name}: ${u.name} missing`,
    );
}
const config = {
  ...defaultConfig,
  subjects: ["sat", "amc"],
  topics: ["Algebra", "Equations"],
  types: ["Numerical"],
  count: 4,
};
const matches = matching(bank, config, []);
assert.equal(matches.length, 4);
assert.ok(
  matches.every(
    (q) =>
      ["sat", "amc"].includes(q.subject) &&
      ["Algebra", "Equations"].includes(q.topic) &&
      q.type === "Numerical",
  ),
);
const quiz = generate(matches, 4, () => 0.5);
assert.equal(new Set(quiz.map((q) => q.id)).size, 4);
assert.throws(() => generate(matches, 5), /Only 4/);
assert.throws(() => generate(matches, 0));
assert.equal(matching(bank, { ...config, units: ["Geometry"] }, []).length, 0);
assert.ok(
  matching(
    bank,
    { ...defaultConfig, subjects: ["world"], tags: ["1200–1450", "East Asia"] },
    [],
  ).every((q) => q.tags.includes("1200–1450") && q.tags.includes("East Asia")),
);
for (const q of bank.filter((q) => !q.rubric))
  assert.equal(
    grade(q, q.answer).correct,
    true,
    `${q.id} reference answer not accepted`,
  );
const fraction = bank.find((q) => q.id === "amc-8")!;
assert.equal(grade(fraction, "0.1666666667").correct, true);
assert.equal(grade(fraction, "1/0").correct, false);
assert.equal(grade(fraction, "").correct, false);
assert.equal(grade(fraction, "not a number").correct, false);
const select = bank.find((q) => q.type === "Multiple select")!;
assert.equal(
  grade(select, select.answer.split("|").reverse().join("|")).correct,
  true,
);
assert.equal(grade(select, select.options![0]).correct, false);
const frq = bank.find((q) => q.type === "FRQ")!;
assert.equal(grade(frq, "A response").correct, null);
assert.equal(
  grade(
    frq,
    "A response",
    frq.rubric!.map((r) => r.points),
  ).correct,
  true,
);
assert.equal(grade(frq, "A response", [100, -1]).points, frq.rubric![0].points);
const attempt: Attempt = {
  id: "test",
  date: new Date().toISOString(),
  seconds: 60,
  questions: [quiz[0], quiz[1], frq],
  results: [
    grade(quiz[0], quiz[0].answer),
    grade(quiz[1], "wrong"),
    grade(frq, "Written answer"),
  ],
  config,
};
assert.deepEqual(accuracy([attempt]), { answered: 2, correct: 1, percent: 50 });
assert.equal(
  matching(bank, { ...defaultConfig, mode: "Incorrect Questions" }, [
    attempt,
  ])[0].id,
  quiz[1].id,
);
assert.ok(
  !matching(bank, { ...defaultConfig, mode: "Spaced Repetition" }, [
    attempt,
  ]).some((q) => q.id === quiz[0].id),
);
assert.ok(
  matching(
    bank,
    { ...defaultConfig, mode: "Spaced Repetition" },
    [attempt],
    Date.now() + 4 * 86400000,
  ).some((q) => q.id === quiz[0].id),
);
assert.equal(
  topicStats([attempt]).reduce((s, t) => s + t.total, 0),
  2,
);
const json = importFile(JSON.stringify(bank), "questions.json");
assert.equal(json.length, 84);
const csv = importFile(exportCSV(bank), "questions.csv");
assert.equal(csv.length, 84);
assert.equal(
  csv.find((q) => q.id === "world-12")!.prompt,
  bank.find((q) => q.id === "world-12")!.prompt,
);
assert.deepEqual(
  csv.find((q) => q.type === "Java")!.rubric,
  bank.find((q) => q.type === "Java")!.rubric,
);
assert.throws(
  () => importFile('[{"prompt":"Invalid"}]', "invalid.json"),
  /Question 1/,
);
assert.throws(
  () => importFile('prompt,subject\n"unclosed,sat', "bad.csv"),
  /Unclosed/,
);
assert.throws(
  () => validateQuestions([{ ...bank[0], answer: "bad" }]),
  /numerical/,
);
assert.throws(
  () =>
    validateQuestions([
      { ...bank.find((q) => q.type === "MCQ"), answer: "not an option" },
    ]),
  /match the options/,
);
assert.throws(
  () =>
    validateQuestions([
      { ...frq, rubric: [{ criterion: "bad", points: -1, guidance: "" }] },
    ]),
  /positive/,
);
const memory = new Map<string, string>();
Object.defineProperty(globalThis, "localStorage", {
  value: {
    getItem: (k: string) => memory.get(k) ?? null,
    setItem: (k: string, v: string) => memory.set(k, v),
  },
});
repository.save({
  ...emptyStore,
  attempts: [attempt],
  custom: [bank[0]],
  presets: [config],
});
assert.equal(repository.load().attempts[0].results[0].correct, true);
assert.equal(repository.load().presets[0].count, 4);
delete process.env.GRADING_PROVIDER_URL;
delete process.env.GRADING_PROVIDER_KEY;
assert.equal(configuredProvider(), null);
console.log(
  "PASS: content, compound filters, shortages, grading, review modes, JSON/CSV roundtrips, validation, persistence, provider fallback.",
);
