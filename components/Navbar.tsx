'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-primary-100/90 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-slate-200/70">
      <div className="section-container">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="text-3xl font-extrabold bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent hover:from-primary-700 hover:to-primary-800 transition-all flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center text-white text-xl font-black shadow-md">B</div>
            <span className="heading-serif">Bagco</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1.5">
            <Link href="/" className="text-slate-700 hover:text-primary-700 font-semibold px-3 py-2 rounded-lg transition-colors hover:bg-primary-50">
              Home
            </Link>
            <Link href="/about" className="text-slate-700 hover:text-primary-700 font-semibold px-3 py-2 rounded-lg transition-colors hover:bg-primary-50">
              About
            </Link>
            <Link href="/catalog" className="text-slate-700 hover:text-primary-700 font-semibold px-3 py-2 rounded-lg transition-colors hover:bg-primary-50">
              Catalog
            </Link>
            <Link href="/quote-builder" className="text-slate-700 hover:text-primary-700 font-semibold px-3 py-2 rounded-lg transition-colors hover:bg-primary-50">
              Quote Builder
            </Link>
            <Link href="/shipping" className="text-slate-700 hover:text-primary-700 font-semibold px-3 py-2 rounded-lg transition-colors hover:bg-primary-50">
              Shipping
            </Link>
            <Link href="/gallery" className="text-slate-700 hover:text-primary-700 font-semibold px-3 py-2 rounded-lg transition-colors hover:bg-primary-50">
              Gallery
            </Link>
            <Link href="/request-sample" className="text-slate-700 hover:text-primary-700 font-semibold px-3 py-2 rounded-lg transition-colors hover:bg-primary-50">
              Request Sample
            </Link>
            <Link 
              href="/contact" 
              className="bg-gradient-to-r from-primary-600 to-primary-700 text-white px-5 py-2.5 rounded-xl font-semibold hover:from-primary-700 hover:to-primary-800 transition-all shadow-md hover:shadow-lg ml-1"
            >
              Request a Quote
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-slate-700 hover:text-primary-600"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 border-t border-slate-200/80">
            <div className="flex flex-col space-y-3 pt-4">
              <Link 
                href="/" 
                className="text-slate-700 hover:text-primary-600 font-medium transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/about" 
                className="text-slate-700 hover:text-primary-600 font-medium transition-colors"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
              <Link 
                href="/catalog" 
                className="text-slate-700 hover:text-primary-600 font-medium transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Catalog
              </Link>
              <Link 
                href="/quote-builder" 
                className="text-slate-700 hover:text-primary-600 font-medium transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Quote Builder
              </Link>
              <Link 
                href="/shipping" 
                className="text-slate-700 hover:text-primary-600 font-medium transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Shipping
              </Link>
              <Link 
                href="/gallery" 
                className="text-slate-700 hover:text-primary-600 font-medium transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Gallery
              </Link>
              <Link 
                href="/request-sample" 
                className="text-slate-700 hover:text-primary-600 font-medium transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Request Sample
              </Link>
              <Link 
                href="/contact" 
                className="bg-primary-600 text-white px-4 py-2.5 rounded-lg font-medium hover:bg-primary-700 transition-colors inline-block text-center"
                onClick={() => setIsOpen(false)}
              >
                Request a Quote
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
