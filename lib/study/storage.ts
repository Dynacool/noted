import type { Store } from "./types";
import { validateQuestions } from "./import";
export const STORAGE_KEY = "studycraft.v1";
export const emptyStore: Store = {
  version: 1,
  custom: [],
  hidden: [],
  subjects: [],
  attempts: [],
  presets: [],
  flags: [],
  goals: [],
  dark: false,
  dailyTarget: 20,
  worldMode: "standard",
  completedLessons: [],
  gradingHistory: [],
};
// Replace this adapter with a cloud repository without changing quiz or grading logic.
export const repository = {
  load(): Store {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return structuredClone(emptyStore);
    const s = JSON.parse(raw);
    if (
      s.version !== 1 ||
      !Array.isArray(s.attempts) ||
      !Array.isArray(s.custom)
    )
      throw new Error(
        "Saved data has an unsupported format. Export your browser data before resetting.",
      );
    return normalizeStore(s);
  },
  save(data: Store) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  },
};
export function normalizeStore(value: unknown): Store {
  if (!value || typeof value !== "object")
    throw new Error("Backup must be a saved Noted workspace.");
  const s = value as Store;
  if (
    s.version !== 1 ||
    !Array.isArray(s.custom) ||
    !Array.isArray(s.attempts) ||
    !Array.isArray(s.presets) ||
    !Array.isArray(s.subjects) ||
    !Array.isArray(s.hidden) ||
    !Array.isArray(s.flags) ||
    !Array.isArray(s.goals)
  )
    throw new Error(
      "The saved workspace has an unsupported format. Existing data has not been changed.",
    );
  if (
    s.attempts.some(
      (a) =>
        !a ||
        !Array.isArray(a.questions) ||
        !Array.isArray(a.results) ||
        typeof a.date !== "string" ||
        !a.config,
    )
  )
    throw new Error(
      "An attempt in this backup is invalid. Existing data has not been changed.",
    );
  const fail = () => {
    throw new Error(
      "This backup contains invalid records. Existing data has not been changed.",
    );
  };
  const configValid = (c: Store["presets"][number]) =>
    c &&
    [
      "subjects",
      "units",
      "topics",
      "subtopics",
      "types",
      "difficulties",
      "tags",
    ].every(
      (k) =>
        Array.isArray(c[k as keyof typeof c]) &&
        (c[k as keyof typeof c] as unknown[]).every(
          (v) => typeof v === "string",
        ),
    ) &&
    Number.isInteger(c.count) &&
    c.count > 0 &&
    typeof c.mode === "string" &&
    typeof c.timeMode === "string" &&
    typeof c.source === "string";
  if (s.custom.length) validateQuestions(s.custom);
  if (
    s.presets.some((c) => !configValid(c)) ||
    s.hidden.some((v) => typeof v !== "string") ||
    s.flags.some((v) => typeof v !== "string") ||
    typeof s.dark !== "boolean" ||
    !Number.isFinite(s.dailyTarget) ||
    s.dailyTarget < 1
  )
    fail();
  if (
    s.subjects.some(
      (v) =>
        !v ||
        typeof v.id !== "string" ||
        typeof v.name !== "string" ||
        typeof v.short !== "string" ||
        typeof v.color !== "string" ||
        !Array.isArray(v.units) ||
        v.units.some(
          (u) =>
            typeof u.name !== "string" ||
            !Array.isArray(u.topics) ||
            u.topics.some((t) => typeof t !== "string"),
        ),
    )
  )
    fail();
  if (
    s.goals.some(
      (g) =>
        !g ||
        typeof g.id !== "string" ||
        typeof g.name !== "string" ||
        !Number.isFinite(g.target) ||
        g.target < 1 ||
        typeof g.deadline !== "string",
    )
  )
    fail();
  for (const a of s.attempts) {
    if (
      !configValid(a.config) ||
      typeof a.id !== "string" ||
      !Number.isFinite(Date.parse(a.date)) ||
      !Number.isFinite(a.seconds) ||
      a.seconds < 0
    )
      fail();
    if (a.questions.length) validateQuestions(a.questions);
    if (
      a.results.some(
        (r) =>
          !r ||
          !a.questions.some((q) => q.id === r.questionId) ||
          typeof r.response !== "string" ||
          ![true, false, null].includes(r.correct) ||
          !Number.isFinite(r.points) ||
          !Number.isFinite(r.max),
      )
    )
      fail();
  }
  if (
    s.completedLessons !== undefined &&
    (!Array.isArray(s.completedLessons) ||
      s.completedLessons.some((v) => typeof v !== "string"))
  )
    fail();
  if (s.gradingHistory !== undefined) {
    if (!Array.isArray(s.gradingHistory)) fail();
    for (const r of s.gradingHistory!) {
      if (
        !r ||
        typeof r.id !== "string" ||
        typeof r.response !== "string" ||
        !r.question?.rubric ||
        !r.estimate ||
        (r.estimate.strictness !== undefined && !["lenient", "standard", "strict"].includes(r.estimate.strictness)) ||
        !["gemini", "manual"].includes(r.estimate.provider) ||
        !Array.isArray(r.estimate.breakdown) ||
        !Array.isArray(r.estimate.points) ||
        r.estimate.points.length !== r.question.rubric.length ||
        typeof r.estimate.feedback !== "string" ||
        typeof r.estimate.improvements !== "string" ||
        typeof r.estimate.example !== "string"
      )
        fail();
      for (const items of [r.estimate.strengths, r.estimate.errors, r.estimate.uncertainties]) {
        if (items !== undefined && (!Array.isArray(items) || items.some(item => typeof item !== "string"))) fail();
      }
      if ((r.estimate.totalScore !== undefined && r.estimate.totalScore !== r.estimate.points.reduce((sum, point) => sum + point, 0)) ||
          (r.estimate.maxScore !== undefined && r.estimate.maxScore !== r.question.rubric!.reduce((sum, row) => sum + row.points, 0))) fail();
      validateQuestions([r.question]);
      if (
        typeof r.date !== "string" ||
        !Number.isFinite(Date.parse(r.date)) ||
        typeof r.estimate.label !== "string" ||
        r.estimate.breakdown.length !== r.question.rubric!.length ||
        r.estimate.points.some(
          (p, i) =>
            !Number.isInteger(p) || p < 0 || p > r.question.rubric![i].points,
        ) ||
        r.estimate.breakdown.some(
          (b, i) =>
            !b ||
            b.points !== r.estimate.points[i] || b.max !== r.question.rubric![i].points ||
            (b.explanation !== undefined && typeof b.explanation !== "string") ||
            ["criterion", "evidence", "missing", "suggestion"].some(
              (k) => typeof b[k as keyof typeof b] !== "string",
            ) ||
            !Number.isFinite(b.points) ||
            !Number.isFinite(b.max),
        )
      )
        fail();
    }
  }
  return {
    ...structuredClone(emptyStore),
    ...s,
    completedLessons: s.completedLessons ?? [],
    gradingHistory: s.gradingHistory ?? [],
    worldMode: s.worldMode === "expanded" ? "expanded" : "standard",
  };
}
