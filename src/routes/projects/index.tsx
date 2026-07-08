import { createFileRoute } from '@tanstack/react-router'
import { cn } from '@/lib/utils'
import { Container } from '@/components/container'
import { ContentCard } from '@/components/content-card'
import { Badge } from '@/components/ui/badge'
import siteConfig from '../../../site.config'
import {
  CaseSensitive,
  FileCode,
  Layers,
  Link,
  SearchCode,
  type LucideIcon,
} from 'lucide-react'

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
const projects: Project[] = [
  {
    name: 'chunkx',
    description:
      'AST-based code chunking library implementing the CAST algorithm. Supports 30+ programming languages via tree-sitter with configurable chunk sizes.',
    link: {
      href: 'https://github.com/gomantics/chunkx',
      label: 'gomantics/chunkx',
    },
    language: 'Go',
    icon: Layers,
  },
  {
    name: 'cfgx',
    description:
      'Type-safe configuration code generation for Go. Define your config in TOML, generate strongly-typed Go code with zero runtime dependencies.',
    link: {
      href: 'https://github.com/gomantics/cfgx',
      label: 'gomantics/cfgx',
    },
    language: 'Go',
    icon: FileCode,
  },
  {
    name: 'sx',
    description:
      'String case conversion for Go. Converts between camelCase, PascalCase, kebab-case, snake_case, and more.',
    link: { href: 'https://github.com/gomantics/sx', label: 'gomantics/sx' },
    language: 'Go',
    icon: CaseSensitive,
  },
  {
    name: 'semantix',
    description:
      'Semantic code search with MCP integration. Talk to multiple indexed repositories using natural language queries.',
    link: {
      href: 'https://github.com/gomantics/semantix',
      label: 'gomantics/semantix',
    },
    language: 'Go',
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
        <p className="mt-6 text-base text-muted-foreground">
          Most of my high-value work lives inside company repos - that's the
          reality of building software professionally since my second year of
          college. These are the open-source things I've shipped under{' '}
          <a
            href="https://github.com/gomantics"
            target="_blank"
            rel="noreferrer"
            className="text-foreground underline decoration-muted-foreground/40 underline-offset-2 transition hover:decoration-foreground"
          >
            gomantics
          </a>
          . They're mostly Go libraries for now - I'm actively working toward
          building more full-stack, self-hostable apps in the open.
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
