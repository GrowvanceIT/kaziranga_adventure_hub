'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { Camera, Maximize2, Filter } from 'lucide-react'

function page() {
  const [filter, setFilter] = useState('all')

  const photos = [
    { id: 1, category: 'rhino', src: 'https://images.pexels.com/photos/12500222/pexels-photo-12500222.jpeg', size: 'md:col-span-2 md:row-span-2' },
    { id: 2, category: 'birds', src: 'https://images.pexels.com/photos/33593657/pexels-photo-33593657.jpeg', size: 'md:col-span-1 md:row-span-1' },
    { id: 3, category: 'landscape', src: 'https://images.pexels.com/photos/35565937/pexels-photo-35565937.jpeg', size: 'md:col-span-1 md:row-span-2' },
    { id: 4, category: 'elephant', src: 'https://images.pexels.com/photos/35671094/pexels-photo-35671094.jpeg', size: 'md:col-span-1 md:row-span-1' },
    { id: 5, category: 'tiger', src: 'https://images.pexels.com/photos/10147886/pexels-photo-10147886.jpeg', size: 'md:col-span-2 md:row-span-1' },
    { id: 6, category: 'landscape', src: 'https://images.pexels.com/photos/30542347/pexels-photo-30542347.jpeg', size: 'md:col-span-1 md:row-span-1' },
  ]

  const filteredPhotos = filter === 'all' ? photos : photos.filter(p => p.category === filter)

  return (
    <main className="bg-zinc-950 text-white pt-32 pb-24">
      
      {/* 1. Header Section */}
      <section className="container mx-auto px-6 md:px-12 mb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <div className="text-green-500 font-bold tracking-widest uppercase text-xs mb-4 flex items-center gap-2">
              <Camera size={14} /> Visual Journal
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Moments from the heart of Assam.
            </h1>
            <p className="text-zinc-500 text-lg">
              A collection of raw, unedited glimpses into the daily lives of Kaziranga's inhabitants.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-3">
            {['all', 'rhino', 'elephant', 'tiger', 'birds'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 rounded-full text-xs font-bold tracking-widest uppercase transition-all border ${
                  filter === cat 
                  ? 'bg-green-600 border-green-600 text-white' 
                  : 'bg-transparent border-white/10 text-zinc-500 hover:border-white/30'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Masonry Grid */}
      <section className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[300px]">
          {filteredPhotos.map((photo) => (
            <div 
              key={photo.id} 
              className={`relative rounded-[2.5rem] overflow-hidden group cursor-crosshair border border-white/5 ${photo.size}`}
            >
              <Image 
                src={photo.src} 
                alt="Wildlife" 
                fill 
                className="object-cover transition-transform duration-1000 group-hover:scale-110 brightness-90 group-hover:brightness-100"
              />
              
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                 <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white scale-50 group-hover:scale-100 transition-transform duration-500">
                    <Maximize2 size={24} />
                 </div>
              </div>

              {/* Category Tag */}
              <div className="absolute bottom-6 left-6 translate-y-10 group-hover:translate-y-0 transition-transform duration-500">
                <span className="px-4 py-1.5 rounded-full bg-zinc-950/80 backdrop-blur-md border border-white/10 text-[10px] font-bold uppercase tracking-widest text-green-500">
                  {photo.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Instagram CTA */}
      <section className="container mx-auto px-6 md:px-12 mt-32">
        <div className="p-12 md:p-20 rounded-[3.5rem] bg-zinc-900/50 border border-white/5 text-center relative overflow-hidden">
          {/* Decorative background element */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-green-500/5 blur-[100px] rounded-full" />
          
          <div className="relative z-10 max-w-xl mx-auto space-y-8">
            <div className="w-16 h-16 bg-gradient-to-tr from-amber-400 to-fuchsia-600 rounded-2xl mx-auto flex items-center justify-center shadow-2xl rotate-3">
              {/* <Instagram className="text-white" size={32} /> */}
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
              See the latest sightings.
            </h2>
            <p className="text-zinc-400 text-lg">
              Our naturalists post daily updates from the field. Follow our journey in real-time.
            </p>
            <button className="px-10 py-5 bg-white text-black rounded-full font-bold text-sm tracking-widest uppercase hover:bg-green-500 hover:text-white transition-all shadow-xl shadow-black/50">
              Follow @KazirangaAdventureHub
            </button>
          </div>
        </div>
      </section>

    </main>
  )
}

export default page