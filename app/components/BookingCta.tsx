"use client";

import { motion } from "framer-motion";
import { Calendar, ArrowUpRight, Sparkles } from "lucide-react";

interface BookingCtaProps {
  title?: string;
  description?: string;
  className?: string;
}

export default function BookingCta({
  title = "READY TO DOMINATE THE FEED?",
  description = "Lock in your production date now. Our elite creators shoot high-end 4K content at your location and deliver within minutes.",
  className = "",
}: BookingCtaProps) {
  const googleFormUrl = "https://docs.google.com/forms/d/e/1FAIpQLSdVBBOhcQ3ar4iWDhlbtpciXYB3pHuuvfSxT84Rh_L5FKWAAQ/viewform";

  return (
    <section className={`relative w-full max-w-5xl mx-auto px-4 py-16 sm:px-6 z-10 selection:bg-amber-400/30 ${className}`}>
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hidden h-[300px] w-[600px] rounded-full bg-amber-500/10 blur-[130px] pointer-events-none sm:block" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative rounded-3xl border border-amber-300/15 bg-zinc-950/40 backdrop-blur-xl p-8 sm:p-12 md:p-16 text-center shadow-[0_0_60px_rgba(245,158,11,0.06)] overflow-hidden"
      >
        {/* Soft decorative golden line */}
        <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400/40 to-transparent" />
        
        {/* Corner badges */}
        <div className="absolute top-4 right-4 text-amber-300/20 font-mono text-[9px] uppercase tracking-[3px] hidden sm:block">
          FLA_REELS_SYSTEM
        </div>

        <div className="flex justify-center mb-6">
          <span className="inline-flex items-center gap-2 border border-amber-300/25 bg-amber-300/10 px-4 py-1.5 text-[10px] uppercase tracking-[4px] text-amber-200 rounded-full font-semibold">
            <Sparkles className="h-3 w-3 text-amber-300 animate-pulse" />
            SECURE YOUR SHOOT
          </span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase text-white tracking-tight leading-none mb-6">
          {title.split(" ").slice(0, -1).join(" ")}{" "}
          <span className="bg-gradient-to-r from-[#8a5a08] via-[#f6c65b] to-[#fff1b8] bg-clip-text text-transparent">
            {title.split(" ").slice(-1)[0]}
          </span>
        </h2>

        <p className="text-zinc-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-10">
          {description}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={googleFormUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full sm:w-auto cursor-pointer"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-[#8a5a08] via-[#f6c65b] to-[#fff1b8] px-8 py-4 text-xs font-black uppercase tracking-widest text-black shadow-lg shadow-amber-500/25 hover:from-[#b77912] hover:via-[#ffd36e] hover:to-[#fff6cf] transition-all duration-300 cursor-pointer"
            >
              <Calendar className="h-4 w-4" />
              <span>Book Your Shoot Now</span>
              <ArrowUpRight className="h-4 w-4" />
            </motion.button>
          </a>
        </div>
      </motion.div>
    </section>
  );
}
