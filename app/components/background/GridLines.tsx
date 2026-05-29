export default function GridLines() {
  return (
    <div className="absolute inset-0 flex justify-between px-16 md:px-32 opacity-25">

      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="relative h-full w-px bg-gradient-to-b from-transparent via-white/10 to-transparent"
        >
          {/* Periodic glowing laser/light pulse */}
          <div
            className="absolute left-[-1px] w-[3px] h-[25vh] bg-gradient-to-b from-transparent via-red-500 to-transparent rounded-full blur-[1px]"
            style={{
              animation: "gridLinePulse 6s cubic-bezier(0.25, 1, 0.5, 1) infinite",
              animationDelay: `${i * 1.5}s`,
            }}
          />
        </div>
      ))}

    </div>
  );
}