"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Copy, ArrowLeft, CreditCard, Sparkles, Smartphone } from "lucide-react";

interface QrComponentProps {
  onBack: () => void;
  amount?: string;
}

export default function QrComponent({ onBack, amount = "750" }: QrComponentProps) {
  const [activeTab, setActiveTab] = useState<"gpay" | "phonepe">("gpay");
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const upiDetails = {
    gpay: {
      name: "Google Pay QR",
      upiId: "sinduyadav1@okicici",
      dummySrc: "/gpayqr.jpeg",
      colorClass: "border-emerald-500/30 bg-emerald-500/5",
      badgeColor: "bg-emerald-500/20 text-emerald-400",
      accentColor: "emerald"
    },
    phonepe: {
      name: "PhonePe QR",
      upiId: "9866695553@ybl",
      dummySrc: "/phonepayqr.jpeg",
      colorClass: "border-violet-500/30 bg-violet-500/5",
      badgeColor: "bg-violet-500/20 text-violet-400",
      accentColor: "violet"
    }
  };

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(key);
    setTimeout(() => setCopiedText(null), 2000);
  };

  return (
    <div className="relative rounded-3xl border border-yellow-500/20 bg-zinc-950/40 p-6 sm:p-8 backdrop-blur-xl shadow-[0_0_50px_rgba(245,158,11,0.05)] text-center max-w-4xl mx-auto my-6 overflow-hidden">
      {/* Background soft glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[200px] w-[400px] rounded-full bg-yellow-500/5 blur-[80px] pointer-events-none" />

      {/* Back button */}
      <button
        onClick={onBack}
        className="absolute top-4 left-4 flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors duration-200 cursor-pointer"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back</span>
      </button>

      {/* Header */}
      <div className="mb-8 mt-4">
        <span className="inline-flex items-center gap-1.5 border border-yellow-500/30 bg-yellow-500/10 px-4 py-1 text-[10px] uppercase tracking-[3px] text-yellow-400 rounded-full font-bold">
          <Smartphone className="h-3 w-3 animate-pulse" />
          Scan to Pay Advance
        </span>
        <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight mt-4">
          PAY <span className="bg-gradient-to-r from-[#8a5a08] via-[#f6c65b] to-[#fff1b8] bg-clip-text text-transparent">₹{amount}</span> VIA UPI
        </h3>
        <p className="text-zinc-400 text-xs sm:text-sm mt-2 max-w-md mx-auto">
          Scan the QR code below or copy the UPI ID to confirm your booking instantly.
        </p>
      </div>

      {/* MOBILE ONLY TOGGLE SELECTOR BUTTON METHOD */}
      <div className="flex md:hidden justify-center mb-6">
        <div className="relative flex p-1 rounded-full border border-yellow-500/10 bg-black/60 backdrop-blur-md max-w-[280px] w-full">
          <button
            onClick={() => setActiveTab("gpay")}
            className={`relative z-10 w-1/2 py-2 text-[10px] font-black uppercase tracking-wider rounded-full transition-all duration-300 select-none cursor-pointer ${
              activeTab === "gpay"
                ? "bg-gradient-to-r from-yellow-500 to-yellow-300 text-black shadow-md"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            Google Pay
          </button>
          <button
            onClick={() => setActiveTab("phonepe")}
            className={`relative z-10 w-1/2 py-2 text-[10px] font-black uppercase tracking-wider rounded-full transition-all duration-300 select-none cursor-pointer ${
              activeTab === "phonepe"
                ? "bg-gradient-to-r from-yellow-500 to-yellow-300 text-black shadow-md"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            PhonePe
          </button>
        </div>
      </div>

      {/* DESKTOP SIDE-BY-SIDE & MOBILE RENDER */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-3xl mx-auto items-stretch">
        
        {/* GPay Card (always visible on desktop, tab-conditional on mobile) */}
        <div className={`flex-col md:flex ${activeTab === "gpay" ? "flex" : "hidden"}`}>
          <div className="flex-1 flex flex-col items-center justify-between border border-yellow-500/10 hover:border-yellow-500/25 bg-zinc-950/60 rounded-3xl p-6 transition-all duration-300 shadow-[0_4px_30px_rgba(0,0,0,0.4)]">
            <div className="mb-4">
              <span className="text-[10px] font-mono px-3 py-1 rounded-full uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                Google Pay QR
              </span>
            </div>

            {/* QR Placeholder wrapper */}
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 bg-zinc-900 border border-white/5 rounded-2xl flex items-center justify-center p-3 mb-5 overflow-hidden group">
              <img
                src={upiDetails.gpay.dummySrc}
                alt="Google Pay QR Code"
                className="w-full h-full object-contain rounded-lg"
                onError={(e) => {
                  // Fallback visual UI when image is not present
                  e.currentTarget.style.display = 'none';
                  const fb = e.currentTarget.parentElement?.querySelector('.fallback-qr');
                  if (fb) (fb as HTMLElement).style.display = 'flex';
                }}
              />
              <div className="fallback-qr hidden absolute inset-0 flex flex-col items-center justify-center text-center p-4 bg-zinc-950/90 rounded-2xl">
                <div className="w-12 h-12 rounded-full border border-yellow-500/20 bg-yellow-500/5 flex items-center justify-center text-yellow-400 mb-2">
                  <Sparkles className="h-5 w-5 animate-pulse" />
                </div>
                <p className="text-[10px] text-zinc-400 uppercase tracking-widest font-mono">GPAY_QR_CODE.PNG</p>
                <p className="text-[9px] text-zinc-600 mt-1 font-mono">Upload QR as qpay.png in /public</p>
              </div>
            </div>

            {/* Copy UPI section */}
            <div className="w-full">
              <p className="text-zinc-500 text-[10px] uppercase font-mono tracking-wider mb-2">UPI ID</p>
              <div className="flex items-center justify-between gap-2 bg-black/60 border border-white/5 rounded-xl px-3 py-2 text-xs">
                <span className="font-mono text-zinc-300 select-all">{upiDetails.gpay.upiId}</span>
                <button
                  onClick={() => copyToClipboard(upiDetails.gpay.upiId, "gpay")}
                  className="p-1 hover:bg-white/5 rounded-md text-zinc-400 hover:text-white transition-colors duration-150 cursor-pointer"
                  title="Copy UPI ID"
                >
                  {copiedText === "gpay" ? (
                    <Check className="h-4 w-4 text-emerald-400" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* PhonePe Card (always visible on desktop, tab-conditional on mobile) */}
        <div className={`flex-col md:flex ${activeTab === "phonepe" ? "flex" : "hidden"}`}>
          <div className="flex-1 flex flex-col items-center justify-between border border-yellow-500/10 hover:border-yellow-500/25 bg-zinc-950/60 rounded-3xl p-6 transition-all duration-300 shadow-[0_4px_30px_rgba(0,0,0,0.4)]">
            <div className="mb-4">
              <span className="text-[10px] font-mono px-3 py-1 rounded-full uppercase tracking-wider bg-violet-500/10 text-violet-400 border border-violet-500/20 font-bold">
                PhonePe QR
              </span>
            </div>

            {/* QR Placeholder wrapper */}
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 bg-zinc-900 border border-white/5 rounded-2xl flex items-center justify-center p-3 mb-5 overflow-hidden group">
              <img
                src={upiDetails.phonepe.dummySrc}
                alt="PhonePe QR Code"
                className="w-full h-full object-contain rounded-lg"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const fb = e.currentTarget.parentElement?.querySelector('.fallback-qr');
                  if (fb) (fb as HTMLElement).style.display = 'flex';
                }}
              />
              <div className="fallback-qr hidden absolute inset-0 flex flex-col items-center justify-center text-center p-4 bg-zinc-950/90 rounded-2xl">
                <div className="w-12 h-12 rounded-full border border-yellow-500/20 bg-yellow-500/5 flex items-center justify-center text-yellow-400 mb-2">
                  <Sparkles className="h-5 w-5 animate-pulse" />
                </div>
                <p className="text-[10px] text-zinc-400 uppercase tracking-widest font-mono">PHONEPE_QR_CODE.PNG</p>
                <p className="text-[9px] text-zinc-600 mt-1 font-mono">Upload QR as phonepe.png in /public</p>
              </div>
            </div>

            {/* Copy UPI section */}
            <div className="w-full">
              <p className="text-zinc-500 text-[10px] uppercase font-mono tracking-wider mb-2">UPI ID</p>
              <div className="flex items-center justify-between gap-2 bg-black/60 border border-white/5 rounded-xl px-3 py-2 text-xs">
                <span className="font-mono text-zinc-300 select-all">{upiDetails.phonepe.upiId}</span>
                <button
                  onClick={() => copyToClipboard(upiDetails.phonepe.upiId, "phonepe")}
                  className="p-1 hover:bg-white/5 rounded-md text-zinc-400 hover:text-white transition-colors duration-150 cursor-pointer"
                  title="Copy UPI ID"
                >
                  {copiedText === "phonepe" ? (
                    <Check className="h-4 w-4 text-emerald-400" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Footer Info */}
      <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 font-mono">
        <div className="flex items-center gap-1.5">
          <CreditCard className="h-3.5 w-3.5 text-yellow-500/60" />
          <span>Pay exactly ₹{amount} to lock booking</span>
        </div>
        <div>
          <span>UPI Network Payments • Secured</span>
        </div>
      </div>
    </div>
  );
}
