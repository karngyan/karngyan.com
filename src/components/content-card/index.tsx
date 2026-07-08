import { Link } from '@tanstack/react-router'
import clsx from 'clsx'
import type { LinkProps } from '@tanstack/react-router'

function ChevronRightIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path
        d="M6.75 5.75 9.25 8l-2.5 2.25"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function ContentCard<T extends React.ElementType = 'div'>({
  as,
  className,
  children,
  ...props
}: Omit<React.ComponentPropsWithoutRef<T>, 'as' | 'className'> & {
  as?: T
  className?: string
}) {
  const Component = as ?? 'div'

  return (
    <Component
      className={clsx(className, 'group relative flex flex-col items-start')}
      {...props}
    >
      {children}
    </Component>
  )
}

ContentCard.Link = function ContentCardLink({
  children,
  ...props
}: Omit<LinkProps, 'children'> & { children?: React.ReactNode }) {
  return (
    <>
      <div className="absolute -inset-x-4 -inset-y-6 z-0 scale-95 rounded-2xl bg-muted opacity-0 transition group-hover:scale-100 group-hover:opacity-100 sm:-inset-x-6" />
      <Link {...props}>
        <span className="absolute -inset-x-4 -inset-y-6 z-20 sm:-inset-x-6 sm:rounded-2xl" />
        <span className="relative z-10">{children}</span>
      </Link>
    </>
  )
}

ContentCard.Title = function ContentCardTitle<
  T extends React.ElementType = 'h2',
>({
  as,
  to,
  params,
  children,
  ...props
}: Omit<React.ComponentPropsWithoutRef<T>, 'as' | 'to'> & {
  as?: T
  to?: LinkProps['to']
  params?: LinkProps['params']
}) {
  const Component = as ?? 'h2'

  return (
    <Component
      className="text-base font-semibold tracking-tight text-foreground"
      {...props}
    >
      {to ? (
        <ContentCard.Link to={to} params={params}>
          {children}
        </ContentCard.Link>
      ) : (
        children
      )}
    </Component>
  )
}

ContentCard.Description = function ContentCardDescription({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <p className="relative z-10 mt-2 text-sm text-muted-foreground">
      {children}
    </p>
  )
}

ContentCard.Cta = function ContentCardCta({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div
      aria-hidden="true"
      className="relative z-10 mt-4 flex items-center text-sm font-medium text-primary"
    >
      {children}
      <ChevronRightIcon className="ml-1 h-4 w-4 stroke-current" />
    </div>
  )
}

ContentCard.Eyebrow = function ContentCardEyebrow<
  T extends React.ElementType = 'p',
>({
  as,
  decorate = false,
  className,
  children,
  ...props
}: Omit<React.ComponentPropsWithoutRef<T>, 'as' | 'decorate'> & {
  as?: T
  decorate?: boolean
}) {
  const Component = as ?? 'p'

  return (
    <Component
      className={clsx(
        className,
        'relative z-10 order-first mb-3 flex items-center text-sm text-muted-foreground',
        decorate && 'pl-3.5',
      )}
      {...props}
    >
      {decorate && (
        <span
          className="absolute inset-y-0 left-0 flex items-center"
          aria-hidden="true"
        >
          <span className="h-4 w-0.5 rounded-full bg-border" />
        </span>
      )}
      {children}
    </Component>
  )
}
