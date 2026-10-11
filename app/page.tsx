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
import { courseSubjects, questionBank as coreBank } from "../lib/study/catalog";
import { Exams } from "../components/study/exams";
import { Courses } from "../components/study/courses";

import {
  defaultConfig,
  type Attempt,
  type Config,
  type Question,
  type Store,
} from "../lib/study/types";
import { emptyStore, repository, normalizeStore } from "../lib/study/storage";
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
  Dashboard: "Your recent practice, progress, and next steps.",
  Subjects: "Browse course notes and practice by unit.",
  "Quiz Builder": "Choose topics and build a focused practice set.",
  Practice: "Work through questions and review your reasoning.",
  "Question Banks": "Browse, organize, and create study questions.",
  "FRQ Grading": "Write a response and review it against the scoring rubric.",
  "Practice Exams": "Practice a timed subject or cumulative assessment.",
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
    [reset, setReset] = useState(false),
    [restore, setRestore] = useState<Store | null>(null);
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
  const knownSubjects = [...courseSubjects(store.worldMode), ...store.subjects];
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
    setBuilderConfig({
      ...c,
      worldMode: c.worldMode ?? store.worldMode ?? "standard",
    });
    setBuilderKey((k) => k + 1);
    go("Quiz Builder");
  };
  const start = (c: Config) => {
    try {
      const questions = generate(
        matching(bank, c, store.attempts, undefined, store.flags),
        c.count,
      );
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
            <BookOpen size={25} />
          </span>
          <span>
            Noted<span className="brand-dot">.</span>
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
              <span>Progress saved on this device</span>
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
                  ? "NOTED / OVERVIEW"
                  : "YOUR LEARNING, INTENTIONALLY"}
              </span>
              <h1>{page === "Dashboard" ? "Your study workspace" : page}</h1>
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
                  bank={bank}
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
              {active && (
                <div hidden={page !== "Practice"}>
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
                </div>
              )}
              {page === "Practice" &&
                !active &&
                (review ? (
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
                  bank={bank}
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
                <Courses
                  subjects={subjects}
                  bank={bank}
                  store={store}
                  onSave={save}
                  onBuild={build}
                />
              )}
              {page === "Practice Exams" && (
                <Exams
                  subjects={subjects}
                  worldMode={store.worldMode ?? "standard"}
                  onBuild={build}
                />
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
                          "noted-backup.json",
                          JSON.stringify(store, null, 2),
                        )
                      }
                    >
                      <Download size={16} />
                      Export full backup
                    </button>
                    <p className="small muted">
                      Restore a full backup below, or import individual question
                      sets in Question Banks.
                    </p>
                    <label className="backup-restore">
                      Restore full backup
                      <input
                        type="file"
                        accept=".json"
                        aria-label="Restore full backup"
                        onChange={async (e) => {
                          const f = e.target.files?.[0];
                          if (!f) return;
                          try {
                            if (f.size > 10000000)
                              throw new Error(
                                "Backup must be smaller than 10 MB.",
                              );
                            const next = normalizeStore(
                              JSON.parse(await f.text()),
                            );
                            setRestore(next);
                          } catch (err) {
                            setError(
                              err instanceof Error
                                ? err.message
                                : "Invalid backup.",
                            );
                          }
                          e.target.value = "";
                        }}
                      />
                    </label>
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
              <Sprout size={14} /> Noted ? Study workspace
            </span>
            <span>Your data stays in this browser.</span>
          </footer>
        </main>
      </div>
      {restore && (
        <div className="modal-backdrop">
          <div
            className="panel modal"
            role="dialog"
            aria-modal="true"
            aria-label="Restore backup"
          >
            <h2>Restore this backup?</h2>
            <p>
              This replaces this browser’s workspace with{" "}
              {restore.attempts.length} sessions, {restore.custom.length} custom
              questions, and {restore.presets.length} presets. Export your
              current backup first if you want to keep both.
            </p>
            <div className="flex-row">
              <button className="secondary" onClick={() => setRestore(null)}>
                Cancel
              </button>
              <button
                className="primary"
                onClick={() => {
                  save(restore);
                  setActive(null);
                  setReview(null);
                  setRestore(null);
                  go("Dashboard");
                }}
              >
                Restore workspace
              </button>
            </div>
          </div>
        </div>
      )}
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
