"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, FileCheck2 } from "lucide-react";
import { grade } from "../../lib/study/engine";
import { worldVisible } from "../../lib/study/course-mapping";
import {
  defaultConfig,
  type GradingStrictness,
  type GradingEstimate,
  type GradingRecord,
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
  const pending = store.attempts
    .flatMap((a) =>
      a.results
        .filter((r) => r.correct === null)
        .map((r) => ({
          attempt: a.id,
          result: r,
          question: a.questions.find((q) => q.id === r.questionId)!,
        })),
    )
    .filter((p) => p.question?.rubric?.length);
  const written = [
    ...new Map(
      [
        ...bank.filter(
          (q) => q.rubric?.length && worldVisible(q, store.worldMode),
        ),
        ...pending.map((p) => p.question),
        ...(store.gradingHistory ?? []).map((r) => r.question),
      ].map((q) => [q.id, q]),
    ).values(),
  ];
  const [id, setId] = useState(written[0]?.id ?? ""),
    [response, setResponse] = useState(""),
    [points, setPoints] = useState<number[]>([]),
    [available, setAvailable] = useState(false),
    [reason, setReason] = useState("Checking Gemini availability…"),
    [busy, setBusy] = useState(false),
    [error, setError] = useState(""),
    [estimate, setEstimate] = useState<GradingEstimate | null>(null),
    [saved, setSaved] = useState(false),
    [pendingId, setPendingId] = useState(""),
    [previousId, setPreviousId] = useState(""),
    [subject, setSubject] = useState("");
  const [strictness, setStrictness] = useState<GradingStrictness>("standard");
  const controller = useRef<AbortController | null>(null);
  useEffect(() => {
    const abort = new AbortController();
    fetch("/api/grade", { signal: abort.signal })
      .then((r) => r.json())
      .then((value) => {
        const d = value as { available: boolean; reason?: string };
        setAvailable(d.available === true);
        setReason(
          d.available
            ? "Gemini grading is available."
            : (d.reason ??
                "Gemini is unavailable. Use manual self-assessment."),
        );
      })
      .catch(() => {
        if (!abort.signal.aborted)
          setReason(
            "Could not reach the grading service. Manual self-assessment is available.",
          );
      });
    return () => {
      abort.abort();
      controller.current?.abort();
    };
  }, []);
  const q = (store.gradingHistory ?? []).find(r => r.id === previousId)?.question ?? written.find((q) => q.id === id) ?? written[0];
  const clear = () => {
    setPoints([]);
    setEstimate(null);
    setSaved(false);
    setError("");
  };
  const open = (record: GradingRecord) => {
    setStrictness(record.estimate.strictness ?? "standard");
    setId(record.question.id);
    setSubject("");
    setResponse(record.response);
    setPoints(record.estimate.points);
    setEstimate(record.estimate);
    setPreviousId(record.id);
    setPendingId("");
    setSaved(true);
    setError("");
  };
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
  const manualEstimate = (): GradingEstimate => ({
    strictness,
    label: "Manual rubric self-assessment",
    provider: "manual",
    points: q.rubric!.map((_, i) => points[i] ?? 0),
    breakdown: q.rubric!.map((r, i) => ({
      criterion: r.criterion,
      points: points[i] ?? 0,
      max: r.points,
      evidence: "Self-assessed by you.",
      missing: (points[i] ?? 0) < r.points ? r.guidance : "",
      suggestion: r.guidance,
    })),
    feedback: "You awarded these points using the question rubric.",
    improvements: q.explanation,
    example: q.example ?? q.explanation,
  });
  const persist = (review: GradingEstimate) => {
    const record: GradingRecord = {
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
      question: structuredClone(q),
      response,
      estimate: review,
      ...(previousId ? { previousId } : {}),
    };
    const result = {
      ...grade(q, response, review.points),
      gradingMethod:
        review.provider === "gemini"
          ? ("gemini" as const)
          : ("manual" as const),
    };
    const existing = pending.find(
      (p) => `${p.attempt}:${p.result.questionId}` === pendingId,
    );
    onSave({
      ...store,
      gradingHistory: [...(store.gradingHistory ?? []), record],
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
              date: record.date,
              seconds: 0,
              questions: [structuredClone(q)],
              results: [result],
              config: {
                ...defaultConfig,
                count: 1,
                subjects: [q.subject],
                name: "Written response review",
              },
            },
          ],
    });
    setPreviousId(record.id);
    setSaved(true);
    setPendingId("");
  };
  return (
    <>
      <div className="notice">
        {available
          ? "Gemini scores are unofficial estimates. Review each awarded point."
          : reason}{" "}
        Responses sent for AI review are processed by Google Gemini. Java code
        is reviewed without execution.
      </div>
      <div className="frq-grid">
        <section className="panel">
          <div className="eyebrow">WRITE · REFLECT · REVISE</div>
          <h2>Written response studio</h2>
          {pending.length > 0 && (
            <label>
              Continue an unreviewed response
              <select
                disabled={busy}
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
                    setPreviousId("");
                    setSubject("");
                    clear();
                  }
                }}
              >
                <option value="">Choose a response</option>
                {pending.map((p) => (
                  <option
                    key={`${p.attempt}:${p.result.questionId}`}
                    value={`${p.attempt}:${p.result.questionId}`}
                  >
                    {p.question.topic} · Saved practice
                  </option>
                ))}
              </select>
            </label>
          )}
          <label>
            Filter subject
            <select
              aria-label="FRQ subject"
              disabled={busy}
              value={subject}
              onChange={(e) => {
                setSubject(e.target.value);
                const next = written.find(
                  (q) => !e.target.value || q.subject === e.target.value,
                );
                if (next) setId(next.id);
                setResponse("");
                setPendingId("");
                setPreviousId("");
                clear();
              }}
            >
              <option value="">All subjects</option>
              {[...new Set(written.map((q) => q.subject))].map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </label>
          <label>
            Question
            <select
              aria-label="FRQ question"
              disabled={busy}
              value={q.id}
              onChange={(e) => {
                setId(e.target.value);
                setResponse("");
                setPendingId("");
                setPreviousId("");
                clear();
              }}
            >
              {written
                .filter((q) => !subject || q.subject === subject)
                .map((q) => (
                  <option key={q.id} value={q.id}>
                    {q.subject.toUpperCase()} · {q.type} · {q.topic} · {q.id}
                  </option>
                ))}
            </select>
          </label>
          <div className="question-meta">
            <span className="tag">{q.type}</span>
            <span>{q.unit}</span>
            <span>{q.difficulty}</span>
          </div>
          <div className="question-text frq-prompt">
            <MathText text={q.prompt} />
          </div>
          <label>
            Your response
            <textarea
              aria-label="Your response"
              disabled={busy}
              maxLength={20000}
              rows={13}
              className={q.type === "Java" ? "code-input" : ""}
              value={response}
              onChange={(e) => {
                setResponse(e.target.value);
                clear();
              }}
              placeholder="Explain your reasoning. For mathematics, use $...$ to preview expressions."
            />
          </label>
          <div className="small muted">
            {response.length.toLocaleString()}/20,000 characters{" "}
            {previousId ? "· Revision of a saved review" : ""}
          </div>
          {response && (
            <details>
              <summary>Preview your response</summary>
              <div className="response-preview">
                <MathText text={response} />
              </div>
            </details>
          )}
          <fieldset className="strictness-control" disabled={busy}>
            <legend>Grading strictness</legend>
            {([ ["lenient", "Lenient", "Encouraging practice"], ["standard", "Standard", "AP exam style"], ["strict", "Strict", "Explicit, rigorous reasoning"] ] as const).map(([value, title, description]) => (
              <label key={value} className={strictness === value ? "strictness-option selected" : "strictness-option"}>
                <input type="radio" name="strictness" value={value} checked={strictness === value} onChange={() => setStrictness(value)} />
                <span><strong>{title}</strong><small>{description}</small></span>
              </label>
            ))}
            <p className="small muted">Interpretation changes; the rubric and maximum score stay the same. Missing requirements never earn credit.</p>
          </fieldset>
          <button
            className="primary mt"
            disabled={!response.trim() || busy}
            onClick={async () => {
              if (!available) {
                setError(
                  "Award points using the rubric, then save your manual review.",
                );
                document
                  .querySelector(".rubric-panel")
                  ?.scrollIntoView({ behavior: "smooth", block: "start" });
                return;
              }
              setEstimate(null);
              setPoints([]);
              setSaved(false);
              setBusy(true);
              setError("");
              controller.current = new AbortController();
              try {
                const r = await fetch("/api/grade", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  signal: controller.current.signal,
                  body: JSON.stringify({ question: q, response, strictness }),
                });
                const d = (await r.json()) as GradingEstimate & {
                  error?: string;
                };
                if (!r.ok)
                  throw new Error(
                    d.error ?? "Grading is unavailable. Use manual review.",
                  );
                if (
                  d.provider !== "gemini" ||
                  d.points.length !== q.rubric!.length ||
                  !d.breakdown
                )
                  throw new Error(
                    "The grading response was invalid. Use manual review.",
                  );
                setEstimate(d);
                setPoints(d.points);
                persist(d);
              } catch (e) {
                if (!controller.current?.signal.aborted)
                  setError(
                    e instanceof Error
                      ? e.message
                      : "Grading is unavailable. Use manual review.",
                  );
              } finally {
                setBusy(false);
              }
            }}
          >
            {busy
              ? "Reviewing with Gemini…"
              : available
                ? "Get Gemini estimate"
                : "Review with manual rubric"}
            <ArrowRight size={16} />
          </button>
          {error && (
            <p className="notice" role="status">
              {error}
            </p>
          )}
          {estimate && (
            <div className="answer-feedback">
              <div className="grading-score"><strong>{score}/{max}</strong><span>{estimate.strictness ?? "standard"} ? {estimate.label}</span></div>
              <p className="small muted">AI-generated scores are estimates, not official College Board grades.</p>
              <p>{estimate.feedback}</p>
              {([ ["Strengths", estimate.strengths], ["Factual or conceptual errors", estimate.errors], ["Grading uncertainty", estimate.uncertainties] ] as const).map(([title, items]) => items && items.length > 0 && <div key={title}><h3>{title}</h3><ul>{items.map((item, i) => <li key={i}>{item}</li>)}</ul></div>)}
              <details><summary>Original response for this review</summary><div className="response-preview"><MathText text={response} /></div></details>
              <h3>Specific improvements</h3>
              <div className="lesson-prose">
                <MathText text={estimate.improvements} />
              </div>
              <h3>Example stronger response</h3>
              <div className="lesson-prose">
                <MathText text={estimate.example} />
              </div>
            </div>
          )}
        </section>
        <aside className="panel rubric-panel">
          <span className="eyebrow">QUESTION-SPECIFIC RUBRIC</span>
          <p className="small muted">{q.source === "Custom" || q.source === "Imported" ? "Teacher / user supplied rubric." : "Independently authored study rubric; not an official College Board scoring guide."}</p>
          <h2>
            {score} <span className="muted">/ {max} points</span>
          </h2>
          <p className="small muted">
            {estimate?.provider === "gemini"
              ? "Unofficial Gemini estimate. Changing points creates a manual self-assessment."
              : "Manual self-assessment. Award points only when your response meets the guidance."}
          </p>
          {q.rubric!.map((r, i) => {
            const feedback = estimate?.breakdown[i];
            return (
              <div className="rubric-item" key={i}>
                <div>
                  <strong>{r.criterion}</strong>
                  <p>{r.guidance}</p>
                  {feedback && (
                    <details className="criterion-feedback" open={feedback.points < feedback.max}>
                      <summary>{feedback.points}/{feedback.max} points ? Scoring explanation</summary>
                      <p>{feedback.explanation ?? "See evidence and missing requirements below."}</p>
                      <p>
                        <b>Evidence:</b>{" "}
                        {feedback.evidence ||
                          "No supporting evidence identified."}
                      </p>
                      {feedback.missing && (
                        <p>
                          <b>Missing:</b> {feedback.missing}
                        </p>
                      )}
                      <p>
                        <b>Improve:</b> {feedback.suggestion}
                      </p>
                    </details>
                  )}
                </div>
                <select
                  disabled={busy}
                  aria-label={`Rubric ${r.criterion}`}
                  value={points[i] ?? 0}
                  onChange={(e) => {
                    setPoints(
                      q.rubric!.map((_, j) =>
                        j === i ? Number(e.target.value) : (points[j] ?? 0),
                      ),
                    );
                    setEstimate(null);
                    setSaved(false);
                  }}
                >
                  {Array.from({ length: r.points + 1 }, (_, n) => (
                    <option key={n} value={n}>
                      {n}/{r.points}
                    </option>
                  ))}
                </select>
              </div>
            );
          })}
          <details>
            <summary>Reference response & improvement guidance</summary>
            <div className="lesson-prose">
              <MathText text={q.example ?? q.explanation} />
            </div>
          </details>
          <button
            className="primary full mt"
            disabled={!response.trim() || saved || busy}
            onClick={() => {
              const review = estimate ?? manualEstimate();
              setEstimate(review);
              persist(review);
            }}
          >
            {saved ? "Review saved" : "Save rubric review"}
          </button>
          <p className="small muted">
            Gemini reviews save automatically. Manual reviews save when you
            choose this button. Revise your response to create another review;
            earlier versions remain in history.
          </p>
        </aside>
      </div>
      <section className="panel grading-history">
        <div className="section-label">
          <h2>Grading history</h2>
          <span className="tag">
            {store.gradingHistory?.length ?? 0} reviews
          </span>
        </div>
        {(store.gradingHistory ?? [])
          .slice()
          .reverse()
          .map((record) => (
            <button
              disabled={busy}
              key={record.id}
              className="session-row full"
              onClick={() => open(record)}
            >
              <div>
                <strong>{record.question.topic}</strong>
                <p>
                  {record.question.subject.toUpperCase()} ·{" "}
                  {new Date(record.date).toLocaleString()} ·{" "}
                  {record.estimate.provider === "gemini"
                    ? "Gemini estimate"
                    : "Manual review"}
                  {record.previousId ? " · Revision" : ""}
                </p>
              </div>
              <span className="tag">
                {record.estimate.points.reduce((s, n) => s + n, 0)}/
                {record.question.rubric!.reduce((s, r) => s + r.points, 0)}
              </span>
              <ArrowRight size={16} />
            </button>
          ))}
        {!store.gradingHistory?.length && (
          <p className="muted">Saved reviews and revisions appear here.</p>
        )}
      </section>
    </>
  );
}
