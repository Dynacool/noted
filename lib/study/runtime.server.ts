import { AsyncLocalStorage } from "node:async_hooks";
export type GradingEnvironment = { GEMINI_API_KEY?: string; GEMINI_MODEL?: string; GRADING_RATE_LIMITER?: { limit(options: { key: string }): Promise<{ success: boolean }> } };
const runtime = new AsyncLocalStorage<GradingEnvironment>();
export const gradingEnvironment = () => runtime.getStore() ?? { GEMINI_API_KEY: process.env.GEMINI_API_KEY, GEMINI_MODEL: process.env.GEMINI_MODEL };
export function withGradingEnvironment<T>(env: GradingEnvironment, run: () => T): T { return runtime.run(env, run); }
