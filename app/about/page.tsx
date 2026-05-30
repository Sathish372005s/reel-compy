import ThemedRoutePage from "../components/sections/ThemedRoutePage";

export default function AboutPage() {
  return (
    <ThemedRoutePage
      eyebrow="About"
      title="A creator studio"
      accent="built for speed"
      description="Flashoot blends production craft, fast edit systems, and social-first delivery for creators and businesses that move quickly."
      items={["Creative operators", "Premium mobile-first edits", "A workflow made for reels"]}
    />
  );
}
