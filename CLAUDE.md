# CLAUDE.md

Personal-site template: TanStack Start + React 19 + Tailwind CSS v4 + shadcn/ui + MDX, deployed to Cloudflare Workers. Forkers personalize via `site.config.ts` and `src/content/`.

## Commands

```bash
mise install          # pins node + pnpm (see mise.toml)
pnpm install
pnpm dev              # dev server on http://localhost:3000
pnpm build            # generates OG images, then vite build → .output/
pnpm test             # vitest
pnpm check            # prettier --write + eslint --fix
pnpm typecheck        # tsc --noEmit
pnpm generate:og      # regenerate OG images only (satori → sharp)
pnpm run deploy       # build + wrangler deploy (Cloudflare Workers)
```

## Architecture

- `site.config.ts` — single typed config for identity, SEO, socials, nav, resume toggle, work history, analytics. Import it via a relative path (`../../site.config`); the `@/` alias only covers `src/`.
- `src/routes/` — TanStack Router file routes. Pages are `index.tsx`/`$slug.tsx`; server routes use the `server.handlers.GET` pattern with bracket-escaped filenames (`rss[.]xml.ts`, `sitemap[.]xml.ts`, `robots[.]txt.ts`, `llms[.]txt.ts`). `routeTree.gen.ts` is generated — never edit.
- `src/content/articles/<slug>/page.mdx` — articles. Each exports `const article = { title, description, date, author }` and default-exports `ArticleLayout`. `src/lib/articles.ts` eager-globs these at build time; RSS/sitemap/OG all derive from it.
- `src/lib/feeds.ts` — RSS + robots.txt builders (unit-tested in `feeds.test.ts`).
- `src/components/` — layout components at top level, shadcn primitives in `ui/` (add more with `pnpm dlx shadcn@latest add <name>`).
- `src/styles.css` — Tailwind v4 CSS-first config: design tokens as CSS variables (oklch), dark mode via `.dark` class + `@custom-variant`. No tailwind.config.js.
- `scripts/generate-og-images.tsx` — build-time OG images; reads article metadata with a regex (article exports must stay statically analyzable).
- `wrangler.jsonc` — Cloudflare Workers config; build output lands in `.output/` (server entry + public assets).

## Conventions

- Page prose (hero, bio, uses, projects) lives in route files marked with `✏️` comments — content edits go there, not in config.
- Personal data in app code is a bug: identity strings come from `site.config.ts`. Sample/default values may be the template author's.
- Theme: pre-hydration inline script in `__root.tsx` + ThemeProvider, storage key `site-theme`.
- Dates in article metadata are `YYYY-MM-DD` strings.

## Recipes

- **New article:** create `src/content/articles/<slug>/page.mdx` mirroring an existing one (import ArticleLayout, export `article`, `metadata`, default). Build regenerates index/RSS/sitemap/OG automatically.
- **New page:** add `src/routes/<name>/index.tsx` with `createFileRoute`, then add it to `nav` in `site.config.ts`.
- **New server route:** copy the pattern from `src/routes/robots[.]txt.ts`.
