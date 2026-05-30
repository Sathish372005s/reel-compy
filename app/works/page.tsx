import ThemedRoutePage from "../components/sections/ThemedRoutePage";

export default function WorksPage() {
  return (
    <ThemedRoutePage
      eyebrow="Works"
      title="Reels made to"
      accent="move"
      description="A showcase path for campaign reels, product launches, founder content, food shoots, venue promos, and creator-led edits."
      items={["Launch reels", "Brand stories", "Event content"]}
    />
  );
}
