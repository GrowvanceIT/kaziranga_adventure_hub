'use client'
import React from 'react'
import { Button } from '@/components/ui/button'
import { PhoneCall, CalendarCheck, Info, ArrowRight, ShieldCheck } from 'lucide-react'
import { makePhoneCall } from '@/lib/whatsappHelper'

function FinalCTA() {
  return (
    <section className="relative py-32 overflow-hidden bg-zinc-950">
      {/* Background Image with Parallax-like feel */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
          alt="Kaziranga Wilderness" 
          className="w-full h-full object-cover opacity-40 scale-105"
        />
        {/* Deep radial gradient to focus eyes on the center text */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(9,9,11,0.8)_70%,_rgba(9,9,11,1)_100%)]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-10">
          
          {/* Status Badge */}
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 backdrop-blur-md">
            
            <p className="text-orange-400 text-[10px] font-black uppercase tracking-[0.2em]">
              Limited safari slots available each day
            </p>
          </div>

          {/* Main Messaging */}
          <div className="space-y-6">
            <h2 className="text-6xl md:text-5xl font-black text-white tracking-tighter  leading-[0.85]">
              Your Wild <br /> 
              <span className="text-green-500">Journey</span> Starts <br /> 
              Here.
            </h2>
            <p className="text-zinc-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              Escape the noise. Reconnect with nature. Experience something real. The untamed heart of Assam is calling.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6">
            <Button 
              size="lg" 
              className="group bg-green-600 hover:bg-green-500 text-white px-12 py-8 text-xl rounded-full transition-all hover:scale-105 shadow-2xl shadow-green-900/40"
            >
              <CalendarCheck className="mr-2 h-6 w-6" />
              Book Your Safari Now
            </Button>
            
            <Button 
            onClick={()=> makePhoneCall("+916003196559")}
              size="lg" 
              variant="outline" 
              className="group border-white/20 bg-white/5 backdrop-blur-md text-white hover:bg-white/10 px-12 py-8 text-xl rounded-full transition-all"
            >
              <PhoneCall className="mr-2 h-5 w-5 text-green-500" />
              Talk to an Expert
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="pt-16 grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-white/5">
             <div className="flex items-center justify-center gap-3 text-zinc-500">
                <ShieldCheck size={20} className="text-green-900" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Secure Payments</span>
             </div>
             <div className="flex items-center justify-center gap-3 text-zinc-500">
                <Info size={20} className="text-green-900" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Free Consultation</span>
             </div>
             <div className="flex items-center justify-center gap-3 text-zinc-500">
                <ArrowRight size={20} className="text-green-900" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Instant Confirmation</span>
             </div>
          </div>
        </div>
      </div>

      {/* Subtle Bottom Glow */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-green-500/10 to-transparent pointer-events-none" />
    </section>
  )
}

export default FinalCTA