import { questionTypes, type Question } from "./types";
export function validateQuestions(
  data: unknown,
  source: Question["source"] = "Imported",
): Question[] {
  if (!Array.isArray(data) || data.length === 0)
    throw new Error("Expected a nonempty array of question objects.");
  if (data.length > 5000)
    throw new Error("Import at most 5,000 questions at a time.");
  const ids = new Set<string>();
  return data.map((value, i) => {
    const q = value as Question;
    const fail = (msg: string): never => {
      throw new Error(`Question ${i + 1}: ${msg}`);
    };
    if (!q || typeof q !== "object") fail("must be an object.");
    for (const k of [
      "subject",
      "unit",
      "topic",
      "prompt",
      "explanation",
      "hint",
    ] as const)
      if (typeof q[k] !== "string" || !q[k].trim())
        fail(`${k} must be a nonempty string.`);
    if (!questionTypes.includes(q.type)) fail("unsupported question type.");
    if (!["Easy", "Medium", "Hard"].includes(q.difficulty))
      fail("difficulty must be Easy, Medium, or Hard.");
    if (typeof q.answer !== "string") fail("answer must be a string.");
    if (
      q.scope !== undefined &&
      !["standard", "background", "extension"].includes(q.scope)
    )
      fail("scope must be standard, background, or extension.");
    if (
      q.acceptedAnswers !== undefined &&
      (!Array.isArray(q.acceptedAnswers) ||
        q.acceptedAnswers.some((a) => typeof a !== "string" || !a.trim()))
    )
      fail("acceptedAnswers must be an array of nonempty strings.");
    for (const key of ["id", "subtopic", "collection", "example"] as const)
      if (q[key] !== undefined && typeof q[key] !== "string")
        fail(`${key} must be a string.`);
    if (q.type === "Short answer" && !q.answer.trim())
      fail("short-answer questions need a nonempty reference answer.");
    if (["MCQ", "Multiple select"].includes(q.type)) {
      if (
        !Array.isArray(q.options) ||
        q.options.length < 2 ||
        q.options.some((o) => typeof o !== "string" || !o.trim()) ||
        new Set(q.options).size !== q.options.length
      )
        fail("provide at least two distinct answer options.");
      if (
        q.type === "MCQ"
          ? !q.options!.includes(q.answer)
          : !q.answer.split("|").every((a) => q.options!.includes(a))
      )
        fail(
          "answer must match the options exactly (use | for multiple select).",
        );
      if (
        q.type === "Multiple select" &&
        q.options!.some((o) => o.includes("|"))
      )
        fail(
          "Multiple-select options cannot contain |; describe a logical OR in words.",
        );
      if (
        q.type === "Multiple select" &&
        new Set(q.answer.split("|")).size !== q.answer.split("|").length
      )
        fail("correct options must not be repeated.");
    }
    if (
      q.type === "Numerical" &&
      !/^[-+]?\d*\.?\d+(?:e[-+]?\d+|\s*\/\s*[-+]?\d*\.?\d+)?$/i.test(
        q.answer.trim(),
      )
    )
      fail("provide a valid numerical answer or fraction.");
    if (q.type === "Numerical") {
      const parts = q.answer.split("/").map(Number);
      const value = parts.length === 2 ? parts[0] / parts[1] : parts[0];
      if (!Number.isFinite(value))
        fail(
          "numerical answers must be finite; a fraction cannot have a zero denominator.",
        );
    }
    if (
      ["SAQ", "DBQ", "LEQ", "FRQ", "Java"].includes(q.type) &&
      (!Array.isArray(q.rubric) || !q.rubric.length)
    )
      fail("written responses require a scoring rubric.");
    if (
      q.rubric &&
      (!Array.isArray(q.rubric) ||
        q.rubric.some(
          (r) =>
            !r ||
            typeof r.criterion !== "string" ||
            !r.criterion.trim() ||
            !Number.isInteger(r.points) ||
            r.points < 1 ||
            typeof r.guidance !== "string",
        ))
    )
      fail(
        "each rubric criterion needs text, positive integer points, and guidance.",
      );
    if (
      q.tags &&
      (!Array.isArray(q.tags) || q.tags.some((t) => typeof t !== "string"))
    )
      fail("tags must be an array of strings.");
    if (
      q.tolerance !== undefined &&
      (!Number.isFinite(q.tolerance) || q.tolerance < 0)
    )
      fail("tolerance must be a nonnegative number.");
    const id = q.id || crypto.randomUUID();
    if (ids.has(id)) fail("duplicate ID in import.");
    ids.add(id);
    return {
      ...q,
      id,
      source,
      subtopic: q.subtopic || q.topic,
      tags: q.tags ?? [],
      collection: q.collection || "Imported set",
    };
  });
}
export function parseCSV(text: string): Record<string, string>[] {
  const rows: string[][] = [];
  let row: string[] = [],
    cell = "",
    quoted = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (c === '"') {
      if (quoted && text[i + 1] === '"') {
        cell += '"';
        i++;
      } else if (quoted) {
        quoted = false;
      } else if (cell === "") {
        quoted = true;
      } else throw new Error("Unexpected quotation mark in CSV.");
    } else if (c === "," && !quoted) {
      row.push(cell);
      cell = "";
    } else if ((c === "\n" || c === "\r") && !quoted) {
      if (c === "\r" && text[i + 1] === "\n") i++;
      row.push(cell);
      if (row.some(Boolean)) rows.push(row);
      row = [];
      cell = "";
    } else cell += c;
  }
  if (quoted) throw new Error("Unclosed quoted CSV field.");
  if (cell || row.length) {
    row.push(cell);
    rows.push(row);
  }
  const headers = rows.shift();
  if (!headers) throw new Error("CSV is empty.");
  headers[0] = headers[0].replace(/^\uFEFF/, "");
  if (new Set(headers).size !== headers.length)
    throw new Error("Duplicate CSV headers.");
  return rows.map((r, i) => {
    if (r.length !== headers.length)
      throw new Error(
        `CSV row ${i + 2}: expected ${headers.length} columns, found ${r.length}.`,
      );
    return Object.fromEntries(headers.map((h, j) => [h.trim(), r[j]]));
  });
}
export function importFile(text: string, filename: string) {
  if (filename.toLowerCase().endsWith(".csv"))
    return validateQuestions(
      parseCSV(text).map((q) => ({
        ...q,
        options: q.options ? JSON.parse(q.options) : undefined,
        tags: q.tags ? JSON.parse(q.tags) : [],
        rubric: q.rubric ? JSON.parse(q.rubric) : undefined,
        tolerance: q.tolerance ? Number(q.tolerance) : undefined,
        acceptedAnswers: q.acceptedAnswers
          ? JSON.parse(q.acceptedAnswers)
          : undefined,
        scope: q.scope || undefined,
        legacyUnit: q.legacyUnit || undefined,
      })),
    );
  return validateQuestions(JSON.parse(text));
}
export function exportCSV(questions: Question[]) {
  const headers = [
    "id",
    "subject",
    "unit",
    "topic",
    "subtopic",
    "difficulty",
    "type",
    "prompt",
    "options",
    "answer",
    "explanation",
    "hint",
    "tags",
    "collection",
    "rubric",
    "example",
    "tolerance",
    "acceptedAnswers",
    "scope",
    "legacyUnit",
  ];
  const quote = (s: string) => '"' + s.replace(/"/g, '""') + '"';
  return [
    headers.join(","),
    ...questions.map((q) =>
      headers
        .map((h) => {
          const v = q[h as keyof Question];
          return quote(
            v === undefined
              ? ""
              : typeof v === "object"
                ? JSON.stringify(v)
                : String(v),
          );
        })
        .join(","),
    ),
  ].join("\r\n");
}
