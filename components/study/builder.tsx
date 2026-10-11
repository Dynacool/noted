"use client";
import { useState } from "react";
import {
  ArrowRight,
  Bookmark,
  Check,
  SlidersHorizontal,
  Clock3,
} from "lucide-react";
import {
  defaultConfig,
  questionTypes,
  type Config,
  type Question,
  type Store,
  type Subject,
} from "../../lib/study/types";
import { matching } from "../../lib/study/engine";
export function Builder({
  bank,
  subjects,
  store,
  onSave,
  onStart,
  initial = defaultConfig,
}: {
  bank: Question[];
  subjects: Subject[];
  store: Store;
  onSave: (s: Store) => void;
  onStart: (c: Config) => void;
  initial?: Config;
}) {
  const [c, setC] = useState<Config>(initial);
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const matches = matching(bank, c, store.attempts);
  const toggle = (
    key:
      | "subjects"
      | "units"
      | "topics"
      | "subtopics"
      | "types"
      | "difficulties"
      | "tags",
    v: string,
  ) => {
    setC((old) => ({
      ...old,
      [key]: old[key].includes(v)
        ? old[key].filter((x) => x !== v)
        : [...old[key], v],
      ...(key === "subjects"
        ? { units: [], topics: [], subtopics: [], tags: [] }
        : key === "units"
          ? { topics: [], subtopics: [], tags: [] }
          : key === "topics"
            ? { subtopics: [], tags: [] }
            : {}),
    }));
    setError("");
  };
  const selected = subjects.filter(
    (s) => !c.subjects.length || c.subjects.includes(s.id),
  );
  const units = [
    ...new Set(
      selected
        .flatMap((s) => s.units.map((u) => u.name))
        .concat(
          bank
            .filter((q) => !c.subjects.length || c.subjects.includes(q.subject))
            .map((q) => q.unit),
        ),
    ),
  ];
  const topics = [
    ...new Set(
      selected
        .flatMap((s) =>
          s.units
            .filter((u) => !c.units.length || c.units.includes(u.name))
            .flatMap((u) => u.topics),
        )
        .concat(
          bank
            .filter(
              (q) =>
                (!c.subjects.length || c.subjects.includes(q.subject)) &&
                (!c.units.length || c.units.includes(q.unit)),
            )
            .map((q) => q.topic),
        ),
    ),
  ];
  const scope = bank.filter(
    (q) =>
      (!c.subjects.length || c.subjects.includes(q.subject)) &&
      (!c.units.length || c.units.includes(q.unit)) &&
      (!c.topics.length || c.topics.includes(q.topic)),
  );
  const chips = (
    key: "units" | "topics" | "subtopics" | "types" | "difficulties" | "tags",
    items: string[],
  ) => (
    <div className="chips">
      {items.map((v) => (
        <button
          key={v}
          type="button"
          className={c[key].includes(v) ? "chip selected" : "chip"}
          onClick={() => toggle(key, v)}
          aria-pressed={c[key].includes(v)}
        >
          {c[key].includes(v) && <Check size={13} />} {v}
        </button>
      ))}
    </div>
  );
  return (
    <div className="builder-grid">
      <div>
        <section className="panel">
          <div className="section-label">
            <span className="step">1</span>
            <h2>Choose your subjects</h2>
            <span className="muted">Mix and match</span>
          </div>
          <div className="subject-options">
            {subjects.map((s) => (
              <button
                type="button"
                key={s.id}
                className={
                  "subject-option " +
                  (c.subjects.includes(s.id) ? "chosen" : "")
                }
                onClick={() => toggle("subjects", s.id)}
                aria-pressed={c.subjects.includes(s.id)}
              >
                <span
                  className="subject-icon"
                  style={{ background: s.color + "18", color: s.color }}
                >
                  {s.short}
                </span>
                <strong>{s.name}</strong>
                <span className="check-box">
                  {c.subjects.includes(s.id) && <Check size={14} />}
                </span>
              </button>
            ))}
          </div>
          <p className="small muted">No selection includes all subjects.</p>
        </section>
        <section className="panel">
          <div className="section-label">
            <span className="step">2</span>
            <h2>Find your focus</h2>
          </div>
          <details open={!!c.subjects.length}>
            <summary>
              Units <span>{c.units.length || "All"}</span>
            </summary>
            {chips("units", units)}
          </details>
          <details open={!!c.units.length}>
            <summary>
              Topics & skills <span>{c.topics.length || "All"}</span>
            </summary>
            {chips("topics", topics)}
          </details>
          <details>
            <summary>Subtopics</summary>
            {chips("subtopics", [...new Set(scope.map((q) => q.subtopic))])}
          </details>
          {scope.some((q) => q.tags.length > 0) && (
            <details>
              <summary>Period, region & reasoning tags</summary>
              <p className="small muted">
                Selected tags must all match a question.
              </p>
              {chips("tags", [...new Set(scope.flatMap((q) => q.tags))])}
            </details>
          )}
        </section>
        <section className="panel">
          <div className="section-label">
            <span className="step">3</span>
            <h2>Make it yours</h2>
          </div>
          <label className="field-label">Question formats</label>
          {chips("types", [...questionTypes])}
          <label className="field-label">
            Difficulty <span className="muted">No selection = mixed</span>
          </label>
          {chips("difficulties", ["Easy", "Medium", "Hard"])}
          <div className="form-grid">
            <label>
              Question count
              <input
                aria-label="Question count"
                type="number"
                min="1"
                max="500"
                value={c.count}
                onChange={(e) => setC({ ...c, count: Number(e.target.value) })}
              />
            </label>
            <label>
              Question source
              <select
                value={c.source}
                onChange={(e) => setC({ ...c, source: e.target.value })}
              >
                {["Mixed", "Preloaded", "Imported", "Custom"].map((v) => (
                  <option key={v}>{v}</option>
                ))}
              </select>
            </label>
            <label>
              Practice mode
              <select
                value={c.mode}
                onChange={(e) => setC({ ...c, mode: e.target.value })}
              >
                {[
                  "Standard",
                  "Exam Simulation",
                  "Incorrect Questions",
                  "Spaced Repetition",
                ].map((v) => (
                  <option key={v}>{v}</option>
                ))}
              </select>
            </label>
            <label>
              Time limit
              <select
                value={c.timeMode}
                onChange={(e) => setC({ ...c, timeMode: e.target.value })}
              >
                {["Untimed", "Total quiz", "Per question"].map((v) => (
                  <option key={v}>{v}</option>
                ))}
              </select>
            </label>
            {c.timeMode !== "Untimed" && (
              <label>
                Minutes{" "}
                {c.timeMode === "Per question" ? "per question" : "in total"}
                <input
                  type="number"
                  min="0.25"
                  max="600"
                  step="0.25"
                  value={c.minutes}
                  onChange={(e) =>
                    setC({ ...c, minutes: Number(e.target.value) })
                  }
                />
              </label>
            )}
          </div>
          <div className="chips">
            {[5, 10, 15, 20, 30, 50].map((n) => (
              <button
                key={n}
                className={c.count === n ? "chip selected" : "chip"}
                onClick={() => setC({ ...c, count: n })}
              >
                {n} questions
              </button>
            ))}
          </div>
        </section>
      </div>
      <aside className="builder-summary panel">
        <div className="eyebrow">
          <SlidersHorizontal size={15} /> YOUR SESSION
        </div>
        <h2>
          Good practice.
          <br />
          On your terms.
        </h2>
        <div className="match-number">
          {matches.length}
          <span>matching questions</span>
        </div>
        <dl>
          <div>
            <dt>Subjects</dt>
            <dd>{c.subjects.length || "All 7+"}</dd>
          </div>
          <div>
            <dt>Questions</dt>
            <dd>{c.count}</dd>
          </div>
          <div>
            <dt>Difficulty</dt>
            <dd>{c.difficulties.join(", ") || "Mixed"}</dd>
          </div>
          <div>
            <dt>Mode</dt>
            <dd>{c.mode}</dd>
          </div>
          <div>
            <dt>
              <Clock3 size={14} /> Time
            </dt>
            <dd>
              {c.timeMode === "Untimed"
                ? "Untimed"
                : `${c.minutes} min ${c.timeMode === "Per question" ? "each" : "total"}`}
            </dd>
          </div>
        </dl>
        {matches.length < c.count && (
          <div className="notice">
            Only {matches.length} questions match. Choose a smaller count or
            broaden your filters.
          </div>
        )}
        {error && (
          <div className="error" role="alert">
            {error}
          </div>
        )}
        <button
          className="primary full"
          onClick={() => {
            if (
              matches.length < c.count ||
              c.count < 1 ||
              !Number.isInteger(c.count)
            ) {
              setError("Choose a valid count within your matching questions.");
              return;
            }
            if (
              c.timeMode !== "Untimed" &&
              (!Number.isFinite(c.minutes) ||
                c.minutes < 0.25 ||
                c.minutes > 600)
            ) {
              setError("Choose a time limit from 0.25 to 600 minutes.");
              return;
            }
            onStart(c);
          }}
        >
          Start practicing <ArrowRight size={17} />
        </button>
        <div className="preset-save">
          <input
            aria-label="Preset name"
            placeholder="Name this preset"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={60}
          />
          <button
            className="icon-btn"
            title="Save preset"
            disabled={!name.trim()}
            onClick={() => {
              onSave({
                ...store,
                presets: [...store.presets, { ...c, name: name.trim() }],
              });
              setName("");
            }}
          >
            <Bookmark size={18} />
          </button>
        </div>
        <p className="small muted">
          Your progress saves on this device. You can review and retry after
          every session.
        </p>
        {store.presets.length > 0 && (
          <>
            <h3>Saved presets</h3>
            {store.presets.map((p, i) => (
              <div className="preset-row" key={i}>
                <button className="text-button" onClick={() => setC(p)}>
                  {p.name}
                </button>
                <button
                  className="text-button muted"
                  aria-label={`Delete preset ${p.name}`}
                  onClick={() =>
                    onSave({
                      ...store,
                      presets: store.presets.filter((_, j) => j !== i),
                    })
                  }
                >
                  ×
                </button>
              </div>
            ))}
          </>
        )}
      </aside>
    </div>
  );
}
