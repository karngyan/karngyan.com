/**
 * site.config.ts — the single file you edit to make this site yours.
 *
 * Identity, SEO, socials, navigation, and work history all live here.
 * Page prose (home hero, about bio, uses list, projects) lives in the
 * route files under src/routes/ — look for the ✏️ markers.
 * Articles live in src/content/articles/<slug>/page.mdx.
 */

export interface NavItem {
  label: string
  to: string
  /** external links open in a new tab and skip active-state styling */
  external?: boolean
}

export interface RoleEntry {
  title: string
  start: { label: string; dateTime: string }
  end: { label: string; dateTime: string }
}

export interface CompanyEntry {
  company: string
  /** path under public/, e.g. '/logos/acme.jpeg' */
  logo: string
  url: string
  roles: Array<RoleEntry>
}

export interface SiteConfig {
  /** full display name, used in footer copyright */
  name: string
  /** short name used in page titles, e.g. 'Articles - karn' */
  shortName: string
  /** canonical origin, https://, no trailing slash */
  url: string
  /** default <title> and og:title */
  title: string
  /** default meta description, also the RSS channel description */
  description: string
  email: string
  social: {
    github?: string
    x?: string
    linkedin?: string
    instagram?: string
    /** e.g. a cal.com booking link */
    calendar?: string
  }
  /** '@handle' for twitter:site / twitter:creator meta */
  twitterHandle?: string
  nav: Array<NavItem>
  resume: {
    enabled: boolean
    /** path under public/, e.g. '/resume.pdf' */
    path: string
  }
  /** work history shown in the card on the home page */
  work: Array<CompanyEntry>
  analytics?: {
    plausible?: {
      domain: string
      /** override when self-hosting, defaults to https://plausible.io/js/script.js */
      scriptSrc?: string
    }
  }
}

const siteConfig: SiteConfig = {
  name: 'Gyan Prakash Karn',
  shortName: 'karn',
  url: 'https://template.karngyan.com',
  title: 'karn - your friendly neighbourhood developer 🕸️',
  description:
    'Personal site built from the karngyan.com template: TanStack Start, React, Tailwind v4, shadcn/ui, MDX articles, RSS - deployed on Cloudflare Workers.',
  email: 'mail@karngyan.com',
  social: {
    github: 'https://github.com/karngyan',
    x: 'https://x.com/gyankarn',
    linkedin: 'https://www.linkedin.com/in/karngyan',
    instagram: 'https://www.instagram.com/karnstack',
    calendar: 'https://cal.com/karngyan/chat-w-karn?duration=15',
  },
  twitterHandle: '@gyankarn',
  nav: [
    { label: 'About', to: '/about' },
    { label: 'Articles', to: '/articles' },
    { label: 'Projects', to: '/projects' },
    { label: 'Uses', to: '/uses' },
  ],
  resume: {
    enabled: false,
    path: '/resume.pdf',
  },
  work: [
    {
      company: 'Customer.io',
      logo: '/logos/customerio.jpeg',
      url: 'https://customer.io',
      roles: [
        {
          title: 'Senior Software Engineer',
          start: { label: 'Sep 2025', dateTime: '2025-09' },
          end: { label: 'Present', dateTime: '2026' },
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
      logo: '/logos/karnstack.png',
      url: 'https://karnstack.com',
      roles: [
        {
          title: 'Founder',
          start: { label: 'Aug 2025', dateTime: '2025-08' },
          end: { label: 'Present', dateTime: '2026' },
        },
      ],
    },
    {
      company: 'SendX',
      logo: '/logos/sendx.jpeg',
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
      logo: '/logos/amazon.jpeg',
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
      logo: '/logos/criodo.jpeg',
      url: 'https://crio.do',
      roles: [
        {
          title: 'Software Engineer Intern',
          start: { label: 'Oct 2019', dateTime: '2019-10' },
          end: { label: 'Apr 2020', dateTime: '2020-04' },
        },
      ],
    },
  ],
}

export default siteConfig
