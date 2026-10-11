import { configuredProvider } from "../../../lib/study/ai.server";
import { validateQuestions } from "../../../lib/study/import";
export async function GET() {
  return Response.json({ available: !!configuredProvider() });
}
export async function POST(request: Request) {
  try {
    const text = await request.text();
    if (text.length > 60000)
      return Response.json(
        { error: "Response is too large." },
        { status: 413 },
      );
    const data = JSON.parse(text);
    if (
      typeof data.response !== "string" ||
      !data.response.trim() ||
      data.response.length > 20000
    )
      return Response.json(
        { error: "Enter a response of 1–20,000 characters." },
        { status: 400 },
      );
    const [question] = validateQuestions([data.question]);
    if (!question.rubric)
      return Response.json(
        { error: "This question has no rubric." },
        { status: 400 },
      );
    const provider = configuredProvider();
    if (!provider)
      return Response.json(
        {
          available: false,
          error:
            "AI grading is unavailable. Use the question-specific manual rubric below.",
        },
        { status: 503 },
      );
    return Response.json(await provider.grade(question, data.response));
  } catch (error) {
    return Response.json(
      {
        error:
          error instanceof Error ? error.message : "Unable to grade response.",
      },
      { status: 400 },
    );
  }
}
