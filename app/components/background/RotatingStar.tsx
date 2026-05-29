interface Props {
  top?: string;
  left?: string;
 right?: string;
  bottom?: string;
  size?: number;
}

export default function RotatingStar({
  top,
  left,
  right,
  bottom,
  size = 100,
}: Props) {
  return (
    <div
      style={{
        top,
        left,
        right,
        bottom,
        width: `${size}px`,
        height: `${size}px`,
      }}
      className="absolute animate-spin-slow opacity-30"
    >

      {/* Vertical */}
      <div className="absolute left-1/2 top-0 h-full w-px bg-red-400/70" />

      {/* Horizontal */}
      <div className="absolute left-0 top-1/2 h-px w-full bg-red-400/70" />

      {/* Diagonal */}
      <div className="absolute inset-0 rotate-45">
        <div className="absolute left-1/2 top-0 h-full w-px bg-red-400/70" />
      </div>

      <div className="absolute inset-0 -rotate-45">
        <div className="absolute left-1/2 top-0 h-full w-px bg-red-400/70" />
      </div>
    </div>
  );
}