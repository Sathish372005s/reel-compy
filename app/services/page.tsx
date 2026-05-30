import ThemedRoutePage from "../components/sections/ThemedRoutePage";

export default function ServicesPage() {
  return (
    <ThemedRoutePage
      eyebrow="Services"
      title="Shoot edit deliver"
      accent="fast"
      description="On-demand content production for brands that need polished reels, campaign cuts, and social assets without slow studio timelines."
      items={["On-location reel shoots", "AI-assisted edit pipeline", "Rapid delivery workflow"]}
    />
  );
}
