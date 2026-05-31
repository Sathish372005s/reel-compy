import ThemedRoutePage from "../components/sections/ThemedRoutePage";
import BookingCta from "../components/BookingCta";
import ServicesSection from "../components/servicesec";

export default function ServicesPage() {
  return (
    <div>
      <ThemedRoutePage
        eyebrow="Services"
        title="Shoot edit deliver"
        accent="fast"
        description="On-demand content production for brands that need polished reels, campaign cuts, and social assets without slow studio timelines."
      />
      <ServicesSection />
      <div className="pb-20 border-t border-white/5 bg-[#030303]/30">
        <BookingCta />
      </div>
    </div>
  );
}
