import React from 'react'
import Image from 'next/image'
import { CheckCircle2, Waves, Trees, Tent } from 'lucide-react'

function AboutSection() {
  const highlights = [
    {
      icon: <Waves className="text-green-500" size={24} />,
      title: "Brahmaputra Floodplains",
      desc: "A unique landscape shaped by the mighty river, creating fertile wetlands."
    },
    {
      icon: <CheckCircle2 className="text-green-500" size={24} />,
      title: "70% Rhino Population",
      desc: "Proud home to the world's largest population of Great One-Horned Rhinos."
    },
    {
      icon: <Trees className="text-green-500" size={24} />,
      title: "Diverse Ecosystem",
      desc: "From golden grasslands to tropical moist mixed deciduous forests."
    }
  ];

  return (
    <section className="py-24 bg-zinc-950 text-white overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Visual Side: Stacked Images */}
          <div className="relative group">
            <div className="relative z-10 w-4/5 aspect-[4/5] rounded-3xl overflow-hidden border border-white/10 shadow-2xl transition-transform duration-700 group-hover:-translate-y-2">
              <Image 
                src="https://images.unsplash.com/photo-1626516008114-7dd309103a35?q=80&w=1035&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                alt="Kaziranga Marshlands" 
                fill 
                className="object-cover"
              />
            </div>
            
            {/* Overlapping secondary image */}
            <div className="absolute -bottom-10 -right-4 z-20 w-3/5 aspect-square rounded-3xl overflow-hidden border-4 border-zinc-950 shadow-2xl transition-transform duration-700 group-hover:translate-x-2">
              <Image 
                src="https://images.pexels.com/photos/14644463/pexels-photo-14644463.jpeg" 
                alt="One Horned Rhino" 
                fill 
                className="object-cover"
              />
            </div>

            {/* Decorative Element */}
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-green-600/10 blur-[100px] -z-10" />
          </div>

          {/* Content Side */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-green-500 font-semibold tracking-widest uppercase text-sm">
                About Kaziranga
              </h3>
              <h2 className="text-5xl font-bold leading-tight text-white">
                Into the Heart <br /> 
                <span className="text-zinc-400">of Assam</span>
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed">
                Nestled in the floodplains of the Brahmaputra River, Kaziranga is not just a national park — it’s a living, breathing ecosystem where wildlife thrives freely.
              </p>
              <p className="italic text-gray-300 border-l-2 border-green-600 pl-4 py-1">
                "Every corner tells a story that you don’t just see… you feel."
              </p>
            </div>

            {/* Feature List */}
            <div className="grid gap-6 pt-4">
              {highlights.map((item, idx) => (
                <div key={idx} className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors">
                  <div className="flex-shrink-0 mt-1">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1">{item.title}</h4>
                    <p className="text-gray-400 text-sm leading-snug">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default AboutSection