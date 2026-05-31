"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Calendar, CheckCircle } from "lucide-react";

interface GoogleFormSectionProps {
  showTitle?: boolean;
  className?: string;
}

export default function GoogleFormSection({
  showTitle = true,
  className = "",
}: GoogleFormSectionProps) {
  const [iframeLoading, setIframeLoading] = useState(true);

  return (
    <section className={`relative w-full max-w-5xl mx-auto px-4 py-12 sm:px-6 z-10 selection:bg-amber-400/30 ${className}`}>
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hidden h-[250px] w-[500px] rounded-full bg-amber-400/5 blur-[100px] pointer-events-none sm:block" />

      {showTitle && (
        <div className="text-center mb-10 sm:mb-14">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 border border-amber-300/25 bg-amber-300/10 px-4 py-1.5 text-[10px] sm:text-xs uppercase tracking-[4px] text-amber-200 rounded-full font-semibold"
          >
            <Sparkles className="h-3.5 w-3.5 text-amber-300" />
            BOOKING FORM
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-black uppercase text-white mt-5 sm:mt-6 tracking-tight"
          >
            SECURE YOUR <span className="bg-gradient-to-r from-[#8a5a08] via-[#f6c65b] to-[#fff1b8] bg-clip-text text-transparent">SHOOT DATE</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-zinc-400 text-sm sm:text-base max-w-2xl mx-auto mt-4"
          >
            Fill out our detailed request form below. We will align our production team, lock in the equipment, and build your rapid-turnaround schedule.
          </motion.p>
        </div>
      )}

      {/* Frame Container */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative w-full rounded-2xl sm:rounded-[32px] border border-amber-300/10 bg-black/60 backdrop-blur-xl shadow-[0_0_60px_rgba(245,158,11,0.05)] overflow-hidden"
      >
        {/* Glow Header */}
        <div className="flex items-center gap-2 sm:gap-3 px-4 py-3 sm:px-6 sm:py-4 bg-[#0a0805] border-b border-white/5">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500/60" />
            <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500/60" />
            <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500/60" />
          </div>
          <div className="flex-1 text-center text-[10px] sm:text-xs font-mono uppercase tracking-[2px] text-zinc-500">
            FLAREELS_SECURE_BOOKING_SHEET
          </div>
          <Calendar className="h-4 w-4 text-amber-300" />
        </div>

        {/* Loading Spinner Shimmer Overlay */}
        {iframeLoading && (
          <div className="absolute inset-x-0 bottom-0 top-[45px] sm:top-[53px] z-20 flex flex-col items-center justify-center bg-black/90 backdrop-blur-sm min-h-[600px]">
            <div className="relative flex items-center justify-center mb-6">
              <div className="h-16 w-16 animate-spin rounded-full border-2 border-amber-300/20 border-t-amber-300" />
              <Sparkles className="absolute h-6 w-6 text-amber-300 animate-pulse" />
            </div>
            <h3 className="text-sm sm:text-base font-extrabold uppercase tracking-widest text-white">
              INITIALIZING FLAREELS ENGINE
            </h3>
            <p className="text-xs text-zinc-500 font-mono tracking-wider mt-2 animate-pulse">
              CONNECTING TO GOOGLE SECURE FORMS...
            </p>
          </div>
        )}

        {/* Responsive Google Form Iframe Container */}
        <div className="relative w-full h-[650px] sm:h-[800px] md:h-[900px] overflow-hidden">
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLSdVBBOhcQ3ar4iWDhlbtpciXYB3pHuuvfSxT84Rh_L5FKWAAQ/viewform?embedded=true"
            className="w-full h-full border-0 absolute inset-0"
            title="FLA Reels Google Booking Form"
            onLoad={() => setIframeLoading(false)}
          >
            Loading…
          </iframe>
        </div>

        {/* Security Footer Info */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-4 sm:px-6 bg-[#0a0805] border-t border-white/5 text-[10px] sm:text-xs text-zinc-500 font-mono">
          <div className="flex items-center gap-1.5 text-green-400/80">
            <CheckCircle className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
            <span>256-BIT ENCRYPTED FORM CONNECTION</span>
          </div>
          <div>© FLA REELS CORE SYSTEM</div>
        </div>
      </motion.div>
    </section>
  );
}
