'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Menu, X, Leaf } from 'lucide-react'
import PremiumBookingSystem from './PremiumBookingSystem'

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Safari', path: '/safari' },
  { name: 'Packages', path: '/packages' },
  { name: 'Gallery', path: '/gallery' },
]

function Header() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Handle scroll effect for sticky header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  return (
    <>
      {/* ── Sticky header bar — z-[100] ── */}
      <header
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${
          isScrolled
            ? 'py-4 bg-zinc-950/80 backdrop-blur-xl border-b border-white/5'
            : 'py-6 bg-transparent'
        }`}
      >
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-500">
              <Leaf className="text-white" size={24} fill="currentColor" />
            </div>
            <div className="flex flex-col">
              <span className="text-white font-black text-xl leading-none tracking-tighter">
                Kaziranga <span className="text-green-500">Adventure</span>
              </span>
              <span className="text-[8px] text-zinc-500 font-bold uppercase tracking-[0.3em] leading-none mt-1">
                Hub
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.path
              return (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`relative text-sm tracking-widest transition-colors ${
                    isActive ? 'text-green-500' : 'text-zinc-100 hover:text-white'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-green-500 rounded-full" />
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Desktop Right Actions */}
          <div className="hidden lg:flex items-center gap-6">
            <PremiumBookingSystem />
          </div>

          {/* Mobile Hamburger button — z-[110] so it stays above the overlay */}
          <button
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            className="lg:hidden text-white p-2 relative z-[110]"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          >
            {isMobileMenuOpen ? <X size={30} /> : <Menu size={30} />}
          </button>
        </div>
      </header>

      {/*
        ── Mobile full-screen overlay ──
        IMPORTANT: rendered as a SIBLING of <header>, NOT a child.
        A `fixed` element inside another `fixed` element is positioned
        relative to that parent's stacking context, which breaks the
        "covers full viewport" behaviour and causes the menu to scroll
        with the page. Moving it outside fixes both issues.

        z-[105] → above the header (100), below the burger btn (110)
      */}
      <div
        className={`fixed inset-0 z-[105] bg-zinc-950 flex flex-col lg:hidden
          transition-all duration-500
          ${isMobileMenuOpen
            ? 'opacity-100 visible'
            : 'opacity-0 invisible pointer-events-none'
          }`}
      >
        {/* Close button — top-right of the overlay */}
        <div className="flex justify-end px-6 pt-6">
          <button
            aria-label="Close menu"
            className="text-white p-2 hover:text-green-400 transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <X size={32} />
          </button>
        </div>

        {/* Centred nav links */}
        <div className="flex-1 flex flex-col items-center justify-center space-y-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`text-4xl font-black uppercase italic tracking-tighter transition-colors ${
                pathname === link.path
                  ? 'text-green-500'
                  : 'text-white hover:text-green-400'
              }`}
            >
              {link.name}
            </Link>
          ))}
         
         <PremiumBookingSystem fontsize='2xl' isMobile onClose={() => setIsMobileMenuOpen(false)} />
        </div>
      </div>
    </>
  )
}

export default Header