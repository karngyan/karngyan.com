import { defineConfig } from 'vite'
import { devtools } from '@tanstack/devtools-vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import viteTsConfigPaths from 'vite-tsconfig-paths'
import tailwindcss from '@tailwindcss/vite'
import { nitro } from 'nitro/vite'
import mdx from '@mdx-js/rollup'
import remarkGfm from 'remark-gfm'
import rehypePrettyCode from 'rehype-pretty-code'

const config = defineConfig({
  plugins: [
    devtools(),
    nitro(),
    viteTsConfigPaths({
      projects: ['./tsconfig.json'],
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
