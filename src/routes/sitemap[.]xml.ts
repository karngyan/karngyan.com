import { createFileRoute } from '@tanstack/react-router'
import { getAllArticles } from '@/lib/articles'

const SITE_URL = 'https://karngyan.com'

function buildSitemapXml(): string {
  const articles = getAllArticles()
  const now = new Date().toISOString().split('T')[0]

  const staticPages = [
    { path: '/', priority: '1.0' },
    { path: '/about', priority: '0.8' },
    { path: '/articles', priority: '0.8' },
    { path: '/projects', priority: '0.8' },
    { path: '/uses', priority: '0.8' },
    { path: '/resume', priority: '0.7' },
  ]

  const urlEntries = [
    ...staticPages.map(
      (p) =>
        `  <url>
    <loc>${SITE_URL}${p.path}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${p.priority}</priority>
  </url>`,
    ),
    ...articles.map(
      (a) =>
        `  <url>
    <loc>${SITE_URL}/articles/${a.slug}</loc>
    <lastmod>${a.date.split('T')[0] || a.date}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`,
    ),
  ]

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries.join('\n')}
</urlset>`
}

export const Route = createFileRoute('/sitemap.xml')({
  server: {
    handlers: {
      GET: async () => {
        const xml = buildSitemapXml()
        return new Response(xml, {
          headers: {
            'Content-Type': 'application/xml; charset=utf-8',
            'Cache-Control': 'public, max-age=3600, s-maxage=86400',
          },
        })
      },
    },
  },
})
