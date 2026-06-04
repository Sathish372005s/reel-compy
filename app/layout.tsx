import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import BackgroundWrapper from "./components/background/BackgroundWrapper";
import RouteTransition from "./components/RouteTransition";

export const metadata: Metadata = {
  title: "flareels",
  description: "flareels is a video editing service that transforms your raw footage into captivating reels, tailored to your style and audience. With our expert editors and creative touch, we help you create engaging content that stands out on social media platforms. Whether it's for personal use or business promotion, flareels delivers high-quality reels that capture attention and drive engagement.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <body className="relative min-h-full flex flex-col bg-[#030303] text-white">
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-[#030303]">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(210,156,52,0.24),transparent_55%)] sm:bg-[radial-gradient(ellipse_at_top,rgba(210,156,52,0.34),transparent_55%)]" />
          <div className="absolute top-0 left-1/2 hidden h-[500px] w-[1000px] -translate-x-1/2 bg-amber-500/16 blur-[160px] sm:block" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black" />
          <BackgroundWrapper />
        </div>
        <Navbar />
        <RouteTransition />
        <div className="relative z-10 flex-1">{children}</div>
      </body>
    </html>
  );
}
