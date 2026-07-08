import { createFileRoute } from '@tanstack/react-router'
import { getAllArticles } from '@/lib/articles'
import { buildRssXml } from '@/lib/feeds'

export const Route = createFileRoute('/rss.xml')({
  server: {
    handlers: {
      GET: () =>
        new Response(buildRssXml(getAllArticles()), {
          headers: {
            'Content-Type': 'application/rss+xml; charset=utf-8',
            'Cache-Control': 'public, max-age=3600, s-maxage=86400',
          },
        }),
    },
  },
})
