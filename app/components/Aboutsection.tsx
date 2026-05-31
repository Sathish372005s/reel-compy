
"use client";

import { Camera, Video, Award, Sparkles } from "lucide-react";
import Link from "next/link";

export default function AboutSection() {
  return (
    <section className="relative py-20 px-5 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-yellow-500/10 blur-[120px]" />

      <div className="relative max-w-7xl mx-auto">
        {/* Section Badge */}
        <div className="flex justify-center">
          <span className="rounded-full border border-yellow-500/30 px-6 py-2 text-xs tracking-[4px] uppercase text-yellow-400">
            About Flareels
          </span>
        </div>

        {/* Heading */}
        <div className="mt-8 text-center">
          <h2 className="text-4xl font-black text-white md:text-6xl">
            More Than Content.
            <br />
            <span className="text-yellow-400">
              We Create Experiences.
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-gray-400 text-base md:text-lg leading-relaxed">
            At Flareels, we transform ideas into cinematic stories.
            From high-energy reels and brand campaigns to
            professional photography and event coverage, our
            mission is simple — create content that captures
            attention, builds trust, and drives results.
          </p>
        </div>

        {/* Main Grid */}
        <div className="mt-16 grid gap-10 lg:grid-cols-2 items-center">
          {/* Left Content */}
          <div>
            {/* Description */}
            <div className="rounded-3xl border border-yellow-500/20 bg-black/40 p-8 backdrop-blur-md">
              <h3 className="text-2xl font-bold text-white">
                Crafting Visual Stories That Matter
              </h3>

              <p className="mt-5 text-gray-400 leading-8">
                Every frame is planned. Every edit is refined.
                Every project is delivered with passion.
                We blend creativity, storytelling, and
                professional production to create content that
                leaves a lasting impression.
              </p>

              {/* Features */}
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="flex items-center gap-3">
                  <Video className="h-5 w-5 text-yellow-400" />
                  <span className="text-gray-300">
                    Cinematic Storytelling
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <Camera className="h-5 w-5 text-yellow-400" />
                  <span className="text-gray-300">
                    Professional Equipment
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <Sparkles className="h-5 w-5 text-yellow-400" />
                  <span className="text-gray-300">
                    Creative Editing
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <Award className="h-5 w-5 text-yellow-400" />
                  <span className="text-gray-300">
                    Social Media Optimized
                  </span>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-yellow-500/20 bg-black/40 p-6 text-center">
                <h3 className="text-4xl font-black text-yellow-400">
                  500+
                </h3>
                <p className="mt-2 text-gray-400">
                  Projects Delivered
                </p>
              </div>

              <div className="rounded-2xl border border-yellow-500/20 bg-black/40 p-6 text-center">
                <h3 className="text-4xl font-black text-yellow-400">
                  100+
                </h3>
                <p className="mt-2 text-gray-400">
                  Happy Clients
                </p>
              </div>

              <div className="rounded-2xl border border-yellow-500/20 bg-black/40 p-6 text-center">
                <h3 className="text-4xl font-black text-yellow-400">
                  48H
                </h3>
                <p className="mt-2 text-gray-400">
                  Fast Delivery
                </p>
              </div>

              <div className="rounded-2xl border border-yellow-500/20 bg-black/40 p-6 text-center">
                <h3 className="text-4xl font-black text-yellow-400">
                  100%
                </h3>
                <p className="mt-2 text-gray-400">
                  Satisfaction
                </p>
              </div>
            </div>
          </div>

          {/* Right Image Section */}
          <div className="relative flex justify-center">
            {/* Glow */}
            <div className="absolute h-[350px] w-[350px] rounded-full bg-yellow-500/20 blur-[100px]" />

            {/* Main Card */}
            <div className="relative overflow-hidden rounded-3xl ">
              <img
                src="/profile.png"
                alt="Flareels Team"
                className="h-fit w-[95%] object-cover"
              />

              {/* Floating Badge */}
              <div className="absolute  bottom-6 left-6 rounded-2xl border border-yellow-500/30 bg-black/80 px-5 py-4 backdrop-blur-md">
                <p className="text-yellow-400 font-bold">
                  ★ Trusted By
                </p>
                <p className="text-white">
                  100+ Happy Clients
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-20 text-center">
          <h3 className="text-3xl font-bold text-white">
            Ready to elevate your content?
          </h3>

          <p className="mt-3 text-gray-400">
            Let's create reels, videos, and visuals that
            stand out from the crowd.
          </p>

          <button
            className="
              mt-8
              rounded-full
              bg-gradient-to-r
              from-yellow-500
              to-yellow-300
              px-8
              py-4
              font-bold
              text-black
              transition-all
              duration-300
              hover:scale-105
            "
          >
            <Link href="/contact">Book Your Shoot</Link>
          </button>
        </div>
      </div>
    </section>
  );
}

