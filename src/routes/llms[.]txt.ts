import { createFileRoute } from '@tanstack/react-router'
import siteConfig from '../../site.config'
import { getAllArticles } from '@/lib/articles'

const SITE_URL = siteConfig.url

function buildLlmsTxt(): string {
  const articles = getAllArticles()

  const articleLinks = articles
    .slice(0, 12)
    .map(
      (a) =>
        `- [${a.title}](${SITE_URL}/articles/${a.slug}): ${a.description || a.date}`,
    )
    .join('\n')

  const resumeLine = siteConfig.resume.enabled
    ? `\n- [Resume](${SITE_URL}/resume): PDF resume download`
    : ''

  return `# ${siteConfig.shortName} - ${new URL(siteConfig.url).host}

> ${siteConfig.description}

## About

- [Home](${SITE_URL}/): Portfolio and blog homepage
- [About](${SITE_URL}/about): Background and contact info${resumeLine}
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
      GET: () => {
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
