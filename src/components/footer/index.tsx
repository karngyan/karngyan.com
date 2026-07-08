import { Link } from '@tanstack/react-router'
import { Rss } from 'lucide-react'

import siteConfig from '../../../site.config'
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
                {siteConfig.nav
                  .filter((item) => !item.external)
                  .map((item) => (
                    <NavLink key={item.to} to={item.to}>
                      {item.label}
                    </NavLink>
                  ))}
              </div>
              <div className="flex items-center gap-x-6 text-sm text-muted-foreground">
                {/* server routes, not router pages - plain anchors on purpose */}
                <a
                  href="/rss.xml"
                  className="flex items-center gap-1.5 transition hover:text-primary"
                >
                  <Rss className="h-3.5 w-3.5" />
                  RSS
                </a>
                <a href="/llms.txt" className="transition hover:text-primary">
                  llms.txt
                </a>
                <p>
                  &copy; {new Date().getFullYear()} {siteConfig.name}. All
                  rights reserved.
                </p>
              </div>
            </div>
          </ContainerInner>
        </div>
      </ContainerOuter>
    </footer>
  )
}
