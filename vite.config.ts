import { defineConfig } from 'vite'
import { devtools } from '@tanstack/devtools-vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { nitro } from 'nitro/vite'
import mdx from '@mdx-js/rollup'
import remarkGfm from 'remark-gfm'
import rehypePrettyCode from 'rehype-pretty-code'

const config = defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  plugins: [
    devtools(),
    // deploy target: Cloudflare Workers. nitro generates the wrangler config
    // at build time (.output/server/wrangler.json). Other hosts: swap the
    // preset - https://nitro.build/deploy
    nitro({
      preset: 'cloudflare-module',
      cloudflare: {
        wrangler: {
          // ✏️ your Cloudflare Worker name
          name: 'karngyan-com',
          compatibility_date: '2026-07-02',
        },
      },
    }),
    tailwindcss(),
    {
      enforce: 'pre',
      ...mdx({
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          [
            rehypePrettyCode,
            {
              theme: {
                dark: 'github-dark-dimmed',
                light: 'github-light',
              },
              keepBackground: false,
            },
          ],
        ],
        providerImportSource: '@mdx-js/react',
      }),
    },
    tanstackStart(),
    viteReact({ include: /\.(jsx|js|mdx|md|tsx|ts)$/ }),
  ],
})

export default config
