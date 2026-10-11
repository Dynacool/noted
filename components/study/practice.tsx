"use client";
import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Flag,
  Lightbulb,
  CheckCircle2,
  Clock3,
} from "lucide-react";
import type {
  Attempt,
  Config,
  Question,
  Result,
  Store,
} from "../../lib/study/types";
import { grade } from "../../lib/study/engine";
import { MathText } from "./math-text";
export function Practice({
  questions,
  config,
  store,
  onSave,
  onFinish,
}: {
  questions: Question[];
  config: Config;
  store: Store;
  onSave: (s: Store) => void;
  onFinish: (a: Attempt) => void;
}) {
  const [index, setIndex] = useState(0),
    [answers, setAnswers] = useState<Record<string, string>>({}),
    [results, setResults] = useState<Record<string, Result>>({}),
    [hint, setHint] = useState(false),
    [seconds, setSeconds] = useState(0),
    [questionSeconds, setQuestionSeconds] = useState(0),
    [manual, setManual] = useState<Record<string, number[]>>({});
  const done = useRef(false);
  const q = questions[index];
  const exam = config.mode === "Exam Simulation";
  const finish = () => {
    if (done.current) return;
    done.current = true;
    const all = questions.map(
      (q) => results[q.id] ?? grade(q, answers[q.id] ?? "", manual[q.id]),
    );
    onFinish({
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
      seconds,
      results: all,
      questions,
      config,
    });
  };
  const finishRef = useRef(finish);
  useEffect(() => {
    finishRef.current = finish;
  });
  useEffect(() => {
    const start = Date.now();
    const timer = setInterval(
      () => setSeconds(Math.floor((Date.now() - start) / 1000)),
      500,
    );
    return () => clearInterval(timer);
  }, []);
  useEffect(() => {
    const start = Date.now();
    const timer = setInterval(
      () => setQuestionSeconds(Math.floor((Date.now() - start) / 1000)),
      500,
    );
    return () => clearInterval(timer);
  }, [index]);
  // Timed quiz expiration is synchronized with the clock, not derived UI state.
  useEffect(() => {
    if (config.timeMode === "Total quiz" && seconds >= config.minutes * 60)
      finishRef.current();
    if (
      config.timeMode === "Per question" &&
      questionSeconds >= config.minutes * 60
    ) {
      if (index < questions.length - 1) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setQuestionSeconds(0);
        setHint(false);
        setIndex(index + 1);
      } else finishRef.current();
    }
  }, [seconds, questionSeconds, index, config, questions.length]);
  const move = (i: number) => {
    setQuestionSeconds(0);
    setIndex(i);
    setHint(false);
  };
  const response = answers[q.id] ?? "";
  const result = results[q.id];
  const setResponse = (s: string) => {
    setAnswers({ ...answers, [q.id]: s });
    if (result)
      setResults((old) => {
        const n = { ...old };
        delete n[q.id];
        return n;
      });
  };
  const remaining =
    config.timeMode === "Untimed"
      ? seconds
      : Math.max(
          0,
          Math.ceil(config.minutes * 60) -
            (config.timeMode === "Total quiz" ? seconds : questionSeconds),
        );
  return (
    <div className="practice-layout">
      <section className="panel question-panel">
        <div className="practice-top">
          <span className="eyebrow">
            QUESTION {index + 1} OF {questions.length}
          </span>
          <span className="timer">
            <Clock3 size={16} />
            {Math.floor(remaining / 60)}:
            {String(remaining % 60).padStart(2, "0")}{" "}
            {config.timeMode === "Untimed" ? "elapsed" : "left"}
          </span>
        </div>
        <div className="progress-track">
          <div
            style={{ width: `${((index + 1) / questions.length) * 100}%` }}
          />
        </div>
        <div className="question-meta">
          <span className="tag">{q.unit}</span>
          <span>{q.topic}</span>
          <span className="tag">{q.difficulty}</span>
          <button
            className={
              "icon-btn " + (store.flags.includes(q.id) ? "flagged" : "")
            }
            aria-label="Flag question"
            aria-pressed={store.flags.includes(q.id)}
            onClick={() =>
              onSave({
                ...store,
                flags: store.flags.includes(q.id)
                  ? store.flags.filter((id) => id !== q.id)
                  : [...store.flags, q.id],
              })
            }
          >
            <Flag size={18} />
          </button>
        </div>
        <h2 className="question-text">
          <MathText text={q.prompt} />
        </h2>
        <p className="small muted">
          {q.type === "Multiple select"
            ? "Select all correct answers."
            : q.type === "Numerical"
              ? "Enter a number or fraction."
              : q.rubric
                ? "Write your response. Use (a), (b), and (c) for multi-part questions."
                : ""}
        </p>
        {q.options ? (
          <div className="answer-options">
            {q.options.map((o, i) => {
              const checked =
                q.type === "Multiple select"
                  ? response.split("|").includes(o)
                  : response === o;
              return (
                <label
                  className={"answer-option " + (checked ? "chosen" : "")}
                  key={o}
                >
                  <input
                    type={q.type === "Multiple select" ? "checkbox" : "radio"}
                    name={q.id}
                    checked={checked}
                    onChange={() =>
                      setResponse(
                        q.type === "Multiple select"
                          ? (checked
                              ? response.split("|").filter((x) => x !== o)
                              : [...response.split("|").filter(Boolean), o]
                            ).join("|")
                          : o,
                      )
                    }
                  />
                  <span className="option-letter">
                    {String.fromCharCode(65 + i)}
                  </span>
                  <MathText text={o} />
                </label>
              );
            })}
          </div>
        ) : q.rubric || q.type === "Short answer" ? (
          <textarea
            className={q.type === "Java" ? "code-input" : ""}
            aria-label="Your response"
            rows={q.type === "Java" ? 12 : 8}
            value={response}
            onChange={(e) => setResponse(e.target.value)}
            placeholder={
              q.type === "Java"
                ? "Write your Java method here…"
                : "Write your answer and show your reasoning…"
            }
          />
        ) : (
          <input
            className="numeric-input"
            aria-label="Your answer"
            value={response}
            onChange={(e) => setResponse(e.target.value)}
            placeholder="Your answer"
          />
        )}
        {!exam && (
          <div className="practice-actions">
            <button className="text-button" onClick={() => setHint(!hint)}>
              <Lightbulb size={16} />
              {hint ? "Hide hint" : "Need a hint?"}
            </button>
            <button
              className="primary"
              disabled={!response.trim()}
              onClick={() =>
                setResults({
                  ...results,
                  [q.id]: grade(q, response, manual[q.id]),
                })
              }
            >
              Check answer <CheckCircle2 size={17} />
            </button>
          </div>
        )}
        {hint && !exam && <div className="notice">{q.hint}</div>}
        {result && !exam && (
          <div
            className={"answer-feedback " + (result.correct ? "correct" : "")}
          >
            <strong>
              {result.correct === null
                ? "Manual rubric review required"
                : result.correct
                  ? "Nicely done."
                  : "A chance to learn."}
            </strong>
            {!q.rubric && (
              <>
                <p>
                  Correct answer: <MathText text={q.answer} />
                </p>
                <MathText text={q.explanation} />
              </>
            )}
            {q.rubric && (
              <>
                <p className="small">
                  This is your self-assessment, not an AI or official AP score.
                  Java code is reviewed by rubric and is not executed.
                </p>
                {q.rubric.map((r, i) => (
                  <label className="rubric-item" key={i}>
                    <div>
                      <strong>{r.criterion}</strong>
                      <p>{r.guidance}</p>
                    </div>
                    <select
                      aria-label={`Points for ${r.criterion}`}
                      value={manual[q.id]?.[i] ?? 0}
                      onChange={(e) => {
                        const p = manual[q.id] ?? q.rubric!.map(() => 0);
                        const n = p.map((v, j) =>
                          j === i ? Number(e.target.value) : v,
                        );
                        setManual({ ...manual, [q.id]: n });
                        setResults({
                          ...results,
                          [q.id]: grade(q, response, n),
                        });
                      }}
                    >
                      {Array.from({ length: r.points + 1 }, (_, j) => (
                        <option key={j} value={j}>
                          {j} / {r.points}
                        </option>
                      ))}
                    </select>
                  </label>
                ))}
                <details>
                  <summary>See a stronger response</summary>
                  <MathText text={q.example ?? q.explanation} />
                </details>
              </>
            )}
          </div>
        )}
        <div className="question-footer">
          <button
            className="secondary"
            disabled={index === 0 || config.timeMode === "Per question"}
            onClick={() => move(index - 1)}
          >
            <ArrowLeft size={16} />
            Previous
          </button>
          {index < questions.length - 1 ? (
            <button className="secondary" onClick={() => move(index + 1)}>
              Next question
              <ArrowRight size={16} />
            </button>
          ) : (
            <button className="primary" onClick={finish}>
              Finish session
              <ArrowRight size={16} />
            </button>
          )}
        </div>
      </section>
      <aside className="panel navigator">
        <h3>Your question map</h3>
        <p className="small muted">
          {Object.values(answers).filter(Boolean).length} of {questions.length}{" "}
          answered
        </p>
        <div className="question-map">
          {questions.map((x, i) => (
            <button
              key={x.id}
              disabled={config.timeMode === "Per question" && i !== index}
              onClick={() => move(i)}
              aria-label={`Question ${i + 1}`}
              className={
                (i === index ? "active " : answers[x.id] ? "answered " : "") +
                (store.flags.includes(x.id) ? "flagged" : "")
              }
            >
              {i + 1}
            </button>
          ))}
        </div>
        <hr />
        <p className="small muted">
          {exam
            ? "Exam mode: feedback is available after you finish."
            : "Work at your pace. Every explanation is a chance to build understanding."}
        </p>
        <button className="secondary full" onClick={finish}>
          Finish & review
        </button>
      </aside>
    </div>
  );
}
export function Review({
  attempt,
  onRetry,
  onNew,
}: {
  attempt: Attempt;
  onRetry: (q: Question[]) => void;
  onNew: () => void;
}) {
  const evaluated = attempt.results.filter((r) => r.correct !== null),
    correct = evaluated.filter((r) => r.correct).length,
    missed = attempt.questions.filter(
      (q) =>
        attempt.results.find((r) => r.questionId === q.id)?.correct === false,
    );
  const pending = attempt.results.filter((r) => r.correct === null).length;
  return (
    <>
      <div className="review-hero panel">
        <span className="eyebrow">SESSION COMPLETE</span>
        <h2>You showed up. That matters.</h2>
        <div className="review-stats">
          <div>
            <strong>
              {evaluated.length
                ? Math.round((correct / evaluated.length) * 100) + "%"
                : "—"}
            </strong>
            <span>Accuracy · assessed questions</span>
          </div>
          <div>
            <strong>
              {correct}/{evaluated.length}
            </strong>
            <span>Correct</span>
          </div>
          <div>
            <strong>
              {Math.floor(attempt.seconds / 60)}m {attempt.seconds % 60}s
            </strong>
            <span>Time spent</span>
          </div>
        </div>
        {pending > 0 && (
          <div className="notice">
            {pending} written responses need manual rubric review in FRQ
            Grading. They are excluded from accuracy.
          </div>
        )}
        <div className="flex-row">
          <button
            className="primary"
            disabled={!missed.length}
            onClick={() => onRetry(missed)}
          >
            Retry {missed.length} missed questions
            <ArrowRight size={16} />
          </button>
          <button className="secondary" onClick={onNew}>
            New quiz, same settings
          </button>
        </div>
      </div>
      <section className="panel">
        <h2>Your review</h2>
        {attempt.results.map((r, i) => {
          const q = attempt.questions.find((q) => q.id === r.questionId)!;
          return (
            <details key={q.id} className="review-question">
              <summary>
                <span
                  className={
                    "status-dot " +
                    (r.correct ? "green" : r.correct === null ? "amber" : "red")
                  }
                />
                <span>
                  {i + 1}. {q.topic}
                </span>
                <span className="muted">
                  {r.correct === null
                    ? "Needs review"
                    : `${r.points}/${r.max} points`}
                </span>
              </summary>
              <div className="review-body">
                <h3>
                  <MathText text={q.prompt} />
                </h3>
                <p>
                  <strong>Your response:</strong>{" "}
                  {r.response || "No answer submitted"}
                </p>
                {q.answer && (
                  <p>
                    <strong>Correct answer:</strong>{" "}
                    <MathText text={q.answer} />
                  </p>
                )}
                <p>
                  <MathText text={q.explanation} />
                </p>
                {r.rubric && (
                  <p className="small muted">
                    Manual self-assessment. Not an AI evaluation.
                  </p>
                )}
              </div>
            </details>
          );
        })}
      </section>
    </>
  );
}
