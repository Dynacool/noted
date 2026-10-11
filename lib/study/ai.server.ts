import type { Question } from "./types";
export type Estimate = {
  label: "AI estimate — not an official AP score";
  points: number[];
  feedback: string;
  improvements: string;
  example: string;
};
export interface GradingProvider {
  grade(question: Question, response: string): Promise<Estimate>;
}
// Configure a private HTTPS grading gateway. Credentials remain exclusively on the server.
export function configuredProvider(): GradingProvider | null {
  const endpoint = process.env.GRADING_PROVIDER_URL,
    key = process.env.GRADING_PROVIDER_KEY;
  if (!endpoint || !key) return null;
  if (!endpoint.startsWith("https://"))
    throw new Error("The grading provider must use HTTPS.");
  return {
    async grade(question, response) {
      const result = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${key}`,
        },
        body: JSON.stringify({ question, response, rubric: question.rubric }),
        signal: AbortSignal.timeout(30000),
      });
      if (!result.ok)
        throw new Error("The grading provider could not complete the request.");
      const data = (await result.json()) as Estimate;
      if (
        !Array.isArray(data.points) ||
        data.points.length !== question.rubric?.length ||
        data.points.some(
          (p, i) =>
            !Number.isInteger(p) || p < 0 || p > question.rubric![i].points,
        ) ||
        typeof data.feedback !== "string" ||
        typeof data.improvements !== "string" ||
        typeof data.example !== "string"
      )
        throw new Error("The provider returned an invalid rubric evaluation.");
      return { ...data, label: "AI estimate — not an official AP score" };
    },
  };
}
