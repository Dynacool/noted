"use client";
import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Search,
  FileText,
  GraduationCap,
} from "lucide-react";
import { unitLessons } from "../../lib/study/catalog";
import { worldVisible } from "../../lib/study/course-mapping";
import { accuracy } from "../../lib/study/engine";
import {
  defaultConfig,
  type Config,
  type Question,
  type Store,
  type Subject,
} from "../../lib/study/types";
import { MathText } from "./math-text";
export function Courses({
  subjects,
  bank,
  store,
  onSave,
  onBuild,
}: {
  subjects: Subject[];
  bank: Question[];
  store: Store;
  onSave: (s: Store) => void;
  onBuild: (c: Config) => void;
}) {
  const [subjectId, setSubjectId] = useState(""),
    [unitId, setUnitId] = useState(""),
    [query, setQuery] = useState(""),
    [topic, setTopic] = useState("");
  const s = subjects.find((s) => s.id === subjectId);
  const lessons = unitLessons.filter(
    (l) =>
      l.subject === subjectId &&
      (l.scope !== "background" || store.worldMode === "expanded"),
  );
  const lesson = lessons.find((l) => l.id === unitId);
  const practice = (unit?: string, topics: string[] = [], exam = false) =>
    onBuild({
      ...defaultConfig,
      subjects: [subjectId],
      units: unit ? [unit] : [],
      topics,
      periods: lesson?.scope === "background" ? ["600–1200"] : [],
      count: Math.max(
        1,
        Math.min(
          10,
          bank.filter(
            (q) =>
              q.subject === subjectId &&
              (!unit || q.unit === unit) &&
              (!topics.length || topics.includes(q.topic)) &&
              (lesson?.scope !== "background" || q.scope === "background") &&
              worldVisible(q, store.worldMode),
          ).length,
        ),
      ),
      worldMode: store.worldMode ?? "standard",
      mode: exam ? "Exam Simulation" : "Standard",
      timeMode: exam ? "Total quiz" : "Untimed",
      minutes: exam ? 20 : 20,
      name: exam ? `${s?.name} · unit assessment` : undefined,
    });
  const modeControl = s?.id === "world" && (
    <div className="world-mode-control">
      <div>
        <strong>Unit 1 historical coverage</strong>
        <p>
          Standard AP Modern content is always included. Earlier foundations are
          optional.
        </p>
      </div>
      <select
        aria-label="AP World historical mode"
        value={store.worldMode ?? "standard"}
        onChange={(e) => {
          onSave({
            ...store,
            worldMode: e.target.value as "standard" | "expanded",
          });
          setUnitId("");
          setTopic("");
        }}
      >
        <option value="standard">Standard · 1200–1450 CE</option>
        <option value="expanded">Expanded · 600–1450 CE</option>
      </select>
    </div>
  );
  if (!s)
    return (
      <>
        <div className="course-toolbar">
          <div className="search-input">
            <Search size={18} />
            <input
              aria-label="Search subjects"
              placeholder="Find a subject or skill"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <span className="muted small">
            {bank.filter((q) => worldVisible(q, store.worldMode)).length}{" "}
            original & custom questions
          </span>
        </div>
        <div className="course-grid">
          {subjects
            .filter((s) =>
              (s.name + " " + s.units.flatMap((u) => u.topics).join(" "))
                .toLowerCase()
                .includes(query.toLowerCase()),
            )
            .map((s) => {
              const questions = bank.filter(
                (q) => q.subject === s.id && worldVisible(q, store.worldMode),
              );
              const a = store.attempts.map((a) => ({
                ...a,
                results: a.results.filter(
                  (r) =>
                    a.questions.find((q) => q.id === r.questionId)?.subject ===
                    s.id,
                ),
              }));
              const stats = accuracy(a);
              const total = unitLessons.filter(
                (l) =>
                  l.subject === s.id &&
                  (l.scope !== "background" || store.worldMode === "expanded"),
              ).length;
              const completed = unitLessons.filter(
                (l) =>
                  l.subject === s.id &&
                  (l.scope !== "background" ||
                    store.worldMode === "expanded") &&
                  store.completedLessons?.includes(l.id),
              ).length;
              return (
                <button
                  className="panel course-card"
                  key={s.id}
                  onClick={() => {
                    setSubjectId(s.id);
                    setUnitId("");
                  }}
                >
                  <div className="section-label">
                    <span
                      className="subject-icon"
                      style={{ color: s.color, background: s.color + "16" }}
                    >
                      {s.short}
                    </span>
                    <ArrowRight size={18} />
                  </div>
                  <h2>{s.name}</h2>
                  <p>{s.description}</p>
                  <div className="course-facts">
                    <span>
                      <BookOpen size={13} />
                      {s.units.length} units
                    </span>
                    <span>{questions.length} questions</span>
                  </div>
                  <div className="course-progress">
                    <span>
                      {stats.answered
                        ? `${stats.percent}% accuracy`
                        : "Ready when you are"}
                    </span>
                    <span>
                      {completed}/{total} notes read
                    </span>
                  </div>
                  <div className="progress-track">
                    <div
                      style={{
                        width: total
                          ? Math.min(100, (completed / total) * 100) + "%"
                          : "0%",
                        background: s.color,
                      }}
                    />
                  </div>
                </button>
              );
            })}
        </div>
      </>
    );
  return (
    <>
      <button
        className="text-button back-link"
        onClick={() => {
          if (lesson) {
            setUnitId("");
            setTopic("");
          } else setSubjectId("");
        }}
      >
        <ArrowLeft size={15} />
        {lesson ? s.name : "All subjects"}
      </button>
      <section className="course-header panel">
        <div>
          <div className="eyebrow">
            {s.framework?.label ?? "YOUR COURSE LIBRARY"}
          </div>
          <h2>{lesson ? lesson.title : s.name}</h2>
          <p>{lesson ? lesson.overview : s.description}</p>
          {s.framework && (
            <a
              href={s.framework.url}
              target="_blank"
              rel="noreferrer"
              className="text-button"
            >
              Course framework ↗
            </a>
          )}
        </div>
        <div className="course-header-actions">
          <button className="primary" onClick={() => practice(lesson?.unit)}>
            Practice {lesson ? "this unit" : "subject"}
            <ArrowRight size={16} />
          </button>
          <button
            className="secondary"
            onClick={() => practice(lesson?.unit, [], true)}
          >
            <GraduationCap size={16} />
            {lesson ? "Unit assessment" : "Cumulative review"}
          </button>
        </div>
      </section>
      {modeControl}
      {s.framework?.note && (
        <p className="framework-note">{s.framework.note}</p>
      )}
      {!lesson ? (
        <div className="unit-grid">
          {lessons.length ? (
            lessons.map((l, i) => {
              const completed = store.completedLessons?.includes(l.id);
              const count = bank.filter(
                (q) =>
                  q.subject === s.id &&
                  q.unit === l.unit &&
                  (l.scope === "background"
                    ? q.scope === "background"
                    : q.scope !== "background") &&
                  worldVisible(q, store.worldMode),
              ).length;
              return (
                <article className="panel unit-card" key={l.id}>
                  <div className="section-label">
                    <span className="unit-number">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {completed ? (
                      <span className="completion-badge">
                        <CheckCircle2 size={14} />
                        Read
                      </span>
                    ) : (
                      <span className="tag">
                        {l.scope === "background"
                          ? "Optional background"
                          : "Study notes"}
                      </span>
                    )}
                  </div>
                  <h3>{l.title}</h3>
                  <p>{l.overview}</p>
                  <div className="unit-topics">
                    {l.topics.slice(0, 4).map((t) => (
                      <span key={t.name}>{t.name}</span>
                    ))}
                    {l.topics.length > 4 && (
                      <span>+{l.topics.length - 4} more</span>
                    )}
                  </div>
                  <div className="unit-card-footer">
                    <span className="small muted">
                      {count} questions · {l.topics.length} topics
                    </span>
                    <button
                      className="text-button"
                      onClick={() => {
                        setUnitId(l.id);
                        setTopic("");
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                    >
                      Study unit
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </article>
              );
            })
          ) : (
            <section className="panel">
              <h3>Your custom subject</h3>
              <p>Build lessons through your own questions and collections.</p>
              <button className="primary mt" onClick={() => practice()}>
                Build a quiz
                <ArrowRight size={16} />
              </button>
            </section>
          )}
        </div>
      ) : (
        <div className="lesson-layout">
          <aside className="panel lesson-outline">
            <span className="eyebrow">IN THIS UNIT</span>
            <button
              className={!topic ? "outline-item active" : "outline-item"}
              onClick={() => setTopic("")}
            >
              Unit overview
            </button>
            {lesson.topics.map((t) => (
              <button
                className={
                  topic === t.name ? "outline-item active" : "outline-item"
                }
                key={t.name}
                onClick={() => setTopic(t.name)}
              >
                {t.name}
              </button>
            ))}
            <hr />
            <button
              className="secondary full"
              onClick={() =>
                onSave({
                  ...store,
                  completedLessons: store.completedLessons?.includes(lesson.id)
                    ? store.completedLessons.filter((id) => id !== lesson.id)
                    : [...(store.completedLessons ?? []), lesson.id],
                })
              }
            >
              <CheckCircle2 size={16} />
              {store.completedLessons?.includes(lesson.id)
                ? "Mark unread"
                : "Mark notes read"}
            </button>
          </aside>
          <div className="lesson-content">
            {lesson.scope === "background" && (
              <div className="notice">
                600–1200 CE foundations · Optional historical background,
                outside the officially assessed AP World: Modern timeframe.
              </div>
            )}
            {lesson.scope === "extension" && (
              <div className="notice">
                Enrichment: this material goes beyond the current course
                framework.
              </div>
            )}
            {lesson.topics
              .filter((t) => !topic || t.name === topic)
              .map((t) => (
                <section className="panel topic-lesson" key={t.name}>
                  <div className="section-label">
                    <h2>{t.name}</h2>
                    <span className="small muted">
                      <FileText size={15} />
                    </span>
                  </div>
                  <div className="subtopic-tags">
                    {t.subtopics.map((st) => (
                      <span className="tag" key={st}>
                        {st}
                      </span>
                    ))}
                  </div>
                  <div className="lesson-prose">
                    <MathText text={t.lesson} />
                  </div>
                  <button
                    className="text-button"
                    onClick={() => practice(lesson.unit, [t.name])}
                  >
                    Practice this topic
                    <ArrowRight size={14} />
                  </button>
                </section>
              ))}
            {!topic && (
              <>
                <section className="panel">
                  <h2>Concepts to keep</h2>
                  <ul className="concept-list">
                    {lesson.concepts.map((c, i) => (
                      <li key={i}>
                        <MathText text={c} />
                      </li>
                    ))}
                  </ul>
                </section>
                <section className="panel">
                  <h2>Key vocabulary</h2>
                  <dl className="vocabulary">
                    {lesson.vocabulary.map((v) => (
                      <div key={v.term}>
                        <dt>{v.term}</dt>
                        <dd>
                          <MathText text={v.definition} />
                        </dd>
                      </div>
                    ))}
                  </dl>
                </section>
                {lesson.workedExamples.length > 0 && (
                  <section className="panel">
                    <h2>Worked examples</h2>
                    {lesson.workedExamples.map((ex, i) => (
                      <article className="worked-example" key={i}>
                        <h3>
                          <MathText text={ex.prompt} />
                        </h3>
                        <ol>
                          {ex.steps.map((st, j) => (
                            <li key={j}>
                              <MathText text={st} />
                            </li>
                          ))}
                        </ol>
                        <div className="example-answer">
                          <strong>Result</strong>
                          <MathText text={ex.answer} />
                        </div>
                      </article>
                    ))}
                  </section>
                )}
                <section className="panel">
                  <h2>Common misconceptions</h2>
                  {lesson.misconceptions.map((m, i) => (
                    <p className="misconception" key={i}>
                      <span>↳</span>
                      <MathText text={m} />
                    </p>
                  ))}
                </section>
                {!!lesson.timeline?.length && (
                  <section className="panel">
                    <h2>Put it in time</h2>
                    <ol className="historical-timeline">
                      {lesson.timeline.map((event, i) => (
                        <li key={i}>
                          <time>{event.date}</time>
                          <div>
                            <strong>{event.event}</strong>
                            <p>{event.significance}</p>
                          </div>
                        </li>
                      ))}
                    </ol>
                  </section>
                )}
                {!!lesson.comparisons?.length && (
                  <section className="panel">
                    <h2>Make connections</h2>
                    {lesson.comparisons.map((c, i) => (
                      <div className="comparison" key={i}>
                        <h3>{c.title}</h3>
                        <div>
                          <p>{c.left}</p>
                          <p>{c.right}</p>
                        </div>
                        <p className="comparison-link">{c.connection}</p>
                      </div>
                    ))}
                  </section>
                )}
              </>
            )}
            <section className="panel lesson-review">
              <div>
                <h2>Turn understanding into practice.</h2>
                <p>Choose your formats and difficulty before starting.</p>
              </div>
              <button
                className="primary"
                onClick={() => practice(lesson.unit, topic ? [topic] : [])}
              >
                Build unit quiz
                <ArrowRight size={16} />
              </button>
            </section>
            {!!lesson.sources?.length && (
              <p className="lesson-sources">
                Framework & reading:{" "}
                {lesson.sources.map((source, i) => (
                  <a
                    key={source.url}
                    href={source.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {i > 0 ? " · " : ""}
                    {source.title}
                  </a>
                ))}
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
