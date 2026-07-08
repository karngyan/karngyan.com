import { createFileRoute } from '@tanstack/react-router'
import { CaseSensitive, FileCode, Layers, Link, SearchCode } from 'lucide-react'
import siteConfig from '../../../site.config'
import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Container } from '@/components/container'
import { ContentCard } from '@/components/content-card'
import { Badge } from '@/components/ui/badge'

export const Route = createFileRoute('/projects/')({
  component: Projects,
  head: () => ({
    meta: [
      { title: `Projects - ${siteConfig.shortName}` },
      {
        name: 'description',
        content:
          'Open source projects and side experiments I have built and maintain.',
      },
      { property: 'og:title', content: `Projects - ${siteConfig.shortName}` },
      {
        property: 'og:description',
        content:
          'Open source projects and side experiments I have built and maintain.',
      },
    ],
  }),
})

type Project = {
  name: string
  description: string
  link: { href: string; label: string }
  language: string
  icon: LucideIcon
  comingSoon?: boolean
}

// ✏️ Edit your projects below
const projects: Array<Project> = [
  {
    name: 'this-website',
    description:
      'The site you are looking at right now. TanStack Start, React, Tailwind v4, MDX articles, RSS, and OG image generation - deployed on Cloudflare Workers.',
    link: {
      href: 'https://github.com/karngyan/karngyan.com',
      label: 'karngyan/karngyan.com',
    },
    language: 'TypeScript',
    icon: Layers,
  },
  {
    name: 'acme-cli',
    description:
      'A sample project card. Point it at one of your repos - the icon, language badge, and link label are all just props.',
    link: { href: 'https://example.com', label: 'you/acme-cli' },
    language: 'Go',
    icon: FileCode,
  },
  {
    name: 'markdown-notes',
    description:
      'Another placeholder. Cards link out wherever you want - GitHub, a live demo, a package registry, or a write-up.',
    link: { href: 'https://example.com', label: 'you/markdown-notes' },
    language: 'Rust',
    icon: CaseSensitive,
  },
  {
    name: 'secret-sauce',
    description:
      'Use the comingSoon flag for things you are still cooking. The card dims and the link stops working.',
    link: { href: 'https://example.com', label: 'you/secret-sauce' },
    language: 'Zig',
    icon: SearchCode,
    comingSoon: true,
  },
]


function ProjectCard({ project }: { project: Project }) {
  const Icon = project.icon

  return (
    <ContentCard as="li" className={cn(project.comingSoon && 'opacity-60')}>
      <div className="relative z-10 flex w-full items-start justify-between gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted ring-1 ring-border">
          <Icon className="h-5 w-5 text-foreground" />
        </div>
        <div className="flex items-center gap-2">
          {project.comingSoon && (
            <Badge variant="outline" className="text-[0.6rem]">
              coming soon
            </Badge>
          )}
          <Badge variant="secondary" className="text-[0.6rem]">
            {project.language}
          </Badge>
        </div>
      </div>

      <h2 className="mt-5 text-base font-semibold tracking-tight text-foreground">
        {project.comingSoon ? (
          project.name
        ) : (
          <>
            <div className="absolute -inset-x-4 -inset-y-6 z-0 scale-95 rounded-2xl bg-muted opacity-0 transition group-hover:scale-100 group-hover:opacity-100 sm:-inset-x-6" />
            <a
              href={project.link.href}
              target="_blank"
              rel="noreferrer"
              className="relative z-10"
            >
              {project.name}
            </a>
          </>
        )}
      </h2>

      <ContentCard.Description>{project.description}</ContentCard.Description>

      <div className="relative z-10 mt-5 flex items-center gap-4">
        <a
          href={project.link.href}
          target="_blank"
          rel="noreferrer"
          className={cn(
            'flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition',
            !project.comingSoon && 'hover:text-foreground',
          )}
          aria-disabled={project.comingSoon}
          tabIndex={project.comingSoon ? -1 : undefined}
          onClick={project.comingSoon ? (e) => e.preventDefault() : undefined}
        >
          <Link className="h-3.5 w-3.5 flex-none" />
          <span>{project.link.label}</span>
        </a>
      </div>
    </ContentCard>
  )
}

function Projects() {
  return (
    <Container className="mt-16 sm:mt-32">
      <header className="max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Things I've made trying to put my dent in the universe.
        </h1>
        {/* ✏️ Edit your projects intro below */}
        <p className="mt-6 text-base text-muted-foreground">
          A mix of open-source work, side projects, and experiments. Some are
          actively maintained, some are finished, and some are just ideas that
          escaped the notebook. Click through to the code or the story behind
          each one.
        </p>
      </header>

      <ul
        role="list"
        className="mt-16 grid grid-cols-1 gap-x-12 gap-y-14 sm:grid-cols-2 sm:mt-20 lg:grid-cols-3"
      >
        {projects.map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </ul>
    </Container>
  )
}
