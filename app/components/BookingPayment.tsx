"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Receipt, ShieldCheck, Lock, Sparkles, Check, X, PhoneCall } from "lucide-react";
// Razorpay integration will open checkout instead of showing QR

interface BookingPaymentProps {
  packageName?: string;
  totalPrice?: number | string;
  isModal?: boolean;
  onClose?: () => void;
}

export default function BookingPayment({
  packageName = "Smart Shot",
  totalPrice = 4999,
  isModal = false,
  onClose,
}: BookingPaymentProps) {
  const [agreed, setAgreed] = useState(false);
  

  // Parse numeric price
  const numericPrice = typeof totalPrice === "number" 
    ? totalPrice 
    : parseInt(totalPrice.replace(/[^0-9]/g, ""), 10);
  
  const isCustom = isNaN(numericPrice) || numericPrice <= 0;
  const advance = isCustom ? 0 : Math.floor(numericPrice / 2);
  const remaining = isCustom ? 0 : numericPrice - advance;

  // Reset agreement when package changes
  useEffect(() => {
    setAgreed(false);
  }, [packageName, totalPrice]);

  const termsList = [
    "50% advance payment required to confirm booking",
    "Cancellations must be informed 24 hours in advance",
    "Last-minute cancellations are non-refundable",
    "Logo placement is mandatory on all delivered reels"
  ];

  const handleActionClick = async () => {
    if (isCustom) {
      window.open(
        `https://wa.me/919866695553?text=Hi%20Flareels,%20I%20am%2520interested%20in%20your%20${encodeURIComponent(packageName)}%20package.`,
        "_blank",
        "noopener,noreferrer"
      );
      return;
    }

    // Create order on server and open Razorpay checkout
    try {
      const res = await fetch("/api/razorpay/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: advance }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Order creation failed");

      // Load Razorpay script
      await new Promise((resolve, reject) => {
        if ((window as any).Razorpay) return resolve(true);
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onload = () => resolve(true);
        script.onerror = () => reject(new Error("Razorpay SDK failed to load"));
        document.body.appendChild(script);
      });

      const options = {
        key: data.key || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: data.currency || "INR",
        name: "Flareels",
        description: packageName,
        order_id: data.id,
        method: {
          upi: true,
        },
        handler: async function (response: any) {
          // Verify payment on server
          const verify = await fetch("/api/razorpay/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(response),
          });
          const verifyData = await verify.json();
          if (verify.ok && verifyData.success) {
            alert("Payment successful and verified. Booking confirmed.");
            if (onClose) onClose();
          } else {
            alert("Payment succeeded but verification failed. Contact support.");
          }
        },
        prefill: {
          name: "",
          email: "",
          contact: "",
        },
        theme: { color: "#F59E0B" },
      } as any;

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (err: any) {
      // eslint-disable-next-line no-console
      console.error(err);
      alert(err?.message || "Payment failed");
    }
  };

  const innerContent = (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-stretch relative">
      {isModal && onClose && (
        <button
          onClick={onClose}
          className="absolute -top-3.5 -right-3.5 md:-top-4 md:-right-4 z-50 flex h-8 w-8 items-center justify-center rounded-full bg-white/5 border border-white/10 text-zinc-400 hover:text-white transition-all duration-200 hover:bg-white/10 hover:border-white/20 cursor-pointer"
          title="Close"
        >
          <X className="h-4 w-4" />
        </button>
      )}

      {/* Card 1: Terms & Conditions */}
      <div className="relative flex flex-col justify-between rounded-3xl border border-yellow-500/10 bg-zinc-950/60 p-6 sm:p-8 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.3)] transition-all duration-300 hover:border-yellow-500/20">
        <div>
          <div className="flex items-center gap-2.5 mb-6 border-b border-white/5 pb-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-black uppercase text-white tracking-wider">
                Terms & Conditions
              </h3>
              <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest mt-0.5">Booking guidelines</p>
            </div>
          </div>

          <ul className="space-y-4 mb-8">
            {termsList.map((term, index) => (
              <li key={index} className="flex items-start gap-3 text-xs text-zinc-300">
                <div className="mt-1 flex h-1.5 w-1.5 shrink-0 rounded-full bg-yellow-400" />
                <span className="leading-relaxed">{term}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Agreement Checkbox */}
        <div className="pt-4 border-t border-white/5">
          <label className="flex items-center gap-3 cursor-pointer group select-none">
            <div className="relative flex items-center justify-center">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="peer sr-only"
              />
              <div className="h-5 w-5 rounded-md border border-yellow-500/30 bg-black/60 transition-all duration-200 peer-checked:border-yellow-400 peer-checked:bg-yellow-400 flex items-center justify-center">
                <Check className="h-3 w-3 text-black opacity-0 transition-opacity duration-200 peer-checked:opacity-100 font-bold" />
              </div>
            </div>
            <span className="text-xs font-semibold text-zinc-300 transition-colors duration-200 group-hover:text-white">
              I agree to the{' '}
              <a href="/terms" className="text-red-500 group-hover:underline">
                terms and conditions
              </a>
            </span>
          </label>
        </div>
      </div>

      {/* Card 2: Payment Summary */}
      <div className="relative flex flex-col justify-between rounded-3xl border border-yellow-500/10 bg-zinc-950/60 p-6 sm:p-8 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.3)] transition-all duration-300 hover:border-yellow-500/20">
        <div>
          <div className="flex items-center gap-2.5 mb-6 border-b border-white/5 pb-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
              <Receipt className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-black uppercase text-white tracking-wider">
                Payment Summary
              </h3>
              <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest mt-0.5">Cost Breakdown</p>
            </div>
          </div>

          {/* Pricing details table */}
          <div className="space-y-4 mb-6">
            <div className="flex justify-between items-center text-xs">
              <span className="text-zinc-400">Package ({packageName}):</span>
              <span className="font-mono text-white font-bold">
                {isCustom ? totalPrice : `₹${numericPrice.toLocaleString("en-IN")}`}
              </span>
            </div>
            <div className="h-[1px] bg-white/5 w-full" />
            <div className="flex justify-between items-center text-xs">
              <span className="text-zinc-300 font-semibold">Total Amount:</span>
              <span className="font-mono text-white font-black text-sm">
                {isCustom ? totalPrice : `₹${numericPrice.toLocaleString("en-IN")}`}
              </span>
            </div>
            <div className="flex justify-between items-center text-xs text-red-500 font-bold">
              <span>Pay Now (50% Advance):</span>
              <span className="font-mono text-lg">
                {isCustom ? "TBD" : `₹${advance.toLocaleString("en-IN")}`}
              </span>
            </div>
          </div>

          <p className="text-[11px] text-zinc-500 italic mb-8 font-mono">
            {isCustom 
              ? "* Advance token amount discussed on contact" 
              : `* Remaining ₹${remaining.toLocaleString("en-IN")} to be paid on event day`
            }
          </p>
        </div>

        {/* Action button */}
        <div>
          <motion.button
            disabled={!agreed}
            onClick={handleActionClick}
            whileHover={agreed ? { scale: 1.02, y: -1 } : {}}
            whileTap={agreed ? { scale: 0.98 } : {}}
            className={`w-full flex items-center justify-center gap-2 rounded-2xl py-4 text-xs font-black uppercase tracking-wider transition-all duration-300 ${
              agreed
                ? "bg-yellow-600 hover:bg-yellow-500 text-black shadow-lg shadow-yellow-600/15 cursor-pointer border border-yellow-500/30"
                : "bg-zinc-800 text-zinc-500 cursor-not-allowed border border-zinc-700/50"
            }`}
          >
            {isCustom ? (
              <>
                <PhoneCall className="h-4 w-4" />
                <span>Enquire on WhatsApp</span>
              </>
            ) : (
              <>
                <Lock className="h-4 w-4" />
                <span>Pay ₹{advance.toLocaleString("en-IN")} & Confirm Booking</span>
              </>
            )}
          </motion.button>

          {/* Security Note */}
          <div className="mt-4 flex items-center justify-center gap-1.5 text-[10px] text-zinc-500 font-mono">
            <ShieldCheck className="h-4.5 w-4.5 text-zinc-600" />
            <span>Secured by Razorpay • 256-bit SSL Encryption</span>
          </div>

          {/* Full Terms & Conditions link */}
          <div className="mt-4 text-center text-[11px] text-zinc-400 font-mono">
            By confirming a booking and making the advance payment, you acknowledge that you have read, understood, and agreed to our <a href="/terms" className="text-yellow-400 underline">Terms &amp; Conditions</a>.
          </div>
        </div>
      </div>
    </div>
  );

  if (isModal) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-5xl bg-zinc-950/90 rounded-3xl border border-yellow-500/20 p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[95vh] md:max-h-[90vh]"
        >
          {innerContent}
        </motion.div>
      </div>
    );
  }


  return (
    <section className="relative w-full max-w-5xl mx-auto px-4 py-12 sm:px-6 z-10 selection:bg-amber-400/30">
      {/* Background soft amber glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hidden h-[250px] w-[500px] rounded-full bg-yellow-500/5 blur-[120px] pointer-events-none sm:block" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {innerContent}
      </motion.div>
    </section>
  );
}

