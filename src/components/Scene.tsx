"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, MeshDistortMaterial, Sphere } from "@react-three/drei";
import { useTheme } from "next-themes";
import { useEffect, useState, useRef } from "react";
import * as THREE from "three";

function AnimatedSphere({ isDark }: { isDark: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<any>(null);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame(() => {
    if (!meshRef.current) return;
    
    const targetX = (mouse.current.x * Math.PI) / 4;
    const targetY = (mouse.current.y * Math.PI) / 4;
    
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetX, 0.02);
    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, -targetY, 0.02);
    
    meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, mouse.current.x * 2.5, 0.02);
    meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, mouse.current.y * 2.5, 0.02);

    if (materialRef.current) {
      const targetDistort = 0.4 + (Math.abs(mouse.current.x) + Math.abs(mouse.current.y)) * 0.15;
      materialRef.current.distort = THREE.MathUtils.lerp(materialRef.current.distort, targetDistort, 0.05);
    }
  });

  return (
    <Sphere ref={meshRef} args={[2, 64, 64]} scale={2.5}>
      <MeshDistortMaterial
        ref={materialRef}
        color={isDark ? "#222222" : "#dddddd"}
        attach="material"
        distort={0.4}
        speed={1.5}
        roughness={0.2}
        metalness={isDark ? 0.8 : 0.2}
      />
    </Sphere>
  );
}

export default function Scene() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const isDark = theme === "dark" || !theme;

  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none opacity-40 mix-blend-difference">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={isDark ? 0.2 : 0.8} />
        <directionalLight position={[10, 10, 5]} intensity={isDark ? 0.5 : 1} />
        <AnimatedSphere isDark={isDark} />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
