"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import type { MotionStyle, MotionValue } from "framer-motion";

interface PhoneMockupProps {
  className?: string;
  style?: MotionStyle;
  screen: "home" | "splash" | "instagram";
  setScreen?: (screen: "home" | "splash" | "instagram") => void;
  rotateY?: number | string | MotionValue<number> | MotionValue<string>;
  flashActive?: boolean;
}

export default function PhoneMockup({ className, style, screen, setScreen, rotateY = 0, flashActive = false }: PhoneMockupProps) {
  return (
    <motion.div
      style={{
        ...style,
        rotateY: rotateY,
        transformStyle: "preserve-3d",
      }}
      className={`relative w-[235px] h-[470px] sm:w-[265px] sm:h-[530px] md:w-[325px] md:h-[660px] flex justify-center ${className || ""}`}
    >
      {/* FRONT SIDE */}
      <div 
        className="absolute inset-0 w-full h-full flex justify-center z-10"
        style={{ 
          backfaceVisibility: "hidden", 
          WebkitBackfaceVisibility: "hidden",
          transform: "rotateY(0deg)",
        }}
      >
        {/* Dynamic Red Ambient Glow behind the phone */}
        <div className="absolute top-12 h-[360px] w-[190px] rounded-full bg-red-600/10 blur-[48px] sm:h-[420px] sm:w-[220px] md:h-[540px] md:w-[280px] md:blur-[60px]" />

        {/* Real iPhone Outer Frame */}
        <div className="relative h-[91%] w-full rounded-[46px] border-4 border-zinc-800 bg-zinc-950 p-[6px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_40px_rgba(220,38,38,0.2)] ring-2 ring-white/10">
          
          {/* Left Side Buttons (Volume & Ring Switch) */}
          <div className="absolute -left-1.5 top-20 h-8 w-1.5 rounded-l bg-zinc-800 border-l border-white/10" />
          <div className="absolute -left-1.5 top-32 h-11 w-1.5 rounded-l bg-zinc-800 border-l border-white/10" />
          <div className="absolute -left-1.5 top-48 h-11 w-1.5 rounded-l bg-zinc-800 border-l border-white/10" />

          {/* Right Side Button (Power) */}
          <div className="absolute -right-1.5 top-36 h-16 w-1.5 rounded-r bg-zinc-800 border-r border-white/10" />

          {/* Top Ear Speaker Port */}
          <div className="absolute left-1/2 top-1.5 h-1.5 w-16 -translate-x-1/2 rounded-full bg-zinc-900 z-50" />

          {/* Dynamic Island */}
          <div className="absolute left-1/2 top-3.5 h-7 w-28 -translate-x-1/2 rounded-full bg-black border border-white/5 z-50 flex items-center justify-between px-3 shadow-inner">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                <div className="w-1 h-1 rounded-full bg-blue-900/60" />
              </div>
            </div>
            <div className="w-1.5 h-1.5 rounded-full bg-zinc-950" />
          </div>

          {/* Screen Container */}
          <div className="relative h-full w-full overflow-hidden rounded-[40px] bg-black select-none">
            
            {/* iOS Status Bar */}
            <div className="absolute top-0 left-0 right-0 h-10 z-40 flex items-center justify-between px-6 text-[10px] font-semibold text-white/90">
              <div>9:41</div>
              <div className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M2 17h2v4H2v-4zm4-4h2v8H6v-8zm4-4h2v12h-2V9zm4-4h2v16h-2V5zm4-4h2v20h-2V1z" />
                </svg>
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21a2 2 0 100-4 2 2 0 000 4zm7.07-7.07a10 10 0 00-14.14 0l1.41 1.41a8 8 0 0111.32 0l1.41-1.41zM21.31 8.5a14 14 0 00-18.62 0l1.41 1.41a12 12 0 0115.8 0l1.41-1.41z" />
                </svg>
                <div className="w-5 h-2.5 rounded border border-white/60 flex items-center p-0.5">
                  <div className="w-full h-full bg-white rounded-sm" />
                </div>
              </div>
            </div>

            <AnimatePresence mode="wait">
              
              {/* SCREEN 1: iOS HOME SCREEN */}
              {screen === "home" && (
                <motion.div
                  key="home"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 bg-gradient-to-br from-[#0a0f1d] via-[#1b0821] to-[#040813] p-4 pt-12 flex flex-col justify-between"
                >
                  <div className="mt-4 flex flex-col items-center">
                    <span className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold">Friday, May 29</span>
                    <span className="text-4xl font-extralight text-white/95 mt-1 tracking-tight">9:41</span>
                  </div>

                  <div className="grid grid-cols-4 gap-4 px-2 mb-16">
                    <div className="flex flex-col items-center gap-1">
                      <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-400 to-sky-600 flex items-center justify-center shadow-md">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <circle cx="12" cy="12" r="10" />
                          <path d="M16.24 7.76l-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z" />
                        </svg>
                      </div>
                      <span className="text-[9px] text-zinc-300 font-medium">Safari</span>
                    </div>

                    <div className="flex flex-col items-center gap-1">
                      <div className="w-11 h-11 rounded-xl bg-emerald-500 flex items-center justify-center shadow-md">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z" />
                        </svg>
                      </div>
                      <span className="text-[9px] text-zinc-300 font-medium">Messages</span>
                    </div>

                    <div className="flex flex-col items-center gap-1">
                      <div className="w-11 h-11 rounded-xl bg-white flex items-center justify-center shadow-md overflow-hidden relative p-1.5">
                        <div className="w-full h-full bg-gradient-to-tr from-yellow-400 via-red-500 to-indigo-600 rounded-full opacity-80" />
                      </div>
                      <span className="text-[9px] text-zinc-300 font-medium">Photos</span>
                    </div>

                    <motion.div 
                      onClick={() => setScreen?.("splash")}
                      whileTap={{ scale: 0.9 }}
                      className="flex flex-col items-center gap-1 cursor-pointer"
                    >
                      <div className="relative w-11 h-11 rounded-xl bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] flex items-center justify-center shadow-[0_0_15px_rgba(238,42,123,0.35)]">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                        </svg>
                        <motion.div 
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.5, type: "spring" }}
                          className="absolute -top-1 -right-1 bg-red-600 border border-white text-white text-[8px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center shadow-sm"
                        >
                          1
                        </motion.div>
                      </div>
                      <span className="text-[9px] text-zinc-300 font-semibold tracking-wide">Instagram</span>
                    </motion.div>
                  </div>

                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-2.5 mb-2.5 flex justify-around border border-white/5 mx-1">
                    <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center">📞</div>
                    <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center">💬</div>
                    <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center">🎵</div>
                    <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center">⚙️</div>
                  </div>
                </motion.div>
              )}

              {/* SCREEN 2: INSTAGRAM APP SPLASH SCREEN */}
              {screen === "splash" && (
                <motion.div
                  key="splash"
                  initial={{ opacity: 0, scale: 1.15 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="absolute inset-0 bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] flex flex-col items-center justify-center"
                >
                  <motion.div 
                    initial={{ scale: 0.8 }}
                    animate={{ scale: [0.8, 1.1, 1] }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="text-white"
                  >
                    <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                    </svg>
                  </motion.div>
                  
                  <div className="absolute bottom-10 flex flex-col items-center gap-1 opacity-70">
                    <span className="text-[8px] text-white/60 tracking-[2px] uppercase">from</span>
                    <span className="text-xs font-bold text-white tracking-widest uppercase">META</span>
                  </div>
                </motion.div>
              )}

              {/* SCREEN 3: HIGH-FIDELITY CHAT INTERFACE */}
              {screen === "instagram" && (
                <motion.div
                  key="instagram"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="absolute inset-0 bg-black text-white p-3 pt-12 flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between border-b border-zinc-900 pb-2.5">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-zinc-400 hover:text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                      </svg>
                      
                      <div className="relative">
                        <div className="w-7.5 h-7.5 rounded-full bg-gradient-to-r from-red-500 to-orange-500 flex items-center justify-center text-[10px] font-black text-white">
                          FL
                        </div>
                        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-black rounded-full" />
                      </div>

                      <div className="flex flex-col">
                        <span className="text-[10px] font-bold flex items-center gap-0.5">
                          Flashoot 
                          <span className="text-blue-500">✓</span>
                        </span>
                        <span className="text-[7px] text-zinc-500">Active now</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-zinc-400 pr-1">
                      <span className="text-xs cursor-pointer hover:text-white">📞</span>
                      <span className="text-xs cursor-pointer hover:text-white">📹</span>
                    </div>
                  </div>

                  <div className="flex-grow overflow-y-auto py-4 space-y-4 pr-0.5 flex flex-col justify-end">
                    <div className="flex items-end gap-1.5 w-[90%]">
                      <div className="w-5 h-5 rounded-full bg-gradient-to-r from-red-600 to-red-500 flex items-center justify-center text-[7px] font-black flex-shrink-0">
                        FL
                      </div>
                      <div className="bg-zinc-900 border border-white/5 text-[9px] px-3 py-2 rounded-[18px] rounded-bl-none text-zinc-100 leading-tight">
                        Hey Shrey! Your customized Reel is ready to post! 🎬🚀
                      </div>
                    </div>

                    <motion.div 
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
                      className="flex items-end gap-1.5 w-[94%]"
                    >
                      <div className="w-5 h-5 rounded-full bg-gradient-to-r from-red-600 to-red-500 flex items-center justify-center text-[7px] font-black flex-shrink-0 opacity-0" />
                      
                      <div className="bg-gradient-to-br from-zinc-950 to-zinc-900 border border-red-500/20 rounded-2xl p-2.5 flex flex-col gap-2.5 shadow-[0_4px_15px_rgba(239,68,68,0.1)] w-full">
                        <div className="relative h-24 rounded-lg bg-zinc-800 overflow-hidden flex items-center justify-center">
                          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.25)_0%,transparent_75%)] z-0" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 z-10" />
                          
                          <motion.div 
                            animate={{ scale: [1, 1.08, 1] }}
                            transition={{ repeat: Infinity, duration: 1.8 }}
                            className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center shadow-[0_0_15px_rgba(220,38,38,0.5)] z-20 cursor-pointer"
                          >
                            <svg className="w-3.5 h-3.5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </motion.div>

                          <div className="absolute bottom-1.5 left-2 z-20 text-[7px] text-zinc-300 font-bold bg-black/60 backdrop-blur-md px-1.5 py-0.5 rounded">
                            0:30 MINS
                          </div>
                          <div className="absolute bottom-1.5 right-2 z-20 text-[7px] text-emerald-400 font-bold bg-emerald-950/60 backdrop-blur-md px-1.5 py-0.5 rounded border border-emerald-500/20 flex items-center gap-0.5">
                            <span className="w-1 h-1 rounded-full bg-emerald-400 animate-ping" />
                            READY
                          </div>
                        </div>

                        <div className="flex flex-col">
                          <span className="text-[9px] font-black uppercase text-zinc-200 tracking-wide">
                            Reel ready in 10 mins!
                          </span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            <span className="text-[7px] bg-zinc-800 text-zinc-400 px-1 py-0.2 rounded font-medium">1080p | 60fps</span>
                            <span className="text-[7px] bg-zinc-800 text-zinc-400 px-1 py-0.2 rounded font-medium">Delivered</span>
                          </div>
                        </div>

                        <motion.button 
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full bg-gradient-to-r from-red-600 to-red-500 py-1.5 rounded-lg text-[9px] font-extrabold uppercase tracking-widest text-white shadow-[0_2px_10px_rgba(220,38,38,0.3)] flex items-center justify-center gap-1 cursor-pointer transition hover:from-red-500 hover:to-red-400 pointer-events-auto"
                        >
                          🚀 Post to Reels
                        </motion.button>
                      </div>
                    </motion.div>

                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.8 }}
                      className="flex items-end gap-1.5 w-[90%]"
                    >
                      <div className="w-5 h-5 rounded-full bg-gradient-to-r from-red-600 to-red-500 flex items-center justify-center text-[7px] font-black flex-shrink-0">
                        FL
                      </div>
                      <div className="bg-zinc-900 border border-white/5 text-[9px] px-3 py-2 rounded-[18px] rounded-bl-none text-zinc-100 leading-tight">
                        Delivered in exactly 10 minutes, as promised. 😉
                      </div>
                    </motion.div>
                  </div>

                  <div className="flex items-center gap-2 border-t border-zinc-950 pt-2 text-zinc-500">
                    <div className="bg-zinc-900 flex-grow rounded-full px-3 py-1.5 flex items-center justify-between border border-white/5">
                      <span className="text-[8px] text-zinc-500">Message...</span>
                      <span className="text-[10px] cursor-pointer">🎙️</span>
                    </div>
                    <span className="text-[10px] cursor-pointer text-zinc-400">🖼️</span>
                    <span className="text-[10px] cursor-pointer text-zinc-400">❤️</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* iOS Bottom Navigation Bar Handle */}
            <div className="absolute bottom-1 left-1/2 h-1 w-28 -translate-x-1/2 rounded-full bg-white/30 z-50 pointer-events-none" />

          </div>
        </div>
      </div>

      {/* BACK SIDE */}
      <div
        className="absolute inset-0 w-full h-full overflow-hidden bg-[#070808] border-4 border-[#26394a] rounded-[46px] p-6 shadow-[inset_0_1px_12px_rgba(255,255,255,0.05),0_25px_60px_-15px_rgba(0,0,0,0.9)] ring-2 ring-white/10 flex flex-col items-center justify-between"
        style={{ 
          backfaceVisibility: "hidden", 
          WebkitBackfaceVisibility: "hidden",
          transform: "rotateY(180deg)",
        }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_58%_12%,rgba(255,255,255,0.07),transparent_30%),linear-gradient(145deg,rgba(255,255,255,0.03),transparent_42%,rgba(0,0,0,0.35))]" />

        {/* Left Side Buttons (Ring & Volume) */}
        <div className="absolute -left-1.5 top-24 h-10 w-1.5 rounded-l bg-[#172635] border-l border-white/15 shadow-[inset_1px_0_1px_rgba(255,255,255,0.2)]" />
        <div className="absolute -left-1.5 top-40 h-14 w-1.5 rounded-l bg-[#172635] border-l border-white/15 shadow-[inset_1px_0_1px_rgba(255,255,255,0.2)]" />
        <div className="absolute -left-1.5 top-56 h-14 w-1.5 rounded-l bg-[#172635] border-l border-white/15 shadow-[inset_1px_0_1px_rgba(255,255,255,0.2)]" />

        {/* Right Side Button (Power) */}
        <div className="absolute -right-1.5 top-40 h-20 w-1.5 rounded-r bg-[#172635] border-r border-white/15 shadow-[inset_-1px_0_1px_rgba(255,255,255,0.2)]" />
        {/* Back Camera Module (Top Left) */}
        <div className="absolute top-6 left-6 h-28 w-28 rounded-[30px] border border-[#203347]/70 bg-[#8fa2ad] shadow-[inset_0_1px_1px_rgba(255,255,255,0.55),0_10px_24px_rgba(22,33,45,0.32)] md:h-32 md:w-32 md:rounded-[34px]">
          <div className="absolute inset-1 rounded-[26px] border border-white/35 bg-[linear-gradient(145deg,rgba(255,255,255,0.28),rgba(26,45,62,0.2))] md:rounded-[30px]" />

          <div className="absolute left-4 top-3.5 h-11 w-11 rounded-full border-[3px] border-[#172b3d] bg-[#cad5d9] shadow-[inset_0_1px_2px_rgba(255,255,255,0.8),0_3px_7px_rgba(15,27,38,0.45)] md:left-5 md:top-4 md:h-12 md:w-12">
            <div className="absolute inset-1 rounded-full border border-white/45 bg-black flex items-center justify-center overflow-hidden">
              <div className="h-5 w-5 rounded-full bg-[radial-gradient(circle_at_35%_30%,#3d78d9_0%,#07101d_45%,#010205_100%)] border border-blue-400/30" />
              <div className="absolute left-2 top-1.5 h-2 w-2 rounded-full bg-white/40 blur-[1px]" />
            </div>
          </div>

          <div className="absolute right-3.5 top-10 h-11 w-11 rounded-full border-[3px] border-[#172b3d] bg-[#cad5d9] shadow-[inset_0_1px_2px_rgba(255,255,255,0.8),0_3px_7px_rgba(15,27,38,0.45)] md:right-4 md:top-11 md:h-12 md:w-12">
            <div className="absolute inset-1 rounded-full border border-white/45 bg-black flex items-center justify-center overflow-hidden">
              <div className="h-5 w-5 rounded-full bg-[radial-gradient(circle_at_65%_35%,#3873d8_0%,#07101d_45%,#010205_100%)] border border-blue-400/30" />
              <div className="absolute right-2 top-1.5 h-2 w-2 rounded-full bg-white/35 blur-[1px]" />
            </div>
          </div>

          <div className="absolute bottom-3.5 left-4 h-11 w-11 rounded-full border-[3px] border-[#172b3d] bg-[#cad5d9] shadow-[inset_0_1px_2px_rgba(255,255,255,0.8),0_3px_7px_rgba(15,27,38,0.45)] md:bottom-4 md:left-5 md:h-12 md:w-12">
            <div className="absolute inset-1 rounded-full border border-white/45 bg-black flex items-center justify-center overflow-hidden">
              <div className="h-5 w-5 rounded-full bg-[radial-gradient(circle_at_40%_40%,#306acb_0%,#07101d_45%,#010205_100%)] border border-blue-400/30" />
              <div className="absolute left-2 top-1.5 h-2 w-2 rounded-full bg-white/35 blur-[1px]" />
            </div>
          </div>

          {/* Camera Flash LED */}
          <div className="absolute right-5 top-3 h-6 w-6 rounded-full border border-white/50 bg-[#d7e0e2] flex items-center justify-center shadow-[inset_0_1px_2px_rgba(255,255,255,0.9)] md:right-6 md:top-4 md:h-7 md:w-7">
            <div className="relative h-4 w-4 rounded-full bg-yellow-100 flex items-center justify-center shadow-[0_0_12px_rgba(254,240,138,0.55)]">
              <div className="h-1.5 w-1.5 rounded-full bg-amber-300" />
              <AnimatePresence>
                {flashActive && (
                  <motion.div
                    initial={{ scale: 1, opacity: 1 }}
                    animate={{ scale: [1, 24, 48], opacity: [1, 0.9, 0] }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="absolute rounded-full bg-white shadow-[0_0_120px_60px_rgba(255,255,255,1)] z-50 pointer-events-none"
                    style={{ width: "8px", height: "8px" }}
                  />
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* LiDAR / Light Sensor */}
          <div className="absolute bottom-5 right-5 h-6 w-6 rounded-full border border-[#26394a]/70 bg-[#314455] flex items-center justify-center shadow-[inset_0_1px_2px_rgba(0,0,0,0.55)] md:bottom-6 md:right-6 md:h-7 md:w-7">
            <div className="h-3 w-3 rounded-full bg-[#172433] border border-black/40" />
          </div>
        </div>

        <AnimatePresence>
          {flashActive && (
            <motion.div
              initial={{ scale: 0.2, opacity: 0 }}
              animate={{ scale: [0.15, 2.5, 5.2], opacity: [0, 1, 0] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.48, ease: "easeOut" }}
              className="absolute left-[105px] top-[52px] h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white blur-[2px] shadow-[0_0_90px_45px_rgba(255,255,255,1),0_0_180px_95px_rgba(252,211,77,0.52)] pointer-events-none z-50 md:left-[118px] md:top-[58px]"
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {flashActive && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.5, 0] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.32, ease: "easeOut" }}
              className="absolute inset-0 bg-white pointer-events-none z-40"
            />
          )}
        </AnimatePresence>

        {/* Apple/Branding Area (Center) */}
        <div className="relative flex-grow flex flex-col items-center justify-center mt-12 gap-2 text-center">
          <motion.div
            animate={flashActive ? { scale: [1, 1.1, 1] } : {}}
            transition={{ duration: 0.35 }}
            className="text-4xl text-white/55 drop-shadow-[0_1px_2px_rgba(0,0,0,0.25)]"
          >
            <Image src="/iph.png" alt="iPhone logo" width={40} height={40} className="opacity-45" />
          </motion.div>
          <div className="bg-gradient-to-r from-red-400 via-orange-300 to-white bg-clip-text text-sm font-black uppercase tracking-[3px] text-transparent drop-shadow-[0_0_16px_rgba(248,113,113,0.35)]">
            Capture Your Moment
          </div>
          <div className="text-[10px] font-black tracking-[4px] text-zinc-500 uppercase">
            FLASHOOT
          </div>
        </div>

        {/* Premium Matte Bottom Details */}
        <div className="relative text-[7px] text-[#526875] tracking-widest uppercase font-bold mt-auto mb-2 text-center">
          QUICK CONTENT ENGINE • 4K
        </div>
      </div>
    </motion.div>
  );
}
