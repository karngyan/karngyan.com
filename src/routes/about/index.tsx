import { createFileRoute } from '@tanstack/react-router'
import { cn } from '@/lib/utils'
import { Container } from '@/components/container'
import {
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  XIcon,
  CalendarIcon,
} from '@/components/social-icons'
import portraitImage from '@/assets/portrait.jpg'
import siteConfig from '../../../site.config'

export const Route = createFileRoute('/about/')({
  component: About,
  head: () => ({
    meta: [
      { title: `About - ${siteConfig.shortName}` },
      { name: 'description', content: siteConfig.description },
      { property: 'og:title', content: `About - ${siteConfig.shortName}` },
      { property: 'og:description', content: siteConfig.description },
    ],
  }),
})

function SocialLink({
  className,
  href,
  children,
  icon: Icon,
}: {
  className?: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  children: React.ReactNode
}) {
  return (
    <li className={cn(className, 'flex')}>
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="group flex text-sm font-medium text-foreground transition hover:text-muted-foreground"
      >
        <Icon className="h-6 w-6 flex-none text-muted-foreground transition group-hover:text-foreground" />
        <span className="ml-4">{children}</span>
      </a>
    </li>
  )
}

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

function About() {
  return (
    <Container className="mt-16 sm:mt-32">
      <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
        <div className="lg:pl-20">
          <div className="mx-auto max-w-xs px-2.5 lg:mx-0 lg:max-w-none">
            <img
              src={portraitImage}
              alt={siteConfig.name}
              className="aspect-square rotate-3 rounded-2xl bg-muted object-cover"
            />
          </div>
        </div>

        <div className="lg:order-first lg:row-span-2">
          {/* ✏️ Edit your bio below - heading and paragraphs are plain JSX */}
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            I'm Karn. I split my time between Bengaluru and Ranchi, and spend
            most of it writing software.
          </h1>
          <div className="mt-6 space-y-7 text-base text-muted-foreground">
            <p>
              I've been writing code for as long as I can remember. I got hooked
              early - competiting in ICPC, building small utilities and games,
              then slowly graduating to things that actually run in production
              and serve real users. There's something deeply satisfying about
              taking an idea from a rough design doc all the way to a shipped
              feature.
            </p>
            <p>
              I'm a Senior Software Engineer at{' '}
              <a
                href="https://customer.io?utm_source=karngyan.com&utm_medium=referral&utm_campaign=about"
                target="_blank"
                rel="noreferrer"
                className="text-foreground underline decoration-muted-foreground/40 underline-offset-2 transition hover:decoration-foreground"
              >
                Customer.io
              </a>
              , where I work on the In-App messaging and AI teams. My day-to-day
              involves Go on the backend and React on the frontend. I like
              working across the full stack and owning features end-to-end, from
              system design to production.
            </p>
            <p>
              Before Customer.io, I did stints at Amazon and SendX, and some
              earlier internships that shaped how I think about building
              software. I studied Computer Science, but honestly most of what I
              know came from obsessively reading source code, breaking things,
              and fixing them.
            </p>
            <p>
              Outside of work, I write occasionally on this site about
              engineering, tools I find interesting, and ideas I'm thinking
              through. I'm always up for side projects. I build courses for
              engineers at{' '}
              <a
                href="https://karnstack.com"
                target="_blank"
                rel="noreferrer"
                className="text-foreground underline decoration-muted-foreground/40 underline-offset-2 transition hover:decoration-foreground"
              >
                karnstack.com
              </a>
              , and run{' '}
              <a
                href="https://github.com/gomantics"
                target="_blank"
                rel="noreferrer"
                className="text-foreground underline decoration-muted-foreground/40 underline-offset-2 transition hover:decoration-foreground"
              >
                gomantics.dev
              </a>
              , a GitHub org where I maintain a few Go libraries and apps.
              Long-term, I'm aiming to retire early. The dream is a farm with
              lots of animals - that one's mostly my wife's vision, but it's
              grown on me. After that, I'd like to go back to college, or just
              code whatever I want with no deadlines. When I'm not at the
              keyboard, I'm out walking my dog.
            </p>
          </div>
        </div>

        <div className="lg:pl-20">
          <ul role="list">
            {siteConfig.social.x && (
              <SocialLink href={siteConfig.social.x} icon={XIcon}>
                Follow on X
              </SocialLink>
            )}
            {siteConfig.social.instagram && (
              <SocialLink
                href={siteConfig.social.instagram}
                icon={InstagramIcon}
                className="mt-4"
              >
                Follow on Instagram
              </SocialLink>
            )}
            {siteConfig.social.github && (
              <SocialLink
                href={siteConfig.social.github}
                icon={GitHubIcon}
                className="mt-4"
              >
                Follow on GitHub
              </SocialLink>
            )}
            {siteConfig.social.linkedin && (
              <SocialLink
                href={siteConfig.social.linkedin}
                icon={LinkedInIcon}
                className="mt-4"
              >
                Follow on LinkedIn
              </SocialLink>
            )}
            {siteConfig.social.calendar && (
              <SocialLink
                href={siteConfig.social.calendar}
                icon={CalendarIcon}
                className="mt-4"
              >
                Book a call
              </SocialLink>
            )}
            <SocialLink
              href={`mailto:${siteConfig.email}`}
              icon={MailIcon}
              className="mt-8 border-t border-border pt-8"
            >
              {siteConfig.email}
            </SocialLink>
          </ul>
        </div>
      </div>
    </Container>
  )
}
