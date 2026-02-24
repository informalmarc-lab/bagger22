'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/catalog', label: 'Catalog' },
  { href: '/shipping', label: 'Shipping' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/request-sample', label: 'Request Sample' },
]

function isActive(pathname: string, href: string) {
  if (href === '/') return pathname === '/'
  return pathname === href || pathname.startsWith(`${href}/`)
}

export default function Navbar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200/80 bg-primary-50/90 backdrop-blur-xl">
      <div className="border-b border-primary-100/90 bg-white/70">
        <div className="section-container flex h-9 items-center justify-between text-xs font-semibold text-slate-600">
          <p className="hidden sm:block">Monroe, North Carolina</p>
          <div className="flex items-center gap-4">
            <a href="tel:+12525161944" className="hover:text-primary-700">
              (252) 516-1944
            </a>
            <a href="mailto:info@bagco.com" className="hover:text-primary-700">
              info@bagco.com
            </a>
          </div>
        </div>
      </div>

      <div className="section-container">
        <div className="flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center gap-3 text-3xl font-extrabold tracking-tight text-slate-900">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 text-xl font-black text-white shadow-md shadow-primary-900/20">
              B
            </div>
            <span className="heading-serif bg-gradient-to-r from-primary-700 to-primary-900 bg-clip-text text-transparent">Bagco</span>
          </Link>

          <div className="hidden items-center gap-1.5 md:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-xl px-3 py-2 text-sm font-semibold transition-colors ${
                  isActive(pathname, link.href)
                    ? 'bg-primary-100 text-primary-800'
                    : 'text-slate-700 hover:bg-primary-50 hover:text-primary-700'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="ml-1 rounded-xl bg-gradient-to-r from-primary-600 to-primary-700 px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-primary-900/20 transition-all hover:from-primary-700 hover:to-primary-800 hover:shadow-lg"
            >
              Request a Quote
            </Link>
          </div>

          <button
            className="rounded-lg p-2 text-slate-700 hover:bg-primary-50 hover:text-primary-600 md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {isOpen && (
          <div className="pb-4 md:hidden">
            <div className="surface-card rounded-2xl border border-slate-200/80 p-3">
              <div className="flex flex-col gap-1.5">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`rounded-lg px-3 py-2 font-semibold ${
                      isActive(pathname, link.href)
                        ? 'bg-primary-100 text-primary-800'
                        : 'text-slate-700 hover:bg-primary-50 hover:text-primary-700'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  href="/contact"
                  className="mt-2 inline-block rounded-lg bg-gradient-to-r from-primary-600 to-primary-700 px-4 py-2.5 text-center font-semibold text-white"
                >
                  Request a Quote
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}