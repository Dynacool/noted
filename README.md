# Studycraft

A functional browser-local study app built with React, TypeScript, Tailwind, KaTeX, and the Next.js App Router API through the Sites Vinext runtime.

## Run

```sh
npm install
npm run dev
```

Default URL: http://127.0.0.1:5173. If the Windows npm shim resolves incorrectly, invoke `node "C:/Program Files/nodejs/node_modules/npm/bin/npm-cli.js" install` and `node scripts/run-framework.mjs dev` directly.

## Verification

```sh
npm run typecheck
npm run lint
npm test
npm run build
```

For browser tests, start the dev server, set TEST_URL to its URL, and run `npm run test:browser`. Windows tests use installed Google Chrome. Elsewhere install Playwright Chromium or specify BROWSER_PATH. Tests use an isolated browser context.

## Workflows

- 84 original exercises, 12 per subject, with every listed unit represented. AP World and AP Statistics each include all nine units. This starter bank is not comprehensive curriculum coverage.
- Cross-subject filters: unit, topic, subtopic, format, difficulty, period/region/skill tags, source, and review mode. Explicit shortages, presets, custom counts.
- Numerical/fraction, MCQ, multiple-select, exact short-answer grading. Multi-part written and Java responses use question-specific manual rubrics.
- Total/per-question timers, navigation, hints, flags, explanations, detailed reviews, missed-question retries. Exam mode withholds feedback until completion. Exams are short original sets, not official/full-length exams.
- Question creation, editing, duplication, deletion, collections, custom subjects, validated JSON/CSV imports, exports, template download.
- FRQ self-review, revisions, pending-response review, optional server-side AI gateway. The short DBQ uses three fictional teaching documents and is not a full AP DBQ.
- Saved-session analytics, daily/weekly time, subject/topic accuracy, weak-topic recommendations, attempts, streaks, goals. Spaced repetition uses a three-day interval for correct answers; unseen and incorrect questions are immediately due.
- Dark/light mode, responsive sidebar, local settings, full backup export.

## AI provider

AI is unavailable by default. No evaluations are fabricated. Configure GRADING_PROVIDER_URL (HTTPS) and GRADING_PROVIDER_KEY in the server environment to connect a private grading gateway. Never expose keys with NEXT_PUBLIC_ variables.

The gateway receives `{ question, response, rubric }` and returns `{ points: number[], feedback: string, improvements: string, example: string }`. Points and bounds are validated. Results are labeled AI estimates, not official AP scores. The interface is in lib/study/ai.server.ts. Java responses are never executed. A configured production gateway should enforce rate limits and provider privacy controls.

## Architecture and limitations

Schema: lib/study/types.ts. Taxonomy: subjects.ts. Content: bank.ts. Filtering/grading/statistics: engine.ts. Import adapters: import.ts. Repository: storage.ts. Replace the local repository with a cloud adapter for Firebase or Supabase. Future PDF/document adapters should produce the same validated question schema.

Completed attempts contain question snapshots. Written responses awaiting assessment are excluded from accuracy. Progress persists in the current browser only. Full backup export is for safekeeping; full-state restoration is not included. Question-set import supports JSON/CSV. Goals count all assessed questions in the workspace.

The nine views use deep-linkable hash routes to keep a practice session in memory across navigation. Reloading clears unfinished work, while completed attempts and other saved records persist.
