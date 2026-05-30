"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Aperture, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface NavLinkProps {
  href: string;
  label: string;
  subLabel: string;
  mobile?: boolean;
  active?: boolean;
  onClick?: () => void;
}

function NavLink({
  href,
  label,
  subLabel,
  mobile = false,
  active = false,
  onClick,
}: NavLinkProps) {
  const [hovered, setHovered] = useState(false);
  const showCorners = hovered || active;

  return (
    <Link
      href={href}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative ${
        mobile
          ? "w-full py-4 text-center border-b border-white/10"
          : "px-3 py-1.5 sm:px-4 sm:py-2"
      } text-xs font-black uppercase tracking-wider ${active ? "text-white" : "text-zinc-400"} hover:text-white transition-colors duration-300 flex flex-col items-center gap-0.5 rounded-xl select-none`}
    >
      {/* Corners */}
      {!mobile && (
        <>
          <motion.span
            className="absolute top-0.5 left-0.5 w-2 h-2 border-t border-l border-red-500/80"
            initial={{ opacity: 0 }}
            animate={showCorners ? { opacity: 1 } : { opacity: 0 }}
          />
          <motion.span
            className="absolute top-0.5 right-0.5 w-2 h-2 border-t border-r border-red-500/80"
            initial={{ opacity: 0 }}
            animate={showCorners ? { opacity: 1 } : { opacity: 0 }}
          />
          <motion.span
            className="absolute bottom-0.5 left-0.5 w-2 h-2 border-b border-l border-red-500/80"
            initial={{ opacity: 0 }}
            animate={showCorners ? { opacity: 1 } : { opacity: 0 }}
          />
          <motion.span
            className="absolute bottom-0.5 right-0.5 w-2 h-2 border-b border-r border-red-500/80"
            initial={{ opacity: 0 }}
            animate={showCorners ? { opacity: 1 } : { opacity: 0 }}
          />
        </>
      )}

      <span className="text-[11px] font-black tracking-widest">
        {label}
      </span>

      <span className="text-[8px] tracking-[2px] uppercase font-mono text-zinc-500">
        {subLabel}
      </span>
    </Link>
  );
}

const navItems = [
  { href: "/", label: "Home", subLabel: "start" },
  { href: "/services", label: "Services", subLabel: "shoot" },
  { href: "/pricing", label: "Pricing", subLabel: "plans" },
  { href: "/contact", label: "Contact", subLabel: "book" },
  { href: "/about", label: "About", subLabel: "studio" },
  { href: "/works", label: "Works", subLabel: "reels" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;

  return (
    <div className="fixed top-0 inset-x-0 z-50 flex flex-col">
      <div className="w-[94%] sm:w-[92%] mx-auto mt-2 sm:mt-4 flex items-center justify-between">

        {/* LEFT */}
        <div className="flex items-center gap-6 rounded-2xl border border-white/10 bg-[#0c0c0e]/70 backdrop-blur-xl px-4 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">

          {/* Logo */}
          <Link
            href="/"
            className="group flex items-center gap-2 text-white"
          >
            <Aperture className="h-5 w-5 text-red-500 transition-transform duration-500 group-hover:rotate-180" />

            <h1 className="text-sm md:text-base font-black tracking-[0.2em] uppercase">
              sindhu<span className="text-red-500"></span>...
            </h1>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.href}
                href={item.href}
                label={item.label}
                subLabel={item.subLabel}
                active={isActive(item.href)}
              />
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-2">

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center gap-2 rounded-2xl border border-white/10 bg-[#0c0c0e]/70 backdrop-blur-xl px-4 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
            <Link
              href="/contact"
              className="rounded-full px-5 py-2 text-[10px] font-black uppercase tracking-wider text-white bg-gradient-to-r from-red-600 to-red-500"
            >
              Book Now
            </Link>

            <Link
              href="/services"
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[10px] font-black uppercase tracking-wider text-white"
            >
              Our Services
            </Link>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden flex items-center justify-center w-12 h-12 rounded-2xl border border-white/10 bg-[#0c0c0e]/70 backdrop-blur-xl text-white"
            aria-label="Toggle navigation menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden mt-3 mx-auto w-[94%] rounded-3xl border border-white/10 bg-[#0c0c0e]/95 backdrop-blur-2xl overflow-hidden shadow-2xl"
          >
            <div className="flex flex-col p-4">
              {navItems.map((item) => (
                <NavLink
                  key={item.href}
                  href={item.href}
                  label={item.label}
                  subLabel={item.subLabel}
                  active={isActive(item.href)}
                  onClick={() => setMenuOpen(false)}
                  mobile
                />
              ))}

              <div className="flex flex-col gap-3 mt-6">
                <Link
                  href="/contact"
                  onClick={() => setMenuOpen(false)}
                  className="w-full text-center rounded-full px-5 py-3 text-xs font-black uppercase tracking-wider text-white bg-gradient-to-r from-red-600 to-red-500"
                >
                  Book Now
                </Link>

                <Link
                  href="/services"
                  onClick={() => setMenuOpen(false)}
                  className="w-full text-center rounded-full border border-white/10 bg-white/5 px-5 py-3 text-xs font-black uppercase tracking-wider text-white"
                >
                  Our Services
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
