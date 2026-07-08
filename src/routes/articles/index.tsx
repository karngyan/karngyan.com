import { createFileRoute } from '@tanstack/react-router'
import { Container } from '@/components/container'
import { ContentCard } from '@/components/content-card'
import { getAllArticles, type ArticleWithSlug } from '@/lib/articles'
import { formatDate } from '@/lib/format-date'

export const Route = createFileRoute('/articles/')({
  component: ArticlesIndex,
  loader: () => {
    return { articles: getAllArticles() }
  },
  head: () => ({
    meta: [
      { title: 'Articles - karn' },
      {
        name: 'description',
        content:
          'Long-form thoughts on software engineering, career, data structures, and more.',
      },
      { property: 'og:title', content: 'Articles - karn' },
      {
        property: 'og:description',
        content:
          'Long-form thoughts on software engineering, career, data structures, and more.',
      },
    ],
  }),
})

function Article({ article }: { article: ArticleWithSlug }) {
  return (
    <article className="md:grid md:grid-cols-4 md:items-baseline">
      <ContentCard className="md:col-span-3">
        <ContentCard.Title
          as="h2"
          to="/articles/$slug"
          params={{ slug: article.slug }}
        >
          {article.title}
        </ContentCard.Title>
        <ContentCard.Eyebrow
          as="time"
          dateTime={article.date}
          decorate
          className="md:hidden"
        >
          {formatDate(article.date)}
        </ContentCard.Eyebrow>
        <ContentCard.Description>{article.description}</ContentCard.Description>
        <ContentCard.Cta>Read article</ContentCard.Cta>
      </ContentCard>
      <ContentCard.Eyebrow
        as="time"
        dateTime={article.date}
        className="mt-1 max-md:hidden"
      >
        {formatDate(article.date)}
      </ContentCard.Eyebrow>
    </article>
  )
}

function ArticlesIndex() {
  const { articles } = Route.useLoaderData()

  return (
    <Container className="mt-16 sm:mt-32">
      <header className="max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Writing on software, career stories, and things I find interesting.
        </h1>
        <p className="mt-6 text-base text-muted-foreground">
          All of my long-form thoughts on programming, work, data structures,
          and more, collected in chronological order.
        </p>
      </header>
      <div className="mt-16 sm:mt-20">
        <div className="md:border-l md:border-border md:pl-6">
          <div className="flex max-w-3xl flex-col space-y-16">
            {articles.map((article) => (
              <Article key={article.slug} article={article} />
            ))}
          </div>
        </div>
      </div>
    </Container>
  )
}
