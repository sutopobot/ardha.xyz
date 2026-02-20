import Link from 'next/link'
import { ThemeToggle } from './theme-toggle'

const navItems = [
  { path: '/about', name: 'about' },
  { path: '/now', name: 'now' },
  { path: '/blog', name: 'writing' },
]

export function Navbar() {
  return (
    <nav className="mb-12 md:mb-16 flex items-center justify-between gap-4">
      <Link
        href="/"
        className="text-lg font-bold tracking-tight flex-shrink-0"
        style={{ color: 'var(--fg)' }}
      >
        Ardha Yosef
      </Link>
      <div className="flex items-center gap-4 md:gap-6 flex-shrink-0">
        <div className="flex gap-3 md:gap-4 text-sm" style={{ color: 'var(--fg-muted)' }}>
          {navItems.map((item, i) => (
            <span key={item.path} className="flex items-center gap-3 md:gap-4">
              {i > 0 && <span style={{ color: 'var(--border)' }}>·</span>}
              <Link
                href={item.path}
                className="hover:opacity-70 transition-opacity whitespace-nowrap"
              >
                {item.name}
              </Link>
            </span>
          ))}
        </div>
        <ThemeToggle />
      </div>
    </nav>
  )
}
