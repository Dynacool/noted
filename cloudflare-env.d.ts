declare namespace Cloudflare {
  interface Env {
    GEMINI_API_KEY?: string;
    GEMINI_MODEL?: string;
    GRADING_RATE_LIMITER?: { limit(options: { key: string }): Promise<{ success: boolean }> };
    DB?: D1Database;
    BUCKET?: R2Bucket;
  }
}
