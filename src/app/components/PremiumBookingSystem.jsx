'use client'
import React, { useState, useEffect } from 'react'
import { X, Calendar, Users, ShieldCheck, ArrowRight, CheckCircle2, Phone, Mail } from 'lucide-react'

export default function PremiumBookingSystem() {
  const [isOpen, setIsOpen] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitted(true)
    setTimeout(() => {
      setIsSubmitted(false)
      setIsOpen(false)
    }, 3000)
  }

  return (
    <>
      {/* 1. TRIGGER BUTTON */}
      <button
        onClick={() => setIsOpen(true)}
        className="group relative flex items-center gap-3 bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-full font-bold text-sm transition-all duration-300 hover:scale-105 shadow-2xl shadow-green-900/40 overflow-hidden"
      >
        <span className="relative z-10 flex items-center gap-2">
          <Calendar size={20} />
          Book Your Safari Now
        </span>
        <ArrowRight size={20} className="relative z-10 group-hover:translate-x-2 transition-transform" />
        
        {/* Shimmer Effect */}
        <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-[shimmer_1.5s_infinite]" />
      </button>

      {/* 2. BOOKING MODAL OVERLAY */}
      {isOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 md:p-8">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-zinc-950/90 backdrop-blur-md transition-opacity duration-500"
            onClick={() => setIsOpen(false)}
          />

          {/* Form Container */}
          <div className="relative w-full max-w-5xl bg-zinc-900 rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl flex flex-col md:flex-row min-h-[600px] animate-in fade-in zoom-in duration-300">
            
            {/* Left Side: The "Vibe" */}
            <div className="relative w-full md:w-5/12 hidden md:block">
              <img 
                src="https://images.unsplash.com/photo-1470115636492-6d2b56f9146d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                className="absolute inset-0 w-full h-full object-cover brightness-50" 
                alt="Kaziranga Rhino" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent" />
              
              <div className="absolute bottom-12 left-10 right-10 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/20 border border-green-500/30 text-green-400 text-[10px] font-black  tracking-widest">
                   <ShieldCheck size={14} /> Official Partner
                </div>
                <h3 className="text-4xl font-black text-white   uppercase tracking-tighter leading-none">
                  Secure Your <br /> <span className="text-green-500">Untamed</span> <br /> Moment.
                </h3>
                <div className="space-y-3 pt-4">
                    <div className="flex items-center gap-3 text-zinc-400 text-sm">
                        <CheckCircle2 size={16} className="text-green-500" /> Priority Zone Access
                    </div>
                    <div className="flex items-center gap-3 text-zinc-400 text-sm">
                        <CheckCircle2 size={16} className="text-green-500" /> Expert Local Naturalists
                    </div>
                </div>
              </div>
            </div>

            {/* Right Side: The Form */}
            <div className="w-full md:w-7/12 p-8 md:p-14 bg-zinc-900 relative">
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute top-8 right-8 text-zinc-500 hover:text-white transition-colors p-2"
              >
                <X size={28} />
              </button>

              {!isSubmitted ? (
                <>
                  <div className="mb-10">
                    <h2 className="text-3xl font-black text-white tracking-tighter  ">Start Your Inquiry</h2>
                    <p className="text-zinc-500 text-sm mt-2">Enter your journey details below.</p>
                  </div>

                  <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">Full Name</label>
                        <input required type="text" placeholder="John Doe" className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-green-500 transition-all" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">Email Address</label>
                        <input required type="email" placeholder="john@example.com" className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-green-500 transition-all" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">Planned Date</label>
                        <div className="relative">
                          <Calendar className="absolute left-5 top-4 text-zinc-600" size={18} />
                          <input required type="date" className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-5 py-4 text-white focus:outline-none focus:border-green-500 transition-all" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">Total Explorers</label>
                        <div className="relative">
                          <Users className="absolute left-5 top-4 text-zinc-600" size={18} />
                          <select className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-5 py-4 text-white focus:outline-none focus:border-green-500 appearance-none cursor-pointer transition-all">
                            <option className="bg-zinc-900">Solo Traveler</option>
                            <option className="bg-zinc-900" selected>Couple / 2 People</option>
                            <option className="bg-zinc-900">Small Group (3-5)</option>
                            <option className="bg-zinc-900">Large Group (6+)</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">Safari Preferences</label>
                      <textarea placeholder="Tell us about your interests (e.g., Photography, Birding, Tiger tracking...)" rows="3" className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-green-500 transition-all resize-none"></textarea>
                    </div>

                    <button className="w-full py-5 bg-green-600 hover:bg-green-500 text-white rounded-2xl font-black uppercase tracking-widest transition-all shadow-xl shadow-green-900/20 active:scale-[0.98]">
                      Request Availability
                    </button>
                    
                    <p className="text-center text-[10px] text-zinc-600 uppercase tracking-widest">
                       Secure data encryption enabled
                    </p>
                  </form>
                </>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-6 animate-in zoom-in duration-500">
                  <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center border border-green-500/30">
                    <CheckCircle2 size={48} className="text-green-500" />
                  </div>
                  <h2 className="text-4xl font-black text-white   tracking-tighter uppercase">Inquiry Sent!</h2>
                  <p className="text-zinc-400 max-w-sm">Our Lead Naturalist will contact you within 2 hours to confirm slot availability.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Global Animation Styles */}
      <style jsx global>{`
        @keyframes shimmer {
          100% { left: 150%; }
        }
      `}</style>
    </>
  )
}