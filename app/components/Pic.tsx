import React from 'react'

function Pic() {
  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-12">
  <div className="grid grid-cols-1 gap-8 md:grid-cols-2">

    {/* Left Side */}
    <div className="flex justify-center">
      <div className="relative w-full max-w-sm overflow-hidden rounded-3xl">
        <img
          src="ggggg.jpeg"
          alt="Founder"
          className="h-[450px] w-full object-cover"
        />

        <div className="absolute bottom-3 left-3 max-w-[78%] rounded-xl border border-yellow-500/30 bg-black/80 px-3 py-2 backdrop-blur-md sm:bottom-6 sm:left-6 sm:rounded-2xl sm:px-5 sm:py-4">
          <p className="text-xs font-bold text-yellow-400 sm:text-base">
            Ganesh Antooju
          </p>
          <p className="text-[10px] leading-snug text-white sm:text-base sm:leading-normal">
            Founder, CEO & Managing Director
          </p>
        </div>
      </div>
    </div>

    {/* Right Side */}
    <div className="flex justify-center">
      <div className="relative w-full max-w-sm overflow-hidden rounded-3xl">
        <img
          src="mam.jpeg"
          alt="Director"
          className="h-[450px] w-full object-cover"
        />

        <div className="absolute bottom-3 left-3 max-w-[78%] rounded-xl border border-yellow-500/30 bg-black/80 px-3 py-2 backdrop-blur-md sm:bottom-6 sm:left-6 sm:rounded-2xl sm:px-5 sm:py-4">
          <p className="text-xs font-bold text-yellow-400 sm:text-base">
            Sindhu Yadhav
          </p>
          <p className="text-[10px] leading-snug text-white sm:text-base sm:leading-normal">
            Director of Operations
          </p>
        </div>
      </div>
    </div>

  </div>
</div>
  )
}

export default Pic