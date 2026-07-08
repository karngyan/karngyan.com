import {
  HeadContent,
  Scripts,
  ScriptOnce,
  createRootRoute,
  Link,
} from '@tanstack/react-router'
import { ThemeProvider } from '@/integrations/theme/provider'

import appCss from '../styles.css?url'
import siteConfig from '../../site.config'
import { buttonVariants } from '@/components/ui/button'
import { Container } from '@/components/container'
import { Layout } from '@/components/layout'

const themeScript = `(function() {
  try {
    const storageKey = 'site-theme';
    const theme = localStorage.getItem(storageKey) || 'system';
    const resolved = theme === 'system'
      ? (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
      : theme;
    document.documentElement.classList.add(resolved);
  } catch (e) {}
})();`

const siteUrl = siteConfig.url
const defaultTitle = siteConfig.title
const defaultDescription = siteConfig.description
const defaultOgImage = `${siteUrl}/og.png`

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: defaultTitle,
      },
      {
        name: 'description',
        content: defaultDescription,
      },
      // Open Graph
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: new URL(siteConfig.url).host },
      { property: 'og:title', content: defaultTitle },
      { property: 'og:description', content: defaultDescription },
      { property: 'og:image', content: defaultOgImage },
      { property: 'og:url', content: siteUrl },
      // Twitter / X
      { name: 'twitter:card', content: 'summary_large_image' },
      ...(siteConfig.twitterHandle
        ? [
            { name: 'twitter:site', content: siteConfig.twitterHandle },
            { name: 'twitter:creator', content: siteConfig.twitterHandle },
          ]
        : []),
      { name: 'twitter:title', content: defaultTitle },
      { name: 'twitter:description', content: defaultDescription },
      { name: 'twitter:image', content: defaultOgImage },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
      {
        rel: 'manifest',
        href: '/manifest.json',
      },
      {
        rel: 'icon',
        href: '/favicon.ico',
      },
      {
        rel: 'apple-touch-icon',
        href: '/apple-touch-icon.png',
      },
    ],
  }),
  shellComponent: RootDocument,
  notFoundComponent: NotFound,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider defaultTheme="system" storageKey="site-theme">
      <html lang="en" className="h-full antialiased" suppressHydrationWarning>
        <head>
          <HeadContent />
        </head>
        <body className="flex h-full">
          <ScriptOnce>{themeScript}</ScriptOnce>
          <div className="flex w-full">
            <Layout>{children}</Layout>
          </div>
          {siteConfig.analytics?.plausible && (
            <script
              defer
              data-domain={siteConfig.analytics.plausible.domain}
              src={
                siteConfig.analytics.plausible.scriptSrc ??
                'https://plausible.io/js/script.js'
              }
            />
          )}
          <Scripts />
        </body>
      </html>
    </ThemeProvider>
  )
}

function NotFound() {
  return (
    <Container className="flex h-full items-center pt-16 sm:pt-32">
      <div className="flex flex-col items-center">
        <p className="text-base font-semibold text-zinc-400 dark:text-zinc-500">
          404
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
          Page not found
        </h1>
        <p className="mt-4 text-base text-zinc-600 dark:text-zinc-400">
          Sorry, we couldn't find the page you're looking for.
        </p>
        <Link
          to="/"
          className={buttonVariants({
            variant: 'default',
            className: 'mt-4',
          })}
        >
          Go back home
        </Link>
      </div>
    </Container>
  )
}
