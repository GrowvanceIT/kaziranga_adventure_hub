'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Check, Leaf, Crown, Star, ArrowRight } from 'lucide-react'

function PremiumPackages() {
  const backgrounds = {
    default: "https://images.unsplash.com/photo-1709008502171-091ceb32b28b?q=80&w=2113&auto=format&fit=crop",
    classic: "https://images.unsplash.com/photo-1763879182247-f1ef19317519?q=80&w=2070&auto=format&fit=crop",
    premium: "https://images.unsplash.com/photo-1546656692-5164d24b04df?q=80&w=2148&auto=format&fit=crop",
    royal: "https://images.unsplash.com/photo-1759213997390-da57e76726f9?q=80&w=1733&auto=format&fit=crop",
  };

  const [activeId, setActiveId] = useState(null);

  const packages = [
    {
      id: 'classic',
      name: "Classic Safari",
      duration: "2 Days / 1 Night",
      icon: <Leaf className="text-green-500" />,
      price: "₹8,500",
      features: ["1 Jeep Safari", "Comfortable Stay", "Breakfast Included", "General Guide"],
      img: backgrounds.classic
    },
    {
      id: 'premium',
      name: "Premium Escape",
      duration: "3 Days / 2 Nights",
      icon: <Star className="text-amber-400" />,
      price: "₹18,000",
      features: ["2 Jeep Safaris + 1 Elephant Safari", "Luxury Forest Stay", "All Meals Included", "Private Naturalist"],
      popular: true,
      img: backgrounds.premium
    },
    {
      id: 'royal',
      name: "Royal Wilderness",
      duration: "4 Days / 3 Nights",
      icon: <Crown className="text-yellow-500" />,
      price: "₹32,000",
      features: ["All Safari Access", "Premium Resort Stay", "Cultural Experiences", "Private Transfers"],
      img: backgrounds.royal
    }
  ];

  return (
    <section className="py-24 relative bg-zinc-950 overflow-hidden min-h-screen flex items-center">
      
      {/* Dynamic Global Background - Softened */}
      <div className="absolute inset-0 z-0 transition-all duration-1000">
        <img 
          src={activeId ? backgrounds[activeId] : backgrounds.default} 
          className="w-full h-full object-cover opacity-20 scale-105 blur-sm transition-all duration-1000"
          alt="bg"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-transparent to-zinc-950" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-5xl font-black text-white mb-4 tracking-tighter ">
            Premium <span className="text-gray-500">Packages</span>
          </h2>
          <p className="text-zinc-400 text-lg tracking-widest uppercase">
            Exclusivity meets the wild
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {packages.map((pkg) => (
            <div 
              key={pkg.id} 
              onMouseEnter={() => setActiveId(pkg.id)}
              onMouseLeave={() => setActiveId(null)}
              className={`group relative min-h-[600px] rounded-[3rem] overflow-hidden border transition-all duration-500 flex flex-col p-8 md:p-10
                ${pkg.popular ? 'border-green-500/50 scale-105 z-20 shadow-[0_0_50px_-12px_rgba(34,197,94,0.3)]' : 'border-white/10 z-10'}
                hover:border-white/40`}
            >
              
              {/* --- THE IMAGE OVERLAY LAYER --- */}
              <div className="absolute inset-0 -z-10 overflow-hidden">
                <img 
                  src={pkg.img} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 brightness-[0.2] group-hover:brightness-[0.4]" 
                  alt={pkg.name}
                />
                {/* Gradient to keep text readable */}
                <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/80 via-zinc-950/40 to-zinc-950" />
              </div>

              {/* Tag for Popular */}
              {pkg.popular && (
                <div className="absolute top-6 right-10 bg-green-500 text-black text-[10px] font-black uppercase px-4 py-1 rounded-full animate-pulse">
                  Recommended
                </div>
              )}

              {/* Header */}
              <div className="mb-8 relative">
                <div className="w-16 h-16 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center mb-6 group-hover:bg-green-500/20 transition-colors">
                  {pkg.icon}
                </div>
                <h3 className="text-4xl font-bold text-white mb-1">{pkg.name}</h3>
                <p className="text-green-400 font-medium tracking-wide flex items-center gap-2">
                   <span className="w-4 h-[1px] bg-green-500" /> {pkg.duration}
                </p>
              </div>

              {/* Features */}
              <div className="space-y-4 mb-10 flex-grow">
                {pkg.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3 group/item">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-green-500 group-hover/item:scale-150 transition-transform" />
                    <span className="text-zinc-300 group-hover:text-white transition-colors text-sm md:text-base">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Pricing & CTA */}
              <div className="pt-8 border-t border-white/10">
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-black text-white">{pkg.price}</span>
                  <span className="text-zinc-500 text-sm italic">/ person</span>
                </div>
                
                <Button 
                  className={`w-full py-8 rounded-2xl text-lg font-bold transition-all relative overflow-hidden group/btn
                    ${pkg.popular 
                      ? 'bg-green-600 hover:bg-green-500 text-white' 
                      : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'
                    }`}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Reserve Experience <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                  </span>
                  {/* Shimmer Effect */}
                  <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-shimmer" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Tailored Note */}
        <div className="mt-16 flex justify-center">
          <div className="group cursor-pointer flex items-center gap-4 bg-white/5 border border-white/10 px-8 py-4 rounded-full backdrop-blur-md hover:bg-white/10 transition-all">
            <div className="p-2 bg-green-500/20 rounded-full text-green-500">
               <Leaf size={20} />
            </div>
            <p className="text-zinc-300 text-sm md:text-base">
              Seeking a bespoke journey? <span className="text-white font-bold underline underline-offset-4">Talk to our Naturalists</span>
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          100% {
            left: 150%;
          }
        }
        .animate-shimmer {
          animation: shimmer 1.5s infinite;
        }
      `}</style>
    </section>
  )
}

export default PremiumPackages