"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ReelCameraRig from "./ReelCameraRig";

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

function DslrCamera({ flashActive, typewriterRun }: { flashActive: boolean; typewriterRun: number }) {
  const [typedText, setTypedText] = useState("");

  useEffect(() => {
    if (typewriterRun === 0) {
      return;
    }

    let cancelled = false;
    const timers: number[] = [];
    const wait = (duration: number) =>
      new Promise<void>((resolve) => {
        const timer = window.setTimeout(resolve, duration);
        timers.push(timer);
      });

    const runTypewriter = async () => {
      await wait(260);

      const phrases = ["Capture your reel", "Edit", "Post it"];
      setTypedText("");

      for (const [phraseIndex, phrase] of phrases.entries()) {
        for (let index = 1; index <= phrase.length; index++) {
          if (cancelled) {
            return;
          }

          setTypedText(phrase.slice(0, index));
          await wait(58);
        }

        await wait(620);

        if (phraseIndex === phrases.length - 1) {
          return;
        }

        for (let index = phrase.length - 1; index >= 0; index--) {
          if (cancelled) {
            return;
          }

          setTypedText(phrase.slice(0, index));
          await wait(34);
        }

        await wait(160);
      }
    };

    void runTypewriter();

    return () => {
      cancelled = true;
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [typewriterRun]);

  return (
    <div className="relative h-[430px] w-full max-w-[330px] sm:h-[620px] sm:max-w-[390px]">
      <div className="absolute inset-x-8 bottom-12 h-14 rounded-full bg-black/60 blur-2xl sm:bottom-16" />

      <motion.div
        animate={flashActive ? { y: [0, -4, 0], scale: [1, 1.015, 1] } : {}}
        transition={{ duration: 0.42, ease: "easeOut" }}
        className="absolute left-1/2 top-[47%] h-full w-full -translate-x-1/2 -translate-y-1/2"
      >
        <ReelCameraRig />

        {/* Real-image flash target */}
        <div className="absolute left-[45%] top-[17%] h-8 w-16 -translate-x-1/2 rounded-full bg-yellow-100/30 blur-sm sm:h-10 sm:w-20" />
        <div className="absolute left-[45%] top-[17%] h-5 w-10 -translate-x-1/2 rounded-md bg-yellow-50/80 shadow-[0_0_20px_rgba(254,240,138,0.5)] sm:h-6 sm:w-12">
        </div>

        <AnimatePresence>
          {flashActive && (
            <>
              <motion.div
                initial={{ scale: 0.15, opacity: 0 }}
                animate={{ scale: [0.15, 2.2, 4.8], opacity: [0, 1, 0] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="absolute left-[45%] top-[17%] h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white blur-[2px] shadow-[0_0_90px_45px_rgba(255,255,255,1),0_0_180px_95px_rgba(252,211,77,0.55)] pointer-events-none z-30"
              />
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.42, 0] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.32, ease: "easeOut" }}
                className="fixed inset-0 bg-white pointer-events-none z-20"
              />
            </>
          )}
        </AnimatePresence>
      </motion.div>

      <div className="absolute bottom-0 left-1/2 flex h-14 w-full -translate-x-1/2 items-center justify-center text-center sm:bottom-2">
        <div className="min-w-[220px] rounded-full border border-amber-300/20 bg-black/40 px-4 py-2 backdrop-blur-sm sm:min-w-[250px] sm:px-5">
          <span className="bg-gradient-to-r from-[#8a5a08] via-[#f6c65b] to-white bg-clip-text font-mono text-lg font-black uppercase tracking-[2px] text-transparent drop-shadow-[0_0_18px_rgba(245,158,11,0.38)] sm:text-2xl">
          {typedText}
          </span>
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ repeat: Infinity, duration: 0.9, ease: "linear" }}
            className="ml-1 inline-block h-6 w-[3px] translate-y-1 rounded-full bg-amber-200 shadow-[0_0_12px_rgba(251,191,36,0.9)] sm:h-7"
          />
        </div>
      </div>
    </div>
  );
}

export default function WorkFlowSection() {
  const flashStartTimerRef = useRef<number | null>(null);
  const flashEndTimerRef = useRef<number | null>(null);
  const [flashActive, setFlashActive] = useState(false);
  const [typewriterRun, setTypewriterRun] = useState(0);

  useEffect(() => {
    return () => {
      if (flashStartTimerRef.current) {
        window.clearTimeout(flashStartTimerRef.current);
      }

      if (flashEndTimerRef.current) {
        window.clearTimeout(flashEndTimerRef.current);
      }
    };
  }, []);

  const triggerFlash = () => {
    if (flashStartTimerRef.current) {
      window.clearTimeout(flashStartTimerRef.current);
    }

    if (flashEndTimerRef.current) {
      window.clearTimeout(flashEndTimerRef.current);
    }

    setFlashActive(false);
    setTypewriterRun((run) => run + 1);

    flashStartTimerRef.current = window.setTimeout(() => {
      setFlashActive(true);
    }, 40);

    flashEndTimerRef.current = window.setTimeout(() => {
      setFlashActive(false);
    }, 460);
  };

  return (
    
    <section className="relative w-full max-w-7xl mx-auto px-4 pt-8 pb-14 sm:px-6 sm:py-20 lg:py-24 z-10 selection:bg-amber-400/30">
      
      {/* Dynamic Background Glow */}
      <div className="absolute top-1/2 left-1/2 hidden h-[300px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-500/10 blur-[120px] pointer-events-none sm:block" />

      <div className="text-center mb-10 sm:mb-14 lg:mb-16">
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="border border-amber-300/25 bg-amber-300/10 px-4 py-1.5 text-[10px] sm:text-xs uppercase tracking-[4px] text-amber-200 rounded-full font-semibold"
        >
          OUR MASTERPIECE ENGINE
        </motion.span>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-5xl font-black uppercase text-white mt-5 sm:mt-6 tracking-tight"
        >
          HOW WE DELIVER IN <span className="bg-gradient-to-r from-[#8a5a08] via-[#f6c65b] to-[#fff1b8] bg-clip-text text-transparent">10 MINUTES</span>
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-zinc-400 text-sm sm:text-base max-w-2xl mx-auto mt-4"
        >
          We&apos;ve engineered a bespoke content pipeline from shoot to delivery, cutting out weeks of back-and-forth lag.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative">
        {/* Workflow Steps (stacked vertically) */}
        <div className="lg:col-span-7 flex flex-col gap-4 sm:gap-6 w-full z-10">
          {steps.map((step, idx) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, type: "spring", stiffness: 80 }}
              whileHover={{ x: 6, scale: 1.01 }}
              className="group relative border border-white/5 bg-zinc-950/40 backdrop-blur-xl p-4 sm:p-6 rounded-2xl sm:rounded-3xl flex items-start sm:items-center gap-4 sm:gap-6 overflow-hidden shadow-xl transition-all duration-300"
            >
              {/* Glowing gold top border highlight on hover */}
              <div className="absolute top-0 inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-amber-300/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Soft inner gold radial glow on hover */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_left,rgba(251,191,36,0.06)_0%,transparent_50%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="flex-shrink-0 text-3xl font-black bg-gradient-to-br from-amber-200/80 to-yellow-600/30 bg-clip-text text-transparent group-hover:from-amber-200 group-hover:to-yellow-500 transition-all duration-500">
                {step.num}
              </div>

              <div className="flex-grow">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm sm:text-base font-extrabold uppercase text-white group-hover:text-amber-200 transition-colors duration-300">
                    {step.title}
                  </h3>
                  <span className="text-[8px] bg-yellow-950/60 border border-amber-300/20 text-amber-200 font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
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

        {/* Right Column: DSLR Camera */}
        <motion.div
          initial={{ opacity: 0, x: 80, rotate: 4 }}
          whileInView={{ opacity: 1, x: 0, rotate: 0 }}
          viewport={{ once: false, amount: 0.35 }}
          onViewportEnter={triggerFlash}
          onClick={triggerFlash}
          transition={{ type: "spring", stiffness: 70, damping: 18 }}
          className="lg:col-span-5 flex justify-center lg:justify-end z-20 cursor-pointer select-none"
        >
          <DslrCamera flashActive={flashActive} typewriterRun={typewriterRun} />
        </motion.div>
      </div>
    </section>
  );
}
