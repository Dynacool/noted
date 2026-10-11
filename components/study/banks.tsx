"use client";
import { useRef, useState } from "react";
import {
  Download,
  Upload,
  Plus,
  Search,
  Pencil,
  Copy,
  Trash2,
  X,
} from "lucide-react";
import {
  questionTypes,
  type Question,
  type Store,
  type Subject,
} from "../../lib/study/types";
import {
  exportCSV,
  importFile,
  validateQuestions,
} from "../../lib/study/import";
import { MathText } from "./math-text";
export function download(
  name: string,
  data: string,
  type = "application/json",
) {
  const url = URL.createObjectURL(new Blob([data], { type }));
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
export function Banks({
  bank,
  subjects,
  store,
  onSave,
}: {
  bank: Question[];
  subjects: Subject[];
  store: Store;
  onSave: (s: Store) => void;
}) {
  const [search, setSearch] = useState(""),
    [subject, setSubject] = useState(""),
    [collection, setCollection] = useState(""),
    [editor, setEditor] = useState<Question | null>(null),
    [error, setError] = useState(""),
    [notice, setNotice] = useState(""),
    [deleteId, setDeleteId] = useState(""),
    [newSubject, setNewSubject] = useState("");
  const [page, setPage] = useState(0),
    [source, setSource] = useState(""),
    [flagsOnly, setFlagsOnly] = useState(false);
  const file = useRef<HTMLInputElement>(null);
  const visible = bank.filter(
    (q) =>
      (!subject || q.subject === subject) &&
      (!collection || q.collection === collection) &&
      (!source || q.source === source) &&
      (!flagsOnly || store.flags.includes(q.id)) &&
      `${q.prompt} ${q.topic} ${q.tags.join(" ")}`
        .toLowerCase()
        .includes(search.toLowerCase()),
  );
  const create = () =>
    setEditor({
      id: crypto.randomUUID(),
      subject: subjects[0].id,
      unit: subjects[0].units[0].name,
      topic: subjects[0].units[0].topics[0],
      subtopic: "",
      difficulty: "Medium",
      type: "MCQ",
      prompt: "",
      options: ["", ""],
      answer: "",
      explanation: "",
      hint: "",
      tags: [],
      source: "Custom",
      collection: "My questions",
    });
  return (
    <>
      <div className="bank-toolbar">
        <div className="search-input">
          <Search size={17} />
          <input
            placeholder="Search questions, topics, or tags"
            aria-label="Search questions"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(0);
            }}
          />
        </div>
        <button className="secondary" onClick={() => file.current?.click()}>
          <Upload size={16} />
          Import
        </button>
        <button
          className="secondary"
          onClick={() =>
            download("noted-questions.json", JSON.stringify(visible, null, 2))
          }
          disabled={!visible.length}
        >
          <Download size={16} />
          JSON
        </button>
        <button
          className="secondary"
          onClick={() =>
            download("noted-questions.csv", exportCSV(visible), "text/csv")
          }
          disabled={!visible.length}
        >
          CSV
        </button>
        <button className="primary" onClick={create}>
          <Plus size={16} />
          Add question
        </button>
        <input
          ref={file}
          className="hidden"
          type="file"
          accept=".json,.csv"
          aria-label="Import question file"
          onChange={async (e) => {
            const f = e.target.files?.[0];
            if (!f) return;
            try {
              if (f.size > 5000000)
                throw new Error("Files must be smaller than 5 MB.");
              const imported = importFile(await f.text(), f.name).map((q) => ({
                ...q,
                id: crypto.randomUUID(),
              }));
              onSave({ ...store, custom: [...store.custom, ...imported] });
              setNotice(
                `Imported ${imported.length} questions. New IDs were assigned to avoid collisions.`,
              );
              setError("");
            } catch (err) {
              setError(err instanceof Error ? err.message : "Invalid file.");
            }
            e.target.value = "";
          }}
        />
      </div>
      {error && (
        <div role="alert" className="error">
          {error}
        </div>
      )}
      {notice && (
        <div role="status" className="notice">
          {notice}
        </div>
      )}
      <section className="panel">
        <div className="flex-row bank-filters">
          <select
            aria-label="Filter subject"
            value={subject}
            onChange={(e) => {
              setSubject(e.target.value);
              setPage(0);
            }}
          >
            <option value="">All subjects</option>
            {subjects.map((s) => (
              <option value={s.id} key={s.id}>
                {s.name}
              </option>
            ))}
          </select>
          <select
            aria-label="Filter collection"
            value={collection}
            onChange={(e) => {
              setCollection(e.target.value);
              setPage(0);
            }}
          >
            <option value="">All collections</option>
            {[...new Set(bank.map((q) => q.collection))].map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
          <span className="muted small">{visible.length} questions</span>
          <select
            aria-label="Filter source"
            value={source}
            onChange={(e) => {
              setSource(e.target.value);
              setPage(0);
            }}
          >
            <option value="">All sources</option>
            {["Preloaded", "Imported", "Custom"].map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
          <label className="checkbox-row">
            <input
              type="checkbox"
              checked={flagsOnly}
              onChange={(e) => {
                setFlagsOnly(e.target.checked);
                setPage(0);
              }}
            />
            Flagged only
          </label>
        </div>
        <div className="bank-list">
          {visible
            .slice(
              Math.min(page, Math.max(0, Math.ceil(visible.length / 30) - 1)) *
                30,
              (Math.min(page, Math.max(0, Math.ceil(visible.length / 30) - 1)) +
                1) *
                30,
            )
            .map((q) => (
              <article className="bank-question" key={q.id}>
                <div>
                  <div className="question-meta">
                    <span className="tag">
                      {subjects.find((s) => s.id === q.subject)?.name ??
                        q.subject}
                    </span>
                    <span>{q.type}</span>
                    <span>{q.difficulty}</span>
                    {q.scope === "background" && (
                      <span className="tag">600–1200 background</span>
                    )}
                    {q.scope === "extension" && (
                      <span className="tag">Enrichment</span>
                    )}
                    <span className="small muted">{q.source}</span>
                  </div>
                  <h3>
                    <MathText text={q.prompt} />
                  </h3>
                  <p className="small muted">
                    {q.unit} / {q.topic} · {q.collection}
                  </p>
                </div>
                <div className="flex-row">
                  <button
                    className="icon-btn"
                    aria-label={`Edit ${q.id}`}
                    onClick={() => {
                      setError("");
                      setEditor(q);
                    }}
                  >
                    <Pencil size={15} />
                  </button>
                  <button
                    className="icon-btn"
                    aria-label={`Duplicate ${q.id}`}
                    onClick={() => {
                      onSave({
                        ...store,
                        custom: [
                          ...store.custom,
                          {
                            ...q,
                            id: crypto.randomUUID(),
                            source: "Custom",
                            collection: "My questions",
                          },
                        ],
                      });
                      setNotice("Question duplicated into My questions.");
                    }}
                  >
                    <Copy size={15} />
                  </button>
                  <button
                    className="icon-btn"
                    aria-label={`Delete ${q.id}`}
                    onClick={() => setDeleteId(q.id)}
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </article>
            ))}
          {!visible.length && (
            <div className="empty">
              <Search />
              <h3>No questions here yet</h3>
              <p>
                Change your filters, import a set, or write your first question.
              </p>
            </div>
          )}
        </div>
        {visible.length > 30 && (
          <div className="pagination">
            <button
              className="secondary"
              disabled={page === 0}
              onClick={() => setPage(Math.max(0, page - 1))}
            >
              Previous
            </button>
            <span>
              Page {Math.min(page + 1, Math.ceil(visible.length / 30))} of{" "}
              {Math.ceil(visible.length / 30)}
            </span>
            <button
              className="secondary"
              disabled={page >= Math.ceil(visible.length / 30) - 1}
              onClick={() => setPage(page + 1)}
            >
              Next
            </button>
          </div>
        )}
      </section>
      <details className="panel">
        <summary>Import format & custom subjects</summary>
        <p className="small">
          Export any question to get a valid template. JSON files contain an
          array of question objects. CSV uses the same field names, with
          options, tags, and rubrics as JSON inside quoted cells. Supported
          types: {questionTypes.join(", ")}. PDF/document imports are reserved
          for a future adapter.
        </p>
        <button
          className="secondary"
          onClick={() =>
            download(
              "question-template.json",
              JSON.stringify([bank[0]], null, 2),
            )
          }
        >
          Download a template
        </button>
        <div className="flex-row mt">
          <input
            aria-label="Custom subject name"
            placeholder="New subject name"
            value={newSubject}
            onChange={(e) => setNewSubject(e.target.value)}
          />
          <button
            className="secondary"
            disabled={!newSubject.trim()}
            onClick={() => {
              onSave({
                ...store,
                subjects: [
                  ...store.subjects,
                  {
                    id: crypto.randomUUID(),
                    name: newSubject.trim(),
                    short: newSubject.trim().slice(0, 4).toUpperCase(),
                    description: "Your custom question collection.",
                    color: "#6f927d",
                    units: [{ name: "General", topics: ["General"] }],
                  },
                ],
              });
              setNewSubject("");
            }}
          >
            Create subject
          </button>
        </div>
      </details>
      {deleteId && (
        <div className="modal-backdrop">
          <div
            className="panel modal"
            role="dialog"
            aria-modal="true"
            aria-label="Delete question"
          >
            <h2>Remove this question?</h2>
            <p>Past quiz results retain their question snapshots.</p>
            <div className="flex-row">
              <button className="secondary" onClick={() => setDeleteId("")}>
                Cancel
              </button>
              <button
                className="primary"
                onClick={() => {
                  onSave({
                    ...store,
                    custom: store.custom.filter((q) => q.id !== deleteId),
                    hidden: [...store.hidden, deleteId],
                  });
                  setDeleteId("");
                }}
              >
                Remove question
              </button>
            </div>
          </div>
        </div>
      )}
      {editor && (
        <QuestionEditor
          question={editor}
          subjects={subjects}
          onClose={() => setEditor(null)}
          onSubmit={(q) => {
            onSave({
              ...store,
              custom: [
                ...store.custom.filter((x) => x.id !== q.id),
                { ...q, source: "Custom" },
              ],
              hidden: store.hidden.filter((id) => id !== q.id),
            });
            setEditor(null);
            setNotice("Question saved.");
          }}
        />
      )}
    </>
  );
}
function QuestionEditor({
  question,
  subjects,
  onClose,
  onSubmit,
}: {
  question: Question;
  subjects: Subject[];
  onClose: () => void;
  onSubmit: (q: Question) => void;
}) {
  const [q, setQ] = useState(question),
    [error, setError] = useState(""),
    [rubric, setRubric] = useState(
      question.rubric ?? [
        {
          criterion: "Correct reasoning",
          points: 1,
          guidance: "Explain the relevant concept accurately.",
        },
      ],
    );
  const set = (key: keyof Question, value: unknown) =>
    setQ({ ...q, [key]: value });
  const written = ["SAQ", "DBQ", "LEQ", "FRQ", "Java"].includes(q.type);
  return (
    <div
      className="modal-backdrop"
      onKeyDown={(e) => {
        if (e.key === "Escape") onClose();
      }}
    >
      <section
        className="panel modal editor"
        role="dialog"
        aria-modal="true"
        aria-label="Question editor"
      >
        <div className="section-label">
          <h2>Question studio</h2>
          <button
            className="icon-btn"
            aria-label="Close editor"
            onClick={onClose}
          >
            <X size={20} />
          </button>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            try {
              const [valid] = validateQuestions(
                [{ ...q, rubric: written ? rubric : undefined }],
                "Custom",
              );
              onSubmit(valid);
            } catch (err) {
              setError(
                err instanceof Error ? err.message : "Invalid question.",
              );
            }
          }}
        >
          <div className="form-grid">
            <label>
              Subject
              <select
                value={q.subject}
                onChange={(e) => set("subject", e.target.value)}
              >
                {subjects.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Format
              <select
                aria-label="Format"
                value={q.type}
                onChange={(e) => set("type", e.target.value)}
              >
                {questionTypes.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </label>
            <label>
              Unit
              <input
                required
                value={q.unit}
                onChange={(e) => set("unit", e.target.value)}
              />
            </label>
            <label>
              Topic
              <input
                required
                value={q.topic}
                onChange={(e) => set("topic", e.target.value)}
              />
            </label>
            <label>
              Subtopic
              <input
                value={q.subtopic}
                onChange={(e) => set("subtopic", e.target.value)}
              />
            </label>
            <label>
              Difficulty
              <select
                value={q.difficulty}
                onChange={(e) => set("difficulty", e.target.value)}
              >
                {["Easy", "Medium", "Hard"].map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </label>
            <label>
              Collection
              <input
                value={q.collection}
                onChange={(e) => set("collection", e.target.value)}
              />
            </label>
            <label>
              Tags (comma separated)
              <input
                value={q.tags.join(", ")}
                onChange={(e) =>
                  set(
                    "tags",
                    e.target.value.split(",").map((t) => t.trim()),
                  )
                }
              />
            </label>
          </div>
          <label>
            Question · use $…$ for LaTeX
            <textarea
              required
              rows={4}
              value={q.prompt}
              onChange={(e) => set("prompt", e.target.value)}
            />
          </label>
          {["MCQ", "Multiple select"].includes(q.type) && (
            <label>
              Options · one per line
              <textarea
                required
                rows={4}
                value={(q.options ?? []).join("\n")}
                onChange={(e) => set("options", e.target.value.split("\n"))}
              />
            </label>
          )}
          <label>
            {written ? "Reference answer" : "Correct answer"}{" "}
            {q.type === "Multiple select" &&
              "· separate correct options with |"}
            <textarea
              required={!written}
              rows={2}
              value={q.answer}
              onChange={(e) => set("answer", e.target.value)}
            />
          </label>
          <label>
            Explanation
            <textarea
              required
              rows={3}
              value={q.explanation}
              onChange={(e) => set("explanation", e.target.value)}
            />
          </label>
          {q.type === "Short answer" && (
            <label>
              Accepted alternate answers (one per line)
              <textarea
                value={(q.acceptedAnswers ?? []).join("\n")}
                onChange={(e) =>
                  set(
                    "acceptedAnswers",
                    e.target.value.split("\n").filter((a) => a.trim()),
                  )
                }
              />
            </label>
          )}
          {q.type === "Numerical" && (
            <label>
              Absolute numerical tolerance
              <input
                type="number"
                min="0"
                step="any"
                value={q.tolerance ?? 0.00001}
                onChange={(e) => set("tolerance", Number(e.target.value))}
              />
            </label>
          )}
          <label>
            Hint
            <input
              required
              value={q.hint}
              onChange={(e) => set("hint", e.target.value)}
            />
          </label>
          {written && (
            <>
              <div className="rubric-editor">
                <h3>Scoring rubric</h3>
                <p className="small muted">
                  Define what earns each point. Gemini and manual reviews use
                  this same guidance.
                </p>
                {rubric.map((r, i) => (
                  <div className="rubric-editor-row" key={i}>
                    <div className="form-grid">
                      <label>
                        Criterion
                        <input
                          required
                          value={r.criterion}
                          onChange={(e) =>
                            setRubric(
                              rubric.map((v, j) =>
                                i === j
                                  ? { ...v, criterion: e.target.value }
                                  : v,
                              ),
                            )
                          }
                        />
                      </label>
                      <label>
                        Maximum points
                        <input
                          required
                          type="number"
                          min="1"
                          max="20"
                          value={r.points}
                          onChange={(e) =>
                            setRubric(
                              rubric.map((v, j) =>
                                i === j
                                  ? { ...v, points: Number(e.target.value) }
                                  : v,
                              ),
                            )
                          }
                        />
                      </label>
                    </div>
                    <label>
                      Scoring guidance
                      <textarea
                        required
                        rows={2}
                        value={r.guidance}
                        onChange={(e) =>
                          setRubric(
                            rubric.map((v, j) =>
                              i === j ? { ...v, guidance: e.target.value } : v,
                            ),
                          )
                        }
                      />
                    </label>
                    <button
                      type="button"
                      className="text-button danger"
                      disabled={rubric.length === 1}
                      onClick={() =>
                        setRubric(rubric.filter((_, j) => i !== j))
                      }
                    >
                      Remove criterion
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  className="secondary"
                  disabled={rubric.length >= 20}
                  onClick={() =>
                    setRubric([
                      ...rubric,
                      { criterion: "", points: 1, guidance: "" },
                    ])
                  }
                >
                  <Plus size={14} />
                  Add criterion
                </button>
              </div>
              <label>
                Example stronger response
                <textarea
                  value={q.example ?? ""}
                  onChange={(e) => set("example", e.target.value)}
                />
              </label>
            </>
          )}
          {error && (
            <div className="error" role="alert">
              {error}
            </div>
          )}
          <div className="flex-row mt">
            <button type="button" className="secondary" onClick={onClose}>
              Cancel
            </button>
            <button className="primary">Save question</button>
          </div>
        </form>
      </section>
    </div>
  );
}
