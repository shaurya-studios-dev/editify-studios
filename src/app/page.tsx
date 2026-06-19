"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
// @ts-ignore
import * as random from "maath/random/dist/maath-random.esm";
import Image from "next/image";
import Link from "next/link";

function Starfield(props: any) {
  const ref = useRef<any>();
  // Generate 5000 points in a sphere
  const sphere = useMemo(() => random.inSphere(new Float32Array(5000), { radius: 1.5 }) as Float32Array, []);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          color="#D4AF37"
          size={0.005}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

export default function Home() {
  return (
    <main className="relative w-full h-screen overflow-hidden bg-[#050505] text-[#f8f5ed]">
      
      {/* 3D WebGL Canvas Layer */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 1] }}>
          <Starfield />
        </Canvas>
      </div>

      {/* HTML Overlay Layer */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center pointer-events-none">
        
        {/* Top Nav (Optional for structure) */}
        <header className="absolute top-0 w-full p-8 flex justify-center pointer-events-auto">
          <div className="w-[60px] h-[60px] rounded-full border-2 border-[#D4AF37] overflow-hidden shadow-[0_0_20px_rgba(212,175,55,0.3)]">
             <Image src="/top_logo.jpg" alt="Logo" width={60} height={60} className="object-cover" priority />
          </div>
        </header>

        {/* Center Hero Content */}
        <div className="flex flex-col items-center text-center pointer-events-auto">
          <p className="font-bebas text-[14px] tracking-[4px] text-[#D4AF37] mb-4 uppercase animate-pulse">
            A Creative Editing Service
          </p>
          <h1 className="font-bebas text-[50px] md:text-[80px] lg:text-[120px] leading-[0.9] tracking-tighter text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.2)] mb-8">
            <span className="block">STEP INSIDE</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#B8860B]">
              THE STUDIO.
            </span>
          </h1>

          {/* Interactive Doors / Choices */}
          <div className="flex flex-col sm:flex-row gap-6 mt-10">
            <Link 
              href="#video-editing"
              className="group relative px-8 py-4 rounded-full border border-white/20 bg-white/5 backdrop-blur-md overflow-hidden transition-all hover:border-[#D4AF37]/50 hover:shadow-[0_0_30px_rgba(212,175,55,0.2)]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/20 to-transparent translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
              <span className="relative font-bebas text-[20px] tracking-[2px] text-white group-hover:text-[#D4AF37] transition-colors">
                VIDEO EDITING
              </span>
            </Link>

            <Link 
              href="#motion-graphics"
              className="group relative px-8 py-4 rounded-full border border-white/20 bg-white/5 backdrop-blur-md overflow-hidden transition-all hover:border-[#D4AF37]/50 hover:shadow-[0_0_30px_rgba(212,175,55,0.2)]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/20 to-transparent translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
              <span className="relative font-bebas text-[20px] tracking-[2px] text-white group-hover:text-[#D4AF37] transition-colors">
                MOTION GRAPHICS
              </span>
            </Link>
          </div>
        </div>

        {/* Bottom Hint */}
        <div className="absolute bottom-10 flex flex-col items-center">
          <p className="font-sans text-[12px] uppercase tracking-[0.3em] text-white/50 mb-2">
            Drag to interact
          </p>
          <div className="w-[1px] h-[30px] bg-gradient-to-b from-white/50 to-transparent animate-bounce" />
        </div>

      </div>
    </main>
  );
}
