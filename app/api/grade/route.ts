import { gradingEnvironment } from "../../../lib/study/runtime.server";
import { configuredProvider, GradingError } from "../../../lib/study/ai.server";
import { validateQuestions } from "../../../lib/study/import";
const requests = new Map<string, { start: number; count: number }>();
export async function GET() {
  try {
    return Response.json(
      {
        available: !!configuredProvider(gradingEnvironment()),
        provider: "Gemini",
        reason: gradingEnvironment().GEMINI_API_KEY
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
    // Bound the stream itself, including chunked requests without Content-Length.
    const reader = request.body?.getReader();
    let bytes = 0;
    const chunks: Uint8Array[] = [];
    if (reader) while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      bytes += value.byteLength;
      if (bytes > 100000) { await reader.cancel(); return Response.json({ error: "Response is too large." }, { status: 413 }); }
      chunks.push(value);
    }
    const combined = new Uint8Array(bytes);
    let offset = 0;
    for (const chunk of chunks) { combined.set(chunk, offset); offset += chunk.length; }
    const text = new TextDecoder().decode(combined);
    if (text.length > 100000)
      return Response.json(
        { error: "Response is too large." },
        { status: 413 },
      );
    const data = JSON.parse(text);
    if (!data || typeof data !== "object" || Array.isArray(data)) return Response.json({ error: "Submit a grading request object." }, { status: 400 });
    const strictness = data.strictness ?? "standard";
    if (!["lenient", "standard", "strict"].includes(strictness)) return Response.json({ error: "Choose lenient, standard, or strict grading." }, { status: 400 });
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
    const provider = configuredProvider(gradingEnvironment());
    if (!provider)
      return Response.json(
        {
          available: false,
          error:
            "Gemini grading is unavailable. Configure the server-side GEMINI_API_KEY Cloudflare secret, or use manual review.",
        },
        { status: 503 },
      );
    // Sites enforces the unchanged owner-private access boundary. Local preview needs no sign-in.
    // This per-isolate limit supplements Gemini account quotas; it does not replace a global quota.
    const now = Date.now(),
      user = request.headers.get("cf-connecting-ip") ?? "local-preview";
    const distributed = gradingEnvironment().GRADING_RATE_LIMITER;
    if (distributed && !(await distributed.limit({ key: user })).success) return Response.json({ error: "Grading limit reached. Please wait a minute." }, { status: 429, headers: { "Retry-After": "60" } });
    for (const [key, value] of requests)
      if (now - value.start > 60000) requests.delete(key);
    if (!requests.has(user) && requests.size >= 5000) return Response.json({ error: "Grading is busy. Please try again in a minute." }, { status: 429, headers: { "Retry-After": "60" } });
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
    return Response.json(await provider.grade(question, data.response, strictness), {
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
              : "Invalid grading request. Check the question and rubric.",
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
