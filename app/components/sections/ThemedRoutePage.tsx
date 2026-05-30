"use client";

import Link from "next/link";
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
    <main className="relative min-h-screen px-4 pb-16 pt-28 text-white selection:bg-amber-400/30 sm:px-6 sm:pb-24 sm:pt-36">
      <div className="absolute left-1/2 top-28 hidden h-72 w-[640px] -translate-x-1/2 rounded-full bg-amber-500/10 blur-[120px] pointer-events-none sm:block sm:top-36" />

      <section className="relative z-10 mx-auto flex max-w-6xl flex-col gap-8 sm:gap-12">
        <div className="max-w-3xl">
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

       

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.34 }}
          className="flex flex-wrap gap-3"
        >
          
          <Link
            href="/"
            className="rounded-full border border-white/10 bg-white/5 px-6 py-3 text-xs font-black uppercase tracking-wider text-white"
          >
            Back Home
          </Link>
        </motion.div>
      </section>
    </main>
  );
}
