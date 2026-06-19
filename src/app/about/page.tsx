"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Mask reveal animation for hero text
    const chars = textRef.current?.querySelectorAll(".char");
    if (chars) {
      gsap.fromTo(
        chars,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.05,
          duration: 1.2,
          ease: "power4.out",
          delay: 0.2,
        }
      );
    }

    // Fade up paragraph
    gsap.fromTo(
      ".fade-up",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.2,
        duration: 1,
        ease: "power3.out",
        delay: 0.8,
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <main className="relative w-full min-h-screen pt-32 pb-20 px-6 md:px-10" ref={containerRef}>
      {/* Subtle noise background */}
      <div 
        className="fixed inset-0 opacity-[0.03] dark:opacity-[0.03] pointer-events-none z-0 mix-blend-overlay" 
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} 
      />

      <div className="max-w-[2000px] mx-auto z-10 relative mt-20">
        <h1 
          ref={textRef} 
          className="text-[12vw] md:text-[8vw] font-bold leading-[0.85] tracking-tighter uppercase mb-20"
        >
          <div className="overflow-hidden py-2 text-zinc-400 dark:text-zinc-600">
            {"WE ARE".split("").map((char, i) => <span key={i} className="char inline-block translate-y-full">{char === " " ? "\\u00A0" : char}</span>)}
          </div>
          <div className="overflow-hidden py-2 text-zinc-900 dark:text-white">
            {"EDITIFY.".split("").map((char, i) => <span key={i} className="char inline-block translate-y-full">{char}</span>)}
          </div>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
          <div className="fade-up">
            <h2 className="text-3xl font-medium tracking-widest text-zinc-500 uppercase mb-8">Our Mission</h2>
            <p className="text-xl md:text-3xl leading-relaxed text-zinc-800 dark:text-zinc-300 font-light">
              We are a premier video editing and creative production agency dedicated to crafting visual masterpieces for the top 1% of creators and brands. 
              We don't just edit videos; we engineer engaging, cinematic experiences that demand attention and drive culture.
            </p>
          </div>
          <div className="fade-up">
            <h2 className="text-3xl font-medium tracking-widest text-zinc-500 uppercase mb-8">The Standard</h2>
            <p className="text-xl md:text-3xl leading-relaxed text-zinc-800 dark:text-zinc-300 font-light">
              In a world flooded with average content, execution is the only differentiator. We specialize in advanced VFX, motion graphics, and narrative-driven cuts that elevate your brand from the noise. You provide the vision, we provide the execution.
            </p>
          </div>
        </div>
      </div>
      
      {/* Minimal Footer for About page */}
      <footer className="w-full mt-40 pt-10 border-t border-zinc-200 dark:border-zinc-900 flex flex-col md:flex-row justify-between items-start md:items-center gap-10 text-zinc-500 uppercase tracking-widest text-xs z-10 relative bg-zinc-50 dark:bg-[#050505]">
        <div>
          <span className="text-zinc-900 dark:text-white font-bold block mb-2 text-lg">EDITIFY STUDIOS</span>
          © 2026 All Rights Reserved
        </div>
        <div className="flex flex-col md:flex-row gap-5 md:gap-10">
          <a data-cursor-hover href="https://discord.gg/JMhA5PERdS" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Discord</a>
          <a data-cursor-hover href="https://www.youtube.com/@Editify-n1o" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-900 dark:hover:text-white transition-colors">YouTube</a>
        </div>
      </footer>
    </main>
  );
}
