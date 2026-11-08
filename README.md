# Kalungi Isaac · Portfolio

Personal portfolio for Kalungi Isaac, a full-stack developer in Kampala, Uganda. Built with React 19, TypeScript, Vite and react-router-dom, styled with hand-written CSS tokens.

## Pages

| Route | Content |
| --- | --- |
| `/` | Hero, site index, selected work, recent notes |
| `/about` | Background, process, animated code sample |
| `/work` | Filterable project list with a live preview panel |
| `/work/:slug` | Full case study for each project |
| `/experience` | Timeline, including current internship/volunteer availability |
| `/skills` | Toolkit groups and the design system behind the site |
| `/notes`, `/notes/:slug` | Short write-ups |
| `/contact` | Email, copy-to-clipboard address, WhatsApp |

## Commands

```bash
npm install
npm start          # same as npm run dev, http://localhost:5173
npm run build      # type-check (tsc -b) and production build into dist/
npm run preview    # serve dist/ with the SPA fallback applied
npm run lint       # oxlint
```

## Deployment

The app uses `BrowserRouter`, so every route must be served from `index.html`. The repository already includes:

- `vercel.json` — rewrite all paths to `/index.html` (Vercel).
- `public/_redirects` — `/* /index.html 200` (Netlify, Cloudflare Pages).
- `public/404.html` — redirects unknown deep links back into the SPA (hosts without rewrite rules, such as project GitHub Pages).

If you deploy the contents of `dist/` elsewhere, add the equivalent "rewrite unknown paths to `/index.html`" rule, then open each route directly and refresh to confirm.

## Notes

- `npm run preview` uses the same fallback as production, so direct URL refreshes can be tested locally.
- The hero and portrait have no WebGL or canvas dependency; the site works with JavaScript-only animation disabled through `prefers-reduced-motion`.
- Code samples (`src/components/CodeCard.tsx`) load lazily when they approach the viewport.
