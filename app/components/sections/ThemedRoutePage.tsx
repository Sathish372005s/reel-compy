"use client";

import { motion } from "framer-motion";

interface ThemedRoutePageProps {
  eyebrow: string;
  title: string;
  accent: string;
  description: string;
}

export default function ThemedRoutePage({
  eyebrow,
  title,
  accent,
  description,
}: ThemedRoutePageProps) {
  return (
    <main className="relative bg-black min-h-fit px-4 pb-0 pt-28 text-white selection:bg-amber-400/30 sm:px-6 sm:pb-0 sm:pt-36">
      <div className="absolute left-1/2 top-28 hidden h-72 w-[640px] -translate-x-1/2 rounded-full bg-amber-500/10 blur-[120px] pointer-events-none sm:block sm:top-36" />

      <section className="relative z-10 mx-auto flex max-w-6xl flex-col">
        <div className="max-w-3xl flex flex-col items-center text-center sm:items-start sm:text-left mt-8 sm:mt-0">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex rounded-full border border-amber-300/25 bg-amber-300/10 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[4px] text-amber-200"
          >
            {eyebrow}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="mt-5 text-4xl font-black uppercase tracking-tight text-white sm:mt-6 sm:text-6xl"
          >
            {title}{" "}
            <span className="bg-gradient-to-r from-[#8a5a08] via-[#f6c65b] to-[#fff1b8] bg-clip-text text-transparent">
              {accent}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16 }}
            className="mt-5 max-w-2xl text-sm leading-7 text-zinc-400 sm:text-base"
          >
            {description}
          </motion.p>
        </div>
      </section>
    </main>
  );
}
