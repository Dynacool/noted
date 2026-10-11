"use client";
import { useEffect, useState } from "react";
import { ArrowRight, FileCheck2 } from "lucide-react";
import { grade } from "../../lib/study/engine";
import type { Estimate } from "../../lib/study/ai.server";
import {
  defaultConfig,
  type Question,
  type Store,
} from "../../lib/study/types";
import { MathText } from "./math-text";
export function FRQ({
  bank,
  store,
  onSave,
}: {
  bank: Question[];
  store: Store;
  onSave: (s: Store) => void;
}) {
  const written = bank.filter((q) => q.rubric?.length);
  const [id, setId] = useState(written[0]?.id ?? ""),
    [response, setResponse] = useState(""),
    [points, setPoints] = useState<number[]>([]),
    [available, setAvailable] = useState(false),
    [busy, setBusy] = useState(false),
    [error, setError] = useState(""),
    [estimate, setEstimate] = useState<Estimate | null>(null),
    [saved, setSaved] = useState(false);
  const q = written.find((q) => q.id === id) ?? written[0];
  const pending = store.attempts.flatMap((a) =>
    a.results
      .filter((r) => r.correct === null)
      .map((r) => ({
        attempt: a.id,
        result: r,
        question: a.questions.find((q) => q.id === r.questionId)!,
      })),
  );
  const [pendingId, setPendingId] = useState("");
  useEffect(() => {
    fetch("/api/grade")
      .then((r) => r.json())
      .then((d) =>
        setAvailable((d as { available: boolean }).available === true),
      )
      .catch(() => setAvailable(false));
  }, []);
  if (!q)
    return (
      <div className="panel empty">
        <FileCheck2 />
        <h2>No written questions yet</h2>
        <p>Create a question with a scoring rubric in Question Banks.</p>
      </div>
    );
  const max = q.rubric!.reduce((s, r) => s + r.points, 0),
    score = points.reduce((s, n) => s + n, 0);
  const clear = () => {
    setPoints([]);
    setEstimate(null);
    setSaved(false);
    setError("");
  };
  return (
    <>
      <div className="notice">
        {available
          ? "AI grading provides an estimate, not an official AP score."
          : "AI grading is unavailable — no provider is configured. Use the manual rubric below. No AI score will be generated."}{" "}
        Java code is not executed.
      </div>
      <div className="frq-grid">
        <section className="panel">
          <div className="eyebrow">WRITE. REFLECT. REVISE.</div>
          <h2>Give your reasoning room.</h2>
          {pending.length > 0 && (
            <label>
              Continue an unreviewed response
              <select
                aria-label="Unreviewed response"
                value={pendingId}
                onChange={(e) => {
                  setPendingId(e.target.value);
                  const p = pending.find(
                    (p) =>
                      `${p.attempt}:${p.result.questionId}` === e.target.value,
                  );
                  if (p) {
                    setId(p.question.id);
                    setResponse(p.result.response);
                    clear();
                  }
                }}
              >
                <option value="">Choose a response</option>
                {pending
                  .filter((p) => written.some((q) => q.id === p.question.id))
                  .map((p) => (
                    <option
                      key={`${p.attempt}:${p.result.questionId}`}
                      value={`${p.attempt}:${p.result.questionId}`}
                    >
                      {p.question.topic} ·{" "}
                      {new Date(
                        store.attempts.find((a) => a.id === p.attempt)!.date,
                      ).toLocaleDateString()}
                    </option>
                  ))}
              </select>
            </label>
          )}
          <label>
            Question
            <select
              aria-label="FRQ question"
              value={q.id}
              onChange={(e) => {
                setId(e.target.value);
                setResponse("");
                setPendingId("");
                clear();
              }}
            >
              {written.map((q) => (
                <option key={q.id} value={q.id}>
                  {q.unit} · {q.type} · {q.topic}
                </option>
              ))}
            </select>
          </label>
          <div className="question-text frq-prompt">
            <MathText text={q.prompt} />
          </div>
          <label>
            Your response
            <textarea
              rows={13}
              className={q.type === "Java" ? "code-input" : ""}
              value={response}
              onChange={(e) => {
                setResponse(e.target.value);
                clear();
              }}
              placeholder="Show your work. Make your argument. Explain your reasoning."
            />
          </label>
          <div className="flex-row">
            <button
              className="primary"
              disabled={!response.trim() || busy}
              onClick={async () => {
                if (!available) {
                  setError(
                    "AI grading is unavailable. Award points manually using the rubric to the right.",
                  );
                  return;
                }
                setBusy(true);
                setError("");
                try {
                  const r = await fetch("/api/grade", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ question: q, response }),
                  });
                  const d = (await r.json()) as Estimate & { error?: string };
                  if (!r.ok) throw new Error(d.error);
                  setEstimate(d);
                  setPoints(d.points);
                } catch (e) {
                  setError(
                    e instanceof Error ? e.message : "Grading unavailable.",
                  );
                } finally {
                  setBusy(false);
                }
              }}
            >
              {busy
                ? "Reviewing…"
                : available
                  ? "Get AI estimate"
                  : "Review with manual rubric"}
              <ArrowRight size={16} />
            </button>
          </div>
          {error && (
            <p className="notice" role="status">
              {error}
            </p>
          )}
          {estimate && (
            <div className="answer-feedback">
              <strong>{estimate.label}</strong>
              <p>{estimate.feedback}</p>
              <h3>How to improve</h3>
              <p>{estimate.improvements}</p>
              <h3>Stronger response</h3>
              <MathText text={estimate.example} />
            </div>
          )}
        </section>
        <aside className="panel rubric-panel">
          <span className="eyebrow">QUESTION-SPECIFIC RUBRIC</span>
          <h2>
            {score} <span className="muted">/ {max} points</span>
          </h2>
          <p className="small muted">
            {estimate
              ? "AI estimate. Review each criterion before saving."
              : "Manual self-assessment. Award points only when your response meets the guidance."}
          </p>
          {q.rubric!.map((r, i) => (
            <label key={i} className="rubric-item">
              <div>
                <strong>{r.criterion}</strong>
                <p>{r.guidance}</p>
                <span className="small muted">
                  {(points[i] ?? 0) === r.points
                    ? "All points awarded"
                    : `${r.points - (points[i] ?? 0)} points to improve`}
                </span>
              </div>
              <select
                aria-label={`Rubric ${r.criterion}`}
                value={points[i] ?? 0}
                onChange={(e) => {
                  setPoints(
                    q.rubric!.map((_, j) =>
                      j === i ? Number(e.target.value) : (points[j] ?? 0),
                    ),
                  );
                  setSaved(false);
                }}
              >
                {Array.from({ length: r.points + 1 }, (_, n) => (
                  <option key={n} value={n}>
                    {n}/{r.points}
                  </option>
                ))}
              </select>
            </label>
          ))}
          <details>
            <summary>Reference response & improvement guidance</summary>
            <MathText text={q.example ?? q.explanation} />
          </details>
          <button
            className="primary full mt"
            disabled={!response.trim() || saved}
            onClick={() => {
              const result = grade(
                q,
                response,
                q.rubric!.map((_, i) => points[i] ?? 0),
              );
              const existing = pending.find(
                (p) => `${p.attempt}:${p.result.questionId}` === pendingId,
              );
              onSave({
                ...store,
                attempts: existing
                  ? store.attempts.map((a) =>
                      a.id === existing.attempt
                        ? {
                            ...a,
                            results: a.results.map((r) =>
                              r.questionId === q.id ? result : r,
                            ),
                          }
                        : a,
                    )
                  : [
                      ...store.attempts,
                      {
                        id: crypto.randomUUID(),
                        date: new Date().toISOString(),
                        seconds: 0,
                        questions: [q],
                        results: [result],
                        config: {
                          ...defaultConfig,
                          count: 1,
                          subjects: [q.subject],
                        },
                      },
                    ],
              });
              setSaved(true);
            }}
          >
            {saved ? "Review saved" : "Save rubric review"}
          </button>
          <p className="small muted">
            Revise your response and review again to improve. Manual reviews are
            saved as self-assessments.
          </p>
        </aside>
      </div>
    </>
  );
}
