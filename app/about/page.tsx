import AboutSection from "../components/Aboutsection";
import BookingCta from "../components/BookingCta";

export default function AboutPage() {
  return (
    <>
      <AboutSection />
      <div className="pb-20 border-t border-white/5 bg-[#030303]/30">
        <BookingCta />
      </div>
    </>
  );
}
