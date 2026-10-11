import assert from "node:assert/strict";
import {
  configuredProvider,
  validateEstimate,
  GradingError,
} from "../lib/study/ai.server";
import { GET, POST } from "../app/api/grade/route";
import { bank } from "../lib/study/bank";
const q = {
  ...bank.find((q) => q.rubric)!,
  rubric: [
    {
      criterion: "Mechanism",
      points: 2,
      guidance:
        "One point identifies winds; a second explains voyage planning.",
    },
  ],
};
const response = "Seasonal monsoon winds made travel predictable.";
const payload = {
  criteria: [
    {
      points: 1,
      evidence: "Seasonal monsoon winds",
      missing: "Explain how merchants planned voyages.",
      suggestion: "Connect the seasonal reversal to voyage timing.",
    },
  ],
  feedback: "Relevant mechanism, incomplete explanation.",
  improvements: "Explain how traders timed departures.",
  example:
    "Merchants used seasonal wind reversals to plan outward and return voyages.",
};
const key = process.env.GEMINI_API_KEY,
  model = process.env.GEMINI_MODEL,
  originalFetch = globalThis.fetch;
try {
  delete process.env.GEMINI_API_KEY;
  delete process.env.GEMINI_MODEL;
  assert.equal(configuredProvider(), null);
  assert.equal(
    ((await (await GET()).json()) as { available: boolean }).available,
    false,
  );
  const request = (body: unknown, user = "test") =>
    new Request("http://localhost/api/grade", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "oai-authenticated-user-id": user,
      },
      body: JSON.stringify(body),
    });
  assert.equal((await POST(request({ question: q, response }))).status, 503);
  assert.equal(
    (await POST(request({ question: q, response: "" }))).status,
    400,
  );
  assert.equal(
    (
      await POST(
        new Request("http://localhost/api/grade", {
          method: "POST",
          headers: { origin: "https://another.example" },
          body: "{}",
        }),
      )
    ).status,
    403,
  );
  const estimate = validateEstimate(payload, q, response, "gemini-test");
  assert.deepEqual(estimate.points, [1]);
  assert.equal(estimate.breakdown[0].max, 2);
  assert.equal(estimate.provider, "gemini");
  assert.throws(
    () =>
      validateEstimate(
        { ...payload, criteria: [{ ...payload.criteria[0], points: 3 }] },
        q,
        response,
        "gemini-test",
      ),
    GradingError,
  );
  assert.throws(
    () =>
      validateEstimate(
        {
          ...payload,
          criteria: [{ ...payload.criteria[0], evidence: "Invented evidence" }],
        },
        q,
        response,
        "gemini-test",
      ),
    /evidence/,
  );
  assert.throws(
    () =>
      validateEstimate(
        { ...payload, criteria: [{ ...payload.criteria[0], missing: "" }] },
        q,
        response,
        "gemini-test",
      ),
    /missing/,
  );
  assert.throws(
    () =>
      validateEstimate(
        { ...payload, criteria: [] },
        q,
        response,
        "gemini-test",
      ),
    /incomplete/,
  );
  process.env.GEMINI_API_KEY = "test-only-key";
  process.env.GEMINI_MODEL = "gemini-test";
  globalThis.fetch = async (input, options) => {
    assert.equal(
      String(input),
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-test:generateContent",
    );
    assert.equal(
      (options?.headers as Record<string, string>)["x-goog-api-key"],
      "test-only-key",
    );
    const body = JSON.parse(options?.body as string);
    assert.ok(!JSON.stringify(body).includes("test-only-key"));
    assert.equal(
      body.generationConfig.responseFormat.text.mimeType,
      "APPLICATION_JSON",
    );
    return Response.json({
      candidates: [
        {
          finishReason: "STOP",
          content: { parts: [{ text: JSON.stringify(payload) }] },
        },
      ],
    });
  };
  assert.deepEqual(
    (await configuredProvider()!.grade(q, response)).points,
    [1],
  );
  for (let i = 0; i < 4; i++)
    assert.equal(
      (await POST(request({ question: q, response }, "limit-test"))).status,
      200,
    );
  const limited = await POST(request({ question: q, response }, "limit-test"));
  assert.equal(limited.status, 429);
  assert.equal(limited.headers.get("Retry-After"), "60");
  globalThis.fetch = async () => new Response("", { status: 429 });
  await assert.rejects(
    configuredProvider()!.grade(q, response),
    (e) => e instanceof GradingError && e.status === 429,
  );
  globalThis.fetch = async () => {
    throw new DOMException("Timed out", "TimeoutError");
  };
  await assert.rejects(configuredProvider()!.grade(q, response), /timed out/);
  globalThis.fetch = async () =>
    Response.json({ candidates: [{ finishReason: "MAX_TOKENS" }] });
  await assert.rejects(
    configuredProvider()!.grade(q, response),
    /did not finish/,
  );
  globalThis.fetch = async () =>
    Response.json({
      candidates: [
        { finishReason: "STOP", content: { parts: [{ text: "invalid" }] } },
      ],
    });
  await assert.rejects(
    configuredProvider()!.grade(q, response),
    /invalid JSON/,
  );
  console.log(
    "PASS: Gemini REST contract (mocked), partial credit, evidence validation, unavailable service, invalid input, origin check, timeout, rate limits, invalid output. No live Gemini request was made.",
  );
} finally {
  globalThis.fetch = originalFetch;
  if (key === undefined) delete process.env.GEMINI_API_KEY;
  else process.env.GEMINI_API_KEY = key;
  if (model === undefined) delete process.env.GEMINI_MODEL;
  else process.env.GEMINI_MODEL = model;
}
