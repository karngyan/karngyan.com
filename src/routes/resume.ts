import { createFileRoute } from '@tanstack/react-router'
import siteConfig from '../../site.config'

export const Route = createFileRoute('/resume')({
  server: {
    handlers: {
      GET: ({ request }) => {
        if (!siteConfig.resume.enabled) {
          return new Response('Not Found', { status: 404 })
        }
        const url = new URL(siteConfig.resume.path, request.url)
        return Response.redirect(url.toString(), 302)
      },
    },
  },
})
