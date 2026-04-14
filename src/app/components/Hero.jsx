'use client'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'
import { ArrowRight, MapPin } from 'lucide-react' // Optional: for a pro touch
import { useRouter } from 'next/navigation'

function Hero() {
  const router = useRouter()
  return (
    <section className="relative min-h-screen w-full flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 -z-10">
        <Image 
          src="/images/img2.jpg" 
          alt="Kaziranga Landscape" 
          fill
          priority
          className="object-cover brightness-[0.85]" 
        />
        {/* Subtle gradient for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
      </div>

      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Content Column */}
        <div className="max-w-2xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/20 border border-green-500/30 text-green-400 text-sm font-medium backdrop-blur-sm">
            <MapPin size={16} />
            <span>UNESCO World Heritage Site</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-extrabold text-white leading-tight tracking-tight">
            Experience the <span className="text-green-500">Wild.</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-200 leading-relaxed max-w-lg">
            Journey into the heart of Assam. Encounter the majestic Great One-Horned Rhinoceros and explore the untamed beauty of Kaziranga’s lush grasslands.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-10 py-6 text-lg rounded-full transition-all hover:scale-105">
              Book Your Safari
            </Button>
            <Button onClick={() => router.push('/#packages')} size="lg" variant="outline" className="text-white border-white/40 bg-white/10 backdrop-blur-md hover:bg-white/20 px-10 py-6 text-lg rounded-full">
              View Packages
            </Button>
          </div>

          {/* Trust Badges */}
          <div className="pt-8 flex items-center gap-6 text-white/60 text-sm italic">
            <p>Trusted by 50,000+ Explorers</p>
            <div className="h-px w-12 bg-white/20" />
            <p>Government Authorized</p>
          </div>
        </div>

        {/* Optional: Visual Element for 2nd Column */}
        <div className="hidden lg:flex justify-end">
            <div className="relative w-72 h-96 rounded-2xl border-2 border-white/20 overflow-hidden rotate-3 hover:rotate-0 transition-transform duration-500">
                <Image src="/images/img3.jpg" alt="Rhino" fill className="object-cover" />
                <div className="absolute bottom-4 left-4 text-white font-bold text-xl uppercase tracking-widest">The Big One</div>
            </div>
        </div>
      </div>
    </section>
  )
}

export default Hero