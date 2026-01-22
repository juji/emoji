# Emoji — Encode & Decode

Embed short secrets inside an emoji using invisible Unicode variation selectors, or reveal hidden messages from emoji payloads.

This small Next.js app provides a simple UI for encoding text into an emoji and decoding hidden payloads back into readable text.

---

## 🎯 Features

- Encode a short secret into an emoji using invisible variation selectors
- Decode hidden payloads from emoji input
- Inline Emoji Picker (toggle with the **Emoji Picker** button)
- Copy output to clipboard with a transient "Copied!" notice and accessible `aria-live` feedback
- Static export ready (see `next.config.ts` -> `output: "export"`)

---

## 🚀 Getting started

Prerequisites:
- Node.js (v18+ recommended)
- `pnpm` (this project uses `pnpm` but `npm` or `yarn` will also work)

Install and run locally:

```bash
pnpm install
pnpm dev
```

Open http://localhost:3000 in your browser.

Build and run production:

```bash
pnpm build
pnpm start
```

Export static site (if you want an exported output):

```bash
pnpm build && next export
```

---

## 🧩 Project structure

- `src/app` — Next.js app routes and layout
- `src/components` — UI components (including `emoji-picker`)
- `src/lib` — encode/decode logic and emoji data

---

## ♿ Accessibility & UX

- Emoji Picker toggles inline beneath the emoji input and is keyboard accessible
- Copy action announces success via `aria-live` for screen reader users

---

## 🧪 Development notes

- The app uses `next/font` for Geist fonts
- Metadata (site title & description) is defined in `src/app/layout.tsx`
- Conforms to simple, dependency-light approach

---

## 📦 Deployment

- The app is optimized for static export (`next export`) or Vercel deployment
- For Vercel, just connect the repository and deploy; set `NODE_ENV=production` during builds


---

## 🔗 Source / Inspiration

This project implements the technique described in Sushan Taneupane's article: "Unicode secrets — Hide and reveal text inside emojis using variation selectors". Read the original writeup here:

https://medium.com/@sushantaneupane/unicode-secrets-hide-and-reveal-text-inside-emojis-using-variation-selectors-a01c01e249cf
