"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Aperture, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

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
          ? "w-full rounded-xl border border-amber-300/10 bg-[#090805]/80 px-4 py-3 text-left"
          : "px-3 py-1.5 sm:px-4 sm:py-2"
      } text-xs font-black uppercase tracking-wider ${active ? "text-amber-100" : "text-zinc-400"} hover:text-amber-100 transition-colors duration-300 flex flex-col ${mobile ? "items-start" : "items-center"} gap-0.5 rounded-xl select-none`}
    >
      {/* Corners */}
      {!mobile && (
        <>
          <motion.span
            className="absolute top-0.5 left-0.5 w-2 h-2 border-t border-l border-amber-300/90"
            initial={{ opacity: 0 }}
            animate={showCorners ? { opacity: 1 } : { opacity: 0 }}
          />
          <motion.span
            className="absolute top-0.5 right-0.5 w-2 h-2 border-t border-r border-amber-300/90"
            initial={{ opacity: 0 }}
            animate={showCorners ? { opacity: 1 } : { opacity: 0 }}
          />
          <motion.span
            className="absolute bottom-0.5 left-0.5 w-2 h-2 border-b border-l border-amber-300/90"
            initial={{ opacity: 0 }}
            animate={showCorners ? { opacity: 1 } : { opacity: 0 }}
          />
          <motion.span
            className="absolute bottom-0.5 right-0.5 w-2 h-2 border-b border-r border-amber-300/90"
            initial={{ opacity: 0 }}
            animate={showCorners ? { opacity: 1 } : { opacity: 0 }}
          />
        </>
      )}

      <span className="text-[11px] font-black tracking-widest">
        {label}
      </span>

      <span className="text-[8px] tracking-[2px] uppercase font-mono text-amber-200/45">
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
  const [hiddenByPhone, setHiddenByPhone] = useState(false);
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;

  useEffect(() => {
    const handlePhoneOverHeader = (event: Event) => {
      const { overHeader } = (event as CustomEvent<{ overHeader: boolean }>).detail;
      setHiddenByPhone((current) => (current === overHeader ? current : overHeader));
      if (overHeader) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("hero-phone-over-header", handlePhoneOverHeader);
    return () => {
      window.removeEventListener("hero-phone-over-header", handlePhoneOverHeader);
    };
  }, []);

  return (
    <motion.div
      data-site-navbar
      animate={hiddenByPhone ? { opacity: 0, y: -24 } : { opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={`fixed top-0 inset-x-0 z-50 flex flex-col ${hiddenByPhone ? "pointer-events-none" : ""}`}
    >
      <div className="w-[94%] sm:w-[92%] mx-auto mt-2 sm:mt-4 flex items-center justify-between gap-2">

        {/* LEFT */}
        <div className="flex min-w-0 flex-1 items-center gap-4 rounded-2xl border border-amber-300/15 bg-[#070604]/88 px-3 py-2.5 shadow-[0_4px_26px_rgba(0,0,0,0.55),0_0_30px_rgba(245,158,11,0.08)] backdrop-blur-xl sm:flex-none sm:gap-6 sm:px-4 sm:py-3">

          {/* Logo */}
          <Link
            href="/"
            className="group flex min-w-0 items-center gap-2 text-white"
          >
            <Aperture className="h-5 w-5 shrink-0 text-amber-300 drop-shadow-[0_0_16px_rgba(251,191,36,0.55)] transition-transform duration-500 group-hover:rotate-180" />

            <h1 className="truncate text-xs font-black uppercase tracking-[0.16em] sm:text-sm md:text-base md:tracking-[0.2em]">
              sindhu<span className="text-amber-300"></span>...
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
          <div className="hidden md:flex items-center gap-2 rounded-2xl border border-amber-300/15 bg-[#070604]/78 backdrop-blur-xl px-4 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.58)]">
            <Link
              href="/contact"
              className="rounded-full px-5 py-2 text-[10px] font-black uppercase tracking-wider text-black bg-gradient-to-r from-[#8a5a08] via-[#f6c65b] to-[#fff1b8] shadow-[0_0_24px_rgba(245,158,11,0.22)]"
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
            className="lg:hidden flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-amber-300/15 bg-[#070604]/90 text-amber-100 backdrop-blur-xl sm:h-12 sm:w-12"
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
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
            className="lg:hidden mt-2 mx-auto w-[94%] rounded-2xl border border-amber-300/15 bg-[#070604]/96 backdrop-blur-2xl overflow-hidden shadow-2xl"
          >
            <div className="grid grid-cols-2 gap-2 p-3">
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

              <div className="col-span-2 grid grid-cols-2 gap-2 pt-2">
                <Link
                  href="/contact"
                  onClick={() => setMenuOpen(false)}
                  className="w-full rounded-xl bg-gradient-to-r from-[#8a5a08] via-[#f6c65b] to-[#fff1b8] px-4 py-3 text-center text-[10px] font-black uppercase tracking-wider text-black"
                >
                  Book Now
                </Link>

                <Link
                  href="/services"
                  onClick={() => setMenuOpen(false)}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-center text-[10px] font-black uppercase tracking-wider text-white"
                >
                  Our Services
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
