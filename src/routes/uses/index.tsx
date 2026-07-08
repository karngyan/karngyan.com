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
          A living list of the hardware and software I use to build things, stay
          productive, or convince myself I'm being productive while
          procrastinating. Swap in your own setup.
        </p>
      </header>

      <div className="mt-16 sm:mt-20 space-y-20">
        <Section title="Workstation">
          <Tool title="14-inch laptop, plenty of RAM">
            Whatever machine you have is enough - but a fast compile loop and a
            silent fan make long coding sessions a lot more pleasant.
          </Tool>
          <Tool title="External 4K monitor">
            One big screen beats two small ones. Editor and terminal
            side-by-side, browser on the laptop display.
          </Tool>
          <Tool title="Mechanical keyboard">
            Any board you enjoy typing on. Bonus points for remapping Caps Lock
            to Escape.
          </Tool>
          <Tool title="A decent chair">
            Your back will thank you long before your commit history does.
          </Tool>
        </Section>

        <Section title="Development">
          <Tool title="VS Code" href="https://code.visualstudio.com">
            Reliable, extensible, and the default for a reason. Swap in your
            editor of choice - the muscle memory matters more than the logo.
          </Tool>
          <Tool title="Ghostty" href="https://ghostty.org">
            A fast, native terminal that gets out of the way. Pairs well with
            tmux and a good shell prompt.
          </Tool>
          <Tool title="Bruno" href="https://www.usebruno.com">
            Git-friendly API client - collections live as plain files in the
            repo, so they version-control naturally alongside the code.
          </Tool>
          <Tool title="OrbStack" href="https://orbstack.dev">
            Containers and local VMs without the overhead of Docker Desktop.
          </Tool>
        </Section>

        <Section title="Design">
          <Tool title="Figma" href="https://figma.com">
            Where design work starts - and a great virtual whiteboard for
            architecture sketches and thinking out loud with diagrams.
          </Tool>
        </Section>

        <Section title="Productivity">
          <Tool title="Raycast" href="https://raycast.com">
            Launcher, clipboard history, window management, and snippets. If
            you're still using the default launcher, do yourself a favor.
          </Tool>
          <Tool title="A password manager">
            1Password, Bitwarden, pick one - the point is to never think about
            credentials again.
          </Tool>
          <Tool title="Plain notes">
            Notion, Obsidian, or a folder of Markdown files. The system matters
            less than actually writing things down.
          </Tool>
        </Section>
      </div>
    </Container>
  )
}
