# karngyan.com Template Revamp Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the Nuxt 2 template branch as a TanStack Start + React 19 + Tailwind v4 + shadcn template, config-driven, with RSS and Cloudflare Workers as the default deploy target.

**Architecture:** Port the proven `karngyan/canvas` codebase (already on the target stack) verbatim, get it green, then generalize personal data into a single typed `site.config.ts`, add RSS/robots routes, swap sample content, and wire Cloudflare deploy + docs. Canvas clone lives at `$CANVAS` (see Global Constraints).

**Tech Stack:** React 19, @tanstack/react-start 1.x, TanStack Router file routes, Vite 8, nitro v3 vite plugin, Tailwind CSS v4 (CSS-first), shadcn/ui, MDX (@mdx-js/rollup + remark-gfm + rehype-pretty-code/shiki), motion, lucide-react, satori+sharp OG images, vitest, pnpm, mise, wrangler.

## Global Constraints

- `CANVAS=/private/tmp/claude-501/-Users-karn-code-karngyan-karngyan-com/4cf41623-7005-440b-a837-665fc570dddd/scratchpad/canvas` (read-only reference clone)
- Repo root: `/Users/karn/code/karngyan/karngyan.com`, branch `template` (work directly on it; commit per task)
- Package manager: pnpm only. Version pins in `mise.toml`: `node = "26.4.0"`, `pnpm = "11.10.0"` (exact, already resolved via `mise latest`)
- TypeScript strict; no Vue/Nuxt remnants may survive (`grep -ri nuxt` must return nothing outside docs/ and README history notes)
- All personal/owner data lives in `site.config.ts` or `src/content/` — app code must not hardcode "karngyan" strings (sample/default config values MAY be Karn's, matching old-template behavior)
- Keep: `LICENSE` (MIT), `.editorconfig`, `.github/FUNDING.yml`, ISSUE_TEMPLATEs, Awesome Forks list in README
- Drop features: Firebase, i18n, PWA, newsletter subscribe API, github-calendar, claps, code::stats
- Every task ends: `pnpm build` passes (from Task 2 onward), then commit with `Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>`

---

### Task 1: Remove the Nuxt 2 app

**Files:**

- Delete: `assets/ components/ content/ lang/ layouts/ middleware/ pages/ plugins/ static/ store/ nuxt.config.js karngyan.config.js tailwind.config.js gulpfile.js jsconfig.json yarn.lock package.json .env.example .github/workflows/deploy.prod.yml`

- [ ] **Step 1: git rm the Nuxt tree**

```bash
cd /Users/karn/code/karngyan/karngyan.com
git rm -r -q assets components content lang layouts middleware pages plugins static store \
  nuxt.config.js karngyan.config.js tailwind.config.js gulpfile.js jsconfig.json yarn.lock \
  package.json .env.example .github/workflows/deploy.prod.yml
```

- [ ] **Step 2: Verify only keepers remain**

Run: `git status --short && ls`
Expected: deletions staged; remaining: `.claude .editorconfig .github CONTRIBUTING.md LICENSE README.md docs`

- [ ] **Step 3: Commit**

```bash
git commit -m "chore!: remove Nuxt 2 application

Clean slate for the TanStack Start rebuild. Old code stays in git history."
```

### Task 2: Port canvas verbatim, pin toolchain

**Files:**

- Create: `mise.toml`, plus copies of canvas `package.json tsconfig.json vite.config.ts eslint.config.js prettier.config.js .prettierignore pnpm-workspace.yaml components.json src/ scripts/ public/`
- Modify: `.gitignore` (union of old + canvas)

**Interfaces:**

- Produces: working canvas app in this repo; `pnpm dev/build/test/check` scripts; `src/lib/articles.ts` exporting `getAllArticles(): ArticleWithSlug[]`, `getArticle(slug)` — later tasks rely on these exact names.

- [ ] **Step 1: Copy canvas files**

```bash
cd /Users/karn/code/karngyan/karngyan.com
CANVAS=/private/tmp/claude-501/-Users-karn-code-karngyan-karngyan-com/4cf41623-7005-440b-a837-665fc570dddd/scratchpad/canvas
cp "$CANVAS"/{package.json,tsconfig.json,vite.config.ts,eslint.config.js,prettier.config.js,.prettierignore,pnpm-workspace.yaml,components.json,.gitignore} .
cp -R "$CANVAS"/src "$CANVAS"/scripts "$CANVAS"/public .
```

- [ ] **Step 2: Rename package, write mise.toml**

In `package.json` set `"name": "karngyan.com"`. Create `mise.toml`:

```toml
[tools]
node = "26.4.0"
pnpm = "11.10.0"
```

- [ ] **Step 3: Install + build + test**

Run: `mise install && mise exec -- pnpm install && mise exec -- pnpm build && mise exec -- pnpm test`
Expected: build completes (OG generation + vite build), vitest passes.

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "feat: port canvas stack (TanStack Start, React 19, Tailwind v4, shadcn)"
```

### Task 3: Extract site.config.ts, generalize app code

**Files:**

- Create: `site.config.ts`
- Modify: `src/routes/__root.tsx`, `src/components/header/index.tsx`, `src/components/footer/index.tsx`, `src/routes/index.tsx`, `src/routes/about/index.tsx`, `src/routes/projects/index.tsx`, `src/routes/uses/index.tsx`, `src/routes/resume.ts`, `src/routes/llms[.]txt.ts`, `src/routes/sitemap[.]xml.ts`, `tsconfig.json`/`vite.config.ts` alias if needed (`~config` → root)
- Delete: `src/routes/api/v1/subscribe.ts` (and empty api dir)

**Interfaces:**

- Produces: default export `siteConfig: SiteConfig` from `site.config.ts` with the exact shape below. All later tasks import it as `import siteConfig from '~config'` (alias) or relative path.

- [ ] **Step 1: Write `site.config.ts`** (root; values = Karn's as shipped defaults, forkers edit):

```ts
export interface NavItem {
  label: string
  to: string
  external?: boolean
}
export interface RoleEntry {
  title: string
  start: { label: string; dateTime: string }
  end: { label: string; dateTime: string }
}
export interface CompanyEntry {
  company: string
  logo: string
  url: string
  roles: RoleEntry[]
}
export interface Project {
  name: string
  description: string
  link: { href: string; label: string }
  logo?: string
}
export interface UsesItem {
  title: string
  description: string
}
export interface UsesSection {
  title: string
  items: UsesItem[]
}

export interface SiteConfig {
  name: string
  shortName: string
  url: string // no trailing slash, https://
  title: string
  description: string
  email: string
  social: {
    github?: string
    x?: string
    linkedin?: string
    instagram?: string
    calendar?: string
  }
  twitterHandle?: string // '@handle', used for twitter:site/creator meta
  nav: NavItem[]
  resume: { enabled: boolean; path: string } // path under public/
  work: CompanyEntry[]
  projects: Project[]
  uses: UsesSection[]
  analytics?: { plausible?: { domain: string; scriptSrc?: string } }
}

const siteConfig: SiteConfig = {
  name: 'Gyan Prakash Karn',
  shortName: 'karn',
  url: 'https://template.karngyan.com',
  title: 'karn — your friendly neighbourhood developer',
  description:
    'Personal site template: TanStack Start, React, Tailwind v4, shadcn/ui, MDX articles, RSS — deploys to Cloudflare Workers.',
  email: 'mail@karngyan.com',
  social: {
    github: 'https://github.com/karngyan',
    x: 'https://x.com/gyankarn',
    linkedin: 'https://www.linkedin.com/in/karngyan',
    instagram: 'https://www.instagram.com/karngyan.dev',
  },
  twitterHandle: '@gyankarn',
  nav: [
    { label: 'About', to: '/about' },
    { label: 'Articles', to: '/articles' },
    { label: 'Projects', to: '/projects' },
    { label: 'Uses', to: '/uses' },
  ],
  resume: { enabled: true, path: '/resume.pdf' },
  work: [
    /* CompanyEntry[] moved verbatim from routes/index.tsx Resume() — logos imported there become public/ paths: copy src/assets/logos/* → public/logos/* and reference '/logos/<file>' */
  ],
  projects: [
    /* moved from routes/projects/index.tsx hardcoded array */
  ],
  uses: [
    /* moved from routes/uses/index.tsx sections */
  ],
}

export default siteConfig
```

(The three `/* moved */` arrays are filled with the actual data lifted from the canvas files during the step — they exist today as hardcoded arrays in those route files; this is a data move, not new content.)

- [ ] **Step 2: Wire consumers.** Mapping (each file: replace hardcoded value → config field):
  - `__root.tsx`: siteUrl/defaultTitle/defaultDescription/og:site_name/twitter handles → `siteConfig.url/.title/.description/.twitterHandle`; add optional plausible `<script>` when `analytics?.plausible` set; theme storageKey → `'site-theme'`
  - `header`: nav items render from `siteConfig.nav` (desktop + mobile lists)
  - `footer`: links from `siteConfig.nav`; copyright name → `siteConfig.name`
  - `index.tsx`: hero heading/description → config-driven props where they're identity (name/role line), socials from `siteConfig.social`; `Resume()` reads `siteConfig.work`; delete `Newsletter` component + `MailIcon` form usage, replace card with `mailto:${siteConfig.email}` "Get in touch" card (same visual shell: rounded-2xl border card, Mail icon, one Button link)
  - `about/index.tsx`: socials/email from config; bio paragraphs stay as editable JSX marked `{/* ✏️ Edit your bio below */}`
  - `projects/index.tsx`: map over `siteConfig.projects`
  - `uses/index.tsx`: map over `siteConfig.uses`
  - `resume.ts`: 302 → `siteConfig.resume.path` (relative redirect to public file); return 404 when `resume.enabled` is false
  - `llms[.]txt.ts` + `sitemap[.]xml.ts`: `SITE_URL` → `siteConfig.url`; llms bio line → `siteConfig.description`
  - Delete `src/routes/api/v1/subscribe.ts`
- [ ] **Step 3: Build + grep gate**

Run: `pnpm build && grep -rn "karngyan" src/ --include='*.ts*' | grep -v site.config`
Expected: build passes; grep output empty.

- [ ] **Step 4: Commit** — `feat: single-file site.config.ts drives all identity/content data`

### Task 4: RSS + robots routes (TDD)

**Files:**

- Create: `src/lib/feeds.ts`, `src/lib/feeds.test.ts`, `src/routes/rss[.]xml.ts`, `src/routes/robots[.]txt.ts`
- Modify: `src/routes/__root.tsx` (rss alternate link), delete `public/robots.txt`

**Interfaces:**

- Consumes: `getAllArticles()` from `src/lib/articles.ts`, `siteConfig`
- Produces: `buildRssXml(articles: ArticleWithSlug[]): string`, `buildRobotsTxt(): string`

- [ ] **Step 1: Failing test `src/lib/feeds.test.ts`:**

```ts
import { describe, expect, it } from 'vitest'
import { buildRobotsTxt, buildRssXml } from './feeds'
import siteConfig from '../../site.config'

const articles = [
  {
    slug: 'a-b',
    title: 'Tom & Jerry <3',
    description: 'x > y',
    date: '2026-01-02',
    author: 'K',
  },
  {
    slug: 'older',
    title: 'Old',
    description: 'old post',
    date: '2025-01-01',
    author: 'K',
  },
]

describe('buildRssXml', () => {
  it('escapes XML entities and lists every article', () => {
    const xml = buildRssXml(articles)
    expect(xml).toContain('Tom &amp; Jerry &lt;3')
    expect(xml).toContain('x &gt; y')
    expect(xml.match(/<item>/g)).toHaveLength(2)
    expect(xml).toContain(`<link>${siteConfig.url}/articles/a-b</link>`)
    expect(xml).toContain('<rss version="2.0"')
  })
})

describe('buildRobotsTxt', () => {
  it('allows all and points at the sitemap', () => {
    const txt = buildRobotsTxt()
    expect(txt).toContain('User-agent: *')
    expect(txt).toContain(`Sitemap: ${siteConfig.url}/sitemap.xml`)
  })
})
```

- [ ] **Step 2: Run** `pnpm vitest run src/lib/feeds.test.ts` — Expected: FAIL (module missing)
- [ ] **Step 3: Implement `src/lib/feeds.ts`:**

```ts
import siteConfig from '../../site.config'
import type { ArticleWithSlug } from './articles'

function escapeXml(s: string): string {
  return s
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;')
}

export function buildRssXml(articles: ArticleWithSlug[]): string {
  const items = articles
    .map((a) => {
      const url = `${siteConfig.url}/articles/${a.slug}`
      return `    <item>
      <title>${escapeXml(a.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escapeXml(a.description)}</description>
      <pubDate>${new Date(a.date).toUTCString()}</pubDate>
    </item>`
    })
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(siteConfig.title)}</title>
    <link>${siteConfig.url}</link>
    <description>${escapeXml(siteConfig.description)}</description>
    <language>en</language>
    <atom:link href="${siteConfig.url}/rss.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`
}

export function buildRobotsTxt(): string {
  return `User-agent: *
Allow: /

Sitemap: ${siteConfig.url}/sitemap.xml
`
}
```

- [ ] **Step 4: Run test** — Expected: PASS
- [ ] **Step 5: Server routes.** `src/routes/rss[.]xml.ts` (same handler pattern as `sitemap[.]xml.ts`):

```ts
import { createFileRoute } from '@tanstack/react-router'
import { getAllArticles } from '@/lib/articles'
import { buildRssXml } from '@/lib/feeds'

export const Route = createFileRoute('/rss.xml')({
  server: {
    handlers: {
      GET: async () =>
        new Response(buildRssXml(getAllArticles()), {
          headers: {
            'Content-Type': 'application/rss+xml; charset=utf-8',
            'Cache-Control': 'public, max-age=3600, s-maxage=86400',
          },
        }),
    },
  },
})
```

`src/routes/robots[.]txt.ts` identical shape returning `buildRobotsTxt()` as `text/plain`; delete `public/robots.txt`. Add to `__root.tsx` head links: `{ rel: 'alternate', type: 'application/rss+xml', title: siteConfig.title, href: '/rss.xml' }`.

- [ ] **Step 6: Build + commit** — `feat: RSS feed and robots.txt server routes`

### Task 5: Replace sample content

**Files:**

- Delete: `src/content/articles/*` (canvas personal posts), personal `public/resume_karn_may_2026.pdf`, `src/assets/photos/*` stay (generic), `src/assets/portrait.jpg`/`avatar.png` stay as defaults
- Create: three sample articles, `public/resume.pdf` placeholder

- [ ] **Step 1: Write 3 sample articles** under `src/content/articles/<slug>/page.mdx`, each `export const article = { title, description, author, date }`:
  1. `hello-world` — welcome post; explains this site is built from the template, links repo. Short prose.
  2. `make-it-your-own` — walk through editing `site.config.ts`, adding an article directory, swapping avatar/photos, resume pdf. Includes a ```bash fenced block and a GFM table of config fields.
  3. `writing-in-mdx` — demos MDX: headings, `ts + `go code blocks (shiki themes), blockquote, list, inline `code`, an image (colocated `cover.png` — reuse one canvas photo), a React component inline (`<Note>` defined in-file as a styled div).
- [ ] **Step 2: Resume placeholder** — `public/resume.pdf`: generate one-page placeholder PDF via `scripts/` one-liner? No — simplest: keep `resume.enabled: false` as shipped default in site.config.ts and delete pdf; README documents enabling. Update config default accordingly.
- [ ] **Step 3: Regenerate OG images** — `pnpm generate:og`; confirm `public/og/articles/*.png` for 3 new slugs, stale ones deleted.
- [ ] **Step 4: Build + test + commit** — `feat: fresh sample articles demonstrating MDX pipeline`

### Task 6: Cloudflare Workers deploy (default target)

**Files:**

- Create: `wrangler.jsonc`, `.github/workflows/deploy.yml`
- Modify: `vite.config.ts` (nitro cloudflare preset), `package.json` (deploy script, wrangler devDependency), `.gitignore` (`.wrangler/`)

> Exact preset/entry paths verified against current TanStack Start + nitro v3 + Cloudflare docs (research note: see plan appendix once filled). Baseline:

- [ ] **Step 1: vite.config.ts** — `nitro({ config: { preset: 'cloudflare_module' } })`
- [ ] **Step 2: wrangler.jsonc:**

```jsonc
{
  "$schema": "node_modules/wrangler/config-schema.json",
  "name": "karngyan-com",
  "main": ".output/server/index.mjs",
  "compatibility_date": "2026-07-01",
  "compatibility_flags": ["nodejs_compat"],
  "assets": { "directory": ".output/public", "binding": "ASSETS" },
  "observability": { "enabled": true },
}
```

- [ ] **Step 3: scripts** — `"deploy": "pnpm build && wrangler deploy"`, `"preview:cf": "pnpm build && wrangler dev"`; add `wrangler` to devDependencies (latest v4).
- [ ] **Step 4: CI `.github/workflows/deploy.yml`** — on push to `template`; `jdx/mise-action@v2` (respects mise.toml pins) → `pnpm install --frozen-lockfile` → `pnpm test` → `pnpm build` → `cloudflare/wrangler-action@v3` with `apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}`, `accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}`, `command: deploy`.
- [ ] **Step 5: Verify** — `pnpm build` then `pnpm wrangler deploy --dry-run` → prints Worker upload summary without deploying. `pnpm wrangler dev` boots + `curl localhost:8787/rss.xml` returns XML.
- [ ] **Step 6: Commit** — `feat: Cloudflare Workers as default deploy target`

### Task 7: README, CLAUDE.md, contributor docs

**Files:**

- Rewrite: `README.md`; Create: `CLAUDE.md`; Modify: `CONTRIBUTING.md`, `.env.example` (remove — no env needed; or keep empty placeholder note)

- [ ] **Step 1: README.md** — sections: hero (name + one-liner + screenshot placeholder), Features (stack bullets), Quick Start (`Use this template` → `mise install` → `pnpm install` → `pnpm dev`), Make It Yours (edit `site.config.ts`, write `src/content/articles/<slug>/page.mdx`, swap `src/assets`, styles.css accent), Deploy to Cloudflare (wrangler login → `pnpm deploy`; CI secrets `CLOUDFLARE_API_TOKEN`+`CLOUDFLARE_ACCOUNT_ID`), Other hosts (nitro presets note), Contributing, **Awesome Forks (preserve existing list verbatim)**, License, Contact.
- [ ] **Step 2: CLAUDE.md** — commands (dev/build/test/check/deploy/generate:og), architecture map (routes/lib/components/content/site.config.ts), conventions (file-per-article dir + `export const article`, shadcn via `pnpm dlx shadcn@latest add`, Tailwind v4 tokens in styles.css, server routes pattern), "adding an article/page/project" recipes, deploy notes.
- [ ] **Step 3: CONTRIBUTING.md** — update stack mention + pnpm/mise instructions.
- [ ] **Step 4: Commit** — `docs: rewrite README + add CLAUDE.md for the new stack`

### Task 8: Final verification sweep

- [ ] `pnpm check && pnpm test && pnpm build`
- [ ] `node .output/server/index.mjs` OR `pnpm wrangler dev` — curl `/`, `/articles`, one article, `/rss.xml`, `/sitemap.xml`, `/robots.txt`, `/llms.txt`, `/projects`, `/uses`, `/about` → all 200, spot-check bodies
- [ ] `grep -ri nuxt --include='*' -l . | grep -v -e docs/ -e node_modules -e .git` → empty
- [ ] `git status` clean; final commit if stragglers

## Self-Review Notes

- Spec coverage: goals all mapped (stack→T2, config→T3, RSS/robots→T4, samples→T5, CF→T6, mise→T2, README/CLAUDE→T7, verify→T8). Dropped features handled in T1/T3 deletions.
- Data-move arrays in T3 marked as verbatim lifts from canvas files, not placeholders (source content exists and executor reads it in-step).
- T6 flagged for reconciliation against live docs before execution.

## Appendix: Cloudflare deploy path reconciliation (post-research)

Web research (TanStack hosting docs + Cloudflare framework guide, post-Oct-2025) surfaced two valid paths:

1. **Official recommendation:** `@cloudflare/vite-plugin` + `main: "@tanstack/react-start/server-entry"` in wrangler.jsonc, no nitro plugin, output in `dist/`.
2. **Nitro path (shipped):** `nitro/vite` plugin with the cloudflare module preset; nitro generates `.output/server/wrangler.json` + `.wrangler/deploy/config.json` at build.

Decision: **keep the nitro path** — it matches karngyan/canvas (the reference implementation), was verified end-to-end here (workerd dev serving all routes, `wrangler deploy --dry-run` clean), and nitro is pinned exactly (3.0.260311-beta). The inline `nitro({ preset, cloudflare })` config is typed in the installed plugin (`NitroPluginConfig extends NitroConfig`) and works, docs notwithstanding. Both preset spellings normalize; installed beta accepts `cloudflare-module`.

Caveats to watch: TanStack docs mark nitro/vite "under active development"; nitrojs/nitro#3356 (tRPC + SSR nested-route refresh bug — not applicable, no tRPC here). If churn bites, switch to path 1: swap `nitro()` for `cloudflare({ viteEnvironment: { name: 'ssr' } })`, hand-write wrangler.jsonc with the server-entry main, drop the compat-date pin workaround.
