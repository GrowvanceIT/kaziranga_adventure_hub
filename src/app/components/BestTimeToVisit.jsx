'use client'
import React from 'react'
import { Calendar, CloudRain, Sun, Camera, Info, ArrowRight, Sparkles } from 'lucide-react'

function BestTimeToVisit() {
  const seasons = [
    {
      months: "Nov - Apr",
      status: "Peak",
      title: "The Golden Window",
      desc: "Receding water levels drive wildlife to the highlands, offering unmatched visibility and vibrant sunsets.",
      icon: <Sun className="text-amber-400" size={20} />,
      active: true,
    },
    {
      months: "May - Oct",
      status: "Closed",
      title: "The Monsoon Rebirth",
      desc: "A period of restoration. The Brahmaputra reclaims the plains, fueling life for the season ahead.",
      icon: <CloudRain className="text-blue-400" size={20} />,
      active: false,
    }
  ]

  return (
    <section className="py-24 bg-zinc-950 text-white relative overflow-hidden">
      
      {/* Cinematic Background Typography */}
      <div className="absolute top-10 left-10 pointer-events-none select-none">
        <h1 className="text-[20rem] font-black text-white/[0.02] leading-none tracking-tighter">
          PLAN
        </h1>
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column: Editorial Content (5 cols) */}
          <div className="lg:col-span-5 space-y-12">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full  text-green-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
                 Seasonal Guide
              </div>
              <h2 className="text-6xl md:text-5xl font-black  leading-[0.9]">
                Timing is <br /> 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-500 via-zinc-200 to-zinc-500">
                  Everything.
                </span>
              </h2>
            </div>

            {/* Premium Timeline Layout */}
            <div className="relative space-y-12 pl-10 border-l border-white/10">
              {seasons.map((season, idx) => (
                <div 
                  key={idx}
                  className={`relative transition-all duration-700 ${season.active ? 'opacity-100' : 'opacity-40'}`}
                >
                  {/* Timeline Dot */}
                  <div className={`absolute -left-[51px] top-2 w-[21px] h-[21px] rounded-full border-4 border-zinc-950 transition-all duration-1000 ${
                    season.active ? 'bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.6)] scale-125' : 'bg-zinc-800'
                  }`} />
                  
                  <div className="group cursor-default">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-green-500 font-mono text-sm tracking-tighter">
                        {season.months}
                      </span>
                      <span className="h-px w-8 bg-zinc-800 group-hover:w-12 transition-all duration-500" />
                      <span className="text-[10px] uppercase font-black tracking-widest text-zinc-500">
                        {season.status}
                      </span>
                    </div>
                    <h4 className="text-3xl font-bold mb-4 group-hover:text-green-400 transition-colors">
                      {season.title}
                    </h4>
                    <p className="text-zinc-400 leading-relaxed text-sm max-w-sm">
                      {season.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Photography Focus (7 cols) */}
          <div className="lg:col-span-7 relative h-full flex items-center justify-center py-10 lg:py-0">
            
            {/* The Photography Stack Visual */}
            <div className="relative w-full max-w-lg aspect-square">
                
                {/* Underlay Image (Blurred) */}
                <div className="absolute top-0 right-0 w-64 h-80 bg-zinc-900 rounded-[2rem] border border-white/5 rotate-6 translate-y-10 -translate-x-10 overflow-hidden opacity-50 transition-transform hover:rotate-12 duration-700">
                     <img src="https://images.pexels.com/photos/30197098/pexels-photo-30197098.png" className="w-full h-full object-cover grayscale" alt="forest" />
                </div>

                {/* Main "Pro Tip" Card */}
                <div className="relative z-20 w-full bg-zinc-900/40 backdrop-blur-3xl border border-white/10 rounded-[3rem] p-8 md:p-12 shadow-2xl">
                    <div className="flex justify-between items-start mb-12">
                         <div className="w-14 h-14 bg-white text-black rounded-2xl flex items-center justify-center -rotate-6 shadow-xl">
                            <Camera size={28} />
                         </div>
                         <div className="text-right">
                            <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Recommendation</p>
                            <p className="text-green-500 font-mono italic">#MagicalMornings</p>
                         </div>
                    </div>

                    <div className="space-y-6 mb-10">
                        <h3 className="text-4xl font-bold leading-none tracking-tight">
                            The Photographer's <br /> <span className="text-green-500">Secret.</span>
                        </h3>
                        <p className="text-zinc-300 text-lg">
                            Visit between <span className="text-white font-bold underline decoration-green-500 underline-offset-8 italic">December and February</span> for misty, atmospheric mornings.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                            <p className="text-[10px] uppercase text-zinc-500 font-bold mb-1">Atmosphere</p>
                            <p className="text-sm font-semibold">Ethereal Mist</p>
                        </div>
                        <div className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                            <p className="text-[10px] uppercase text-zinc-500 font-bold mb-1">Lighting</p>
                            <p className="text-sm font-semibold">Golden Soft-light</p>
                        </div>
                    </div>

                    <button className="w-full mt-8 py-5 bg-green-600 hover:bg-green-500 text-white rounded-2xl font-bold flex items-center justify-center gap-3 transition-all active:scale-95 shadow-lg shadow-green-900/20">
                        Check Wildlife Reports <ArrowRight size={18} />
                    </button>
                </div>

                {/* Background Decorative Mesh */}
                <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-green-500/10 blur-[100px] -z-10" />
            </div>
          </div>
        </div>

        {/* Dynamic Footer Info */}
        
      </div>
    </section>
  )
}

export default BestTimeToVisit