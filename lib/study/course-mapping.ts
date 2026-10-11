import type { Question } from "./types";
export const csaUnits = [
  "1 · Using Objects and Methods",
  "2 · Selection and Iteration",
  "3 · Class Creation",
  "4 · Data Collections",
];
export const statsUnits = [
  "1 · Exploring One-Variable Data and Collecting Data",
  "2 · Probability, Random Variables, and Probability Distributions",
  "3 · Inference for Categorical Data: Proportions",
  "4 · Inference for Quantitative Data: Means",
  "5 · Regression Analysis",
];
export function currentQuestion(q: Question): Question {
  if (q.source !== "Preloaded") return q;
  let unit = q.unit,
    scope = q.scope ?? "standard";
  if (q.subject === "csa") {
    const map: Record<string, string> = {
      "Java Fundamentals": q.topic === "Loops" ? csaUnits[1] : csaUnits[0],
      "Object-Oriented Programming": csaUnits[2],
      Arrays: csaUnits[3],
      ArrayLists: csaUnits[3],
      Recursion: csaUnits[3],
      Algorithms: csaUnits[3],
    };
    unit = map[q.unit] ?? q.unit;
    if (q.id === "csa-4") scope = "extension";
  }
  if (q.subject === "stats" && /^stats-\d+$/.test(q.id)) {
    const old = /^(\d+)\s*·/.exec(q.unit);
    const map = [0, 4, 0, 1, 1, 2, 3, 2, 4];
    if (old && old[1] && Number(old[1]) <= 9)
      unit = statsUnits[map[Number(old[1]) - 1]];
    if (["stats-10", "stats-11"].includes(q.id)) scope = "extension";
    if (q.id === "stats-7") unit = statsUnits[3];
  }
  return {
    ...q,
    unit,
    scope,
    ...(unit !== q.unit ? { legacyUnit: q.unit } : {}),
  };
}
export const historyPeriods = [
  "600–1200",
  "1200–1450",
  "1450–1750",
  "1750–1900",
  "1900–present",
];
export const historyRegions = [
  "East Asia",
  "South Asia",
  "Southeast Asia",
  "Dar al-Islam",
  "Middle East",
  "Africa",
  "Europe",
  "Americas",
  "Indian Ocean",
  "Global",
  "Afro-Eurasia",
];
export const historySkills = [
  "Developments and Processes",
  "Causation",
  "Comparison",
  "Continuity and Change",
  "Contextualization",
  "Sourcing",
  "Historical argumentation",
  "Claims and Evidence",
];
export function worldVisible(
  q: Question,
  mode: "standard" | "expanded" = "standard",
) {
  return !(
    q.subject === "world" &&
    q.scope === "background" &&
    mode === "standard"
  );
}
