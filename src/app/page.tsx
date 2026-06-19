"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Magnetic from "@/components/Magnetic";
import { ArrowUpRight } from "lucide-react";

export default function Page() {
  const textRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

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

    // Scroll trigger for grid items
    const items = document.querySelectorAll('.grid-item');
    items.forEach((item, i) => {
      gsap.fromTo(
        item,
        { y: 100, opacity: 0 },
        {
          scrollTrigger: {
            trigger: item,
            start: "top bottom-=100",
            toggleActions: "play none none reverse"
          },
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <main className="relative w-full min-h-[200vh]" ref={containerRef}>
      {/* Subtle noise background for texture (staple of Awwwards minimalism) */}
      <div 
        className="fixed inset-0 opacity-[0.03] dark:opacity-[0.03] pointer-events-none z-0 mix-blend-overlay" 
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} 
      />

      {/* Hero Section */}
      <section className="h-screen w-full flex flex-col items-center justify-center relative z-10 px-6">
        <h1 
          ref={textRef} 
          className="text-[12vw] md:text-[8vw] font-bold leading-[0.85] tracking-tighter text-center uppercase"
        >
          <div className="overflow-hidden py-2">
            {"CRAFTING".split("").map((char, i) => <span key={i} className="char inline-block translate-y-full">{char}</span>)}
          </div>
          <div className="overflow-hidden py-2 text-zinc-400 dark:text-zinc-600">
            {"NEXT LEVEL".split("").map((char, i) => <span key={i} className="char inline-block translate-y-full">{char}</span>)}
          </div>
          <div className="overflow-hidden py-2">
            {"EXPERIENCES".split("").map((char, i) => <span key={i} className="char inline-block translate-y-full">{char}</span>)}
          </div>
        </h1>

        <div className="absolute bottom-10 left-10 text-xs tracking-[0.3em] text-zinc-500 uppercase flex items-center gap-4">
          <div className="w-12 h-[1px] bg-zinc-300 dark:bg-zinc-700" />
          Scroll to explore
        </div>

        <div className="absolute bottom-10 right-10">
          <Magnetic>
            <a href="#works" data-cursor-hover className="w-28 h-28 rounded-full bg-zinc-900 text-white dark:bg-[#f4f4f4] dark:text-[#050505] flex items-center justify-center hover:scale-95 transition-transform duration-500 ease-out font-medium tracking-widest text-sm">
              EXPLORE
            </a>
          </Magnetic>
        </div>
      </section>

      {/* Bento Grid Section */}
      <section id="works" className="w-full px-5 md:px-10 py-32 z-10 relative bg-zinc-50/50 dark:bg-[#050505]/50 backdrop-blur-md">
        <div className="max-w-[2000px] mx-auto">
          <h2 className="grid-item text-[6vw] md:text-[4vw] font-bold leading-none tracking-tighter uppercase mb-20 text-zinc-900 dark:text-white">
            Latest Edits.
          </h2>
          <div className="grid grid-cols-1 gap-5">
            {/* Main featured project pointing to real YouTube */}
            <a href="https://www.youtube.com/@Editify-n1o" target="_blank" rel="noopener noreferrer" data-cursor-hover className="grid-item group relative aspect-[16/9] md:aspect-[21/9] bg-zinc-200 dark:bg-zinc-900 rounded-[2rem] overflow-hidden cursor-pointer block">
              <div className="absolute inset-0 bg-zinc-900/40 dark:bg-black/60 group-hover:bg-black/20 transition-colors duration-700 z-10" />
              <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000&auto=format&fit=crop" alt="youtube channel" className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] grayscale group-hover:grayscale-0" />
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-6 opacity-0 translate-y-8 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]">
                <span className="text-white font-bold uppercase tracking-[0.2em] text-xl md:text-3xl text-center px-4">Watch Our Real Work on YouTube</span>
                <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center hover:scale-110 transition-transform">
                  <div className="w-0 h-0 border-t-8 border-t-transparent border-l-[12px] border-l-white border-b-8 border-b-transparent ml-1" />
                </div>
              </div>
            </a>
          </div>
        </div>
      </section>



      {/* Pricing Section */}
      <section id="pricing" className="w-full px-5 md:px-10 py-32 z-10 relative border-t border-zinc-200 dark:border-zinc-900/50">
        <div className="max-w-[2000px] mx-auto">
          <h2 className="grid-item text-[6vw] md:text-[4vw] font-bold leading-none tracking-tighter uppercase mb-20 text-zinc-900 dark:text-white">
            Investment.
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Art Category */}
            <div className="grid-item flex flex-col gap-5 p-10 rounded-[2rem] border border-zinc-200 bg-white/50 dark:border-zinc-800/50 dark:bg-zinc-950/50 backdrop-blur-sm hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors duration-500">
              <h3 className="text-2xl font-medium tracking-widest text-zinc-500 uppercase mb-5">Digital Art</h3>
              
              <div className="flex justify-between items-end border-b border-zinc-200 dark:border-zinc-800 pb-5">
                <div className="flex flex-col">
                  <span className="text-3xl font-bold uppercase text-zinc-900 dark:text-white">Standard</span>
                  <span className="text-sm text-zinc-500 mt-2">Clean, high-quality bespoke artwork.</span>
                </div>
                <span className="text-3xl font-light text-zinc-900 dark:text-white">$20</span>
              </div>
              
              <div className="flex justify-between items-end border-b border-zinc-200 dark:border-zinc-800 pb-5 pt-5">
                <div className="flex flex-col">
                  <span className="text-3xl font-bold uppercase text-zinc-900 dark:text-white">Premium</span>
                  <span className="text-sm text-zinc-500 mt-2">Complex compositions & unlimited revisions.</span>
                </div>
                <span className="text-3xl font-light text-zinc-900 dark:text-white">$50</span>
              </div>
            </div>

            {/* Video Category */}
            <div className="grid-item flex flex-col gap-5 p-10 rounded-[2rem] border border-zinc-200 bg-white/50 dark:border-zinc-800/50 dark:bg-zinc-950/50 backdrop-blur-sm hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors duration-500">
              <h3 className="text-2xl font-medium tracking-widest text-zinc-500 uppercase mb-5">Video Editing</h3>
              
              <div className="flex justify-between items-end border-b border-zinc-200 dark:border-zinc-800 pb-5">
                <div className="flex flex-col">
                  <span className="text-3xl font-bold uppercase text-zinc-900 dark:text-white">Standard</span>
                  <span className="text-sm text-zinc-500 mt-2">Professional cuts, color correction & sound.</span>
                </div>
                <span className="text-3xl font-light text-zinc-900 dark:text-white">$40</span>
              </div>
              
              <div className="flex justify-between items-end border-b border-zinc-200 dark:border-zinc-800 pb-5 pt-5">
                <div className="flex flex-col">
                  <span className="text-3xl font-bold uppercase text-zinc-900 dark:text-white">Premium</span>
                  <span className="text-sm text-zinc-500 mt-2">Advanced VFX, motion graphics & cinematic grade.</span>
                </div>
                <span className="text-3xl font-light text-zinc-900 dark:text-white">$100</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Minimal Footer */}
      <footer className="w-full px-10 py-20 border-t border-zinc-200 dark:border-zinc-900 flex flex-col md:flex-row justify-between items-start md:items-center gap-10 text-zinc-500 uppercase tracking-widest text-xs z-10 relative bg-zinc-50 dark:bg-[#050505]">
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
