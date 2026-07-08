import { createFileRoute } from '@tanstack/react-router'
import { motion, useAnimationFrame, useMotionValue } from 'motion/react'
import { useRef, useCallback, useState } from 'react'

import { ContentCard } from '@/components/content-card'
import { Button } from '@/components/ui/button'
import { buttonVariants } from '@/components/ui/button'
import { Container } from '@/components/container'
import { Input } from '@/components/ui/input'
import {
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  XIcon,
  CalendarIcon,
} from '@/components/social-icons'
import logoCustomerio from '@/assets/logos/customerio.jpeg'
import logoKarnstack from '@/assets/logos/karnstack.png'
import logoSendx from '@/assets/logos/sendx.jpeg'
import logoAmazon from '@/assets/logos/amazon.jpeg'
import logoCriodo from '@/assets/logos/criodo.jpeg'
import image1 from '@/assets/photos/image-1.jpg'
import image2 from '@/assets/photos/image-2.jpg'
import image3 from '@/assets/photos/image-3.jpg'
import image4 from '@/assets/photos/image-4.jpg'
import image5 from '@/assets/photos/image-5.jpg'
import image6 from '@/assets/photos/image-6.jpg'
import image7 from '@/assets/photos/image-7.jpg'
import image8 from '@/assets/photos/image-8.jpg'
import image9 from '@/assets/photos/image-9.jpg'
import { type ArticleWithSlug, getAllArticles } from '@/lib/articles'
import { formatDate } from '@/lib/format-date'
import { cn } from '@/lib/utils'

function MailIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M2.75 7.75a3 3 0 0 1 3-3h12.5a3 3 0 0 1 3 3v8.5a3 3 0 0 1-3 3H5.75a3 3 0 0 1-3-3v-8.5Z"
        className="fill-muted stroke-muted-foreground"
      />
      <path
        d="m4 6 6.024 5.479a2.915 2.915 0 0 0 3.952 0L20 6"
        className="stroke-muted-foreground"
      />
    </svg>
  )
}

function BriefcaseIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M2.75 9.75a3 3 0 0 1 3-3h12.5a3 3 0 0 1 3 3v8.5a3 3 0 0 1-3 3H5.75a3 3 0 0 1-3-3v-8.5Z"
        className="fill-muted stroke-muted-foreground"
      />
      <path
        d="M3 14.25h6.249c.484 0 .952-.002 1.316.319l.777.682a.996.996 0 0 0 1.316 0l.777-.682c.364-.32.832-.319 1.316-.319H21M8.75 6.5V4.75a2 2 0 0 1 2-2h2.5a2 2 0 0 1 2 2V6.5"
        className="stroke-muted-foreground"
      />
    </svg>
  )
}

function ArrowDownIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path
        d="M4.75 8.75 8 12.25m0 0 3.25-3.5M8 12.25v-8.5"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function Article({ article }: { article: ArticleWithSlug }) {
  return (
    <ContentCard as="article">
      <ContentCard.Eyebrow as="time" dateTime={article.date} decorate>
        {formatDate(article.date)}
      </ContentCard.Eyebrow>
      <ContentCard.Title
        as="h3"
        to="/articles/$slug"
        params={{ slug: article.slug }}
      >
        {article.title}
      </ContentCard.Title>
      <ContentCard.Description>{article.description}</ContentCard.Description>
      <ContentCard.Cta>Read article</ContentCard.Cta>
    </ContentCard>
  )
}

function SocialLink({
  icon: Icon,
  href,
  ...props
}: Omit<React.ComponentPropsWithoutRef<'a'>, 'children'> & {
  icon: React.ComponentType<{ className?: string }>
}) {
  return (
    <a
      href={href}
      className="group -m-1 p-1"
      target="_blank"
      rel="noreferrer"
      {...props}
    >
      <Icon className="h-6 w-6 text-muted-foreground transition group-hover:text-foreground" />
    </a>
  )
}

function Newsletter() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle')
  const [message, setMessage] = useState('')
  const [description, setDescription] = useState('')
  const formLoadTime = useRef(Date.now())

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || status === 'loading') return

    setStatus('loading')
    setMessage('')

    const form = e.target as HTMLFormElement
    const honeypot = (form.elements.namedItem('website') as HTMLInputElement)
      .value
    const timeSpent = Date.now() - formLoadTime.current

    try {
      const response = await fetch('/api/v1/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          _hp: honeypot,
          _ts: timeSpent,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          locale: navigator.language,
          referrer: document.referrer || undefined,
        }),
      })

      const result: {
        success: boolean
        message?: string
        description?: string
      } = await response.json()

      if (!response.ok) {
        throw new Error(result.message || 'Something went wrong')
      }

      await new Promise((resolve) => setTimeout(resolve, 500))

      setStatus('success')
      setMessage(result.message ?? '')
      setDescription(result.description ?? '')
      setEmail('')
    } catch (error) {
      setStatus('error')
      setMessage(
        error instanceof Error
          ? error.message
          : 'Something went wrong. Please try again.',
      )
    }
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <h2 className="flex text-sm font-semibold text-foreground">
        <MailIcon className="h-6 w-6 flex-none" />
        <span className="ml-3">Stay up to date</span>
      </h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Get notified when I publish something new, and unsubscribe at any time.
      </p>
      {status === 'success' ? (
        <div className="mt-6 flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10">
            <svg
              className="h-5 w-5 text-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">{message}</p>
            <p className="text-xs text-muted-foreground">{description}</p>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-6">
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="absolute -left-[9999px] h-0 w-0 opacity-0"
          />
          <div className="flex items-center gap-4">
            <Input
              type="email"
              placeholder="Email address"
              aria-label="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={status === 'loading'}
              className="flex-1"
            />
            <Button
              type="submit"
              size="default"
              disabled={status === 'loading'}
            >
              {status === 'loading' ? 'Joining...' : 'Join'}
            </Button>
          </div>
          {status === 'error' && message && (
            <p className="mt-3 text-sm text-destructive">{message}</p>
          )}
        </form>
      )}
    </div>
  )
}

interface RoleEntry {
  title: string
  start: string | { label: string; dateTime: string }
  end: string | { label: string; dateTime: string }
}

interface CompanyEntry {
  company: string
  logo: string
  url: string
  roles: RoleEntry[]
}

function RoleItem({ role }: { role: RoleEntry }) {
  const startLabel =
    typeof role.start === 'string' ? role.start : role.start.label
  const startDate =
    typeof role.start === 'string' ? role.start : role.start.dateTime
  const endLabel = typeof role.end === 'string' ? role.end : role.end.label
  const endDate = typeof role.end === 'string' ? role.end : role.end.dateTime

  return (
    <div className="flex items-baseline justify-between gap-x-2">
      <span className="text-xs text-muted-foreground">{role.title}</span>
      <span
        className="ml-auto shrink-0 text-xs text-muted-foreground/70"
        aria-label={`${startLabel} until ${endLabel}`}
      >
        <time dateTime={startDate}>{startLabel}</time>
        {' - '}
        <time dateTime={endDate}>{endLabel}</time>
      </span>
    </div>
  )
}

function CompanyRole({ entry }: { entry: CompanyEntry }) {
  return (
    <li className="flex gap-4">
      <a
        href={entry.url}
        target="_blank"
        rel="noreferrer"
        className="relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-muted ring-1 ring-border overflow-hidden hover:ring-foreground/30 transition"
      >
        <img
          src={entry.logo}
          alt={entry.company}
          className="h-full w-full object-contain"
        />
      </a>
      <div className="flex flex-auto flex-col gap-1">
        <span className="text-sm font-medium text-foreground">
          {entry.company}
        </span>
        <div className="flex flex-col gap-0.5">
          {entry.roles.map((role, i) => (
            <RoleItem key={i} role={role} />
          ))}
        </div>
      </div>
    </li>
  )
}

function Resume() {
  const resume: CompanyEntry[] = [
    {
      company: 'Customer.io',
      logo: logoCustomerio,
      url: 'https://customer.io',
      roles: [
        {
          title: 'Senior Software Engineer',
          start: { label: 'Sep 2025', dateTime: '2025-09' },
          end: {
            label: 'Present',
            dateTime: new Date().getFullYear().toString(),
          },
        },
        {
          title: 'Software Engineer 3',
          start: { label: 'Oct 2024', dateTime: '2024-10' },
          end: { label: 'Sep 2025', dateTime: '2025-09' },
        },
        {
          title: 'Software Engineer 2',
          start: { label: 'Mar 2022', dateTime: '2022-03' },
          end: { label: 'Sep 2024', dateTime: '2024-09' },
        },
      ],
    },
    {
      company: 'karnstack',
      logo: logoKarnstack,
      url: 'https://karnstack.com',
      roles: [
        {
          title: 'Founder',
          start: { label: 'Aug 2025', dateTime: '2025-08' },
          end: {
            label: 'Present',
            dateTime: new Date().getFullYear().toString(),
          },
        },
      ],
    },
    {
      company: 'SendX',
      logo: logoSendx,
      url: 'https://sendx.io',
      roles: [
        {
          title: 'Software Engineer',
          start: { label: 'Jul 2021', dateTime: '2021-07' },
          end: { label: 'Mar 2022', dateTime: '2022-03' },
        },
        {
          title: 'Software Engineer Intern',
          start: { label: 'Jul 2020', dateTime: '2020-07' },
          end: { label: 'Jan 2021', dateTime: '2021-01' },
        },
      ],
    },
    {
      company: 'Amazon',
      logo: logoAmazon,
      url: 'https://amazon.in',
      roles: [
        {
          title: 'SDE Intern',
          start: { label: 'Jan 2021', dateTime: '2021-01' },
          end: { label: 'Jul 2021', dateTime: '2021-07' },
        },
        {
          title: 'SDE Intern',
          start: { label: 'May 2020', dateTime: '2020-05' },
          end: { label: 'Jun 2020', dateTime: '2020-06' },
        },
      ],
    },
    {
      company: 'Crio.Do',
      logo: logoCriodo,
      url: 'https://crio.do',
      roles: [
        {
          title: 'Software Engineer Intern',
          start: { label: 'Oct 2019', dateTime: '2019-10' },
          end: { label: 'Apr 2020', dateTime: '2020-04' },
        },
      ],
    },
  ]

  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <h2 className="flex text-sm font-semibold text-foreground">
        <BriefcaseIcon className="h-6 w-6 flex-none" />
        <span className="ml-3">Work</span>
      </h2>
      <ol className="mt-6 space-y-8">
        {resume.map((entry, i) => (
          <CompanyRole key={i} entry={entry} />
        ))}
      </ol>
      <a
        href="/resume_karn_may_2026.pdf"
        download="resume_karn_may_2026.pdf"
        className={cn(
          buttonVariants({ variant: 'secondary' }),
          'group mt-6 flex w-full items-center justify-center gap-2',
        )}
      >
        Download CV
        <ArrowDownIcon className="h-4 w-4 stroke-muted-foreground transition group-hover:stroke-foreground" />
      </a>
    </div>
  )
}

function Photos() {
  const rotations = [
    'rotate-2',
    '-rotate-2',
    'rotate-2',
    '-rotate-2',
    'rotate-2',
    '-rotate-2',
    'rotate-2',
    '-rotate-2',
    'rotate-2',
  ]
  const images = [
    image1,
    image2,
    image3,
    image4,
    image5,
    image6,
    image7,
    image8,
    image9,
  ]

  const x = useMotionValue(0)
  const stripRef = useRef<HTMLDivElement>(null)
  const paused = useRef(false)
  const speed = 60 // px per second
  const dragging = useRef(false)
  const dragStartX = useRef(0)
  const dragStartMotionX = useRef(0)
  const lastTouchX = useRef(0)
  const touchDragged = useRef(false)

  useAnimationFrame((_, delta) => {
    if (paused.current) return
    const stripWidth = stripRef.current ? stripRef.current.scrollWidth / 2 : 0
    if (stripWidth === 0) return
    const next = x.get() - (delta / 1000) * speed
    x.set(next <= -stripWidth ? next + stripWidth : next)
  })

  const clampX = useCallback((val: number) => {
    const stripWidth = stripRef.current ? stripRef.current.scrollWidth / 2 : 0
    if (stripWidth === 0) return val
    let clamped = val % stripWidth
    if (clamped > 0) clamped -= stripWidth
    if (clamped <= -stripWidth) clamped += stripWidth
    return clamped
  }, [])

  const onMouseDown = (e: React.MouseEvent) => {
    dragging.current = true
    paused.current = true
    dragStartX.current = e.clientX
    dragStartMotionX.current = x.get()
  }

  const onMouseMove = (e: React.MouseEvent) => {
    if (!dragging.current) return
    const delta = e.clientX - dragStartX.current
    x.set(clampX(dragStartMotionX.current + delta))
  }

  const onMouseUp = () => {
    dragging.current = false
    paused.current = false
  }

  const onTouchStart = (e: React.TouchEvent) => {
    lastTouchX.current = e.touches[0].clientX
    dragStartMotionX.current = x.get()
    touchDragged.current = false
    paused.current = true
  }

  const onTouchMove = (e: React.TouchEvent) => {
    const delta = e.touches[0].clientX - lastTouchX.current
    if (Math.abs(delta) > 4) touchDragged.current = true
    lastTouchX.current = e.touches[0].clientX
    x.set(clampX(x.get() + delta))
  }

  const onTouchEnd = () => {
    if (!touchDragged.current) {
      paused.current = !paused.current
    } else {
      paused.current = false
    }
  }

  return (
    <div
      className="mt-16 sm:mt-20 overflow-hidden cursor-grab active:cursor-grabbing select-none"
      onMouseEnter={() => {
        if (!dragging.current) paused.current = true
      }}
      onMouseLeave={() => {
        dragging.current = false
        paused.current = false
      }}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div className="-my-4 py-4">
        <motion.div
          ref={stripRef}
          className="flex gap-5 sm:gap-8"
          style={{ width: 'max-content', x }}
        >
          {[...images, ...images].map((image, imageIndex) => (
            <div
              key={`${image}-${imageIndex}`}
              className={cn(
                'relative w-44 flex-none overflow-hidden rounded-xl bg-muted sm:w-72 sm:rounded-2xl',
                rotations[imageIndex % rotations.length],
              )}
            >
              <div className="aspect-[9/10]">
                <img
                  src={image}
                  alt=""
                  draggable={false}
                  className="absolute inset-0 h-full w-full object-cover pointer-events-none"
                />
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

export const Route = createFileRoute('/')({
  component: Home,
  head: () => ({
    meta: [
      { title: 'karn - your friendly neighbourhood developer 🕸️' },
      {
        name: 'description',
        content:
          'Senior Software Engineer at Customer.io. I build product experiences end-to-end with Go and React, and build courses for engineers at karnstack.com. Based in Bengaluru, India.',
      },
      {
        property: 'og:title',
        content: 'karn - your friendly neighbourhood developer 🕸️',
      },
      {
        property: 'og:description',
        content:
          'Senior Software Engineer at Customer.io. I build product experiences end-to-end with Go and React, and build courses for engineers at karnstack.com. Based in Bengaluru, India.',
      },
    ],
  }),
})

function Home() {
  const articles = getAllArticles().slice(0, 4)

  return (
    <>
      <Container className="mt-9">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            I ship code, review PRs, and walk the dog. Not always in that order.
          </h1>
          <p className="mt-6 text-base text-muted-foreground">
            I'm Karn - Senior Software Engineer on the In-App &amp; AI teams at{' '}
            <a
              href="https://customer.io?utm_source=karngyan.com&utm_medium=referral&utm_campaign=personal_site"
              target="_blank"
              rel="noreferrer"
              className="text-foreground underline decoration-muted-foreground/40 underline-offset-2 transition hover:decoration-foreground"
            >
              Customer.io
            </a>
            . I build product experiences end-to-end - from system design to
            production - with bias towards Go, and React. On the side, I build
            courses for engineers at{' '}
            <a
              href="https://karnstack.com"
              target="_blank"
              rel="noreferrer"
              className="text-foreground underline decoration-muted-foreground/40 underline-offset-2 transition hover:decoration-foreground"
            >
              karnstack.com
            </a>
            . Based in Bengaluru, India.
          </p>
          <div className="mt-6 flex gap-6">
            <SocialLink
              href="https://x.com/gyankarn"
              aria-label="Follow on X"
              icon={XIcon}
            />
            <SocialLink
              href="https://www.instagram.com/karnstack"
              aria-label="Follow on Instagram"
              icon={InstagramIcon}
            />
            <SocialLink
              href="https://github.com/karngyan"
              aria-label="Follow on GitHub"
              icon={GitHubIcon}
            />
            <SocialLink
              href="https://www.linkedin.com/in/karngyan"
              aria-label="Follow on LinkedIn"
              icon={LinkedInIcon}
            />
            <SocialLink
              href="https://cal.com/karngyan/chat-w-karn?duration=15"
              aria-label="Book a call"
              icon={CalendarIcon}
            />
          </div>
        </div>
      </Container>
      <Photos />
      <Container className="mt-24 md:mt-28">
        <div className="mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2">
          <div className="flex flex-col gap-16">
            {articles.map((article) => (
              <Article key={article.slug} article={article} />
            ))}
          </div>
          <div className="space-y-10 lg:pl-16 xl:pl-24">
            <Newsletter />
            <Resume />
          </div>
        </div>
      </Container>
    </>
  )
}
