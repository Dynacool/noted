import { configuredProvider, GradingError } from "../../../lib/study/ai.server";
import { validateQuestions } from "../../../lib/study/import";
const requests = new Map<string, { start: number; count: number }>();
export async function GET() {
  try {
    return Response.json(
      {
        available: !!configuredProvider(),
        provider: "Gemini",
        reason: process.env.GEMINI_API_KEY
          ? ""
          : "No server-side Gemini API key is configured.",
      },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch {
    return Response.json({
      available: false,
      provider: "Gemini",
      reason: "Gemini’s server configuration needs attention.",
    });
  }
}
export async function POST(request: Request) {
  try {
    const origin = request.headers.get("origin");
    if (origin && new URL(origin).host !== new URL(request.url).host)
      return Response.json(
        { error: "Cross-origin grading requests are not accepted." },
        { status: 403 },
      );
    if (Number(request.headers.get("content-length") ?? 0) > 100000)
      return Response.json(
        { error: "Response is too large." },
        { status: 413 },
      );
    const text = await request.text();
    if (text.length > 100000)
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
    if (
      !question.rubric?.length ||
      question.rubric.length > 20 ||
      question.rubric.reduce((n, r) => n + r.points, 0) > 100
    )
      return Response.json(
        {
          error:
            "Use a written question with 1–20 rubric criteria and at most 100 points.",
        },
        { status: 400 },
      );
    const provider = configuredProvider();
    if (!provider)
      return Response.json(
        {
          available: false,
          error:
            "Gemini grading is unavailable. Use the question-specific manual rubric below.",
        },
        { status: 503 },
      );
    // Sites enforces the unchanged owner-private access boundary. Local preview needs no sign-in.
    // This per-isolate limit supplements Gemini account quotas; it does not replace a global quota.
    const now = Date.now(),
      user =
        request.headers.get("oai-authenticated-user-id") ?? "local-preview";
    for (const [key, value] of requests)
      if (now - value.start > 60000) requests.delete(key);
    const limit = requests.get(user) ?? { start: now, count: 0 };
    if (limit.count >= 4)
      return Response.json(
        {
          error:
            "You have submitted four reviews this minute. Wait a minute or use manual review.",
        },
        { status: 429, headers: { "Retry-After": "60" } },
      );
    limit.count++;
    requests.set(user, limit);
    return Response.json(await provider.grade(question, data.response), {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    const status = error instanceof GradingError ? error.status : 400;
    return Response.json(
      {
        error:
          error instanceof GradingError
            ? error.message
            : error instanceof SyntaxError
              ? "The submitted data is not valid JSON."
              : error instanceof Error
                ? error.message
                : "Unable to grade this response.",
      },
      {
        status,
        headers:
          error instanceof GradingError && error.retryAfter
            ? { "Retry-After": String(error.retryAfter) }
            : {},
      },
    );
  }
}
