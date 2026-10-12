import { subjects as legacySubjects } from "./subjects";
import { worldUnits } from "./content/world";
import { stemUnits } from "./content/stem";
import { quantUnits } from "./content/quant-code";
import { replacementBank } from "./replacement-bank";
import type { Subject } from "./types";
import type { UnitLesson } from "./content-types";
export const unitLessons: UnitLesson[] = [
  ...worldUnits,
  ...stemUnits,
  ...quantUnits,
];
export const questionBank = replacementBank;
export function courseSubjects(
  worldMode: "standard" | "expanded" = "standard",
): Subject[] {
  return legacySubjects.map((s) => {
    const lessons = unitLessons.filter(
      (l) =>
        l.subject === s.id &&
        (l.scope !== "background" || worldMode === "expanded") &&
        l.scope !== "extension",
    );
    const questions = questionBank.filter(q => q.subject === s.id);
    const units = [...new Set([...lessons.map((l) => l.unit), ...questions.map(q => q.unit)])].map((name) => ({
      name,
      topics: [
        ...new Set(
          [...lessons
            .filter((l) => l.unit === name)
            .flatMap((l) => l.topics.map((t) => t.name)),
          ...questions.filter(q => q.unit === name).map(q => q.topic)],
        ),
      ],
    }));
    const framework =
      s.id === "world"
        ? {
            label: "AP World: Modern · 2026–27",
            url: "https://apcentral.collegeboard.org/courses/ap-world-history",
            note: "Official course begins c. 1200 CE. Expanded foundations are optional background.",
          }
        : s.id === "csa"
          ? {
              label: "AP CSA · current four-unit framework",
              url: "https://apcentral.collegeboard.org/courses/ap-computer-science-a",
              note: "Inheritance exercises are retained as enrichment.",
            }
          : s.id === "stats"
            ? {
                label: "AP Statistics · Fall 2026 five-unit framework",
                url: "https://apcentral.collegeboard.org/courses/ap-statistics",
                note: "Older goodness-of-fit and slope-inference exercises remain as labeled enrichment.",
              }
            : undefined;
    return { ...s, units: units.length ? units : s.units, framework };
  });
}
