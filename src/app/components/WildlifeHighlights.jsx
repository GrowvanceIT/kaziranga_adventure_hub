'use client'
import React from 'react'
import Image from 'next/image'
import { Bird, ShieldCheck, Zap, Info } from 'lucide-react'

function WildlifeHighlights() {
  const animals = [
    {
      name: "One-Horned Rhinoceros",
      tag: "The Icon",
      desc: "Home to 70% of the global population. A prehistoric marvel.",
      img: "https://images.unsplash.com/photo-1655288212806-c49afd9cceff?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      grid: "md:col-span-2 md:row-span-2",
      icon: <ShieldCheck className="text-green-500" size={20} />
    },
    {
      name: "Royal Bengal Tiger",
      tag: "Rare & Thrilling",
      desc: "One of the highest densities of tigers in the world.",
      img: "https://images.unsplash.com/photo-1621196970961-8dbed0c4174e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      grid: "md:col-span-2 md:row-span-1",
      icon: <Zap className="text-orange-500" size={20} />
    },
    {
      name: "Asian Elephants",
      tag: "Gentle Giants",
      desc: "Watch herds migrate across the vast elephant corridors.",
      img: "https://images.unsplash.com/photo-1549366021-9f761d450615?q=80&w=1006&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      grid: "md:col-span-1 md:row-span-1",
    },
    {
      name: "Swamp Deer",
      tag: "Barasingha",
      desc: "The 'Twelve-Tined' deer found in the lush marshlands.",
      img: "https://images.unsplash.com/photo-1577475536138-69c9d927b01c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      grid: "md:col-span-1 md:row-span-1",
    },
    {
      name: "Birdlife Paradise",
      tag: "450+ Species",
      desc: "From the Great Indian Hornbill to migratory pelicans.",
      img: "https://images.unsplash.com/photo-1506333438925-a6203045b492?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      grid: "md:col-span-2 md:row-span-1",
      icon: <Bird className="text-blue-400" size={20} />
    }
  ];

  return (
    <section className="py-24 bg-black text-white overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <h3 className="text-green-500 font-bold tracking-[0.3em] uppercase text-xs mb-4">
              Wildlife Highlights
            </h3>
            <h2 className="text-5xl md:text-5xl font-black tracking-tighter ">
              What You’ll <span className="text-zinc-700">Encounter</span>
            </h2>
          </div>
          <div className="bg-zinc-900/50 border border-white/10 p-6 rounded-3xl backdrop-blur-md max-w-sm">
            <p className="text-zinc-400 text-sm leading-relaxed italic">
              "Every safari is different. Every sighting is a story waiting to be told. The jungle never reveals the same secret twice."
            </p>
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-auto md:grid-rows-3 gap-4 h-full md:h-[900px]">
          {animals.map((animal, index) => (
            <div 
              key={index} 
              className={`group relative rounded-[2.5rem] overflow-hidden border border-white/5 cursor-crosshair ${animal.grid}`}
            >
              {/* Animal Image */}
              <img 
                src={animal.img} 
                alt={animal.name}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 brightness-[0.7] group-hover:brightness-[0.5]"
              />

              {/* Overlay Content (Always Visible) */}
              <div className="absolute top-6 left-6 flex flex-col gap-2">
                <span className="bg-black/40 backdrop-blur-md border border-white/10 text-[10px] uppercase tracking-widest font-bold px-4 py-1.5 rounded-full w-fit">
                  {animal.tag}
                </span>
              </div>

              {/* Bottom Content (Reveals on Hover) */}
              <div className="absolute inset-0 flex flex-col justify-end p-8 bg-gradient-to-t from-black via-black/20 to-transparent translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                <div className="flex items-center gap-3 mb-2">
                  {animal.icon}
                  <h4 className="text-2xl md:text-3xl font-bold">{animal.name}</h4>
                </div>
                <p className="text-zinc-300 text-sm md:text-base max-w-md opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
                  {animal.desc}
                </p>
                
                {/* Visual indicator */}
                <div className="mt-6 flex items-center gap-2 text-[10px] text-zinc-500 font-bold uppercase tracking-tighter group-hover:text-green-500 transition-colors">
                  <Info size={14} /> View Sighting Probability
                </div>
              </div>

              {/* Decorative Corner Shimmer */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-12 flex justify-center">
            <p className="text-zinc-600 text-xs tracking-widest uppercase flex items-center gap-4">
                <span className="h-px w-12 bg-zinc-800" />
                Respect the wild. Stay within the trails.
                <span className="h-px w-12 bg-zinc-800" />
            </p>
        </div>
      </div>
    </section>
  )
}

export default WildlifeHighlights