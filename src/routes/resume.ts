import { createFileRoute } from '@tanstack/react-router'

const RESUME_URL = 'https://karngyan.com/resume_karn_may_2026.pdf'

export const Route = createFileRoute('/resume')({
  server: {
    handlers: {
      GET: () => {
        return Response.redirect(RESUME_URL, 302)
      },
    },
  },
})
