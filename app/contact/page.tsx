import ThemedRoutePage from "../components/sections/ThemedRoutePage";

export default function ContactPage() {
  return (
    <ThemedRoutePage
      eyebrow="Contact"
      title="Book your next"
      accent="shoot"
      description="Tell us what you need filmed, where you need us, and when the content should go live. We will shape the fastest route from shoot to publish."
      items={["Location and timing", "Content goals", "Delivery details"]}
      cta="Start Booking"
    />
  );
}
