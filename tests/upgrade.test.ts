import assert from "node:assert/strict";
import {
  courseSubjects,
  questionBank,
  unitLessons,
} from "../lib/study/catalog";
import { bank as legacyBank } from "../lib/study/bank";
import { currentQuestion } from "../lib/study/course-mapping";
import {
  matching,
  grade,
  reviewDue,
  difficultyStats,
} from "../lib/study/engine";
import { validateQuestions, importFile, exportCSV } from "../lib/study/import";
import { emptyStore, normalizeStore } from "../lib/study/storage";
import { defaultConfig, type Attempt } from "../lib/study/types";
assert.equal(questionBank.length, 2000);
assert.ok(questionBank.every(q => q.id.startsWith("noted-new-2026-") && q.source === "Preloaded"));
assert.equal(new Set(questionBank.map((q) => q.id)).size, questionBank.length);
assert.equal(new Set(unitLessons.map((l) => l.id)).size, unitLessons.length);
validateQuestions(questionBank, "Preloaded");
for (const s of courseSubjects()) {
  const qs = questionBank.filter(
    (q) => q.subject === s.id && q.scope !== "background",
  );
  assert.ok(qs.length >= 75, `${s.id}: only ${qs.length} questions`);
  for (const d of ["Easy", "Medium"])
    assert.ok(
      qs.some((q) => q.difficulty === d),
      `${s.id} needs ${d}`,
    );
  for (const u of s.units) {
    for (const q of qs.filter(q => q.unit === u.name)) assert.ok(u.topics.includes(q.topic));
    const lesson = unitLessons.find(
      (l) =>
        l.subject === s.id && l.unit === u.name && l.scope !== "background",
    );
    if (!lesson) {
      assert.ok(qs.some(q => q.unit === u.name), `${s.id}: new unit must have practice`);
      continue;
    }
    assert.ok(
      lesson.topics.every((t) => t.lesson.length > 150 && t.subtopics.length),
    );
    assert.ok(
      lesson.vocabulary.length &&
        lesson.concepts.length &&
        lesson.workedExamples.length &&
        lesson.misconceptions.length,
    );
  }
}
for (const q of questionBank.filter((q) => !q.rubric))
  assert.equal(grade(q, q.answer).correct, true, q.id);
for (const q of questionBank.filter(
  (q) => q.id.includes("-v2-") && q.scope !== "extension",
)) {
  const lesson = unitLessons.find(
    (l) =>
      l.subject === q.subject &&
      l.unit === q.unit &&
      (q.scope === "background"
        ? l.scope === "background"
        : l.scope !== "background"),
  );
  const topic = lesson?.topics.find((t) => t.name === q.topic);
  assert.ok(
    topic,
    `${q.id}: question topic must link to its lesson (${q.topic})`,
  );
  assert.ok(
    topic.subtopics.includes(q.subtopic),
    `${q.id}: missing subtopic ${q.subtopic}`,
  );
}
const standard = matching(
    questionBank,
    { ...defaultConfig, subjects: ["world"], worldMode: "standard" },
    [],
  ),
  expanded = matching(
    questionBank,
    { ...defaultConfig, subjects: ["world"], worldMode: "expanded" },
    [],
  );
assert.equal(expanded.length, standard.length);
assert.ok(standard.every((q) => q.scope !== "background"));
assert.ok(expanded.every(q => q.scope === "standard"));
const regional = matching(
  questionBank,
  {
    ...defaultConfig,
    subjects: ["world"],
    periods: ["1200–1450"],
    regions: ["East Asia", "Africa"],
    skills: ["Comparison", "Causation"],
  },
  [],
);
assert.equal(regional.length, 0); // Supplied questions carry no regional/period/skill tags.
assert.ok(
  regional.every(
    (q) =>
      q.tags.includes("1200–1450") &&
      ["East Asia", "Africa"].some((t) => q.tags.includes(t)) &&
      ["Comparison", "Causation"].some((t) => q.tags.includes(t)),
  ),
);
assert.equal(
  matching(
    questionBank,
    { ...defaultConfig, flaggedOnly: true },
    [],
    undefined,
    [questionBank[0].id],
  ).length,
  1,
);
const collection = questionBank.at(-1)!.collection;
assert.ok(
  matching(
    questionBank,
    { ...defaultConfig, collections: [collection] },
    [],
  ).every((q) => q.collection === collection),
);
const old: Attempt = {
  id: "before-upgrade",
  date: "2026-09-01T10:00:00.000Z",
  seconds: 120,
  questions: [legacyBank.find((q) => q.id === "stats-7")!],
  results: [
    grade(
      legacyBank.find((q) => q.id === "stats-7")!,
      "wrong",
    ),
  ],
  config: {
    ...defaultConfig,
    subjects: ["stats"],
    units: [legacyBank.find((q) => q.id === "stats-7")!.unit],
  },
};
const saved = {
  ...emptyStore,
  attempts: [old],
  presets: [old.config],
  hidden: ["sat-1"],
  flags: ["world-1"],
  custom: [{ ...legacyBank[0], id: "my-question", source: "Custom" as const }],
};
const restored = normalizeStore(JSON.parse(JSON.stringify(saved)));
assert.deepEqual(restored.attempts, JSON.parse(JSON.stringify([old])));
assert.deepEqual(restored.presets, saved.presets);
assert.deepEqual(restored.hidden, saved.hidden);
assert.equal(restored.custom[0].id, "my-question");
assert.ok(
  !questionBank.some((q) => q.id === "stats-7"),
);
assert.equal(
  currentQuestion(old.questions[0]).unit,
  courseSubjects().find((s) => s.id === "stats")!.units[3].name,
);
assert.throws(() =>
  normalizeStore({
    ...saved,
    attempts: [{ ...old, results: [{ response: 4 }] }],
  }),
);
const special = {
  ...questionBank[0],
  id: "alternate",
  type: "Short answer" as const,
  answer: "a factor",
  acceptedAnswers: ["factor"],
  scope: "extension" as const,
};
assert.equal(grade(special, " FACTOR ").correct, true);
const roundtrip = importFile(exportCSV([special]), "special.csv")[0];
assert.deepEqual(roundtrip.acceptedAnswers, ["factor"]);
assert.equal(roundtrip.scope, "extension");
const correct = {
  ...old,
  results: [grade(old.questions[0], old.questions[0].answer)],
};
assert.equal(
  reviewDue(
    old.questions[0].id,
    [correct],
    Date.parse(old.date) + 2 * 86400000,
  ),
  false,
);
assert.equal(
  reviewDue(
    old.questions[0].id,
    [correct],
    Date.parse(old.date) + 4 * 86400000,
  ),
  true,
);
assert.equal(
  difficultyStats([old]).reduce((n, d) => n + d.total, 0),
  1,
);
console.log(
  `PASS: ${questionBank.length} replacement questions, ${unitLessons.length} substantive unit lessons; all seven subject targets, filters, World modes, answer acceptance, migration, backups, alternate answers, CSV, and spaced review.`,
);
