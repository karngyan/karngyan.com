import { Link } from '@tanstack/react-router'

import { ContainerInner, ContainerOuter } from '@/components/container'

function NavLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link to={to} className="transition hover:text-primary">
      {children}
    </Link>
  )
}

export function Footer() {
  return (
    <footer className="mt-32 flex-none">
      <ContainerOuter>
        <div className="border-t border-border pt-10 pb-16">
          <ContainerInner>
            <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
              <div className="flex flex-wrap justify-center gap-x-6 gap-y-1 text-sm font-medium text-foreground">
                <NavLink to="/about">About</NavLink>
                <NavLink to="/articles">Articles</NavLink>
                <NavLink to="/projects">Projects</NavLink>
                <NavLink to="/uses">Uses</NavLink>
              </div>
              <p className="text-sm text-muted-foreground">
                &copy; {new Date().getFullYear()} Karn Stack. All rights
                reserved.
              </p>
            </div>
          </ContainerInner>
        </div>
      </ContainerOuter>
    </footer>
  )
}
