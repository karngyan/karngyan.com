import type { ComponentType } from 'react'

export interface ArticleMeta {
  title: string
  description: string
  date: string
  author: string
}

export interface ArticleWithSlug extends ArticleMeta {
  slug: string
}

interface MDXModule {
  article: ArticleMeta
  default: ComponentType
}

// Eagerly load all article metadata at build time
const articleModules = import.meta.glob<MDXModule>(
  '/src/content/articles/*/page.mdx',
  { eager: true },
)

function slugFromPath(path: string): string {
  // e.g. /src/content/articles/hash-tables/page.mdx -> hash-tables
  const parts = path.split('/')
  return parts[parts.length - 2]
}

export function getAllArticles(): Array<ArticleWithSlug> {
  const articles = Object.entries(articleModules).map(([path, mod]) => ({
    slug: slugFromPath(path),
    ...mod.article,
  }))

  return articles.sort((a, z) => +new Date(z.date) - +new Date(a.date))
}

export function getArticle(
  slug: string,
): { slug: string; Component: ComponentType; meta: ArticleMeta } | null {
  const entry = Object.entries(articleModules).find(
    ([path]) => slugFromPath(path) === slug,
  )
  if (!entry) return null
  const [path, mod] = entry
  return {
    slug: slugFromPath(path),
    Component: mod.default,
    meta: mod.article,
  }
}
