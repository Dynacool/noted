import type { Attempt, Config, Question, Result } from "./types";
export function matching(
  bank: Question[],
  config: Config,
  attempts: Attempt[],
  now = Date.now(),
) {
  const latest = new Map<string, { correct: boolean | null; date: string }>();
  attempts.forEach((a) =>
    a.results.forEach((r) =>
      latest.set(r.questionId, { correct: r.correct, date: a.date }),
    ),
  );
  return bank.filter(
    (q) =>
      (!config.subjects.length || config.subjects.includes(q.subject)) &&
      (!config.units.length || config.units.includes(q.unit)) &&
      (!config.topics.length || config.topics.includes(q.topic)) &&
      (!config.subtopics.length || config.subtopics.includes(q.subtopic)) &&
      (!config.types.length || config.types.includes(q.type)) &&
      (!config.difficulties.length ||
        config.difficulties.includes(q.difficulty)) &&
      (!config.tags.length || config.tags.every((t) => q.tags.includes(t))) &&
      (config.source === "Mixed" || q.source === config.source) &&
      (config.mode !== "Incorrect Questions" ||
        latest.get(q.id)?.correct === false) &&
      (config.mode !== "Spaced Repetition" ||
        !latest.has(q.id) ||
        latest.get(q.id)?.correct === false ||
        now - Date.parse(latest.get(q.id)!.date) >= 3 * 86400000),
  );
}
export function generate(
  questions: Question[],
  count: number,
  random = Math.random,
) {
  if (!Number.isInteger(count) || count < 1 || count > 500)
    throw new Error("Choose 1–500 questions.");
  if (questions.length < count)
    throw new Error(
      `Only ${questions.length} questions match. Reduce the count or broaden your filters.`,
    );
  const copy = [...questions];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, count);
}
function numeric(value: string) {
  const cleaned = value.trim().replace(/,/g, "");
  if (/^[-+]?\d*\.?\d+\s*\/\s*[-+]?\d*\.?\d+$/.test(cleaned)) {
    const [a, b] = cleaned.split("/").map(Number);
    return b === 0 ? NaN : a / b;
  }
  return cleaned === "" ? NaN : Number(cleaned);
}
export function grade(
  q: Question,
  response: string,
  rubric?: number[],
): Result {
  if (q.rubric) {
    if (!rubric)
      return {
        questionId: q.id,
        response,
        correct: null,
        points: 0,
        max: q.rubric.reduce((s, r) => s + r.points, 0),
      };
    const earned = q.rubric.map((r, i) =>
      Math.max(0, Math.min(r.points, Math.floor(rubric[i] ?? 0))),
    );
    const max = q.rubric.reduce((s, r) => s + r.points, 0),
      points = earned.reduce((s, n) => s + n, 0);
    return {
      questionId: q.id,
      response,
      correct: points === max,
      points,
      max,
      rubric: earned,
    };
  }
  let correct = false;
  if (q.type === "Numerical") {
    const a = numeric(response),
      b = numeric(q.answer);
    correct =
      Number.isFinite(a) &&
      Number.isFinite(b) &&
      Math.abs(a - b) <= (q.tolerance ?? 0.00001);
  } else if (q.type === "Multiple select")
    correct =
      response.split("|").filter(Boolean).sort().join("|") ===
      q.answer.split("|").sort().join("|");
  else
    correct = response.trim().toLowerCase() === q.answer.trim().toLowerCase();
  return {
    questionId: q.id,
    response,
    correct,
    points: correct ? 1 : 0,
    max: 1,
  };
}
export function accuracy(attempts: Attempt[]) {
  const r = attempts
    .flatMap((a) => a.results)
    .filter((r) => r.correct !== null);
  return {
    answered: r.length,
    correct: r.filter((r) => r.correct).length,
    percent: r.length
      ? Math.round((100 * r.filter((r) => r.correct).length) / r.length)
      : 0,
  };
}
export function topicStats(attempts: Attempt[]) {
  const m = new Map<
    string,
    { topic: string; subject: string; total: number; correct: number }
  >();
  attempts.forEach((a) =>
    a.results.forEach((r) => {
      const q = a.questions.find((q) => q.id === r.questionId);
      if (!q || r.correct === null) return;
      const key = q.subject + ":" + q.topic;
      const v = m.get(key) ?? {
        topic: q.topic,
        subject: q.subject,
        total: 0,
        correct: 0,
      };
      v.total++;
      if (r.correct) v.correct++;
      m.set(key, v);
    }),
  );
  return [...m.values()].sort(
    (a, b) => a.correct / a.total - b.correct / b.total,
  );
}
