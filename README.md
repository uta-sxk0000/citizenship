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

The default scripts are configured for Cloudflare Workers deployment with Wrangler. The production deployment can be connected to:

```text
citizenship.khadkasagar.name.np
```

Cloudflare settings:

```text
Build system version: v2
Install command: pnpm install --frozen-lockfile
Build command: pnpm run build
Deploy command: pnpm run deploy
```

Local Cloudflare build:

```bash
pnpm run build
```

The root `wrangler.jsonc` deploys the generated Worker entry at `dist/server/index.js` and static assets from `dist/client`.

To use `citizenship.khadkasagar.name.np`, add it as a custom domain for the deployed Worker in Cloudflare after the first successful deploy.

Vercel is still available through explicit scripts if you decide to use it later:

```bash
pnpm run dev:vercel
pnpm run build:vercel
pnpm run start:vercel
```

The app uses route files for `/`, `/study`, `/practice`, `/review`, and `/progress`.

## Browser Features

Progress, favorites, review lists, streaks, and theme/language preferences are stored in LocalStorage on the user's device.

Audio uses the browser Web Speech API through `window.speechSynthesis`. The app prefers an available `en-US` voice, then gracefully falls back to another English voice when needed. Normal playback uses a rate near `0.95`; slow playback uses `0.7`.
