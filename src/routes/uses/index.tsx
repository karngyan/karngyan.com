import { createFileRoute } from '@tanstack/react-router'
import siteConfig from '../../../site.config'
import { Container } from '@/components/container'

export const Route = createFileRoute('/uses/')({
  component: Uses,
  head: () => ({
    meta: [
      { title: `Uses - ${siteConfig.shortName}` },
      {
        name: 'description',
        content:
          'The gear, software, and tools I use daily for software development.',
      },
      { property: 'og:title', content: `Uses - ${siteConfig.shortName}` },
      {
        property: 'og:description',
        content:
          'The gear, software, and tools I use daily for software development.',
      },
    ],
  }),
})

function Section({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="md:border-l md:border-border md:pl-6">
      <div className="grid max-w-3xl grid-cols-1 items-baseline gap-y-8 md:grid-cols-4">
        <h2 className="text-sm font-semibold text-foreground">{title}</h2>
        <div className="md:col-span-3">
          <ul role="list" className="space-y-10">
            {children}
          </ul>
        </div>
      </div>
    </section>
  )
}

function Tool({
  title,
  href,
  children,
}: {
  title: string
  href?: string
  children: React.ReactNode
}) {
  return (
    <li className="group relative flex flex-col items-start">
      <h3 className="text-sm font-semibold tracking-tight text-foreground">
        {href ? (
          <a
            href={href}
            target="_blank"
            rel="noreferrer"
            className="transition hover:text-muted-foreground"
          >
            {title}
          </a>
        ) : (
          title
        )}
      </h3>
      <p className="relative z-10 mt-2 text-sm text-muted-foreground">
        {children}
      </p>
    </li>
  )
}

function Uses() {
  return (
    <Container className="mt-16 sm:mt-32">
      {/* ✏️ Edit your uses list below - Section and Tool are plain components */}
      <header className="max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Software I use, gear I rely on, and things I recommend.
        </h1>
        <p className="mt-6 text-base text-muted-foreground">
          I get asked a lot about what I use to build software, stay productive,
          or buy to fool myself into thinking I'm being productive when I'm
          really just procrastinating. Here's a reasonably complete list.
        </p>
      </header>

      <div className="mt-16 sm:mt-20 space-y-20">
        <Section title="Workstation">
          <Tool title="MacBook Pro M4 Max, 36 GB, 16-inch, 1 TB SSD (Nov 2024)">
            The jump from Intel to Apple Silicon was already wild, but M4 Max
            takes it further. Compiles are instant, the fans are silent, and
            I've never once felt the machine sweat. Best laptop I've owned.
          </Tool>
          <Tool
            title="LG Ergo 4K 34-inch + LG 27-inch 2K"
            href="https://www.lg.com"
          >
            I run a dual-monitor setup. The 34-inch 4K handles most of my work -
            terminal, editor, browser all at once. The 27-inch 2K sits above for
            docs, Slack, or a second browser window. My wife inherited the old
            MSI ultrawide when I upgraded - she's a backend engineer so it's in
            good hands.
          </Tool>
          <Tool title="Apple Magic Keyboard">
            Clean, compact, integrates perfectly with macOS. I have Caps Lock
            remapped to Escape for Vim muscle memory.
          </Tool>
          <Tool title="Apple Magic Trackpad">
            The gestures just click for me. Three-finger swipe between spaces,
            four-finger swipe for Mission Control - once it's in your muscle
            memory you can't go back.
          </Tool>
          <Tool
            title="Logitech MX Master 3"
            href="https://www.logitech.com/en-us/products/mice/mx-master-3s.html"
          >
            Great mouse - the horizontal scroll wheel is genuinely useful for
            wide files and timelines. Hoping to upgrade to the MX Master 4 or
            something new soon.
          </Tool>
          <Tool title="Flowlyf Standing Desk" href="https://flowlyf.com">
            Electric sit-stand desk. I alternate through the day. Whether it's
            actually healthier or I'm just optimizing to feel productive, I
            can't tell anymore - but it feels good.
          </Tool>
          <Tool title="Greensoul Chair">
            Old school but it gets the job done. Probably due for an upgrade -
            if you have recommendations, let me know.
          </Tool>
        </Section>

        <Section title="Development">
          <Tool title="Cursor" href="https://cursor.sh">
            My primary editor. Cursor is what finally pulled me away from
            spending more time configuring Vim than writing code. AI-native
            editing with a real IDE behind it - hard to argue with.
          </Tool>
          <Tool title="Ghostty" href="https://ghostty.org">
            My terminal of choice. Fast, native, and gets out of the way. I have
            a full tmux setup with Powerlevel10k, zsh-autosuggestions, and fzf.
            Leader key is Ctrl-A.
          </Tool>
          <Tool title="tmux + zsh">
            Custom tmux config with persistent sessions across the machines I
            work on. Powerlevel10k for the prompt, zsh-autosuggestions so I
            rarely have to type full commands twice, and fzf hooked into history
            search and file navigation.
          </Tool>
          <Tool title="TablePlus" href="https://tableplus.com">
            The best GUI for databases I've found. MySQL, Postgres, Redis - all
            in one place, clean interface, doesn't feel like enterprise
            software. Saved me from building a hundred admin panels.
          </Tool>
          <Tool title="OrbStack" href="https://orbstack.dev">
            Replaced Docker Desktop entirely. Faster, lighter, and actually
            integrates with macOS properly. Also handles local k8s environments
            well.
          </Tool>
          <Tool title="Bruno" href="https://www.usebruno.com">
            Git-friendly API client. Collections live as plain files in the
            repo, so they version-control naturally alongside the code. Replaced
            Postman for me entirely.
          </Tool>
          <Tool title="HTTPie CLI" href="https://httpie.io/cli">
            For quick one-off API calls from the terminal. Much more readable
            than curl for JSON responses.
          </Tool>
          <Tool title="Tailscale" href="https://tailscale.com">
            Zero-config VPN built on WireGuard. I use it to connect to my
            homelab from anywhere without poking holes in firewalls. Setup takes
            minutes and it just works.
          </Tool>
        </Section>

        <Section title="Browser">
          <Tool title="Arc" href="https://arc.net">
            The browser that actually rethought tabs. Spaces keep work and
            personal contexts separate, and the command bar makes navigating
            feel closer to a keyboard-driven editor than a browser.
          </Tool>
          <Tool title="Requestly" href="https://requestly.io">
            Browser extension for intercepting and modifying HTTP requests.
            Handy for testing redirects, mocking API responses, or overriding
            headers without spinning up a proxy.
          </Tool>
        </Section>

        <Section title="Design">
          <Tool title="Figma" href="https://figma.com">
            Where all design work starts. Also doubles as a virtual whiteboard
            for architecture sketches, async design reviews, and just thinking
            out loud with diagrams.
          </Tool>
          <Tool title="v0 by Vercel" href="https://v0.dev">
            Useful for quick prototyping when I want to share a rough design
            idea or generate a component I can then customize. Not a replacement
            for real design work, but great for the "what if it looked like
            this?" phase.
          </Tool>
        </Section>

        <Section title="Fonts">
          <Tool
            title="Figtree"
            href="https://fonts.google.com/specimen/Figtree"
          >
            My preferred font for UI and the web. Geometric sans-serif that
            reads cleanly at small sizes without feeling cold. This site uses
            it.
          </Tool>
          <Tool title="Menlo">
            Default macOS monospace font and still the one I keep coming back to
            in the editor. No ligatures, no fuss - just clear, readable code
            characters.
          </Tool>
        </Section>

        <Section title="AI">
          <Tool title="Claude" href="https://claude.ai">
            My go-to for writing, reasoning through complex problems, and code
            review. Usually more careful and nuanced than GPT for longer
            context.
          </Tool>
          <Tool title="ChatGPT" href="https://chatgpt.com">
            Still useful, especially for quick lookups and when I want a second
            opinion. GPT-5 is fast enough to use like a smarter autocomplete.
          </Tool>
          <Tool title="Codex" href="https://openai.com/codex">
            Still early in integrating this into my workflow, but it's promising
            for longer autonomous coding tasks.
          </Tool>
        </Section>

        <Section title="Productivity">
          <Tool title="1Password" href="https://1password.com">
            Password manager I've used for years. The browser integration and
            CLI are both solid. I don't think about credentials anymore, which
            is the point.
          </Tool>
          <Tool title="Slack" href="https://slack.com">
            Work comms. It's everywhere so there's no escaping it - but the
            keyboard shortcuts and thread model are good enough that I don't
            mind.
          </Tool>
          <Tool title="Linear" href="https://linear.app">
            Issue tracker that doesn't feel like it was designed to be
            enterprise software. Fast, keyboard-driven, and the cycle/project
            model maps well to how I actually think about work. Use it for side
            projects and freelance.
          </Tool>
          <Tool title="YouTube Music" href="https://music.youtube.com">
            Underrated. The library is massive, it surfaces stuff I wouldn't
            find on Spotify, and the auto-mix for any artist or song is
            genuinely good for long coding sessions.
          </Tool>
          <Tool title="Raycast" href="https://raycast.com">
            Replaced Spotlight entirely. Launcher, clipboard history, window
            management, snippets, and a growing extension ecosystem. If you're
            still using Spotlight, do yourself a favor.
          </Tool>
          <Tool
            title="Notion Calendar"
            href="https://notion.so/product/calendar"
          >
            Syncs across everything - work calendar, personal, side project
            stuff. Clean interface and it doesn't try to do too much.
          </Tool>
          <Tool title="Notion" href="https://notion.so">
            Notes, docs, project tracking, and brain dumps. I use it for both
            work and personal projects. Also using Notion Mail now for email.
          </Tool>
          <Tool title="Cal.com" href="https://cal.com">
            Open source scheduling that lets me share booking links without
            giving up control over my time. Self-hostable if you care about
            that.
          </Tool>
        </Section>

        <Section title="Deployment">
          <Tool title="Railway" href="https://railway.app">
            My default for side projects and freelance work. Zero infra overhead
            - push code, it runs. Postgres, Redis, and cron jobs all included.
          </Tool>
          <Tool
            title="Cloudflare Workers"
            href="https://workers.cloudflare.com"
          >
            For edge-deployed functions, APIs, or anything that needs to be
            globally fast and cheap. The free tier is generous enough that most
            side projects never need to pay.
          </Tool>
        </Section>
      </div>
    </Container>
  )
}
