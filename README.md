# Citizenship Practice

Independent U.S. naturalization interview and citizenship practice app for `citizenship.khadkasagar.name.np`.

## Question Data

All question content lives in `src/data/questions.ts`. The file contains all 128 questions and accepted answers from the 2025 USCIS civics test PDF in official order.

Questions support current or changeable answers with `currentAnswer: true`, which displays a reminder to verify the answer before the interview.

## Local Development

Install dependencies:

```bash
pnpm install
```

Run locally:

```bash
pnpm run dev
```

Type-check:

```bash
pnpm run typecheck
```

Build:

```bash
pnpm run build
```

## Deployment

The app is built with Vinext and deployed through OpenAI Sites. The production deployment can be connected to:

```text
citizenship.khadkasagar.name.np
```

Build command:

```bash
pnpm run build
```

The generated deployable output is:

```text
dist
```

The app uses route files for `/`, `/study`, `/practice`, `/review`, and `/progress`. With this Sites/Vinext setup, nested route refreshes are handled by the generated Cloudflare-compatible output in `dist`.

## Browser Features

Progress, favorites, review lists, streaks, and theme/language preferences are stored in LocalStorage on the user's device.

Audio uses the browser Web Speech API through `window.speechSynthesis`. The app prefers an available `en-US` voice, then gracefully falls back to another English voice when needed. Normal playback uses a rate near `0.95`; slow playback uses `0.7`.
