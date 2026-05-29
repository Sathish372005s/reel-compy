import GridLines from "./GridLines";
import NoiseTexture from "./NoiseTexture";
import RotatingStar from "./RotatingStar";

export default function BackgroundWrapper() {
  return (
    <div className="absolute inset-0 overflow-hidden">

      {/* Grid */}
      <GridLines />

      {/* Rotating Stars */}
      <RotatingStar
        top="22%"
        left="10%"
        size={120}
      />

      <RotatingStar
        bottom="18%"
        right="10%"
        size={90}
      />

      {/* Noise */}
      <NoiseTexture />
    </div>
  );
}