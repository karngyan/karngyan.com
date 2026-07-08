# karngyan.com Template Revamp — Design

**Date:** 2026-07-09
**Status:** Approved (autonomous run — direction set by owner in goal statement)

## Problem

This repo is the `template` branch of karngyan.com — a 2021-era Nuxt 2 / Vue 2 personal-site
template (Firebase comments, i18n, gulp→S3 deploy, node ≤14). It is unmaintainable and the owner
no longer uses Vue. The owner's live site (karngyan.com, repo: github.com/karngyan/canvas) already
runs a modern stack. The template must be rebuilt to match, generalized for forkers, and default to
Cloudflare deployment.

## Goals

- React 19 + TanStack Start (file-based routes, SSR) + Vite, TypeScript
- Tailwind CSS v4 (CSS-first config) + shadcn/ui, dark/light/system theme
- MDX articles with syntax highlighting (shiki via rehype-pretty-code)
- Single `site.config.ts` a forker edits — everything personal lives there or in `src/content/`
- RSS (`/rss.xml`), sitemap, `robots.txt`, `llms.txt`, build-time OG images (satori)
- Cloudflare Workers as the default deploy target (wrangler + GitHub Actions)
- `mise.toml` with exact node/pnpm pins
- Claude-friendly: `CLAUDE.md`, clear structure, typed config
- Rewritten README (keep Awesome Forks, MIT license, contact)

## Non-goals (dropped from v1 template)

- Firebase comments/likes/auth — third-party services with billing footguns; forkers can add their own
- i18n / language switcher — canvas has none; large complexity for a personal-site template
- PWA, GitHub calendar heatmap, clap button, code::stats — dated widgets
- Newsletter subscribe API — needs a provider account; keep a mail link instead
- npm-packaged theme (`create-karngyan-app`) — considered; rejected for now. A packaged theme
  splits "theme updates" from "user content" and adds versioning machinery a personal site doesn't
  need. The repo becomes a **GitHub template repo** instead (`Use this template` / `degit`) — one
  click, full code ownership. Revisit if fork count demands it.

## Approaches considered

1. **Incremental migration Nuxt2→Start** — rejected: no shared code survives a Vue→React move.
2. **Port canvas architecture, generalize via config** — **chosen.** Canvas is proven, already the
   look the owner wants, already on the target stack. Work = extract personal data into
   `site.config.ts`, add RSS + Cloudflare + docs.
3. **npm theme package** — rejected (see non-goals).

## Architecture

```
site.config.ts            ← forker edits this (identity, socials, nav, projects, uses, work)
src/
  content/articles/<slug>/page.mdx   ← forker writes these (export const article = {...})
  routes/                 ← file-based: index, about, articles/, projects/, uses/, resume,
                             rss[.]xml.ts, sitemap[.]xml.ts, llms[.]txt.ts, robots[.]txt.ts
  components/             ← layout (header/footer/container), ui/ (shadcn), prose, cards
  lib/                    ← articles.ts (import.meta.glob over MDX), feeds.ts, utils
  styles.css              ← Tailwind v4 theme tokens (oklch, dark variant)
scripts/generate-og.tsx   ← satori → sharp, runs before build
public/                   ← favicons, resume.pdf, generated og/
wrangler.jsonc            ← Cloudflare Workers config (SSR worker + static assets)
mise.toml                 ← exact node + pnpm pins
CLAUDE.md, README.md
```

- **Content pipeline:** `@mdx-js/rollup` with remark-gfm + rehype-pretty-code; each article is a
  directory (`page.mdx` + colocated images) exporting typed `article` metadata; `lib/articles.ts`
  eager-globs them at build time. No CMS, no frontmatter parser — plain ESM exports.
- **RSS:** server route `rss[.]xml.ts` builds RSS 2.0 from `getAllArticles()` + `site.config.ts`
  (title, link, description, pubDate, guid). Same pattern as canvas's sitemap route. `<link rel="alternate">`
  in root head.
- **Theme:** inline pre-hydration script sets `.dark` from localStorage/system; shadcn tokens in
  oklch; accent configurable in styles.css.
- **Deploy:** nitro Cloudflare module preset; `wrangler.jsonc` with assets directory + SSR entry;
  `pnpm deploy` = build + `wrangler deploy`; GitHub Action deploys on push to `template` using
  `CLOUDFLARE_API_TOKEN`/`CLOUDFLARE_ACCOUNT_ID` secrets. Exact preset/config verified against
  current TanStack Start + Cloudflare docs during implementation.
- **Testing:** vitest — unit tests for `lib/articles.ts`, RSS/sitemap XML builders, config schema.
- **Error handling:** typed config (TS catches bad edits), 404 route, feeds escape XML entities.

## Sample content

Ship 2–3 fresh sample articles demonstrating MDX features (headings, code blocks, images, gfm
tables) — replacing the lorem-ipsum Nuxt samples. Placeholder identity in `site.config.ts` stays
generic ("Your Name") except where the template demos the owner's own site.

## Success criteria

`pnpm install && pnpm dev` renders all routes; `pnpm build` passes; `wrangler deploy --dry-run`
validates; RSS/sitemap parse; README explains fork→edit config→deploy in <10 steps; CLAUDE.md lets
an agent add an article/page unaided.
