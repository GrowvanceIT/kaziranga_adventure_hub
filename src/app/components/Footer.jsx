'use client'
import React from 'react'
import Link from 'next/link'
import { Leaf, Mail, Phone, MapPin, ArrowUpRight, ShieldCheck } from 'lucide-react'
import { FaFacebook,FaInstagram,FaTwitter } from "react-icons/fa";

function Footer() {
  const currentYear = new Date().getFullYear()

  const links = {
    explore: [
      { name: 'About the Park', href: '/about' },
      { name: 'Safari Zones', href: '/safari' },
      { name: 'Experience Packages', href: '/packages' },
      { name: 'Wildlife Gallery', href: '/gallery' },
    ],
    support: [
      { name: 'Booking Policy', href: '#' },
      { name: 'Travel Insurance', href: '#' },
      { name: 'Permit Guidelines', href: '#' },
      { name: 'Contact Expert', href: '#' },
    ],
    contact: [
      { icon: <Phone size={16} />, text: '+91 60031 96559' },
      { icon: <Mail size={16} />, text: 'explore@kazirangaadventurehub.com' },
      { icon: <MapPin size={16} />, text: 'Kaziranga, Assam, India' },
    ]
  }

  return (
    <footer className="bg-zinc-950 text-white pt-24 pb-12 border-t border-white/5 relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-green-900/10 blur-[120px] rounded-full -z-0" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-20">
          
          {/* Brand Column (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-12 h-12 bg-green-600 rounded-2xl flex items-center justify-center transition-transform duration-500 group-hover:rotate-12">
                <Leaf className="text-white" size={28} fill="currentColor" />
              </div>
              <span className="text-2xl font-bold tracking-tighter">
                Kaziranga Adventure Hub.
              </span>
            </Link>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight max-w-sm">
              Your gateway to the untamed heart of Assam.
            </h2>
            <div className="flex gap-4">
              {[FaInstagram, FaFacebook, FaTwitter].map((Icon, i) => (
                <button key={i} className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:bg-green-600 hover:text-white hover:border-green-600 transition-all">
                  <Icon size={18} />
                  
                </button>
              ))}
              
            </div>
          </div>

          {/* Links Columns (7 cols) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-12">
            <div>
              <h4 className="text-white font-bold mb-6">Explore</h4>
              <ul className="space-y-4">
                {links.explore.map((link, i) => (
                  <li key={i}>
                    <Link href={link.href} className="text-zinc-500 hover:text-green-500 text-sm transition-colors flex items-center gap-1 group">
                      {link.name} 
                      <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6">Support</h4>
              <ul className="space-y-4">
                {links.support.map((link, i) => (
                  <li key={i}>
                    <Link href={link.href} className="text-zinc-500 hover:text-green-500 text-sm transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6">Connect</h4>
              <ul className="space-y-4">
                {links.contact.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-zinc-500 text-sm">
                    <span className="text-green-900">{item.icon}</span>
                    {item.text}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <p className="text-zinc-600 text-xs tracking-widest font-bold uppercase">
              © {currentYear} Kaziranga Adventure Hub.
            </p>
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10">
              <ShieldCheck size={14} className="text-green-900" />
              <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">
                Government Authorized Agency
              </span>
            </div>
          </div>

          <div className="flex gap-8">
            <Link href="#" className="text-zinc-600 hover:text-white text-[10px] font-bold uppercase tracking-widest transition-colors">Privacy Policy</Link>
            <Link href="#" className="text-zinc-600 hover:text-white text-[10px] font-bold uppercase tracking-widest transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer