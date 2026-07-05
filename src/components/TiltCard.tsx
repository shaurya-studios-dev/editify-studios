"use client";

import React, { useRef, useState } from "react";
import { useDeviceMode } from "./DeviceModeProvider";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
}

export default function TiltCard({ children, className = "", glow = false }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });
  const { isPhone } = useDeviceMode();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || isPhone) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Tilt the card based on mouse position (max 15 degrees)
    const rotateY = ((mouseX / rect.width) - 0.5) * 15; 
    const rotateX = ((mouseY / rect.height) - 0.5) * -15;
    
    setRotation({ x: rotateX, y: rotateY });
    setGlare({ x: (mouseX / rect.width) * 100, y: (mouseY / rect.height) * 100, opacity: 1 });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
    setGlare({ ...glare, opacity: 0 });
  };

  return (
    <div
      className={`relative ${className}`}
      style={{ perspective: "1500px" }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="w-full h-full transition-transform duration-200 ease-out"
        style={isPhone ? {} : {
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Behind-the-card glow */}
        {glow && (
          <div 
            className="absolute -inset-1 bg-gradient-to-r from-yellow-600 via-amber-500 to-yellow-600 rounded-[2.5rem] blur opacity-50 animate-pulse" 
            style={{ transform: "translateZ(-20px)" }} 
          />
        )}
        
        {/* Child content (the actual card and badges) */}
        {children}
        
        {/* Glare overlay */}
        <div 
          className="absolute inset-0 z-50 pointer-events-none transition-opacity duration-300 rounded-[2rem] overflow-hidden"
          style={{
            opacity: glare.opacity,
            background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.08) 0%, transparent 60%)`,
            transform: "translateZ(1px)" // Lift slightly to avoid z-fighting
          }}
        />
      </div>
    </div>
  );
}
