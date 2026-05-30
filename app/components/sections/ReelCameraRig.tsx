"use client";

import Image from "next/image";
import { useState } from "react";

interface ReelCameraRigProps {
  className?: string;
}

export default function ReelCameraRig({ className = "" }: ReelCameraRigProps) {
  const [src, setSrc] = useState("/reel-camera-rig.png");

  return (
    <div className={`relative h-full w-full ${className}`}>
      <Image
        src={src}
        alt="Camera rig with reels phone display"
        fill
        priority={false}
        sizes="(min-width: 1024px) 390px, (min-width: 640px) 360px, 300px"
        className="object-contain drop-shadow-[0_30px_42px_rgba(0,0,0,0.68)]"
        onError={() => setSrc("/dslr-camera-display.png")}
      />
    </div>
  );
}
