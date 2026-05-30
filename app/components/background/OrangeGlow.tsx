export default function OrangeGlow() {
  return (
    <>
      {/* Main Gold Glow */}
      <div
        className="
          absolute
          left-1/2
          top-1/2
          h-[900px]
          w-[900px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-amber-400/18
          blur-[220px]
        "
      />

      {/* Right Glow */}
      <div
        className="
          absolute
          right-0
          top-0
          h-[600px]
          w-[600px]
          bg-yellow-300/10
          blur-[180px]
        "
      />

      {/* Bottom Glow */}
      <div
        className="
          absolute
          bottom-0
          left-1/3
          h-[400px]
          w-[400px]
          bg-amber-500/10
          blur-[150px]
        "
      />
    </>
  );
}
