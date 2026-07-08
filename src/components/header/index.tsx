import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link, useLocation } from '@tanstack/react-router'
import clsx from 'clsx'

import siteConfig from '../../../site.config'
import { Container } from '@/components/container'
import { ModeToggle } from '@/components/mode-toggle'
import { clamp } from '@/lib/utils'
import avatarImage from '@/assets/avatar.png'

function CloseIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="m17.25 6.75-10.5 10.5M6.75 6.75l10.5 10.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ChevronDownIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 8 6" aria-hidden="true" {...props}>
      <path
        d="M1.75 1.75 4 4.25l2.25-2.5"
        fill="none"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function MobileNavItem({
  to,
  children,
  onNavigate,
  external,
}: {
  to: string
  children: React.ReactNode
  onNavigate?: () => void
  external?: boolean
}) {
  const pathname = useLocation({ select: (loc) => loc.pathname })
  const isActive = !external && pathname === to

  return (
    <li>
      {external ? (
        <a
          href={to}
          target="_blank"
          rel="noopener noreferrer"
          className="relative block py-2 transition hover:text-primary"
          onClick={onNavigate}
        >
          {children}
        </a>
      ) : (
        <Link
          to={to}
          className={clsx(
            'relative block py-2 transition',
            isActive ? 'text-primary' : 'hover:text-primary',
          )}
          onClick={onNavigate}
        >
          {children}
          {isActive && (
            <span className="absolute inset-x-0 -bottom-px h-px bg-primary/40" />
          )}
        </Link>
      )}
    </li>
  )
}

function MobileNavigation({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  const [open, setOpen] = useState(false)

  return (
    <div
      className={clsx('pointer-events-auto md:hidden', className)}
      {...props}
    >
      {open &&
        typeof document !== 'undefined' &&
        createPortal(
          <>
            <div
              className="fixed inset-0 z-40 bg-foreground/20 backdrop-blur-sm"
              onClick={() => setOpen(false)}
              aria-hidden
            />
            <div
              className="fixed left-4 right-4 top-[5.5rem] z-50 w-[calc(100vw-2rem)] max-w-[calc(100vw-2rem)] origin-top rounded-xl bg-background/90 p-8 text-foreground shadow-md ring-1 ring-border backdrop-blur-sm"
              role="dialog"
              aria-label="Navigation menu"
            >
              <div className="flex flex-row-reverse items-center justify-between">
                <button
                  type="button"
                  aria-label="Close menu"
                  className="-m-1 p-1"
                  onClick={() => setOpen(false)}
                >
                  <CloseIcon className="h-6 w-6 text-muted-foreground" />
                </button>
                <h2 className="text-sm font-medium text-muted-foreground">
                  Navigation
                </h2>
              </div>
              <nav className="mt-6">
                <ul className="-my-2 divide-y divide-border text-base text-foreground">
                  {siteConfig.nav.map((item) => (
                    <MobileNavItem
                      key={item.to}
                      to={item.to}
                      external={item.external}
                      onNavigate={() => setOpen(false)}
                    >
                      {item.label}
                    </MobileNavItem>
                  ))}
                </ul>
              </nav>
            </div>
          </>,
          document.body,
        )}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="group flex h-9 items-center gap-1 rounded-xl bg-background/90 px-3 text-xs font-medium text-foreground shadow-md ring-1 ring-border backdrop-blur-sm transition hover:ring-foreground/20"
      >
        Menu
        <ChevronDownIcon className="h-auto w-2 stroke-muted-foreground group-hover:stroke-foreground" />
      </button>
    </div>
  )
}

function NavItem({
  to,
  children,
  external,
}: {
  to: string
  children: React.ReactNode
  external?: boolean
}) {
  const pathname = useLocation({ select: (loc) => loc.pathname })
  const isActive = !external && pathname === to

  return (
    <li>
      {external ? (
        <a
          href={to}
          target="_blank"
          rel="noopener noreferrer"
          className="relative block px-3 py-2 transition hover:text-primary"
        >
          {children}
        </a>
      ) : (
        <Link
          to={to}
          className={clsx(
            'relative block px-3 py-2 transition',
            isActive ? 'text-primary' : 'hover:text-primary',
          )}
        >
          {children}
          {isActive && (
            <span className="absolute inset-x-1 -bottom-px h-px bg-linear-to-r from-primary/0 via-primary/40 to-primary/0" />
          )}
        </Link>
      )}
    </li>
  )
}

function DesktopNavigation(props: React.ComponentPropsWithoutRef<'nav'>) {
  return (
    <nav {...props}>
      <ul className="flex rounded-xl bg-background/90 px-3 text-sm font-medium text-foreground shadow-md ring-1 ring-border backdrop-blur-sm">
        {siteConfig.nav.map((item) => (
          <NavItem key={item.to} to={item.to} external={item.external}>
            {item.label}
          </NavItem>
        ))}
      </ul>
    </nav>
  )
}

function AvatarContainer({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      className={clsx(
        className,
        'h-10 w-10 rounded-full bg-background/90 p-0.5 shadow-md ring-1 ring-border backdrop-blur-sm',
      )}
      {...props}
    />
  )
}

function Avatar({
  large = false,
  className,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof Link>, 'to'> & {
  large?: boolean
}) {
  return (
    <Link
      to="/"
      aria-label="Home"
      className={clsx(className, 'pointer-events-auto')}
      {...props}
    >
      <img
        src={avatarImage}
        alt=""
        className={clsx(
          'rounded-full bg-muted object-cover',
          large ? 'h-16 w-16' : 'h-9 w-9',
        )}
        loading="eager"
      />
    </Link>
  )
}

export function Header() {
  const pathname = useLocation({ select: (loc) => loc.pathname })
  const isHomePage = pathname === '/'

  const headerRef = useRef<HTMLDivElement>(null)
  const avatarRef = useRef<HTMLDivElement>(null)
  const isInitial = useRef(true)

  useEffect(() => {
    const downDelay = avatarRef.current?.offsetTop ?? 0
    const upDelay = 64

    function setProperty(property: string, value: string) {
      document.documentElement.style.setProperty(property, value)
    }

    function removeProperty(property: string) {
      document.documentElement.style.removeProperty(property)
    }

    function updateHeaderStyles() {
      if (!headerRef.current) {
        return
      }

      const { top, height } = headerRef.current.getBoundingClientRect()
      const scrollY = clamp(
        window.scrollY,
        0,
        document.body.scrollHeight - window.innerHeight,
      )

      if (isInitial.current) {
        setProperty('--header-position', 'sticky')
      }

      setProperty('--content-offset', `${downDelay}px`)

      if (isInitial.current || scrollY < downDelay) {
        setProperty('--header-height', `${downDelay + height}px`)
        setProperty('--header-mb', `${-downDelay}px`)
      } else if (top + height < -upDelay) {
        const offset = Math.max(height, scrollY - upDelay)
        setProperty('--header-height', `${offset}px`)
        setProperty('--header-mb', `${height - offset}px`)
      } else if (top === 0) {
        setProperty('--header-height', `${scrollY + height}px`)
        setProperty('--header-mb', `${-scrollY}px`)
      }

      if (top === 0 && scrollY > 0 && scrollY >= downDelay) {
        setProperty('--header-inner-position', 'fixed')
        removeProperty('--header-top')
        removeProperty('--avatar-top')
      } else {
        removeProperty('--header-inner-position')
        setProperty('--header-top', '0px')
        setProperty('--avatar-top', '0px')
      }
    }

    function updateAvatarStyles() {
      if (!isHomePage) {
        return
      }

      const fromScale = 1
      const toScale = 36 / 64
      const fromX = 0
      const toX = 2 / 16

      const scrollY = downDelay - window.scrollY

      let scale = (scrollY * (fromScale - toScale)) / downDelay + toScale
      scale = clamp(scale, fromScale, toScale)

      let x = (scrollY * (fromX - toX)) / downDelay + toX
      x = clamp(x, fromX, toX)

      setProperty(
        '--avatar-image-transform',
        `translate3d(${x}rem, 0, 0) scale(${scale})`,
      )

      const borderScale = 1 / (toScale / scale)
      const borderX = (-toX + x) * borderScale
      const borderTransform = `translate3d(${borderX}rem, 0, 0) scale(${borderScale})`

      setProperty('--avatar-border-transform', borderTransform)
      setProperty('--avatar-border-opacity', scale === toScale ? '1' : '0')
    }

    function updateStyles() {
      updateHeaderStyles()
      updateAvatarStyles()
      isInitial.current = false
    }

    updateStyles()
    window.addEventListener('scroll', updateStyles, { passive: true })
    window.addEventListener('resize', updateStyles)

    return () => {
      window.removeEventListener('scroll', updateStyles)
      window.removeEventListener('resize', updateStyles)
    }
  }, [isHomePage])

  return (
    <>
      <header
        className="pointer-events-none relative z-50 flex flex-none flex-col"
        style={{
          height: 'var(--header-height)',
          marginBottom: 'var(--header-mb)',
        }}
      >
        {isHomePage && (
          <>
            <div
              ref={avatarRef}
              className="order-last mt-[calc(--spacing(16)-(--spacing(3)))]"
            />
            <Container
              className="top-0 order-last -mb-3 pt-3"
              style={{
                position:
                  'var(--header-position)' as React.CSSProperties['position'],
              }}
            >
              <div
                className="top-(--avatar-top,--spacing(3)) w-full"
                style={{
                  position:
                    'var(--header-inner-position)' as React.CSSProperties['position'],
                }}
              >
                <div className="relative">
                  <AvatarContainer
                    className="absolute top-3 left-0 origin-left transition-opacity"
                    style={{
                      opacity: 'var(--avatar-border-opacity, 0)',
                      transform: 'var(--avatar-border-transform)',
                    }}
                  />
                  <Avatar
                    large
                    className="block h-16 w-16 origin-left"
                    style={{ transform: 'var(--avatar-image-transform)' }}
                  />
                </div>
              </div>
            </Container>
          </>
        )}
        <div
          ref={headerRef}
          className="top-0 z-10 h-16 pt-6"
          style={{
            position:
              'var(--header-position)' as React.CSSProperties['position'],
          }}
        >
          <Container
            className="top-(--header-top,--spacing(6)) w-full"
            style={{
              position:
                'var(--header-inner-position)' as React.CSSProperties['position'],
            }}
          >
            <div className="relative flex gap-4">
              <div className="flex flex-1">
                {!isHomePage && (
                  <AvatarContainer>
                    <Avatar />
                  </AvatarContainer>
                )}
              </div>
              <div className="flex flex-1 justify-end md:justify-center">
                <DesktopNavigation className="pointer-events-auto hidden md:block" />
              </div>
              <div className="flex items-center justify-end gap-2 md:flex-1">
                <MobileNavigation />
                <div className="pointer-events-auto">
                  <ModeToggle />
                </div>
              </div>
            </div>
          </Container>
        </div>
      </header>
      {isHomePage && (
        <div
          className="flex-none"
          style={{ height: 'var(--content-offset)' }}
        />
      )}
    </>
  )
}
