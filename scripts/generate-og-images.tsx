/**
 * Build-time OG image generation using Satori.
 * Generates og.png (default) and og/articles/{slug}.png for each article.
 */
import { readFileSync, mkdirSync, writeFileSync, readdirSync } from 'fs'
import { dirname, join, resolve } from 'path'
import { fileURLToPath } from 'url'
import satori from 'satori'
import sharp from 'sharp'
import React from 'react'

interface ArticleMeta {
  title: string
  description: string
  date: string
  author: string
}

interface ArticleWithSlug extends ArticleMeta {
  slug: string
}

function getAllArticles(): ArticleWithSlug[] {
  const articlesDir = join(resolve(dirname(fileURLToPath(import.meta.url)), '..'), 'src/content/articles')
  const dirs = readdirSync(articlesDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)

  const extractString = (block: string, key: string): string => {
    const re = new RegExp(`${key}:\\s*(["'])((?:(?!\\1).)*)\\1`)
    return block.match(re)?.[2] ?? ''
  }

  const articles: ArticleWithSlug[] = []
  for (const slug of dirs) {
    const mdxPath = join(articlesDir, slug, 'page.mdx')
    try {
      const content = readFileSync(mdxPath, 'utf-8')
      const articleMatch = content.match(/export const article = \{([^}]+)\}/s)
      if (!articleMatch) continue
      const block = articleMatch[1]
      const title = extractString(block, 'title') || slug
      const description = extractString(block, 'description')
      const date = extractString(block, 'date')
      const author = extractString(block, 'author') || 'karn'
      articles.push({ slug, title, description, date, author })
    } catch {
      // skip if file missing or unreadable
    }
  }
  return articles.sort((a, z) => +new Date(z.date) - +new Date(a.date))
}

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')
const publicDir = join(root, 'public')
const ogDir = join(publicDir, 'og')
const articlesOgDir = join(ogDir, 'articles')

const WIDTH = 1200
const HEIGHT = 630

// Fetch Figtree from Google Fonts (Satori needs WOFF/TTF, not WOFF2)
async function loadFont(): Promise<ArrayBuffer> {
  const cssRes = await fetch(
    'https://fonts.googleapis.com/css2?family=Figtree:wght@400;700&display=swap',
    {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_8) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1',
      },
    },
  )
  const css = await cssRes.text()
  const urlMatch = css.match(/url\((https:\/\/[^)]+)\)/)
  if (!urlMatch) throw new Error('Could not extract font URL from Google Fonts CSS')
  const fontRes = await fetch(urlMatch[1])
  return fontRes.arrayBuffer()
}

function OgTemplate({
  title,
  description,
  isArticle = false,
}: {
  title: string
  description?: string
  isArticle?: boolean
}) {
  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#0a0a0a',
        padding: 60,
        fontFamily: 'Figtree',
      }}
    >
      <div
        style={{
          display: 'flex',
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            fontSize: 14,
            color: '#71717a',
            marginBottom: 16,
            textTransform: 'uppercase',
            letterSpacing: 2,
          }}
        >
          karngyan.com
        </div>
        <div
          style={{
            fontSize: isArticle ? 48 : 56,
            fontWeight: 700,
            color: '#fafafa',
            lineHeight: 1.2,
            marginBottom: description ? 24 : 0,
          }}
        >
          {title}
        </div>
        {description && (
          <div
            style={{
              fontSize: 24,
              color: '#a1a1aa',
              lineHeight: 1.4,
              maxWidth: 900,
            }}
          >
            {description.length > 120 ? `${description.slice(0, 120)}...` : description}
          </div>
        )}
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          marginTop: 'auto',
        }}
      >
        <div
          style={{
            width: 8,
            height: 8,
            borderRadius: 4,
            backgroundColor: '#22c55e',
          }}
        />
        <span style={{ fontSize: 14, color: '#71717a' }}>
          your friendly neighbourhood developer
        </span>
      </div>
    </div>
  )
}

async function generatePng(
  component: React.ReactElement,
  fontData: ArrayBuffer,
): Promise<Buffer> {
  const svg = await satori(component, {
    width: WIDTH,
    height: HEIGHT,
    fonts: [
      {
        name: 'Figtree',
        data: fontData,
        weight: 400,
        style: 'normal',
      },
    ],
  })

  const png = await sharp(Buffer.from(svg), { density: 72 })
    .png()
    .toBuffer()

  return png
}

async function main() {
  console.log('Loading font...')
  const fontData = await loadFont()

  mkdirSync(articlesOgDir, { recursive: true })

  // Default OG image
  const defaultPng = await generatePng(
    <OgTemplate
      title="karn"
      description="Senior Software Engineer at Customer.io. I build product experiences end-to-end with Go and React. Based in Bengaluru, India."
    />,
    fontData,
  )
  writeFileSync(join(publicDir, 'og.png'), defaultPng)
  console.log('Generated public/og.png')

  // Per-article OG images
  const articles = getAllArticles()
  for (const article of articles) {
    const png = await generatePng(
      <OgTemplate
        title={article.title}
        description={article.description}
        isArticle
      />,
      fontData,
    )
    const outPath = join(articlesOgDir, `${article.slug}.png`)
    writeFileSync(outPath, png)
    console.log(`Generated ${outPath}`)
  }

  console.log(`Done. Generated 1 default + ${articles.length} article OG images.`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
