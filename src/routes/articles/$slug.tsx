import { createFileRoute, notFound } from '@tanstack/react-router'
import { getAllArticles, getArticle } from '@/lib/articles'

const siteUrl = 'https://karngyan.com'

export const Route = createFileRoute('/articles/$slug')({
  component: ArticlePage,
  loader: ({ params }) => {
    const articles = getAllArticles()
    const meta = articles.find((a) => a.slug === params.slug)
    if (!meta) throw notFound()
    return { slug: params.slug, meta }
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {}
    const { meta, slug } = loaderData
    const title = `${meta.title} - karn`
    const description = meta.description
    const url = `${siteUrl}/articles/${slug}`
    const ogImage = `${siteUrl}/og/articles/${slug}.png`

    return {
      meta: [
        { title },
        { name: 'description', content: description },
        { property: 'og:type', content: 'article' },
        { property: 'og:title', content: title },
        { property: 'og:description', content: description },
        { property: 'og:image', content: ogImage },
        { property: 'og:url', content: url },
        { property: 'article:published_time', content: meta.date },
        { property: 'article:author', content: meta.author },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: title },
        { name: 'twitter:description', content: description },
        { name: 'twitter:image', content: ogImage },
      ],
    }
  },
})

function ArticlePage() {
  const { slug } = Route.useLoaderData()
  const result = getArticle(slug)

  if (!result) {
    return null
  }

  const { Component } = result
  return <Component />
}
