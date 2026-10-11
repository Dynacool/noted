# Noted

An upgrade of the existing Studycraft application using its React, TypeScript, Tailwind, KaTeX, and Next App Router API stack through the Sites Vinext runtime. Existing browser data is retained under `studycraft.v1`; question IDs and completed-attempt snapshots are preserved.

## Run and verify

```sh
npm install
npm run dev
npm run typecheck
npm run lint
npm test
npm run build
```

The default preview is http://127.0.0.1:5173. On Windows, if the npm shim resolves incorrectly, use `node "C:/Program Files/nodejs/node_modules/npm/bin/npm-cli.js"` in place of `npm`. Browser tests run against an already running server on port 5175 (or `TEST_URL`) with `npm run test:browser`. They use installed Chrome on Windows; elsewhere specify `BROWSER_PATH` or an installed Playwright Chromium.

## Learning and practice

- Course pages include substantive unit notes, subtopics, vocabulary, concepts, worked examples, misconceptions, and reading progress for seven subjects. History also includes timelines and comparisons. Sources and curriculum notes are linked from the lessons.
- AP World retains nine assessed Modern units and an optional 600–1200 background lesson. Standard and expanded modes update course visibility and quiz filters while preserving progress. Earlier material is explicitly outside the assessed Modern timeframe.
- CSA uses the current four-unit framework. AP Statistics uses the five-unit framework effective Fall 2026. Older inheritance, goodness-of-fit, and slope-inference practice remains available as labeled enrichment. Legacy presets match original unit labels through a compatibility mapping.
- Banks combine the original 84 questions with new independently authored questions. The tests enforce at least 75 per subject, unique IDs, schema integrity, unit coverage, multiple difficulties, and reference-answer acceptance. These are original instructional exercises, not released exam questions. Mini DBQ/LEQ rubrics are question-specific study rubrics, not representations of the entire official exam rubric.
- Quiz filters support multiple subjects, units, topics, subtopics, formats, difficulties, sources, collections, flags, history periods/regions/skills, incorrect-answer review, and spaced review. Matching counts and explicit shortages prevent silently substituting unrelated questions. Presets include historical modes.
- Practice supports navigation, flagging, hints, explanations, answer review, missed-question retries, total/per-question timers, and exam feedback withholding. Navigating elsewhere preserves the active session; reloading clears unfinished work. Completed sessions persist.
- Automatic grading covers numerical answers/fractions with tolerance, MCQ, multiple select, and normalized short answers with accepted alternatives. Mathematical written work and Java use rubrics. No arbitrary symbolic equivalence or code execution is claimed.
- Simulations include SAT module-length Math and Reading & Writing, AMC-style 25-question practice, mixed tests, and customizable AP unit/cumulative objective or written sets. They are not official exams; SAT practice is not adaptive and AMC sets permit numerical responses. AP time limits are suggested study limits.
- Dashboard/analytics show study time, assessed answers, subject/topic/difficulty accuracy, weak topics, recent-session trends, streaks, goals, and review suggestions. Consecutive correct answers extend spaced intervals through 3, 7, 14, 30, and 60 days; unseen/incorrect questions are immediately due.
- Question studio supports custom subjects, collections, question editing, alternatives/tolerance, hints, tags, rubrics, and validated JSON/CSV import/export. Bank pagination keeps larger sets manageable. Import assigns new IDs to avoid collisions. PDF/document ingestion is a future adapter targeting the same validated question schema.
- Settings supports full workspace backup export and validated restore with an explicit replacement confirmation.

## Gemini grading

Set **GEMINI_API_KEY** as a secret server-side runtime environment variable. Never use a `NEXT_PUBLIC_` prefix or put keys in client source. Optionally set `GEMINI_MODEL`; the default is `gemini-3.8-flash`. Environment changes require deployment to take effect. No key is included in this repository.

`GET /api/grade` reports availability. `POST /api/grade` accepts `{question, response}` and uses the Gemini REST `generateContent` API with structured JSON output, a trusted question rubric, and a timeout. The server validates criterion counts, integer point bounds, missing requirements, and the presence of quoted evidence in the submitted response. Failure, invalid output, authentication errors, timeout, and rate-limit conditions return an actionable manual-review fallback. Requests are limited to four per minute per authenticated user per runtime isolate; this supplements Gemini quotas rather than providing a global distributed limit. The hosted site retains its existing owner-private audience.

The written response studio supports original/custom SAQ, DBQ, LEQ, statistics, chemistry, calculus-style enrichment, Java, and other rubric questions. Reviews contain criterion evidence, missing requirements, improvements, and stronger examples. Successful Gemini estimates automatically save to grading history and scored attempts. Manual reviews save only when requested and remain labeled self-assessments. Revisions retain previous records. Grades are unofficial estimates and AI review sends the question and response to Google; Java is reviewed statically.

Tests mock the Gemini REST contract. Without a configured production key, live Gemini evaluation remains unverified and manual assessment remains available. Framework references: [Gemini generateContent](https://ai.google.dev/api/generate-content), [structured output](https://ai.google.dev/gemini-api/docs/structured-output), [models](https://ai.google.dev/gemini-api/docs/models).

## Architecture and limits

`lib/study/types.ts` defines shared data; `content/` stores original notes and questions; `catalog.ts` assembles the upgraded courses; `course-mapping.ts` retains legacy unit compatibility. `engine.ts` owns filtering, generation, grading, spaced review, and metrics. `ai.server.ts` owns Gemini access; only the server API imports it as a value. `import.ts` owns file adapters and validation; `storage.ts` owns local persistence and backup normalization. UI components consume this shared data.

Progress remains browser-local. A cloud account/sync service and PDF ingestion are future work. Written responses awaiting assessment are excluded from accuracy. Accuracy measures fully correct answers; rubric points remain visible separately. Goal targets count all assessed questions in the workspace. Deleting or editing a question does not alter old attempt snapshots. Adding more authored modules scales content without changing quiz or grading logic.
