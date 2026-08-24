# Citizenship Practice

Independent U.S. naturalization interview and citizenship practice app for `citizenship.khadkasagar.name.np`.

## Question Data

All question content lives in `src/data/questions.ts`. The file currently contains clearly marked sample data only. Replace or extend the exported `questions` array with your real questions when ready. Keep Nepali translations in the optional `nepaliQuestion`, `nepaliAnswers`, and `nepaliExplanation` fields. The app does not call a translation API or machine-translate citizenship content.

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

## Cloudflare Pages

Build command:

```bash
pnpm run build
```

Deploy directory:

```text
dist
```

The app uses route files for `/`, `/study`, `/practice`, `/review`, and `/progress`. With this Sites/Vinext setup, nested route refreshes are handled by the generated Cloudflare-compatible output in `dist`.

To connect the custom domain:

1. Create or select the Cloudflare Pages project for this app.
2. Deploy the `dist` output from this project, not the main `khadkasagar.name.np` website.
3. In Cloudflare Pages, add `citizenship.khadkasagar.name.np` as a custom domain.
4. Follow Cloudflare's DNS prompt to create the required CNAME for the subdomain.
5. Do not change DNS records for `khadkasagar.name.np` unless you intentionally want to alter the main website.

## Browser Features

Progress, favorites, review lists, streaks, and theme/language preferences are stored in LocalStorage on the user's device.

Audio uses the browser Web Speech API through `window.speechSynthesis`. The app prefers an available `en-US` voice, then gracefully falls back to another English voice when needed. Normal playback uses a rate near `0.95`; slow playback uses `0.7`.
