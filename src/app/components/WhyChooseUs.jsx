'use client';
import React from 'react'
import { ShieldCheck, UserCheck, CalendarDays, Hotel, HeadphonesIcon, Sparkles } from 'lucide-react'
import { makePhoneCall } from '@/lib/whatsappHelper';

function WhyChooseUs() {
  const features = [
    {
      icon: <ShieldCheck className="text-green-500" size={28} />,
      title: "Government Authorized",
      desc: "Official Safari Partner ensuring 100% legal and safe entry into all park zones."
    },
    {
      icon: <UserCheck className="text-green-500" size={28} />,
      title: "Local Expert Naturalists",
      desc: "Guided by locals who know the tiger's path and the rhino's favorite watering holes."
    },
    {
      icon: <CalendarDays className="text-green-500" size={28} />,
      title: "Priority Bookings",
      desc: "Skip the long queues and secure your preferred safari slots even during peak seasons."
    },
    {
      icon: <Hotel className="text-green-500" size={28} />,
      title: "Handpicked Premium Stays",
      desc: "From luxury eco-resorts to boutique forest lodges that blend into nature."
    },
    {
      icon: <HeadphonesIcon className="text-green-500" size={28} />,
      title: "24/7 Travel Assistance",
      desc: "A dedicated concierge team available around the clock for a worry-free journey."
    },
    {
      icon: <Sparkles className="text-green-500" size={28} />,
      title: "Tailored Experiences",
      desc: "Custom-designed itineraries that focus on photography, birding, or relaxation."
    }
  ];

  return (
    <section className="py-24 bg-zinc-900 text-white relative overflow-hidden">
      {/* Background Decorative Gradient */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-600/5 blur-[120px] rounded-full -mr-64 -mt-64" />
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header Section */}
        <div className="max-w-3xl mb-16">
          <h3 className="text-green-500 font-semibold tracking-widest uppercase text-sm mb-4 flex items-center gap-2">
            <span className="w-8 h-[2px] bg-green-500"></span>
            Trust & Value
          </h3>
          <h2 className="text-5xl font-bold mb-6 leading-tight text-white">
            Crafted Experiences. <br />
            <span className="text-zinc-500">Not Just Tours.</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl">
            We don’t just plan trips — we design moments that stay with you long after you leave. Explore Kaziranga with the experts who call it home.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="group p-8 rounded-3xl bg-zinc-950 border border-white/5 hover:border-green-500/30 transition-all duration-300 hover:shadow-2xl hover:shadow-green-900/10"
            >
              <div className="w-14 h-14 rounded-2xl bg-green-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h4 className="text-xl font-bold mb-3 group-hover:text-green-400 transition-colors">
                {feature.title}
              </h4>
              <p className="text-gray-500 leading-relaxed text-sm">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom Call to Action (Subtle) */}
        <div className="mt-16 p-8 rounded-3xl bg-gradient-to-r from-green-900/20 to-transparent border border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-xl font-medium">Ready to start your untamed adventure?</p>
          <button onClick={()=>makePhoneCall("+916003196559")} className="px-8 py-4 bg-green-600 hover:bg-green-500 text-white rounded-full font-bold transition-all shadow-lg shadow-green-900/20">
            Talk to an Expert
          </button>
        </div>
      </div>
    </section>
  )
}

export default WhyChooseUs