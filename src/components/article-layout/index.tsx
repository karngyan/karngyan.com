import { useRouter } from '@tanstack/react-router'
import { Container } from '@/components/container'
import { Prose } from '@/components/prose'
import { formatDate } from '@/lib/format-date'

interface ArticleMeta {
  title: string
  description: string
  date: string
  author: string
}

function ArrowLeftIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path
        d="M7.25 11.25 3.75 8m0 0 3.5-3.25M3.75 8h8.5"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function ArticleLayout({
  article,
  children,
}: {
  article: ArticleMeta
  children: React.ReactNode
}) {
  const router = useRouter()

  return (
    <Container className="mt-16 lg:mt-32">
      <div className="xl:relative">
        <div className="mx-auto max-w-2xl">
          <button
            type="button"
            onClick={() => router.history.back()}
            aria-label="Go back to articles"
            className="group mb-8 flex h-10 w-10 items-center justify-center rounded-full bg-background shadow-md ring-1 shadow-foreground/5 ring-foreground/10 transition hover:ring-foreground/20 lg:absolute lg:-left-5 lg:-mt-2 lg:mb-0 xl:-top-1.5 xl:left-0 xl:mt-0"
          >
            <ArrowLeftIcon className="h-4 w-4 stroke-muted-foreground transition group-hover:stroke-foreground" />
          </button>
          <article>
            <header className="flex flex-col">
              <h1 className="mt-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                {article.title}
              </h1>
              <time
                dateTime={article.date}
                className="order-first flex items-center text-base text-muted-foreground"
              >
                <span className="h-4 w-0.5 rounded-full bg-border" />
                <span className="ml-3">{formatDate(article.date)}</span>
              </time>
            </header>
            <Prose className="mt-8" data-mdx-content>
              {children}
            </Prose>
          </article>
        </div>
      </div>
    </Container>
  )
}
