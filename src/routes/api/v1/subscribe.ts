import { createFileRoute } from '@tanstack/react-router'

const MIN_FORM_TIME_MS = 1500
const CUSTOMERIO_CDP_URL = 'https://cdp.customer.io/v1/identify'
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const DISPOSABLE_DOMAINS = [
  'tempmail.com',
  'throwaway.email',
  'mailinator.com',
  'guerrillamail.com',
  '10minutemail.com',
  'temp-mail.org',
]

const log = (msg: string) => console.log(`[Subscribe] ${msg}`)

interface SubscribeTraits {
  email: string
  timezone?: string
  locale?: string
  referrer?: string
  userAgent?: string
  country?: string
  ip?: string
}

async function identifyToCustomerIO(traits: SubscribeTraits): Promise<boolean> {
  const apiKey = process.env.CUSTOMERIO_API_KEY
  if (!apiKey) {
    log('CUSTOMERIO_API_KEY not set, skipping Customer.io')
    return false
  }

  try {
    const res = await fetch(CUSTOMERIO_CDP_URL, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${Buffer.from(apiKey).toString('base64')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: traits.email,
        traits: {
          source: 'newsletter',
          subscribed_at: new Date().toISOString(),
          email: traits.email,
          timezone: traits.timezone,
          locale: traits.locale,
          referrer: traits.referrer,
          user_agent: traits.userAgent,
          country: traits.country,
          ip: traits.ip,
        },
      }),
    })

    if (!res.ok) {
      log(`Customer.io failed: ${res.status} ${res.statusText}`)
      return false
    }

    log(`Customer.io identified: ${traits.email}`)
    return true
  } catch (error) {
    log(
      `Customer.io error: ${error instanceof Error ? error.message : String(error)}`,
    )
    return false
  }
}

function fakeSuccess() {
  return Response.json({
    success: true,
    message: "You're on the list!",
    description: "You'll get notified when I publish something new.",
  })
}

export const Route = createFileRoute('/api/v1/subscribe')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        log('POST received')

        try {
          const {
            email,
            _hp: honeypot,
            _ts: timeSpent,
            timezone,
            locale,
            referrer,
          }: {
            email?: string
            _hp?: string
            _ts?: number
            timezone?: string
            locale?: string
            referrer?: string
          } = await request.json()

          const clientIp =
            request.headers.get('CF-Connecting-IP') ||
            request.headers.get('X-Forwarded-For')?.split(',')[0]?.trim() ||
            'unknown'

          if (honeypot) {
            log(`SPAM: Honeypot triggered from ${clientIp}`)
            return fakeSuccess()
          }

          if (typeof timeSpent === 'number' && timeSpent < MIN_FORM_TIME_MS) {
            log(`SPAM: Too fast (${timeSpent}ms) from ${clientIp}`)
            return fakeSuccess()
          }

          if (!email || typeof email !== 'string') {
            return Response.json(
              { success: false, message: 'Email is required' },
              { status: 400 },
            )
          }

          if (!EMAIL_RE.test(email)) {
            return Response.json(
              { success: false, message: 'Invalid email format' },
              { status: 400 },
            )
          }

          const emailDomain = email.split('@')[1]?.toLowerCase()
          if (emailDomain && DISPOSABLE_DOMAINS.includes(emailDomain)) {
            return Response.json(
              { success: false, message: 'Please use a valid email address' },
              { status: 400 },
            )
          }

          const reqUrl = new URL(request.url)
          const isLocalDev =
            reqUrl.hostname === 'localhost' ||
            reqUrl.hostname === '127.0.0.1' ||
            reqUrl.hostname === '::1'

          if (isLocalDev) {
            log(`Local dev - skipping Customer.io for ${email}`)
          } else {
            const identified = await identifyToCustomerIO({
              email,
              timezone,
              locale,
              referrer,
              userAgent: request.headers.get('User-Agent') || undefined,
              country: request.headers.get('CF-IPCountry') || undefined,
              ip: clientIp !== 'unknown' ? clientIp : undefined,
            })

            if (!identified) {
              log(`Failed to save ${email} to Customer.io`)
            }
          }

          return Response.json({
            success: true,
            message: "You're on the list!",
            description: "You'll get notified when I publish something new.",
            email,
          })
        } catch (error) {
          log(
            `API error: ${error instanceof Error ? error.message : String(error)}`,
          )
          return Response.json(
            { success: false, message: 'Invalid request body' },
            { status: 400 },
          )
        }
      },
    },
  },
})
