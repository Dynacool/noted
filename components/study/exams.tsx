"use client";
import { useState } from "react";
import { ArrowRight, GraduationCap } from "lucide-react";
import {
  defaultConfig,
  type Config,
  type Subject,
} from "../../lib/study/types";
export function Exams({
  subjects,
  worldMode,
  onBuild,
}: {
  subjects: Subject[];
  worldMode: "standard" | "expanded";
  onBuild: (c: Config) => void;
}) {
  const [subject, setSubject] = useState("world"),
    [unit, setUnit] = useState(""),
    [written, setWritten] = useState(false);
  const cards = [
    {
      name: "SAT Math module-style practice",
      description:
        "22 original math questions with numerical and multiple-choice responses.",
      subjects: ["sat"],
      units: ["Math"],
      types: ["MCQ", "Numerical"],
      count: 22,
      minutes: 35,
    },
    {
      name: "SAT Reading & Writing module-style practice",
      description:
        "27 original reading and writing questions. This set is not adaptive.",
      subjects: ["sat"],
      units: ["Reading & Writing"],
      types: ["MCQ"],
      count: 27,
      minutes: 32,
    },
    {
      name: "AMC 10/12-style practice",
      description:
        "25 competition problems across algebra, geometry, number theory, and counting.",
      subjects: ["amc"],
      units: [],
      types: ["MCQ", "Numerical"],
      count: 25,
      minutes: 75,
    },
    {
      name: "Mixed-subject challenge",
      description: "A timed classroom review mixing your subjects and skills.",
      subjects: [],
      units: [],
      types: ["MCQ", "Numerical", "Multiple select", "Short answer"],
      count: 20,
      minutes: 30,
    },
  ];
  return (
    <>
      <div className="notice">
        Original study simulations, not official exams. SAT sets emulate one
        module’s length and timing; AMC-style practice includes numerical
        responses. AP timings below are suggested study limits. Review matching
        counts and customize before starting.
      </div>
      <div className="exam-grid">
        {cards.map((e, i) => (
          <section className="panel exam-card" key={e.name}>
            <span className="exam-number">0{i + 1}</span>
            <GraduationCap size={27} />
            <h2>{e.name}</h2>
            <p className="muted">{e.description}</p>
            <div className="chips">
              <span className="tag">{e.count} questions</span>
              <span className="tag">{e.minutes} minutes</span>
            </div>
            <button
              className="primary full"
              onClick={() =>
                onBuild({
                  ...defaultConfig,
                  ...e,
                  worldMode,
                  mode: "Exam Simulation",
                  timeMode: "Total quiz",
                })
              }
            >
              Customize exam
              <ArrowRight size={16} />
            </button>
          </section>
        ))}
      </div>
      <section className="panel mt">
        <div className="section-label">
          <h2>AP & course assessments</h2>
          <GraduationCap size={22} />
        </div>
        <p className="muted">
          Select a unit for focused assessment, or leave the unit open for
          cumulative review. Written responses wait for rubric review; they are
          not scored as incorrect automatically.
        </p>
        <div className="form-grid mt">
          <label>
            Course
            <select
              aria-label="Exam course"
              value={subject}
              onChange={(e) => {
                setSubject(e.target.value);
                setUnit("");
              }}
            >
              {subjects.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            Unit
            <select
              aria-label="Exam unit"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
            >
              <option value="">Cumulative review</option>
              {subjects
                .find((s) => s.id === subject)
                ?.units.map((u) => (
                  <option key={u.name}>{u.name}</option>
                ))}
            </select>
          </label>
          <label>
            Response formats
            <select
              aria-label="Exam format"
              value={written ? "written" : "objective"}
              onChange={(e) => setWritten(e.target.value === "written")}
            >
              <option value="objective">
                Objective · 10 questions / 15 minutes
              </option>
              <option value="written">
                Written · 2 questions / 25 minutes
              </option>
            </select>
          </label>
        </div>
        <button
          className="primary mt"
          onClick={() =>
            onBuild({
              ...defaultConfig,
              subjects: [subject],
              units: unit ? [unit] : [],
              types: written
                ? ["SAQ", "DBQ", "LEQ", "FRQ", "Java"]
                : ["MCQ", "Multiple select", "Numerical", "Short answer"],
              count: written ? 2 : 10,
              minutes: written ? 25 : 15,
              timeMode: "Total quiz",
              mode: "Exam Simulation",
              worldMode,
              name: `${subjects.find((s) => s.id === subject)?.name} ${unit ? "unit assessment" : "cumulative review"}`,
            })
          }
        >
          Customize assessment
          <ArrowRight size={16} />
        </button>
      </section>
    </>
  );
}
