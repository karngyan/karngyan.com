declare module '*.mdx' {
  import type { ComponentType } from 'react'

  export interface ArticleMeta {
    title: string
    description: string
    date: string
    author: string
  }

  export const article: ArticleMeta
  export const metadata: { title: string; description: string }
  const MDXComponent: ComponentType
  export default MDXComponent
}
