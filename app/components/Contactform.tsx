"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, ArrowUpRight, Check, ChevronDown, ChevronUp, FileText } from "lucide-react";

const servicePlans = {
  reel: {
    label: "Professional Reel Packages",
    plans: [
      { name: "Creator Launch", price: "Rs. 4,999" },
      { name: "Creator Pro", price: "Rs. 7,999" },
    ],
  },
  wedding: {
    label: "Wedding Packages",
    plans: [
      { name: "Basic", price: "Rs. 14,999" },
      { name: "Pro", price: "Rs. 44,999" },
      { name: "Premium", price: "Rs. 59,999" },
      { name: "Premium Pro", price: "Rs. 99,999" },
    ],
  },
  business: {
    label: "Business & Brands Package",
    plans: [{ name: "Customized Pricing", price: "Custom Pricing" }],
  },
};

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    serviceType: "",
    plan: "",
    message: "",
  });

  // Pre-populate serviceType and plan from URL parameters
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const pkgParam = params.get("package");
      if (pkgParam) {
        let foundServiceType = "";
        let foundPlanValue = "";

        for (const [sType, service] of Object.entries(servicePlans)) {
          const matchedPlan = service.plans.find(
            (p) => p.name.toLowerCase() === pkgParam.toLowerCase()
          );
          if (matchedPlan) {
            foundServiceType = sType;
            foundPlanValue = `${matchedPlan.name} - ${matchedPlan.price}`;
            break;
          }
        }

        if (foundServiceType) {
          setFormData((prev) => ({
            ...prev,
            serviceType: foundServiceType,
            plan: foundPlanValue,
          }));
        }
      }
    }
  }, []);

  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [showTermsDropdown, setShowTermsDropdown] = useState(false);

  const termsList = [
    "50% advance payment required to confirm booking",
    "Travel expenses are to be borne by the client",
    "Cancellations must be informed 24 hours in advance",
    "Last-minute cancellations are non-refundable",
    "RAW footage will not be shared under any package",
    "Logo placement is mandatory on all delivered reels"
  ];

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const googleFormUrl = "https://docs.google.com/forms/d/e/1FAIpQLSdVBBOhcQ3ar4iWDhlbtpciXYB3pHuuvfSxT84Rh_L5FKWAAQ/viewform";

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
      ...(name === "serviceType" ? { plan: "" } : {}),
    });
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setLoading(true);
    setSuccess("");
    setError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: `+91${formData.phone}`,
          serviceType:
            servicePlans[
              formData.serviceType as keyof typeof servicePlans
            ]?.label || formData.serviceType,
          plan: formData.plan,
          message: formData.message,
          agreedToTerms: agreedToTerms,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Failed to send message"
        );
      }

      setSuccess(
        "Thank you! Your inquiry has been sent successfully."
      );

      setFormData({
        name: "",
        email: "",
        phone: "",
        serviceType: "",
        plan: "",
        message: "",
      });
      setAgreedToTerms(false);
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative pt-4 pb-20 px-5 max-sm:pt-2">
      <div className="max-w-3xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12">
          <span className="inline-block border border-yellow-500/30 rounded-full px-6 py-2 text-xs tracking-[4px] text-yellow-400 uppercase">
            Contact Us
          </span>

          <h2 className="mt-6 text-4xl md:text-5xl font-black text-white">
            Let&apos;s Create
            <span className="text-yellow-400">
              {" "}
              Amazing Content
            </span>
          </h2>

          <p className="mt-4 text-gray-400">
            Tell us about your project and we&apos;ll get back
            to you shortly.
          </p>
        </div>

        {/* Direct Google Booking Banner */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="
            mb-8
            rounded-2xl
            border border-amber-300/15
            bg-amber-400/5
            backdrop-blur-md
            p-5
            flex flex-col sm:flex-row
            items-center justify-between
            gap-4
            shadow-[0_0_40px_rgba(245,158,11,0.04)]
          "
        >
          <div className="flex items-start gap-3 text-center sm:text-left">
            <Calendar className="h-5 w-5 text-amber-300 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-black uppercase text-amber-200 tracking-wider">
                Lock In Your Shoot Instantly
              </h4>
              <p className="text-xs text-zinc-400 mt-1">
                For detailed scheduling, team selection, and timeline locks, use our secure Google Booking Sheet.
              </p>
            </div>
          </div>
          
          <a
            href={googleFormUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto shrink-0 cursor-pointer"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="
                w-full sm:w-auto
                flex items-center justify-center gap-2
                rounded-full
                bg-gradient-to-r from-yellow-500 to-yellow-300
                px-5 py-3
                text-[10px] font-black uppercase tracking-widest text-black
                shadow-md
                transition-all duration-300
                cursor-pointer
              "
            >
              <span>Book Shoot</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </motion.button>
          </a>
        </motion.div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="
            rounded-3xl
            border border-yellow-500/20
            bg-black/40
            backdrop-blur-md
            p-5
            sm:p-6
            md:p-8
            lg:p-10
            shadow-[0_0_50px_rgba(255,193,7,0.08)]
          "
        >
          {/* Name + Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            {/* Name */}
            <div>
              <label className="block text-sm text-yellow-400 mb-2">
                Full Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter your name"
                className="
                  w-full
                  rounded-xl
                  border border-yellow-500/20
                  bg-black/50
                  px-4 py-3
                  text-white
                  outline-none
                  focus:border-yellow-400
                "
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm text-yellow-400 mb-2">
                Email Address
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter your email"
                className="
                  w-full
                  rounded-xl
                  border border-yellow-500/20
                  bg-black/50
                  px-4 py-3
                  text-white
                  outline-none
                  focus:border-yellow-400
                "
              />
            </div>
          </div>

          {/* Phone */}
          <div className="mt-5 md:mt-6">
            <label className="block text-sm text-yellow-400 mb-2">
              Phone Number
            </label>

            <div className="flex">
              <div
                className="
                  flex items-center
                  px-4
                  rounded-l-xl
                  border border-r-0 border-yellow-500/20
                  bg-black/50
                  text-yellow-400
                  text-sm sm:text-base
                "
              >
                +91
              </div>

              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="9876543210"
                className="
                  flex-1
                  rounded-r-xl
                  border border-yellow-500/20
                  bg-black/50
                  px-4 py-3
                  text-white
                  outline-none
                  focus:border-yellow-400
                "
              />
            </div>
          </div>

          {/* Service Type + Plan */}
          <div className="mt-5 md:mt-6 grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            <div>
              <label className="block text-sm text-yellow-400 mb-2">
                Service Type
              </label>

              <select
                name="serviceType"
                value={formData.serviceType}
                onChange={handleChange}
                required
                className="
                  w-full
                  rounded-xl
                  border border-yellow-500/20
                  bg-black/50
                  px-4 py-3
                  text-white
                  outline-none
                  focus:border-yellow-400
                "
              >
                <option value="" className="bg-black">
                  Select service type
                </option>
                {Object.entries(servicePlans).map(([value, service]) => (
                  <option key={value} value={value} className="bg-black">
                    {service.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm text-yellow-400 mb-2">
                Plan
              </label>

              <select
                name="plan"
                value={formData.plan}
                onChange={handleChange}
                required
                disabled={!formData.serviceType}
                className="
                  w-full
                  rounded-xl
                  border border-yellow-500/20
                  bg-black/50
                  px-4 py-3
                  text-white
                  outline-none
                  focus:border-yellow-400
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              >
                <option value="" className="bg-black">
                  {!formData.serviceType ? "Select service type first" : "Select plan"}
                </option>
                {formData.serviceType &&
                  servicePlans[
                    formData.serviceType as keyof typeof servicePlans
                  ].plans.map((plan) => (
                    <option
                      key={plan.name}
                      value={`${plan.name} - ${plan.price}`}
                      className="bg-black"
                    >
                      {plan.name} - {plan.price}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          {/* Message */}
          <div className="mt-5 md:mt-6">
            <label className="block text-sm text-yellow-400 mb-2">
              Project Details
            </label>

            <textarea
              rows={6}
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              placeholder="Tell us about your shoot, event, reels, photography or videography requirements..."
              className="
                w-full
                rounded-xl
                border border-yellow-500/20
                bg-black/50
                px-4 py-3
                text-white
                resize-none
                outline-none
                focus:border-yellow-400
              "
            />
          </div>

          {/* Terms checkbox */}
          <div className="mt-5 border-t border-yellow-500/10 pt-5">
            <div className="flex items-start gap-3 select-none">
              <label className="relative flex items-center justify-center cursor-pointer mt-0.5">
                <input
                  type="checkbox"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="peer sr-only"
                />
                <div className="h-5 w-5 rounded-md border border-yellow-500/30 bg-black/60 transition-all duration-200 peer-checked:border-yellow-400 peer-checked:bg-yellow-400 flex items-center justify-center">
                  <Check className="h-3 w-3 text-black opacity-0 transition-opacity duration-200 peer-checked:opacity-100 font-bold" />
                </div>
              </label>
              <div className="text-xs">
                <span className="text-zinc-300">I agree to the </span>
                <button
                  type="button"
                  onClick={() => setShowTermsDropdown(!showTermsDropdown)}
                  className="text-yellow-400 hover:text-yellow-300 font-semibold underline inline-flex items-center gap-1.5 focus:outline-none cursor-pointer"
                >
                  terms and conditions
                  {showTermsDropdown ? (
                    <ChevronUp className="h-3.5 w-3.5" />
                  ) : (
                    <ChevronDown className="h-3.5 w-3.5" />
                  )}
                </button>
              </div>
            </div>

            {/* Collapsible Terms Dropdown */}
            <AnimatePresence>
              {showTermsDropdown && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="mt-4 rounded-xl border border-yellow-500/10 bg-zinc-950/60 p-4 text-left">
                    <h5 className="text-[11px] font-black uppercase text-yellow-400 tracking-wider mb-2.5 inline-flex items-center gap-1.5">
                      <FileText className="h-3.5 w-3.5" />
                      Booking Terms & Conditions
                    </h5>
                    <ul className="space-y-2">
                      {termsList.map((term, index) => (
                        <li key={index} className="flex items-start gap-2 text-[11px] text-zinc-450">
                          <div className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-yellow-500/60" />
                          <span>{term}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Success Message */}
          {success && (
            <div className="mt-6 rounded-xl border border-green-500/30 bg-green-500/10 p-4 text-center text-green-400">
              {success}
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mt-6 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-center text-red-400">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || !agreedToTerms}
            className={`
              mt-6 md:mt-8
              w-full
              rounded-full
              py-3 md:py-4
              text-sm md:text-base
              font-bold
              transition-all
              duration-300
              ${agreedToTerms && !loading
                ? "bg-gradient-to-r from-yellow-500 to-yellow-300 text-black hover:scale-[1.02] cursor-pointer"
                : "bg-zinc-800 text-zinc-500 border border-zinc-700/50 cursor-not-allowed"
              }
            `}
          >
            {loading ? (
              <div className="flex items-center justify-center gap-3">
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-black border-t-transparent" />
                Sending...
              </div>
            ) : (
              "Send Message"
            )}
          </button>
        </form>
      </div>
    </section>
  );
}
