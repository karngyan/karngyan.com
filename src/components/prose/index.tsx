import clsx from 'clsx'

export function Prose({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      className={clsx(
        className,
        'prose prose-neutral dark:prose-invert',
        'prose-headings:font-semibold prose-headings:tracking-tight',
        'prose-a:text-primary prose-a:decoration-primary/40 hover:prose-a:decoration-primary',
        'prose-pre:rounded-xl prose-pre:bg-muted prose-pre:text-foreground prose-pre:overflow-x-auto',
        '[&_[data-rehype-pretty-code-figure]]:not-prose [&_[data-rehype-pretty-code-figure]]:my-6',
        '[&_[data-rehype-pretty-code-figure]_pre]:rounded-xl [&_[data-rehype-pretty-code-figure]_pre]:overflow-x-auto [&_[data-rehype-pretty-code-figure]_pre]:py-4 [&_[data-rehype-pretty-code-figure]_pre]:px-0',
        '[&_[data-rehype-pretty-code-figure]_code]:grid [&_[data-rehype-pretty-code-figure]_code]:text-sm',
        '[&_[data-line]]:px-4',
        '[&_[data-highlighted-line]]:bg-muted/50 [&_[data-highlighted-line]]:border-l-2 [&_[data-highlighted-line]]:border-primary',
        'prose-code:rounded prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:text-foreground prose-code:before:content-none prose-code:after:content-none prose-code:text-sm',
        'prose-img:rounded-xl',
        'max-w-none',
      )}
      {...props}
    />
  )
}
