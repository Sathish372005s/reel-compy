"use client";

import { motion } from "framer-motion";

const steps = [
  {
    num: "01",
    title: "On-Demand Shoot",
    description: "Book with one click. Our elite creators shoot high-end 4K content at your location with premium gear.",
    tag: "High-Fidelity",
    icon: "🎥",
  },
  {
    num: "02",
    title: "AI-Powered Magic Edit",
    description: "Our lightning-fast, high-end pipeline edits, color-grades, and adds premium sound & kinetic captions instantly.",
    tag: "Ultra-Fast",
    icon: "⚡",
  },
  {
    num: "03",
    title: "10-Minute Delivery",
    description: "Your finalized, viral-ready Reel is delivered straight to your inbox (like Instagram DMs) within 10 minutes.",
    tag: "Guaranteed",
    icon: "📬",
  },
];

export default function WorkFlowSection() {
  return (
    
    <section className="relative w-full max-w-7xl mx-auto px-6 py-24 z-10 selection:bg-red-500/30">
      
      {/* Dynamic Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-red-800/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="text-center mb-16">
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="border border-red-500/20 bg-red-500/10 px-4 py-1.5 text-[10px] sm:text-xs uppercase tracking-[4px] text-red-400 rounded-full font-semibold"
        >
          OUR MASTERPIECE ENGINE
        </motion.span>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-5xl font-black uppercase text-white mt-6 tracking-tight"
        >
          HOW WE DELIVER IN <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">10 MINUTES</span>
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-zinc-400 text-sm sm:text-base max-w-2xl mx-auto mt-4"
        >
          We've engineered a bespoke content pipeline from shoot to delivery, cutting out weeks of back-and-forth lag.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative">
        
        {/* Left Column: Viewfinder Dummy Image Showcase */}
        <div className="lg:col-span-5 relative rounded-3xl overflow-hidden border border-white/10 aspect-[3/4] bg-zinc-950 flex items-center justify-center shadow-2xl group w-full max-w-[340px] lg:max-w-none mx-auto z-10">
          
          <img 
            src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80" 
            alt="Flashoot Shoot Quality" 
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
          />

          {/* Camera Viewfinder Mockup Overlay */}
          <div className="absolute inset-5 border border-white/10 pointer-events-none flex flex-col justify-between p-3 z-10">
            {/* Viewfinder Corners */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-white/40" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-white/40" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-white/40" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-white/40" />

            {/* Top specs */}
            <div className="flex justify-between items-center text-[9px] font-mono text-white/50 tracking-wider">
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                REC
              </span>
              <span>4K 60FPS</span>
            </div>

            {/* Center target crosshair */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center">
              <div className="w-4 h-px bg-white/20" />
              <div className="h-4 w-px bg-white/20 absolute" />
              <div className="w-1.5 h-1.5 rounded-full border border-white/30" />
            </div>

            {/* Bottom specs */}
            <div className="flex justify-between text-[9px] font-mono text-white/50 tracking-wider">
              <span>ISO 800</span>
              <span>10:00 MIN</span>
            </div>
          </div>
        </div>

        {/* Right Column: Workflow Steps (stacked vertically) */}
        <div className="lg:col-span-7 flex flex-col gap-6 w-full z-10">
          {steps.map((step, idx) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, type: "spring", stiffness: 80 }}
              whileHover={{ x: 6, scale: 1.01 }}
              className="group relative border border-white/5 bg-zinc-950/40 backdrop-blur-xl p-6 rounded-3xl flex items-center gap-6 overflow-hidden shadow-xl transition-all duration-300"
            >
              {/* Glowing red top border highlight on hover */}
              <div className="absolute top-0 inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-red-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Soft inner red radial glow on hover */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_left,rgba(239,68,68,0.05)_0%,transparent_50%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="flex-shrink-0 text-3xl font-black bg-gradient-to-br from-red-500/40 to-orange-500/20 bg-clip-text text-transparent group-hover:from-red-500 group-hover:to-orange-500 transition-all duration-500">
                {step.num}
              </div>

              <div className="flex-grow">
                <div className="flex justify-between items-center">
                  <h3 className="text-base font-extrabold uppercase text-white group-hover:text-red-400 transition-colors duration-300">
                    {step.title}
                  </h3>
                  <span className="text-[8px] bg-red-950/60 border border-red-500/20 text-red-400 font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                    {step.tag}
                  </span>
                </div>
                <p className="text-zinc-400 text-xs sm:text-sm mt-2 leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="text-2xl hidden sm:block">{step.icon}</div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
