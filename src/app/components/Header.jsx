'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Menu, X, Leaf, ShieldCheck } from 'lucide-react'
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

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${
        isScrolled 
        ? 'py-4 bg-zinc-950/80 backdrop-blur-xl border-b border-white/5' 
        : 'py-6 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-500">
            <Leaf className="text-white" size={24} fill="currentColor" />
          </div>
          <div className="flex flex-col">
            <span className="text-white font-black text-xl leading-none tracking-tighter ">
              Kaziranga <span className="text-green-500"></span>
            </span>
            <span className="text-[8px] text-zinc-500 font-bold uppercase tracking-[0.3em] leading-none mt-1">
              Safari
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
                className={`relative text-sm  tracking-widest transition-colors ${
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

        {/* Right Actions */}
        <div className="hidden lg:flex items-center gap-6">
         
          <PremiumBookingSystem/>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="lg:hidden text-white p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={30} /> : <Menu size={30} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-zinc-950 z-[90] transition-all duration-500 lg:hidden ${
        isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}>
        <div className="flex flex-col items-center justify-center h-full space-y-8">
          {navLinks.map((link) => (
            <Link 
              key={link.path} 
              href={link.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`text-4xl font-black uppercase italic tracking-tighter ${
                pathname === link.path ? 'text-green-500' : 'text-white'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Button className="mt-8 bg-green-600 hover:bg-green-500 text-white rounded-full px-12 py-8 text-xl font-bold uppercase italic">
            Start Your Journey
          </Button>
        </div>
      </div>
    </header>
  )
}

export default Header