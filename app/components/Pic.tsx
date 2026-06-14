import React from 'react'
import { Sparkles, Quote } from 'lucide-react'

function Pic() {
  return (
    <div className="mx-auto max-w-7xl px-6 mb-12 lg:px-12">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 items-center">
        {/* Left Side - Founder Image */}
        <div className="flex justify-center md:justify-end">
          <div className="group relative w-full max-w-sm overflow-hidden rounded-3xl border border-yellow-500/20 bg-zinc-950/40 p-2 backdrop-blur-xl transition-all duration-500 hover:border-yellow-500/40 shadow-[0_0_50px_rgba(245,158,11,0.03)] hover:shadow-[0_0_50px_rgba(245,158,11,0.08)]">
            <div className="relative overflow-hidden rounded-2xl">
              <img
                src="ggggg.jpeg"
                alt="Founder"
                className="h-[450px] w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Gold gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />
            </div>

            <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-yellow-500/30 bg-black/80 px-5 py-4 backdrop-blur-md">
              <p className="text-base font-black text-yellow-400 tracking-wider uppercase">
                Ganesh Antooju
              </p>
              <p className="text-xs font-mono text-zinc-300 mt-1 uppercase tracking-widest">
                Founder, CEO & Managing Director
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Founder's Vision / Theme Block */}
        <div className="flex flex-col justify-center text-left max-w-md mx-auto md:mx-0">
          <div className="inline-flex items-center gap-2 border border-yellow-500/20 bg-yellow-500/5 px-4 py-1.5 text-[10px] uppercase tracking-[4px] text-yellow-400 rounded-full font-semibold mb-6 w-fit">
            <Sparkles className="h-3 w-3 text-yellow-400 animate-pulse" />
            THE VISIONARY
          </div>

          <h3 className="text-3xl font-black text-white uppercase tracking-tight leading-none mb-6">
            CRAFTING THE <span className="bg-gradient-to-r from-[#8a5a08] via-[#f6c65b] to-[#fff1b8] bg-clip-text text-transparent">FUTURE OF REELS</span>
          </h3>

          <div className="relative rounded-2xl border border-white/5 bg-zinc-950/20 p-6 backdrop-blur-md mb-6">
            <Quote className="absolute -top-4 -left-2 h-8 w-8 text-yellow-500/10 rotate-180" />
            <p className="text-zinc-400 text-sm italic leading-relaxed">
              "We don't just edit videos; we build visual engines that capture attention in split seconds and dominate the feed. Every transition, grade, and frame is engineered for maximum retention."
            </p>
          </div>

          <p className="text-zinc-500 text-xs leading-relaxed font-mono uppercase tracking-wider">
            Flareels Production Studio • Hyderabad
          </p>
        </div>
      </div>
    </div>
  )
}

export default Pic