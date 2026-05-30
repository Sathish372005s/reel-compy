"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface ThemedRoutePageProps {
  eyebrow: string;
  title: string;
  accent: string;
  description: string;
  items: string[];
  cta?: string;
}

export default function ThemedRoutePage({
  eyebrow,
  title,
  accent,
  description,
  items,
  cta = "Book Now",
}: ThemedRoutePageProps) {
  return (
    <main className="relative min-h-screen px-6 pb-24 pt-36 text-white selection:bg-red-500/30">
      <div className="absolute left-1/2 top-36 h-72 w-[640px] -translate-x-1/2 rounded-full bg-red-700/10 blur-[120px] pointer-events-none" />

      <section className="relative z-10 mx-auto flex max-w-6xl flex-col gap-12">
        <div className="max-w-3xl">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex rounded-full border border-red-500/20 bg-red-500/10 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[4px] text-red-400"
          >
            {eyebrow}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="mt-6 text-4xl font-black uppercase tracking-tight text-white sm:text-6xl"
          >
            {title}{" "}
            <span className="bg-gradient-to-r from-red-500 to-orange-400 bg-clip-text text-transparent">
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

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {items.map((item, index) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12 + index * 0.08 }}
              className="group relative overflow-hidden rounded-3xl border border-white/5 bg-zinc-950/40 p-6 shadow-xl backdrop-blur-xl"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(239,68,68,0.09),transparent_45%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="relative text-3xl font-black text-red-500/60">
                {String(index + 1).padStart(2, "0")}
              </div>
              <p className="relative mt-6 text-sm font-bold uppercase tracking-wide text-white">
                {item}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.34 }}
          className="flex flex-wrap gap-3"
        >
          <Link
            href="/contact"
            className="rounded-full bg-gradient-to-r from-red-600 to-red-500 px-6 py-3 text-xs font-black uppercase tracking-wider text-white shadow-[0_8px_26px_rgba(220,38,38,0.22)]"
          >
            {cta}
          </Link>
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
