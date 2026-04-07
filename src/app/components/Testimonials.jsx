'use client'
import React from 'react'
import { Quote, Star, MapPin, User } from 'lucide-react'

function Testimonials() {
  const reviews = [
    {
      text: "Seeing a rhino just a few meters away was surreal. The silence of the morning and the expertise of the naturalist made it perfect. Everything was perfectly organized.",
      author: "Rahul",
      location: "Delhi",
      rating: 5,
      avatar: "R",
      offset: "lg:-translate-y-6"
    },
    {
      text: "A once-in-a-lifetime experience. The safari and stay felt truly premium. We didn't just see the wild; we lived it for three days. Truly the heart of Assam.",
      author: "Sneha",
      location: "Bangalore",
      rating: 5,
      avatar: "S",
      offset: "lg:translate-y-12"
    }
  ]

  return (
    <section className="py-24 bg-black relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        {/* Subtle Map Path SVG or Pattern can go here */}
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-green-500/20 to-transparent" />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Header Column */}
          <div className="lg:col-span-4 space-y-6">
            <div className="inline-flex items-center gap-2 text-green-500">
               <div className="h-px w-8 bg-green-500" />
               <span className="text-[10px] font-black uppercase tracking-[0.3em]">Voices of the Wild</span>
            </div>
            <h2 className="text-5xl md:text-5xl font-black text-white tracking-tighter  leading-[0.9]">
              What <br /> 
              <span className="text-zinc-700">Travelers</span> <br />
              Say
            </h2>
            <p className="text-zinc-500 text-sm max-w-xs leading-relaxed">
              Join over 50,000+ explorers who have journeyed into the heart of Kaziranga with Kaziranga Adventure Hub.
            </p>
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} className="fill-green-500 text-green-500" />
              ))}
            </div>
          </div>

          {/* Testimonials Column */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            {reviews.map((rev, idx) => (
              <div 
                key={idx} 
                className={`relative group p-10 rounded-[3rem] bg-zinc-900/40 border border-white/5 backdrop-blur-xl transition-all duration-700 hover:border-green-500/30 ${rev.offset}`}
              >
                {/* Quote Icon */}
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-green-600 rounded-2xl flex items-center justify-center text-black shadow-xl shadow-green-900/20 group-hover:rotate-12 transition-transform">
                  <Quote size={24} fill="currentColor" />
                </div>

                <div className="space-y-8">
                  {/* The Quote - Using a Serif font for a premium "Journal" look */}
                  <p className="text-xl md:text-2xl text-zinc-200 leading-relaxed font-serif italic">
                    "{rev.text}"
                  </p>

                  <div className="flex items-center gap-4 pt-6 border-t border-white/5">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-emerald-900 flex items-center justify-center font-bold text-white shadow-lg">
                      {rev.avatar}
                    </div>
                    <div>
                      <h4 className="text-white font-bold tracking-tight">{rev.author}</h4>
                      <div className="flex items-center gap-1.5 text-[10px] text-zinc-500 font-bold uppercase tracking-widest">
                        <MapPin size={10} className="text-green-500" />
                        {rev.location}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Corner Accent */}
                <div className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity">
                   <div className="flex gap-0.5">
                     {[...Array(5)].map((_, i) => (
                       <Star key={i} size={10} className="fill-green-500 text-green-500" />
                     ))}
                   </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Brand Trust Bar */}
        <div className="mt-24 py-10 border-y border-white/5 flex flex-wrap justify-center md:justify-between items-center gap-8 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-1000">
             <span className="text-xl font-black tracking-tighter italic">TRIPADVISOR</span>
             <span className="text-xl font-black tracking-tighter italic">NAT GEO TRAVEL</span>
             <span className="text-xl font-black tracking-tighter italic">ASSAM TOURISM</span>
             <span className="text-xl font-black tracking-tighter italic">WILDLIFE INDIA</span>
        </div>
      </div>
    </section>
  )
}

export default Testimonials