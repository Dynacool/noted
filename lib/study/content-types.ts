import type { Question } from "./types";
export type LessonTopic = { name: string; subtopics: string[]; lesson: string };
export type UnitLesson = {
  id: string;
  subject: string;
  unit: string;
  title: string;
  overview: string;
  topics: LessonTopic[];
  vocabulary: { term: string; definition: string }[];
  concepts: string[];
  workedExamples: { prompt: string; steps: string[]; answer: string }[];
  misconceptions: string[];
  timeline?: { date: string; event: string; significance: string }[];
  comparisons?: {
    title: string;
    left: string;
    right: string;
    connection: string;
  }[];
  scope?: "standard" | "background" | "extension";
  sources?: { title: string; url: string }[];
};
export type AuthoredQuestion = Omit<
  Question,
  "id" | "subject" | "source" | "collection" | "subtopic"
> & { id?: string; subtopic?: string; collection?: string };
export function createQuestions(
  subject: string,
  prefix: string,
  seeds: AuthoredQuestion[],
): Question[] {
  return seeds.map((q, i) => ({
    ...q,
    id: q.id ?? `${prefix}-${i + 1}`,
    subject,
    source: "Preloaded",
    collection: q.collection ?? "Noted original practice",
    subtopic: q.subtopic ?? q.topic,
  }));
}
