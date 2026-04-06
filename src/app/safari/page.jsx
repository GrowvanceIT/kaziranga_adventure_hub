'use client'
import React from 'react'
import Image from 'next/image'
import { Clock, MapPin, Camera, Coffee, Info, ShieldAlert, CheckCircle2, Sun } from 'lucide-react'


function page() {
  const zones = [
    {
      name: "Kohora (Central Range)",
      bestFor: "Rhinos and Water Buffalo",
      desc: "The most popular zone, characterized by vast grasslands and wetlands. Perfect for first-time visitors.",
      image: "https://images.pexels.com/photos/31121023/pexels-photo-31121023.jpeg"
    },
    {
      name: "Bagori (Western Range)",
      bestFor: "Elephant Safaris",
      desc: "Known for its high density of rhinos and wild elephants. Landscape is rugged and beautiful.",
      image: "https://images.pexels.com/photos/34030626/pexels-photo-34030626.jpeg"
    },
    {
      name: "Agaratoli (Eastern Range)",
      bestFor: "Bird Watching and Tigers",
      desc: "A hidden gem for birders and photographers seeking the elusive Royal Bengal Tiger in thick foliage.",
      image: "https://images.pexels.com/photos/7722950/pexels-photo-7722950.jpeg"
    }
  ]

  return (
    <main className="bg-zinc-950 text-white pt-32 pb-24">
      
      {/* 1. Page Header */}
      <section className="container mx-auto px-6 md:px-12 mb-20">
        <div className="max-w-3xl">
          <div className="text-green-500 font-bold tracking-widest uppercase text-xs mb-4">
            Field Guide
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-8">
            The Kaziranga safari experience.
          </h1>
          <p className="text-zinc-400 text-lg leading-relaxed">
            Planning your entry into the wild requires a bit of strategy. From timing the golden hour to choosing the right range, here is everything you need to know.
          </p>
        </div>
      </section>

      {/* 2. Timing & Slots (The Logistics) */}
      <section className="container mx-auto px-6 md:px-12 mb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-zinc-900 border border-white/5 rounded-[3rem] p-10 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-500">
                <Clock size={24} />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold">Morning sessions</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-white/5">
                  <span className="text-zinc-500">Elephant Safari</span>
                  <span className="font-bold">05:30 AM — 07:30 AM</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-white/5">
                  <span className="text-zinc-500">Jeep Safari</span>
                  <span className="font-bold">07:30 AM — 11:00 AM</span>
                </div>
              </div>
            </div>
            <p className="mt-8 text-sm text-zinc-500 flex items-center gap-2">
              <Info size={14} className="text-green-500" /> Best for high predator activity and misty landscapes.
            </p>
          </div>

          <div className="bg-zinc-900 border border-white/5 rounded-[3rem] p-10 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="w-12 h-12 rounded-2xl bg-green-500/10 flex items-center justify-center text-green-500">
                <Sun size={24} />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold">Afternoon sessions</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-white/5">
                  <span className="text-zinc-500">Jeep Safari</span>
                  <span className="font-bold">01:30 PM — 04:00 PM</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-zinc-500">Golden Hour</span>
                  <span className="font-bold">03:30 PM — 04:30 PM</span>
                </div>
              </div>
            </div>
            <p className="mt-8 text-sm text-zinc-500 flex items-center gap-2">
              <Camera size={14} className="text-green-500" /> Best for photography and large herd movements.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Zone Selection (Visual Grid) */}
      <section className="container mx-auto px-6 md:px-12 mb-32">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-12">
          Explore the ranges.
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {zones.map((zone, i) => (
            <div key={i} className="group cursor-pointer">
              <div className="relative h-80 rounded-[2.5rem] overflow-hidden mb-6">
                <Image 
                  src={zone.image} 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-110" 
                  alt={zone.name} 
                />
              </div>
              <div className="flex items-center gap-2 text-green-500 text-xs font-bold uppercase tracking-widest mb-2">
                <MapPin size={12} /> {zone.bestFor}
              </div>
              <h3 className="text-2xl font-bold mb-3">{zone.name}</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">{zone.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Safari Essentials (Checklist) */}
      <section className="container mx-auto px-6 md:px-12">
        <div className="bg-zinc-900/50 border border-white/5 rounded-[3rem] p-12 overflow-hidden relative">
          <div className="absolute top-10 right-10 opacity-5 hidden lg:block">
             <ShieldAlert size={200} />
          </div>
          
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-8">
              Essential tips for your ride.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="flex gap-4">
                  <CheckCircle2 className="text-green-500 shrink-0" size={24} />
                  <div>
                    <h4 className="font-bold mb-1">Wear earth tones</h4>
                    <p className="text-zinc-500 text-sm">Olive, brown, and khaki help you blend in with the environment.</p>
                  </div>
               </div>
               <div className="flex gap-4">
                  <CheckCircle2 className="text-green-500 shrink-0" size={24} />
                  <div>
                    <h4 className="font-bold mb-1">Silence is golden</h4>
                    <p className="text-zinc-500 text-sm">Keep noise to a minimum to increase the chance of rare sightings.</p>
                  </div>
               </div>
               <div className="flex gap-4">
                  <CheckCircle2 className="text-green-500 shrink-0" size={24} />
                  <div>
                    <h4 className="font-bold mb-1">Bring binoculars</h4>
                    <p className="text-zinc-500 text-sm">Even close rhinos look spectacular through high-quality lenses.</p>
                  </div>
               </div>
               <div className="flex gap-4">
                  <CheckCircle2 className="text-green-500 shrink-0" size={24} />
                  <div>
                    <h4 className="font-bold mb-1">Identity proof</h4>
                    <p className="text-zinc-500 text-sm">Carry original government ID (Aadhar/Passport) for entry gates.</p>
                  </div>
               </div>
            </div>
            
            <div className="mt-12 p-6 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-4">
               <Coffee className="text-amber-500" />
               <p className="text-sm text-zinc-300">
                 Complimentary Assamese tea is served at our staging area before the morning safaris.
               </p>
            </div>
          </div>
        </div>
      </section>

    </main>
  )
}

export default page