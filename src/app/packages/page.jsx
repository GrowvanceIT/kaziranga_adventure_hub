
'use client'
import React from 'react'
import { Check, Star, Zap, clock, ShieldCheck, ArrowRight, Coffee, Camera } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

function page() {
  const packages = [
    {
      name: "The Wilderness Day",
      price: "₹4,500",
      duration: "1 Day / 0 Nights",
      tag: "Best Value",
      features: [
        "1 Jeep Safari (Central Range)",
        "Entry permits & Forest tolls",
        "Professional local guide",
        "Morning Assamese tea",
        "Packed refreshments"
      ],
      cta: "Book Day Trip",
      popular: false
    },
    {
      name: "The Rhino Explorer",
      price: "₹12,500",
      duration: "2 Days / 1 Night",
      tag: "Most Popular",
      features: [
        "1 Elephant Safari (Morning)",
        "1 Jeep Safari (Western Range)",
        "Luxury cottage stay",
        "All meals (Local cuisine)",
        "Bird watching walk",
        "Cultural evening dance"
      ],
      cta: "Book Experience",
      popular: true
    },
    {
      name: "The Photographer's Quest",
      price: "₹28,000",
      duration: "4 Days / 3 Nights",
      tag: "Deep Immersion",
      features: [
        "4 Jeep Safaris (All 3 Ranges)",
        "Private naturalist guide",
        "Tiger tracking specialized routes",
        "Elite eco-resort stay",
        "Photography workshop",
        "Village visit & Boat safari"
      ],
      cta: "Book Expedition",
      popular: false
    }
  ]

  return (
    <main className="bg-zinc-950 text-white pt-32 pb-24">
      
      {/* 1. Page Header */}
      <section className="container mx-auto px-6 md:px-12 mb-20 text-center">
        <div className="text-green-500 font-bold tracking-widest uppercase text-xs mb-4">
          Curated Journeys
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
          Find your perfect forest stay.
        </h1>
        <p className="text-zinc-500 text-lg max-w-2xl mx-auto">
          Whether you are here for a quick glimpse of the rhino or a deep photographic expedition, we have a package tailored for your pace.
        </p>
      </section>

      {/* 2. Pricing Grid */}
      <section className="container mx-auto px-6 md:px-12 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {packages.map((pkg, i) => (
            <div 
              key={i} 
              className={`relative flex flex-col p-10 rounded-[3rem] border transition-all duration-500 hover:scale-[1.02] ${
                pkg.popular 
                ? 'bg-zinc-900 border-green-500/50 shadow-2xl shadow-green-900/10' 
                : 'bg-zinc-950 border-white/5'
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-green-500 text-black text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest">
                  Recommended
                </div>
              )}

              <div className="mb-8">
                <span className="text-zinc-500 text-xs font-bold uppercase tracking-[0.2em]">{pkg.tag}</span>
                <h3 className="text-2xl font-bold mt-2">{pkg.name}</h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-bold tracking-tighter">{pkg.price}</span>
                  <span className="text-zinc-500 text-sm">/ person</span>
                </div>
                <p className="text-zinc-400 text-sm mt-2">{pkg.duration}</p>
              </div>

              <div className="flex-grow space-y-4 mb-10">
                {pkg.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-sm text-zinc-300">
                    <Check size={16} className="text-green-500 shrink-0" />
                    {feature}
                  </div>
                ))}
              </div>

              <Button 
                variant={pkg.popular ? "default" : "outline"} 
                className={`w-full py-7 rounded-2xl font-bold text-sm uppercase tracking-widest transition-all cursor-pointer ${
                  pkg.popular 
                  ? 'bg-green-600 hover:bg-green-500 text-white border-none' 
                  : 'border-white/10 bg-transparent hover:bg-white text-white'
                }`}
              >
                {pkg.cta}
              </Button>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Inclusions Section */}
      <section className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-zinc-900/30 rounded-[3rem] p-8 md:p-16 border border-white/5">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-8">
              Standard in every journey.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                  <ShieldCheck className="text-green-500" size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-sm">Safe travel</h4>
                  <p className="text-zinc-500 text-xs mt-1">Sanitized 4x4 vehicles and expert drivers.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                  <Coffee className="text-green-500" size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-sm">Local flavors</h4>
                  <p className="text-zinc-500 text-xs mt-1">Authentic Assamese meals prepared fresh.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                  <Camera className="text-green-500" size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-sm">Media support</h4>
                  <p className="text-zinc-500 text-xs mt-1">Charging points and storage backups available.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                  <Star className="text-green-500" size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-sm">VIP permits</h4>
                  <p className="text-zinc-500 text-xs mt-1">Pre-booked entries to avoid long gate queues.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative h-96 rounded-[2rem] overflow-hidden group">
            <Image 
              src="https://images.pexels.com/photos/34030632/pexels-photo-34030632.jpeg" 
              fill 
              className="object-cover brightness-75 group-hover:scale-105 transition-transform duration-1000" 
              alt="Kaziranga Resort"
            />
          </div>
        </div>
      </section>

      {/* 4. FAQ / Policy Mini-section */}
      <section className="container mx-auto px-6 md:px-12 mt-24 text-center">
        <p className="text-zinc-500 text-sm max-w-2xl mx-auto">
          Looking for a custom group booking or a school trip? 
          <button className="text-green-500 font-bold ml-2 hover:underline inline-flex items-center gap-1">
            Contact our group desk <ArrowRight size={14} />
          </button>
        </p>
      </section>

    </main>
  )
}

export default page