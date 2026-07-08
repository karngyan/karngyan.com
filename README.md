<p align="center">
  <a href="https://template.karngyan.com">
    <img src="public/android-chrome-192x192.png" alt="Logo" width="72" height="72">
  </a>
  <h3 align="center">karngyan.com</h3>
  <p align="center">
    A personal site + blog template for developers who'd rather write posts than build infrastructure.<br/>
    TanStack Start · React 19 · Tailwind CSS v4 · shadcn/ui · MDX · RSS · Cloudflare Workers
  </p>
</p>

---

**Demo:** [template.karngyan.com](https://template.karngyan.com) · **Author's site built on the same stack:** [karngyan.com](https://karngyan.com)

## Features

- ⚡ **TanStack Start** — file-based routing, SSR, typed loaders, server routes
- 🎨 **Tailwind CSS v4 + shadcn/ui** — CSS-first tokens (oklch), dark/light/system theme with no flash (press `d` to toggle)
- ✍️ **MDX articles** — folders in `src/content/articles/`, Shiki syntax highlighting, GFM tables, inline React components
- 📡 **RSS, sitemap, robots.txt, llms.txt** — server routes generated from your content and config
- 🖼️ **Open Graph images** — generated at build time with satori (default + per-article)
- ☁️ **Cloudflare Workers** — default deploy target, one command or auto-deploy via GitHub Actions
- 📌 **mise.toml** — exact node/pnpm pins, zero "works on my machine"
- 🤖 **Claude-friendly** — `CLAUDE.md` teaches coding agents the repo's architecture and recipes

## Quick start

1. Click **Use this template** on GitHub (or `pnpm dlx degit karngyan/karngyan.com my-site`)
2. Install the toolchain and dependencies:

```bash
mise install     # installs the pinned node + pnpm (https://mise.jdx.dev)
pnpm install
pnpm dev         # → http://localhost:3000
```

## Make it your own

Everything personal lives in three places:

1. **`site.config.ts`** — name, canonical URL, title/description, email, socials, nav, resume toggle, work history, optional Plausible analytics. Fully typed; a typo fails the build.
2. **Images** — `src/assets/avatar.png` (header), `src/assets/portrait.jpg` (about), `src/assets/photos/` (home photo strip), `public/logos/` (work history), `public/favicon*`.
3. **Content** — articles in `src/content/articles/<slug>/page.mdx`; page prose in the route files marked with `✏️` (`src/routes/index.tsx`, `about/`, `uses/`, `projects/`).

Write an article:

```bash
mkdir src/content/articles/my-first-post
$EDITOR src/content/articles/my-first-post/page.mdx
```

```mdx
import { ArticleLayout } from '../../../components/article-layout'

export const article = {
  title: 'My first post',
  description: 'Short summary that shows up in lists, RSS, and OG cards.',
  date: '2026-07-09',
  author: 'you',
}

export const metadata = {
  title: article.title,
  description: article.description,
}

export default (props) => <ArticleLayout article={article} {...props} />

Hello! **Markdown** and <em>JSX</em> both work here.
```

The article index, RSS feed, sitemap, and OG images all regenerate on the next build.

## Deploy to Cloudflare (default)

One-time setup:

```bash
pnpm wrangler login
```

Then, every deploy:

```bash
pnpm run deploy  # = pnpm build && wrangler deploy
```

Your site is live on `<name>.<account>.workers.dev`. Add a custom domain in the Cloudflare dashboard (Workers → your worker → Settings → Domains & Routes), then set `url` in `site.config.ts` to match.

### Auto-deploy with GitHub Actions

Pushes to the default branch deploy automatically via `.github/workflows/deploy.yml`. Add two repository secrets:

- `CLOUDFLARE_API_TOKEN` — create at dash.cloudflare.com → My Profile → API Tokens ("Edit Cloudflare Workers" template)
- `CLOUDFLARE_ACCOUNT_ID` — on the right sidebar of your account's Workers overview page

### Other hosts

The build uses [nitro](https://nitro.build), so other presets (Node server, Netlify, Vercel, …) work by changing the preset in `vite.config.ts` — see the nitro deploy docs.

## Commands

| Command           | What it does                              |
| ----------------- | ----------------------------------------- |
| `pnpm dev`        | Dev server on :3000                       |
| `pnpm build`      | OG images + production build → `.output/` |
| `pnpm test`       | vitest                                    |
| `pnpm check`      | prettier + eslint (auto-fix)              |
| `pnpm run deploy` | build + `wrangler deploy`                 |

## Contributing

PRs welcome — see [CONTRIBUTING.md](CONTRIBUTING.md).

## Awesome Forks ![Awesome](https://cdn.rawgit.com/sindresorhus/awesome/d7305f38d29fed78fa85652e3a63e154dd8e8829/media/badge.svg)

Raise a PR when your website's up to add you here.

- [Anamika Pandey](https://github.com/anamikapandey745) - [anamika.dev](https://anamika.dev)
- [Claudio Canales](https://github.com/klaudioz) - [klaudioz.eth](https://klaudioz.eth.link/)
- [Gyan Prakash Karn](https://github.com/gyankarn) - [karngyan.com](https://karngyan.com)
- [Nenad Radovanovic](https://github.com/nesaplay) - [nenad.xyz](https://nenad.xyz)
- [Ankur Dubey](https://github.com/ankurdubey521) - [ankurdubey.com](https://ankurdubey.com) / [ankurdubey.eth.limo](https://ankurdubey.eth.limo)
- [Madhav Kauntia](https://github.com/madhavkauntia) - [madhavkauntia.com](https://madhavkauntia.com)

> Older forks above were built on the previous Nuxt 2 version of this template — it lives on in git history (`git log`, pre-2026).

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Karn - [@gyankarn](https://x.com/gyankarn) - mail@karngyan.com
