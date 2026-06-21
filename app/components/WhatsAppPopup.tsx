"use client";

import { useEffect, useState } from "react";

export default function WhatsAppPopup() {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        setShowPopup(true);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <>
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6">
          <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl ring-1 ring-black/10">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Need Help?</h2>
                <p className="mt-2 text-sm text-slate-600">
                  Have questions about our plans? Continue chatting with us on WhatsApp.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowPopup(false)}
                className="rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
                aria-label="Close WhatsApp popup"
              >
                Close
              </button>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
              <button
                type="button"
                className="rounded-2xl border border-slate-200 bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-800 transition hover:bg-slate-200"
                onClick={() => setShowPopup(false)}
              >
                Not now
              </button>

              <button
                type="button"
                className="inline-flex items-center justify-center rounded-2xl bg-emerald-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-600"
                onClick={() => {
                  window.open(
                    "https://wa.me/919876543210?text=Hi,%20I%20am%20interested%20in%20your%20plans",
                    "_blank"
                  );
                  setShowPopup(false);
                }}
              >
                Continue on WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
