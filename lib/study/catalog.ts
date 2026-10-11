import { subjects as legacySubjects } from "./subjects";
import { bank as legacyBank } from "./bank";
import { worldUnits, worldQuestions } from "./content/world";
import { stemUnits, stemQuestions } from "./content/stem";
import { quantUnits, quantQuestions } from "./content/quant-code";
import { currentQuestion } from "./course-mapping";
import type { Subject } from "./types";
import type { UnitLesson } from "./content-types";
export const unitLessons: UnitLesson[] = [
  ...worldUnits,
  ...stemUnits,
  ...quantUnits,
];
export const questionBank = [
  ...legacyBank.map(currentQuestion),
  ...worldQuestions,
  ...stemQuestions,
  ...quantQuestions,
];
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
    const units = [...new Set(lessons.map((l) => l.unit))].map((name) => ({
      name,
      topics: [
        ...new Set(
          lessons
            .filter((l) => l.unit === name)
            .flatMap((l) => l.topics.map((t) => t.name)),
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
