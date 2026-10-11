"use client";
import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  BookOpen,
  SlidersHorizontal,
  PencilLine,
  Library,
  FileCheck2,
  GraduationCap,
  ChartNoAxesCombined,
  Settings,
  ChevronLeft,
  ArrowRight,
  Sun,
  Moon,
  Menu,
  Bell,
  Sprout,
  X,
  Repeat2,
  Download,
} from "lucide-react";
import { subjects as coreSubjects } from "../lib/study/subjects";
import { bank as coreBank } from "../lib/study/bank";
import {
  defaultConfig,
  type Attempt,
  type Config,
  type Question,
  type Store,
} from "../lib/study/types";
import { emptyStore, repository } from "../lib/study/storage";
import { generate, matching, accuracy } from "../lib/study/engine";
import { Builder } from "../components/study/builder";
import { Practice, Review } from "../components/study/practice";
import { Banks, download } from "../components/study/banks";
import { FRQ } from "../components/study/frq";
import { Analytics, Dashboard } from "../components/study/dashboard";
const navigation = [
  { name: "Dashboard", icon: LayoutDashboard },
  { name: "Subjects", icon: BookOpen },
  { name: "Quiz Builder", icon: SlidersHorizontal },
  { name: "Practice", icon: PencilLine },
  { name: "Question Banks", icon: Library },
  { name: "FRQ Grading", icon: FileCheck2 },
  { name: "Practice Exams", icon: GraduationCap },
  { name: "Progress & Analytics", icon: ChartNoAxesCombined },
];
const descriptions: Record<string, string> = {
  Dashboard: "A little progress, every day.",
  Subjects: "Explore your subjects. Build your understanding.",
  "Quiz Builder": "Your goals. Your topics. Your kind of practice.",
  Practice: "Make space for focused learning.",
  "Question Banks": "A growing library of things worth learning.",
  "FRQ Grading": "Better reasoning starts with thoughtful feedback.",
  "Practice Exams": "Prepare with purpose. Practice under pressure.",
  "Progress & Analytics": "See how far you’ve come, and where to go next.",
  Settings: "Make this space work for you.",
};
export default function Home() {
  const [store, setStore] = useState<Store>(emptyStore),
    [ready, setReady] = useState(false),
    [page, setPage] = useState("Dashboard"),
    [collapsed, setCollapsed] = useState(false),
    [mobile, setMobile] = useState(false),
    [error, setError] = useState(""),
    [active, setActive] = useState<{
      questions: Question[];
      config: Config;
    } | null>(null),
    [review, setReview] = useState<Attempt | null>(null),
    [builderConfig, setBuilderConfig] = useState<Config>(defaultConfig),
    [builderKey, setBuilderKey] = useState(0),
    [notifications, setNotifications] = useState(false),
    [reset, setReset] = useState(false);
  // Browser storage must be read after hydration; the first render remains server-safe.
  useEffect(() => {
    try {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setStore(repository.load());
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not read saved data.");
    }
    setReady(true);
    const changed = () => {
      const p = decodeURIComponent(window.location.hash.slice(1));
      if ([...navigation.map((n) => n.name), "Settings"].includes(p))
        setPage(p);
    };
    changed();
    window.addEventListener("hashchange", changed);
    return () => window.removeEventListener("hashchange", changed);
  }, []);
  const save = (next: Store) => {
    try {
      repository.save(next);
      setStore(next);
      setError("");
    } catch {
      setError(
        "Your changes could not be saved. Browser storage may be full or unavailable. Export a backup in Settings.",
      );
    }
  };
  const go = (p: string) => {
    setPage(p);
    window.location.hash = encodeURIComponent(p);
    setMobile(false);
    setError("");
  };
  const bank = [
    ...coreBank.filter(
      (q) =>
        !store.hidden.includes(q.id) &&
        !store.custom.some((x) => x.id === q.id),
    ),
    ...store.custom,
  ];
  const knownSubjects = [...coreSubjects, ...store.subjects];
  // Imported banks can introduce subjects without a separate setup step.
  const importedSubjects = [...new Set(bank.map((q) => q.subject))]
    .filter((id) => !knownSubjects.some((s) => s.id === id))
    .map((id) => ({
      id,
      name: id,
      short: id.slice(0, 4).toUpperCase(),
      description: "An imported question collection.",
      color: "#6f927d",
      units: [
        ...new Set(bank.filter((q) => q.subject === id).map((q) => q.unit)),
      ].map((name) => ({
        name,
        topics: [
          ...new Set(
            bank
              .filter((q) => q.subject === id && q.unit === name)
              .map((q) => q.topic),
          ),
        ],
      })),
    }));
  const subjects = [...knownSubjects, ...importedSubjects];
  const build = (c: Config) => {
    setBuilderConfig(c);
    setBuilderKey((k) => k + 1);
    go("Quiz Builder");
  };
  const start = (c: Config) => {
    try {
      const questions = generate(matching(bank, c, store.attempts), c.count);
      setActive({ questions, config: c });
      setReview(null);
      go("Practice");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unable to create quiz.");
    }
  };
  const finish = (a: Attempt) => {
    save({ ...store, attempts: [...store.attempts, a] });
    setReview(a);
    setActive(null);
  };
  return (
    <div
      className={
        "app-shell " +
        (store.dark ? "dark " : "") +
        (collapsed ? "collapsed " : "") +
        (mobile ? "mobile-open" : "")
      }
    >
      <aside className="sidebar">
        <a className="brand" href="#Dashboard" onClick={() => go("Dashboard")}>
          <span className="brand-mark">
            <Sprout size={25} />
          </span>
          <span>
            studycraft<span className="brand-dot">.</span>
          </span>
        </a>
        <button
          className="collapse-control icon-btn"
          onClick={() => setCollapsed(!collapsed)}
          aria-label="Toggle sidebar"
        >
          <ChevronLeft size={14} />
        </button>
        <div className="sidebar-caption">YOUR LEARNING SPACE</div>
        <nav>
          {navigation.map((n) => (
            <button
              key={n.name}
              className={"nav-item " + (page === n.name ? "active" : "")}
              onClick={() => go(n.name)}
              title={n.name}
            >
              <n.icon size={19} />
              <span>{n.name}</span>
              {n.name === "Quiz Builder" && (
                <span className="nav-new">NEW</span>
              )}
            </button>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="sidebar-note">
            <span>✦</span>
            <strong>
              A little better,
              <br />
              every day.
            </strong>
            <p>
              You don’t have to do it all.
              <br />
              Just take the next step.
            </p>
          </div>
          <button
            className={"nav-item " + (page === "Settings" ? "active" : "")}
            onClick={() => go("Settings")}
            title="Settings"
          >
            <Settings size={19} />
            <span>Settings</span>
          </button>
          <div className="user-profile">
            <div className="avatar">Y</div>
            <div>
              <strong>Your workspace</strong>
              <span>Curiosity looks good on you</span>
            </div>
            <span className="online-dot" />
          </div>
        </div>
      </aside>
      {mobile && (
        <button
          className="mobile-scrim"
          aria-label="Close navigation"
          onClick={() => setMobile(false)}
        />
      )}
      <div className="main-area">
        <header className="topbar">
          <div className="breadcrumb">
            <button
              className="icon-btn mobile-menu"
              aria-label="Open navigation"
              onClick={() => setMobile(!mobile)}
            >
              <Menu size={20} />
            </button>
            <span>My workspace</span>
            <span>/</span>
            <strong>{page}</strong>
          </div>
          <div className="topbar-actions">
            <span className="date-text">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </span>
            <button
              className="icon-btn"
              aria-label="Toggle dark mode"
              onClick={() => save({ ...store, dark: !store.dark })}
            >
              {store.dark ? <Sun size={19} /> : <Moon size={19} />}
            </button>
            <button
              className="icon-btn"
              aria-label="Study reminders"
              onClick={() => setNotifications(!notifications)}
            >
              <Bell size={19} />
              {store.goals.length > 0 && <span className="notification-dot" />}
            </button>
            <span className="avatar small-avatar">Y</span>
          </div>
          {notifications && (
            <div className="notifications panel">
              <div className="section-label">
                <h3>Your study reminders</h3>
                <button
                  className="icon-btn"
                  aria-label="Close reminders"
                  onClick={() => setNotifications(false)}
                >
                  <X size={16} />
                </button>
              </div>
              {store.goals.length ? (
                store.goals.map((g) => (
                  <p key={g.id}>
                    <strong>{g.name}</strong>
                    <br />
                    {g.deadline || "No deadline"} ·{" "}
                    {Math.max(0, g.target - accuracy(store.attempts).answered)}{" "}
                    questions remaining
                  </p>
                ))
              ) : (
                <p className="small muted">
                  Add a study goal on your dashboard to see reminders here.
                </p>
              )}
            </div>
          )}
        </header>
        <main className="content">
          <div className="page-heading">
            <div>
              <span className="eyebrow">
                {page === "Dashboard"
                  ? "LET’S MAKE TODAY COUNT"
                  : "YOUR LEARNING, INTENTIONALLY"}
              </span>
              <h1>
                {page === "Dashboard" ? "Welcome to your next chapter." : page}
              </h1>
              <p>{descriptions[page]}</p>
            </div>
            {page === "Dashboard" && (
              <button
                className="secondary"
                onClick={() =>
                  build({ ...defaultConfig, mode: "Spaced Repetition" })
                }
              >
                <Repeat2 size={16} />
                Daily review
              </button>
            )}
          </div>
          {error && (
            <div className="error" role="alert">
              {error}
            </div>
          )}
          {!ready ? (
            <div className="panel empty">Opening your learning space…</div>
          ) : (
            <>
              {page === "Dashboard" && (
                <Dashboard
                  store={store}
                  subjects={subjects}
                  onSave={save}
                  onPage={go}
                  onBuild={build}
                />
              )}
              {page === "Quiz Builder" && (
                <Builder
                  key={builderKey}
                  bank={bank}
                  subjects={subjects}
                  store={store}
                  onSave={save}
                  onStart={start}
                  initial={builderConfig}
                />
              )}
              {page === "Practice" &&
                (active ? (
                  <Practice
                    key={
                      active.questions.map((q) => q.id).join(",") +
                      JSON.stringify(active.config)
                    }
                    questions={active.questions}
                    config={active.config}
                    store={store}
                    onSave={save}
                    onFinish={finish}
                  />
                ) : review ? (
                  <Review
                    attempt={review}
                    onRetry={(questions) => {
                      setReview(null);
                      setActive({
                        questions,
                        config: {
                          ...review.config,
                          count: questions.length,
                          mode: "Standard",
                          timeMode: "Untimed",
                        },
                      });
                    }}
                    onNew={() => start(review.config)}
                  />
                ) : (
                  <section className="panel empty practice-empty">
                    <span className="empty-icon">
                      <PencilLine size={32} />
                    </span>
                    <h2>A fresh page. A focused mind.</h2>
                    <p>Build a quiz that fits what you want to learn today.</p>
                    <button
                      className="primary"
                      onClick={() => go("Quiz Builder")}
                    >
                      Create a practice session
                      <ArrowRight size={16} />
                    </button>
                    <div className="flex-row">
                      <button
                        className="text-button"
                        onClick={() =>
                          build({
                            ...defaultConfig,
                            mode: "Incorrect Questions",
                            count: 5,
                          })
                        }
                      >
                        Review incorrect questions
                      </button>
                      <button
                        className="text-button"
                        onClick={() =>
                          build({
                            ...defaultConfig,
                            mode: "Spaced Repetition",
                            count: 5,
                          })
                        }
                      >
                        Spaced repetition
                      </button>
                    </div>
                  </section>
                ))}
              {page === "Question Banks" && (
                <Banks
                  bank={bank}
                  subjects={subjects}
                  store={store}
                  onSave={save}
                />
              )}
              {page === "FRQ Grading" && (
                <FRQ bank={bank} store={store} onSave={save} />
              )}
              {page === "Progress & Analytics" && (
                <Analytics
                  store={store}
                  subjects={subjects}
                  onBuild={build}
                  onReview={(id) => {
                    setReview(store.attempts.find((a) => a.id === id)!);
                    setActive(null);
                    go("Practice");
                  }}
                />
              )}
              {page === "Subjects" && (
                <div className="subject-detail-grid">
                  {subjects.map((s) => (
                    <section className="panel subject-detail" key={s.id}>
                      <div className="section-label">
                        <span
                          className="subject-icon"
                          style={{ background: s.color + "18", color: s.color }}
                        >
                          {s.short}
                        </span>
                        <span className="tag">
                          {bank.filter((q) => q.subject === s.id).length}{" "}
                          questions
                        </span>
                      </div>
                      <h2>{s.name}</h2>
                      <p className="muted">{s.description}</p>
                      <details>
                        <summary>{s.units.length} organized units</summary>
                        {s.units.map((u) => (
                          <div className="unit-row" key={u.name}>
                            <strong>{u.name}</strong>
                            <p>{u.topics.join(" · ")}</p>
                            <button
                              className="text-button"
                              onClick={() =>
                                build({
                                  ...defaultConfig,
                                  subjects: [s.id],
                                  units: [u.name],
                                  count: 5,
                                })
                              }
                            >
                              Practice unit
                              <ArrowRight size={13} />
                            </button>
                          </div>
                        ))}
                      </details>
                      <button
                        className="secondary full"
                        onClick={() =>
                          build({ ...defaultConfig, subjects: [s.id] })
                        }
                      >
                        Explore {s.name}
                        <ArrowRight size={16} />
                      </button>
                    </section>
                  ))}
                </div>
              )}
              {page === "Practice Exams" && (
                <>
                  <div className="notice">
                    Short original practice sets, not official or full-length
                    exams. Customize formats, topics, and time limits before
                    starting.
                  </div>
                  <div className="exam-grid">
                    {[
                      {
                        name: "SAT skill check",
                        subject: "sat",
                        time: 15,
                        description:
                          "A focused mix of math and reading & writing.",
                        types: [],
                      },
                      {
                        name: "AMC problem solving",
                        subject: "amc",
                        time: 25,
                        description:
                          "Creative problems across four competition areas.",
                        types: [],
                      },
                      {
                        name: "AP World unit practice",
                        subject: "world",
                        time: 15,
                        description:
                          "Historical reasoning through original multiple-choice questions.",
                        types: ["MCQ"],
                      },
                      {
                        name: "AP Statistics check-in",
                        subject: "stats",
                        time: 20,
                        description:
                          "Calculations, interpretation, and statistical thinking.",
                        types: [],
                      },
                      {
                        name: "Java fundamentals",
                        subject: "csa",
                        time: 20,
                        description:
                          "Expressions, loops, arrays, and algorithms.",
                        types: ["MCQ", "Numerical"],
                      },
                      {
                        name: "Mixed-subject challenge",
                        subject: "",
                        time: 20,
                        description:
                          "Bring different subjects into one focused session.",
                        types: [],
                      },
                    ].map((e, i) => (
                      <section className="panel exam-card" key={e.name}>
                        <span className="exam-number">0{i + 1}</span>
                        <GraduationCap size={27} />
                        <h2>{e.name}</h2>
                        <p className="muted">{e.description}</p>
                        <div className="chips">
                          <span className="tag">10 questions requested</span>
                          <span className="tag">{e.time} minutes</span>
                        </div>
                        <button
                          className="primary full"
                          onClick={() =>
                            build({
                              ...defaultConfig,
                              subjects: e.subject ? [e.subject] : [],
                              types: e.types,
                              count: 10,
                              timeMode: "Total quiz",
                              minutes: e.time,
                              mode: "Exam Simulation",
                              name: e.name,
                            })
                          }
                        >
                          Customize exam
                          <ArrowRight size={16} />
                        </button>
                      </section>
                    ))}
                  </div>
                </>
              )}
              {page === "Settings" && (
                <div className="settings-grid">
                  <section className="panel">
                    <h2>Make yourself at home.</h2>
                    <label className="setting-row">
                      <span>
                        <strong>Dark mode</strong>
                        <p className="small muted">
                          A softer space for late-night study.
                        </p>
                      </span>
                      <input
                        type="checkbox"
                        checked={store.dark}
                        onChange={(e) =>
                          save({ ...store, dark: e.target.checked })
                        }
                      />
                    </label>
                    <label>
                      Daily study target (minutes)
                      <input
                        type="number"
                        min="1"
                        max="1440"
                        value={store.dailyTarget}
                        onChange={(e) => {
                          const value = Number(e.target.value);
                          if (value >= 1 && value <= 1440)
                            save({ ...store, dailyTarget: value });
                        }}
                      />
                    </label>
                  </section>
                  <section className="panel">
                    <h2>Your data, on your device.</h2>
                    <p className="muted">
                      Question sets, quiz presets, flags, goals, and attempts
                      are saved in this browser. Other devices have separate
                      progress.
                    </p>
                    <button
                      className="secondary"
                      onClick={() =>
                        download(
                          "studycraft-backup.json",
                          JSON.stringify(store, null, 2),
                        )
                      }
                    >
                      <Download size={16} />
                      Export full backup
                    </button>
                    <p className="small muted">
                      Question sets can be reimported in Question Banks. Full
                      backups preserve records for safekeeping.
                    </p>
                    <button
                      className="text-button danger"
                      onClick={() => setReset(true)}
                    >
                      Reset local workspace
                    </button>
                  </section>
                  <section className="panel">
                    <h2>Grading & scoring</h2>
                    <p>
                      Automatic grading supports numerical, multiple-choice,
                      multiple-select, and exact short answers. Written
                      responses use manual rubrics unless a server-side AI
                      provider is configured.
                    </p>
                    <p className="small muted">
                      Rubric scores are study estimates, not official AP scores.
                      Programming answers are not executed.
                    </p>
                  </section>
                  <section className="panel">
                    <h2>Your question collection</h2>
                    <p>
                      {bank.length} questions · {store.custom.length} custom or
                      imported · {store.attempts.length} saved sessions
                    </p>
                    <button
                      className="secondary"
                      onClick={() => go("Question Banks")}
                    >
                      Manage question banks
                      <ArrowRight size={16} />
                    </button>
                  </section>
                </div>
              )}
            </>
          )}
          <footer className="page-footer">
            <span>
              <Sprout size={14} /> Built for steady progress.
            </span>
            <span>Your pace. Your possibility.</span>
          </footer>
        </main>
      </div>
      {reset && (
        <div className="modal-backdrop">
          <div
            className="panel modal"
            role="dialog"
            aria-modal="true"
            aria-label="Reset local data"
          >
            <h2>Reset this workspace?</h2>
            <p>
              This removes all local attempts, goals, presets, and custom
              questions. Export a backup first.
            </p>
            <div className="flex-row">
              <button className="secondary" onClick={() => setReset(false)}>
                Cancel
              </button>
              <button
                className="primary"
                onClick={() => {
                  save(structuredClone(emptyStore));
                  setActive(null);
                  setReview(null);
                  setReset(false);
                  go("Dashboard");
                }}
              >
                Reset data
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
