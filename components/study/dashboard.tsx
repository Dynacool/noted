"use client";
import { useState } from "react";
import {
  ArrowRight,
  Clock3,
  Target,
  Flame,
  BookOpen,
  CheckCircle2,
  Plus,
  Trash2,
  TrendingUp,
} from "lucide-react";
import { accuracy, topicStats } from "../../lib/study/engine";
import {
  defaultConfig,
  type Config,
  type Store,
  type Subject,
} from "../../lib/study/types";
const dayKey = (d: Date) => `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
export function streak(store: Store) {
  const dates = new Set(store.attempts.map((a) => dayKey(new Date(a.date))));
  const d = new Date();
  if (!dates.has(dayKey(d))) d.setDate(d.getDate() - 1);
  let n = 0;
  while (dates.has(dayKey(d))) {
    n++;
    d.setDate(d.getDate() - 1);
  }
  return n;
}
export function ActivityChart({ store }: { store: Store }) {
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - 6 + i);
    return {
      label: d.toLocaleDateString("en", { weekday: "short" }),
      minutes: Math.round(
        store.attempts
          .filter((a) => dayKey(new Date(a.date)) === dayKey(d))
          .reduce((s, a) => s + a.seconds, 0) / 60,
      ),
    };
  });
  const max = Math.max(20, ...days.map((d) => d.minutes));
  return (
    <div
      className="activity-chart"
      aria-label="Study minutes over the last seven days"
    >
      <div className="chart-axis">
        <span>{max}m</span>
        <span>{Math.round(max / 2)}m</span>
        <span>0m</span>
      </div>
      <div className="chart-bars">
        {days.map((d, i) => (
          <div className="chart-column" key={i}>
            <div className="bar-space">
              <div
                className={i === 6 ? "chart-bar today" : "chart-bar"}
                style={{ height: `${(d.minutes / max) * 100}%` }}
                title={`${d.label}: ${d.minutes} minutes`}
              >
                {d.minutes > 0 && <span>{d.minutes}m</span>}
              </div>
            </div>
            <span>{d.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
export function Dashboard({
  store,
  subjects,
  onSave,
  onPage,
  onBuild,
}: {
  store: Store;
  subjects: Subject[];
  onSave: (s: Store) => void;
  onPage: (p: string) => void;
  onBuild: (c: Config) => void;
}) {
  const [now] = useState(() => Date.now());
  const stats = accuracy(store.attempts),
    today = store.attempts.filter(
      (a) => dayKey(new Date(a.date)) === dayKey(new Date()),
    ),
    minutes = Math.floor(today.reduce((s, a) => s + a.seconds, 0) / 60),
    weak = topicStats(store.attempts),
    week = store.attempts
      .filter((a) => now - Date.parse(a.date) < 7 * 86400000)
      .reduce((s, a) => s + a.seconds, 0);
  const [goal, setGoal] = useState(""),
    [target, setTarget] = useState(50),
    [deadline, setDeadline] = useState("");
  return (
    <>
      <section className="welcome-banner">
        <div>
          <div className="eyebrow">
            <span>✦</span> SMALL STEPS. BIG POSSIBILITIES.
          </div>
          <h2>
            Your next chapter
            <br />
            starts with a little practice.
          </h2>
          <p>A focused session today. A more confident you tomorrow.</p>
          <button className="primary" onClick={() => onPage("Quiz Builder")}>
            Build a practice quiz
            <ArrowRight size={17} />
          </button>
        </div>
        <div className="banner-art" aria-hidden="true">
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <div className="book-art">
            <div className="book-spine" />
            <span>
              Keep
              <br />
              growing.
            </span>
            <div className="book-lines" />
          </div>
          <span className="art-star star-one">✦</span>
          <span className="art-star star-two">✧</span>
          <span className="art-dot" />
        </div>
      </section>
      <div className="stats-grid">
        {[
          {
            icon: Clock3,
            name: "Study time today",
            value: `${minutes} min`,
            note: `${Math.floor(week / 60)} min this week · ${store.dailyTarget}m daily target`,
            color: "green",
          },
          {
            icon: CheckCircle2,
            name: "Questions answered",
            value: String(stats.answered),
            note: `${today.reduce((s, a) => s + a.results.length, 0)} practiced today`,
            color: "purple",
          },
          {
            icon: Target,
            name: "Overall accuracy",
            value: stats.answered ? `${stats.percent}%` : "—",
            note: stats.answered
              ? "Across assessed answers"
              : "Your first session starts here",
            color: "orange",
          },
          {
            icon: Flame,
            name: "Study streak",
            value: `${streak(store)} days`,
            note: "A little consistency goes a long way",
            color: "pink",
          },
        ].map((s) => (
          <section className="stat-card panel" key={s.name}>
            <div className="stat-top">
              <span>{s.name}</span>
              <span className={"stat-icon " + s.color}>
                <s.icon size={18} />
              </span>
            </div>
            <strong>{s.value}</strong>
            <p>{s.note}</p>
          </section>
        ))}
      </div>
      <div className="dashboard-middle">
        <section className="panel activity-panel">
          <div className="section-label">
            <h2>Building momentum</h2>
            <span className="tag">Last 7 days</span>
          </div>
          <div className="activity-total">
            <strong>
              {Math.floor(week / 60)} <span>minutes</span>
            </strong>
            <span className="small muted">Every session counts.</span>
          </div>
          <ActivityChart store={store} />
        </section>
        <section className="panel focus-panel">
          <div className="section-label">
            <h2>Your next focus</h2>
            <span className="stat-icon orange">
              <TrendingUp size={18} />
            </span>
          </div>
          {weak.length ? (
            <>
              <span className="eyebrow">BASED ON YOUR PRACTICE</span>
              <h3>{weak[0].topic}</h3>
              <p>
                {subjects.find((s) => s.id === weak[0].subject)?.name} ·{" "}
                {Math.round((100 * weak[0].correct) / weak[0].total)}% accuracy
              </p>
              <button
                className="secondary full"
                onClick={() =>
                  onBuild({
                    ...defaultConfig,
                    subjects: [weak[0].subject],
                    topics: [weak[0].topic],
                    count: 5,
                  })
                }
              >
                Practice this topic
                <ArrowRight size={15} />
              </button>
            </>
          ) : (
            <>
              <div className="focus-illustration">
                <Target size={42} />
                <span>✦</span>
              </div>
              <h3>Let’s find your starting point.</h3>
              <p>
                Complete a quiz to get a recommendation based on your results.
              </p>
              <button
                className="secondary full"
                onClick={() => onPage("Quiz Builder")}
              >
                Find your focus
                <ArrowRight size={15} />
              </button>
            </>
          )}
        </section>
      </div>
      <section className="subjects-section">
        <div className="section-label">
          <div>
            <h2>A world of things to learn</h2>
            <p className="muted small">Choose a subject. Find your stride.</p>
          </div>
          <button className="text-button" onClick={() => onPage("Subjects")}>
            Explore all subjects
            <ArrowRight size={15} />
          </button>
        </div>
        <div className="subject-cards">
          {subjects.slice(0, 4).map((s) => (
            <button
              className="panel subject-card"
              key={s.id}
              onClick={() => onBuild({ ...defaultConfig, subjects: [s.id] })}
            >
              <div className="section-label">
                <span
                  className="subject-icon"
                  style={{ background: s.color + "18", color: s.color }}
                >
                  {s.short}
                </span>
                <ArrowRight size={16} className="muted" />
              </div>
              <h3>{s.name}</h3>
              <p>{s.description}</p>
              <span className="small muted">
                {s.units.length} units · Original exercises
              </span>
            </button>
          ))}
        </div>
      </section>
      <div className="dashboard-bottom">
        <section className="panel">
          <div className="section-label">
            <h2>Recent sessions</h2>
            <button
              className="text-button"
              onClick={() => onPage("Progress & Analytics")}
            >
              View all
              <ArrowRight size={14} />
            </button>
          </div>
          {store.attempts.length ? (
            store.attempts
              .slice(-3)
              .reverse()
              .map((a) => (
                <div className="session-row" key={a.id}>
                  <span className="session-icon">
                    <BookOpen size={18} />
                  </span>
                  <div>
                    <strong>{a.config.name ?? "Practice session"}</strong>
                    <p>
                      {new Date(a.date).toLocaleDateString()} ·{" "}
                      {a.results.length} questions
                    </p>
                  </div>
                  <span className="tag">
                    {accuracy([a]).answered
                      ? accuracy([a]).percent + "%"
                      : "Needs review"}
                  </span>
                </div>
              ))
          ) : (
            <div className="empty compact">
              <BookOpen size={27} />
              <h3>Your journey, recorded here.</h3>
              <p>Finish a practice session to see your results.</p>
            </div>
          )}
        </section>
        <section className="panel goals-panel">
          <div className="section-label">
            <h2>Study goals</h2>
            <span className="small muted">MAKE ROOM TO GROW</span>
          </div>
          {store.goals.map((g) => (
            <div className="goal-row" key={g.id}>
              <div>
                <strong>{g.name}</strong>
                <p>
                  {stats.answered}/{g.target} assessed questions ·{" "}
                  {g.deadline || "No deadline"}
                </p>
                <div className="progress-track">
                  <div
                    style={{
                      width: `${Math.min(100, (stats.answered / g.target) * 100)}%`,
                    }}
                  />
                </div>
              </div>
              <button
                className="icon-btn"
                aria-label={`Delete goal ${g.name}`}
                onClick={() =>
                  onSave({
                    ...store,
                    goals: store.goals.filter((x) => x.id !== g.id),
                  })
                }
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
          {!store.goals.length && (
            <p className="muted small">
              Set a question target to keep your practice intentional.
            </p>
          )}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!goal.trim()) return;
              onSave({
                ...store,
                goals: [
                  ...store.goals,
                  {
                    id: crypto.randomUUID(),
                    name: goal.trim(),
                    target,
                    deadline,
                  },
                ],
              });
              setGoal("");
            }}
          >
            <input
              required
              aria-label="Goal name"
              placeholder="e.g. Build my math confidence"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
            />
            <div className="goal-inputs">
              <input
                required
                type="number"
                aria-label="Goal question target"
                min="1"
                max="100000"
                value={target}
                onChange={(e) => setTarget(Number(e.target.value))}
              />
              <input
                type="date"
                aria-label="Goal deadline"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
              />
              <button className="icon-btn" aria-label="Add goal">
                <Plus size={19} />
              </button>
            </div>
          </form>
        </section>
      </div>
    </>
  );
}
export function Analytics({
  store,
  subjects,
  onReview,
  onBuild,
}: {
  store: Store;
  subjects: Subject[];
  onReview: (id: string) => void;
  onBuild: (c: Config) => void;
}) {
  const topics = topicStats(store.attempts),
    stats = accuracy(store.attempts);
  return (
    <>
      <div className="stats-grid">
        {[
          ["Assessed questions", stats.answered],
          ["Accuracy", stats.answered ? stats.percent + "%" : "—"],
          [
            "Study minutes",
            Math.floor(store.attempts.reduce((s, a) => s + a.seconds, 0) / 60),
          ],
          ["Streak", streak(store) + " days"],
        ].map(([label, value]) => (
          <div className="panel stat-card" key={label}>
            <span>{label}</span>
            <strong>{value}</strong>
          </div>
        ))}
      </div>
      <div className="dashboard-middle">
        <section className="panel">
          <h2>Your study rhythm</h2>
          <ActivityChart store={store} />
        </section>
        <section className="panel">
          <h2>Accuracy by subject</h2>
          {subjects.map((s) => {
            const r = store.attempts.flatMap((a) =>
                a.results.filter(
                  (r) =>
                    a.questions.find((q) => q.id === r.questionId)?.subject ===
                      s.id && r.correct !== null,
                ),
              ),
              p = r.length
                ? Math.round(
                    (100 * r.filter((r) => r.correct).length) / r.length,
                  )
                : 0;
            return (
              <div className="accuracy-row" key={s.id}>
                <div>
                  <span>{s.name}</span>
                  <span>{r.length ? p + "%" : "No practice yet"}</span>
                </div>
                <div className="progress-track">
                  <div style={{ width: p + "%", background: s.color }} />
                </div>
              </div>
            );
          })}
        </section>
      </div>
      <section className="panel">
        <div className="section-label">
          <h2>Topics to revisit</h2>
          <span className="muted small">Lowest accuracy first</span>
        </div>
        {topics.map((t) => (
          <div className="topic-row" key={t.subject + t.topic}>
            <div>
              <strong>{t.topic}</strong>
              <p className="small muted">
                {subjects.find((s) => s.id === t.subject)?.name} · {t.total}{" "}
                assessed
              </p>
            </div>
            <span>{Math.round((100 * t.correct) / t.total)}%</span>
            <button
              className="secondary"
              onClick={() =>
                onBuild({
                  ...defaultConfig,
                  subjects: [t.subject],
                  topics: [t.topic],
                  count: 5,
                })
              }
            >
              Practice
              <ArrowRight size={14} />
            </button>
          </div>
        ))}
        {!topics.length && (
          <div className="empty">
            <Target />
            <p>Recommendations appear after your first assessed session.</p>
          </div>
        )}
      </section>
      <section className="panel">
        <h2>Session history</h2>
        {store.attempts
          .slice()
          .reverse()
          .map((a) => (
            <button
              className="session-row full"
              key={a.id}
              onClick={() => onReview(a.id)}
            >
              <span className="session-icon">
                <BookOpen size={18} />
              </span>
              <div>
                <strong>{a.config.name ?? "Practice session"}</strong>
                <p>
                  {new Date(a.date).toLocaleString()} · {a.results.length}{" "}
                  questions · {Math.floor(a.seconds / 60)} min
                </p>
              </div>
              <span>
                {accuracy([a]).answered
                  ? accuracy([a]).percent + "%"
                  : "Needs review"}
              </span>
              <ArrowRight size={16} />
            </button>
          ))}
        {!store.attempts.length && (
          <div className="empty">
            <p>Start a quiz to begin tracking your progress.</p>
          </div>
        )}
      </section>
    </>
  );
}
