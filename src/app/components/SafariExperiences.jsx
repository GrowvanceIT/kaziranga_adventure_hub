'use client'
import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ArrowRight, Sun, Ghost, Compass, Sparkles } from 'lucide-react'

function SafariExperiences() {
  const safaris = [
    {
      title: "Elephant Safari",
      subtitle: "The Classic",
      desc: "Feel the forest from a different height. Quiet, slow, and deeply immersive. Perfect for close encounters with rhinos in the tall elephant grass.",
      icon: <Ghost size={20} className="text-amber-400" />, 
      image: "https://images.pexels.com/photos/34030623/pexels-photo-34030623.jpeg", 
      tag: "Best for Close-ups"
    },
    {
      title: "Jeep Safari",
      subtitle: "The Explorer",
      desc: "Cover larger areas and explore different zones. Ideal for spotting diverse wildlife including tigers, deer, and exotic birds across the vast plains.",
      icon: <Compass size={20} className="text-green-400" />,
      image: "https://images.pexels.com/photos/11536788/pexels-photo-11536788.jpeg",
      tag: "Deep Forest Access"
    },
    {
      title: "Sunrise Safari",
      subtitle: "The Magical Hour",
      desc: "Watch the jungle wake up. Soft light, cool air, and the best wildlife sightings in the golden morning glow. A dream for every photographer.",
      icon: <Sun size={20} className="text-orange-400" />,
      image: "https://images.pexels.com/photos/15585646/pexels-photo-15585646.jpeg",
      tag: "Photographer's Choice"
    }
  ]

  return (
    <section className="py-32 bg-zinc-950 text-white relative overflow-hidden">
      {/* Background glow for premium feel */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-900/10 blur-[120px] rounded-full -z-0" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full  text-green-500 text-[10px] font-bold uppercase tracking-[0.3em] mb-6">
               Elite Expeditions
            </div>
            <h2 className="text-5xl md:text-5xl font-black tracking-tighter  leading-[0.85]">
              Choose Your <br/> <span className=" bg-clip-text -zinc-200 text-zinc-500">Adventure.</span>
            </h2>
          </div>
          <p className="text-zinc-500 max-w-sm border-l border-zinc-800 pl-8 mb-2 leading-relaxed italic">
            "Every trail in Kaziranga offers a different perspective of the wild. Which one will you follow?"
          </p>
        </div>

        {/* Safari Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {safaris.map((safari, index) => (
            <div 
              key={index} 
              className="group relative h-[600px] rounded-[3rem] overflow-hidden border border-white/5 flex flex-col justify-end p-10 transition-all duration-700 hover:border-green-500/40 hover:shadow-[0_0_50px_-12px_rgba(34,197,94,0.3)] cursor-pointer"
            >
              {/* Background Image with Zoom & Darken Effect */}
              <Image 
                src={safari.image} 
                alt={safari.title} 
                fill 
                className="object-cover -z-10 brightness-[0.6] grayscale-[0.2] transition-all duration-1000 group-hover:scale-110 group-hover:brightness-[0.4] group-hover:grayscale-0"
              />
              
              {/* Overlay Gradient (Higher contrast for readability) */}
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent -z-10" />

              {/* Card Content */}
              <div className="relative space-y-6 translate-y-12 group-hover:translate-y-0 transition-transform duration-700 ease-out">
                
                {/* Icon & Subtitle */}
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center transition-colors group-hover:bg-green-500/20 group-hover:border-green-500/30">
                    {safari.icon}
                   </div>
                   <div className="h-px w-8 bg-zinc-800 group-hover:w-12 transition-all duration-500" />
                   <span className="text-[10px] font-black uppercase tracking-[0.2em] text-green-500">
                     {safari.subtitle}
                   </span>
                </div>

                {/* Title */}
                <h4 className="text-4xl font-bold tracking-tight text-white">{safari.title}</h4>
                
                {/* Description - Reveals on Hover */}
                <p className="text-zinc-400 text-base leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100 max-w-xs">
                  {safari.desc}
                </p>

                {/* Footer of Card */}
                <div className="pt-6 border-t border-white/5 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-200">
                  <button className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-white hover:text-green-500 transition-colors group/btn">
                    Details <ArrowRight size={18} className="group-hover/btn:translate-x-2 transition-transform duration-300" />
                  </button>
                  <span className="text-[9px] font-black uppercase tracking-[0.2em] py-2 px-4 rounded-full border border-white/10 bg-white/5 text-zinc-400">
                    {safari.tag}
                  </span>
                </div>
              </div>

              {/* Top corner tag (Static visual) */}
              <div className="absolute top-8 right-8 w-2 h-2 rounded-full bg-green-500/50 group-hover:bg-green-500 group-hover:animate-pulse" />
            </div>
          ))}
        </div>

        {/* Floating Disclaimer */}
        <div className="mt-20 flex justify-center">
            <div className="px-6 py-3 rounded-full bg-zinc-900/50 border border-white/5 backdrop-blur-sm">
              <p className="text-zinc-600 text-[10px] font-bold uppercase tracking-[0.2em] flex items-center gap-3">
                <span className="w-1 h-1 rounded-full bg-zinc-800" />
                Regulated by Kaziranga Forest Department
                <span className="w-1 h-1 rounded-full bg-zinc-800" />
              </p>
            </div>
        </div>
      </div>
    </section>
  )
}

export default SafariExperiences