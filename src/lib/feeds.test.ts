import { describe, expect, it } from 'vitest'
import siteConfig from '../../site.config'
import { buildRobotsTxt, buildRssXml } from './feeds'

const articles = [
  {
    slug: 'a-b',
    title: 'Tom & Jerry <3',
    description: 'x > y',
    date: '2026-01-02',
    author: 'K',
  },
  {
    slug: 'older',
    title: 'Old',
    description: 'old post',
    date: '2025-01-01',
    author: 'K',
  },
]

describe('buildRssXml', () => {
  it('escapes XML entities and lists every article', () => {
    const xml = buildRssXml(articles)
    expect(xml).toContain('Tom &amp; Jerry &lt;3')
    expect(xml).toContain('x &gt; y')
    expect(xml.match(/<item>/g)).toHaveLength(2)
    expect(xml).toContain(`<link>${siteConfig.url}/articles/a-b</link>`)
    expect(xml).toContain('<rss version="2.0"')
  })

  it('uses the site config for channel metadata', () => {
    const xml = buildRssXml([])
    expect(xml).toContain(`<link>${siteConfig.url}</link>`)
    expect(xml).toContain(
      `<atom:link href="${siteConfig.url}/rss.xml" rel="self" type="application/rss+xml"/>`,
    )
  })
})

describe('buildRobotsTxt', () => {
  it('allows all and points at the sitemap', () => {
    const txt = buildRobotsTxt()
    expect(txt).toContain('User-agent: *')
    expect(txt).toContain(`Sitemap: ${siteConfig.url}/sitemap.xml`)
  })
})
