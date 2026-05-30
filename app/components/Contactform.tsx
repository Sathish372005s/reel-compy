"use client";

import { useState } from "react";

export default function ContactForm() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
    });

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement
        >
    ) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (
        e: React.FormEvent
    ) => {
        e.preventDefault();

        console.log(formData);

        // Call API here
    };

    return (
        <section className="relative py-20 px-5">
            <div className="max-w-3xl mx-auto">
                {/* Heading */}
                <div className="text-center mb-12">
                    <span className="inline-block border border-yellow-500/30 rounded-full px-6 py-2 text-xs tracking-[4px] text-yellow-400 uppercase">
                        Contact Us
                    </span>

                    <h2 className="mt-6 text-4xl md:text-5xl font-black text-white">
                        Let's Create
                        <span className="text-yellow-400">
                            {" "}
                            Amazing Content
                        </span>
                    </h2>

                    <p className="mt-4 text-gray-400">
                        Tell us about your project and
                        we'll get back to you shortly.
                    </p>
                </div>

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

                    {/* Message */}
                    <div className="mt-5 md:mt-6">
                        <label className="block text-sm text-yellow-400 mb-2">
                            Message
                        </label>

                        <textarea
                            rows={6}
                            name="message"
                            placeholder="Tell us about your requirements..."
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

                    {/* Button */}
                    <button
                        type="submit"
                        className="
      mt-6 md:mt-8
      w-full
      rounded-full
      bg-gradient-to-r
      from-yellow-500
      to-yellow-300
      py-3 md:py-4
      text-sm md:text-base
      font-bold
      text-black
      transition-all
      duration-300
      hover:scale-[1.02]
    "
                    >
                        Send Message
                    </button>
                </form>
            </div>
        </section>
    );
}