"use client";

import Image from "next/image";
import {
  FaInstagram,
  FaFacebookF,
  FaYoutube,
  FaWhatsapp,
} from "react-icons/fa";

const quickLinks = [
  "Home",
  "Services",
  "Pricing",
  "About",
  "Contact",
];

const services = [
  "Reel Shooting",
  "Fast Editing",
  "Brand Content",
  "Product Videos",
  "Event Coverage",
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-black border-t border-yellow-500/20">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,193,7,0.12),transparent_60%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo Section */}
          <div>
            <Image
              src="/logo-without-bg.png" // replace with your logo
              alt="FLA Reels"
              width={180}
              height={60}
              className="mb-5 object-contain"
            />

            <p className="text-gray-400 text-sm leading-relaxed">
              India's first quick content service.
              Shoot on DSLR, edit on Mac,
              and deliver premium reels
              within minutes.
            </p>

            <div className="flex gap-4 mt-6">
              {[
                FaInstagram,
                FaFacebookF,
                FaYoutube,
                FaWhatsapp,
              ].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-10 h-10 rounded-full border border-yellow-500/30 flex items-center justify-center text-yellow-400 hover:bg-yellow-400 hover:text-black transition-all duration-300"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-yellow-400 font-bold text-lg mb-5 uppercase tracking-widest">
              Quick Links
            </h3>

            <ul className="space-y-3">
              {quickLinks.map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-yellow-400 transition-colors duration-300"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-yellow-400 font-bold text-lg mb-5 uppercase tracking-widest">
              Services
            </h3>

            <ul className="space-y-3">
              {services.map((item) => (
                <li
                  key={item}
                  className="text-gray-400 hover:text-yellow-400 transition-colors duration-300"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-yellow-400 font-bold text-lg mb-5 uppercase tracking-widest">
              Contact
            </h3>

            <div className="space-y-4 text-gray-400">
              <p>
                📍 Parvatham Estates,Secunderabad,50003,Telangana
              </p>

              <p>
                📞 +91 98666 95553
              </p>

              <p>
                ✉ Weareflareels@gmail.com
              </p>

              <p>
                Available Monday to Saturday, 9am - 7pm
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-10 h-px bg-gradient-to-r from-transparent via-yellow-500/40 to-transparent" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm text-center md:text-left">
            © 2026 FLA Reels. All Rights Reserved.
          </p>

          <div className="flex gap-6 text-sm">
            <a
              href="#"
              className="text-gray-500 hover:text-yellow-400 transition"
            >
              Privacy Policy
            </a>

            <a
              href="#"
              className="text-gray-500 hover:text-yellow-400 transition"
            >
              Terms & Conditions
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}