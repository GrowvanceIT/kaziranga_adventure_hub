'use client'
import React from 'react'
import Image from 'next/image'
import { ShieldCheck, Map, Users, Leaf, ArrowRight, Heart } from 'lucide-react'

function page() {
  const stats = [
    { label: "Years of Experience", value: "15+" },
    { label: "Expert Naturalists", value: "24" },
    { label: "Happy Explorers", value: "50k+" },
    { label: "Conservation Projects", value: "12" },
  ]

  const values = [
    {
      title: "Ethical Tourism",
      desc: "We prioritize the well-being of the wildlife. Our trails are mapped to minimize human footprint.",
      icon: <Leaf className="text-green-500" />
    },
    {
      title: "Local Expertise",
      desc: "Our guides are sons of the soil, born and raised near the marshes of Kaziranga.",
      icon: <Map className="text-green-500" />
    },
    {
      title: "Safety First",
      desc: "Government-certified vehicles and highly trained staff ensure a secure journey through the wild.",
      icon: <ShieldCheck className="text-green-500" />
    }
  ]

  return (
    <main className="bg-zinc-950 text-white pt-32 pb-24">
      
      {/* 1. Hero Section */}
      <section className="container mx-auto px-6 md:px-12 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-500 text-xs font-bold tracking-widest uppercase">
              Our Story
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
              Preserving the spirit of the wild for generations.
            </h1>
            <p className="text-zinc-400 text-lg leading-relaxed max-w-xl">
              Founded in 2009, our mission has always been simple: to bridge the gap between human curiosity and the raw beauty of the jungle, without compromising the sanctity of the wilderness.
            </p>
            <div className="flex gap-6">
               <div className="flex flex-col">
                  <span className="text-3xl font-bold text-white tracking-tighter">150+</span>
                  <span className="text-zinc-500 text-xs uppercase tracking-widest font-bold">Rhinos Protected</span>
               </div>
               <div className="w-px h-12 bg-zinc-800" />
               <div className="flex flex-col">
                  <span className="text-3xl font-bold text-white tracking-tighter">100%</span>
                  <span className="text-zinc-500 text-xs uppercase tracking-widest font-bold">Local Employment</span>
               </div>
            </div>
          </div>

          <div className="relative h-[500px] rounded-[3rem] overflow-hidden border border-white/10 group">
            <Image 
              src="https://images.pexels.com/photos/15456560/pexels-photo-15456560.jpeg"
              alt="Misty Kaziranga Forest"
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/60 to-transparent" />
          </div>
        </div>
      </section>

      {/* 2. Values Grid */}
      <section className="bg-zinc-900/30 py-24 border-y border-white/5">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
              Guided by purpose.
            </h2>
            <p className="text-zinc-500 max-w-lg mx-auto italic font-light">
              "We don't just sell safaris; we curate memories that foster respect for nature."
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((val, i) => (
              <div key={i} className="p-10 rounded-[2.5rem] bg-zinc-950 border border-white/5 hover:border-green-500/30 transition-all group">
                <div className="w-12 h-12 rounded-2xl bg-green-500/10 flex items-center justify-center mb-6 group-hover:bg-green-500 group-hover:text-black transition-all">
                  {val.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">{val.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. The Founders / Team Section */}
      <section className="container mx-auto px-6 md:px-12 py-32">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="w-full lg:w-1/2 grid grid-cols-2 gap-4">
             <div className="h-64 relative rounded-[2rem] overflow-hidden mt-12">
                <Image src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1000" fill className="object-cover" alt="nature" />
             </div>
             <div className="h-64 relative rounded-[2rem] overflow-hidden">
                <Image src="https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=1000" fill className="object-cover" alt="naturalist" />
             </div>
          </div>
          <div className="w-full lg:w-1/2 space-y-8">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">
              Community at our core.
            </h2>
            <p className="text-zinc-400 leading-relaxed text-lg">
              Every package you book directly supports the fringe village communities of Kaziranga. We believe that conservation is only possible when the local people are the primary stakeholders.
            </p>
            <div className="space-y-4">
               <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                  <div className="mt-1"><Heart size={20} className="text-red-500" /></div>
                  <div>
                    <h4 className="font-bold">Sustainable Livelihoods</h4>
                    <p className="text-sm text-zinc-500">Training local youth as certified naturalists and photographers.</p>
                  </div>
               </div>
            </div>
            <button className="flex items-center gap-3 text-green-500 font-bold group">
               View Our Impact Report <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* 4. Bottom Stats (Bento Style) */}
      <section className="container mx-auto px-6 md:px-12 pb-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <div key={i} className="bg-zinc-900 border border-white/5 p-8 rounded-[2rem] text-center hover:bg-zinc-800 transition-colors">
              <p className="text-4xl font-bold text-white mb-2">{stat.value}</p>
              <p className="text-[10px] uppercase tracking-[0.2em] font-black text-zinc-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

    </main>
  )
}

export default page