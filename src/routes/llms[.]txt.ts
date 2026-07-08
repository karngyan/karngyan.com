import { createFileRoute } from '@tanstack/react-router'
import { getAllArticles } from '@/lib/articles'

const SITE_URL = 'https://karngyan.com'

function buildLlmsTxt(): string {
  const articles = getAllArticles()

  const articleLinks = articles
    .slice(0, 12)
    .map(
      (a) =>
        `- [${a.title}](${SITE_URL}/articles/${a.slug}): ${a.description || a.date}`,
    )
    .join('\n')

  return `# karn - karngyan.com

> Senior Software Engineer at Customer.io. I build product experiences end-to-end with Go and React, and build courses for engineers at karnstack.com. Writing about software, engineering, and things I find interesting.

## About

- [Home](${SITE_URL}/): Portfolio and blog homepage
- [About](${SITE_URL}/about): Background and contact info
- [Resume](${SITE_URL}/resume): PDF resume download
- [Projects](${SITE_URL}/projects): Side projects and open source
- [Uses](${SITE_URL}/uses): Tools and setup

## Articles

${articleLinks}

## Optional

- [All Articles](${SITE_URL}/articles): Full article index
`
}

export const Route = createFileRoute('/llms.txt')({
  server: {
    handlers: {
      GET: async () => {
        const content = buildLlmsTxt()
        return new Response(content, {
          headers: {
            'Content-Type': 'text/plain; charset=utf-8',
            'Cache-Control': 'public, max-age=3600, s-maxage=86400',
          },
        })
      },
    },
  },
})
