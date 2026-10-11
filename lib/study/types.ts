export const questionTypes = [
  "MCQ",
  "Multiple select",
  "Numerical",
  "Short answer",
  "SAQ",
  "DBQ",
  "LEQ",
  "FRQ",
  "Java",
] as const;
export type QuestionType = (typeof questionTypes)[number];
export type Rubric = { criterion: string; points: number; guidance: string };
export type Question = {
  id: string;
  subject: string;
  unit: string;
  topic: string;
  subtopic: string;
  difficulty: "Easy" | "Medium" | "Hard";
  type: QuestionType;
  prompt: string;
  options?: string[];
  answer: string;
  explanation: string;
  hint: string;
  tags: string[];
  source: "Preloaded" | "Custom" | "Imported";
  collection: string;
  rubric?: Rubric[];
  example?: string;
  tolerance?: number;
  scope?: "standard" | "background" | "extension";
  acceptedAnswers?: string[];
  legacyUnit?: string;
};
export type Subject = {
  id: string;
  name: string;
  short: string;
  description: string;
  color: string;
  units: { name: string; topics: string[] }[];
  framework?: { label: string; url: string; note?: string };
};
export type Config = {
  subjects: string[];
  units: string[];
  topics: string[];
  subtopics: string[];
  types: string[];
  difficulties: string[];
  tags: string[];
  source: string;
  count: number;
  timeMode: string;
  minutes: number;
  mode: string;
  name?: string;
  worldMode?: "standard" | "expanded";
  collections?: string[];
  periods?: string[];
  regions?: string[];
  skills?: string[];
  flaggedOnly?: boolean;
};
export type Result = {
  questionId: string;
  response: string;
  correct: boolean | null;
  points: number;
  max: number;
  rubric?: number[];
  gradingMethod?: "automatic" | "manual" | "gemini";
};
export type Attempt = {
  id: string;
  date: string;
  seconds: number;
  results: Result[];
  questions: Question[];
  config: Config;
};
export type Goal = {
  id: string;
  name: string;
  target: number;
  deadline: string;
};
export type Store = {
  version: 1;
  custom: Question[];
  hidden: string[];
  subjects: Subject[];
  attempts: Attempt[];
  presets: Config[];
  flags: string[];
  goals: Goal[];
  dark: boolean;
  dailyTarget: number;
  worldMode?: "standard" | "expanded";
  completedLessons?: string[];
  gradingHistory?: GradingRecord[];
};
export type GradingStrictness = "lenient" | "standard" | "strict";
export type CriterionFeedback = {
  explanation?: string;
  criterion: string;
  points: number;
  max: number;
  evidence: string;
  missing: string;
  suggestion: string;
};
export type GradingEstimate = {
  strictness?: GradingStrictness;
  totalScore?: number;
  maxScore?: number;
  strengths?: string[];
  errors?: string[];
  uncertainties?: string[];
  label: string;
  provider: "gemini" | "manual";
  model?: string;
  points: number[];
  breakdown: CriterionFeedback[];
  feedback: string;
  improvements: string;
  example: string;
};
export type GradingRecord = {
  id: string;
  date: string;
  question: Question;
  response: string;
  estimate: GradingEstimate;
  previousId?: string;
};
export const defaultConfig: Config = {
  subjects: [],
  units: [],
  topics: [],
  subtopics: [],
  types: [],
  difficulties: [],
  tags: [],
  source: "Mixed",
  count: 10,
  timeMode: "Untimed",
  minutes: 20,
  mode: "Standard",
};
