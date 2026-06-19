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
    <main className="relative w-full bg-[#050505] min-h-[200vh]" ref={containerRef}>
      {/* Subtle noise background for texture (staple of Awwwards minimalism) */}
      <div 
        className="fixed inset-0 opacity-[0.03] pointer-events-none z-0 mix-blend-overlay" 
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
          <div className="overflow-hidden py-2 text-zinc-600">
            {"NEXT LEVEL".split("").map((char, i) => <span key={i} className="char inline-block translate-y-full">{char}</span>)}
          </div>
          <div className="overflow-hidden py-2">
            {"EXPERIENCES".split("").map((char, i) => <span key={i} className="char inline-block translate-y-full">{char}</span>)}
          </div>
        </h1>

        <div className="absolute bottom-10 left-10 text-xs tracking-[0.3em] text-zinc-500 uppercase flex items-center gap-4">
          <div className="w-12 h-[1px] bg-zinc-700" />
          Scroll to explore
        </div>

        <div className="absolute bottom-10 right-10">
          <Magnetic>
            <button data-cursor-hover className="w-28 h-28 rounded-full bg-[#f4f4f4] text-[#050505] flex items-center justify-center hover:scale-95 transition-transform duration-500 ease-out font-medium tracking-widest text-sm">
              PLAY REEL
            </button>
          </Magnetic>
        </div>
      </section>

      {/* Bento Grid Section */}
      <section id="works" className="w-full px-5 md:px-10 py-32 z-10 relative bg-[#050505]">
        <div className="max-w-[2000px] mx-auto">
          <h2 className="grid-item text-[6vw] md:text-[4vw] font-bold leading-none tracking-tighter uppercase mb-20 text-white">
            Selected Works.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Main featured project takes up 2 cols on lg */}
            <div data-cursor-hover className="grid-item lg:col-span-2 group relative aspect-[16/9] bg-zinc-900 rounded-[2rem] overflow-hidden cursor-pointer">
              <div className="absolute inset-0 bg-black/60 group-hover:bg-black/20 transition-colors duration-700 z-10" />
              <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000&auto=format&fit=crop" alt="work" className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] grayscale group-hover:grayscale-0" />
              <div className="absolute bottom-10 left-10 z-20 flex items-center gap-4 opacity-0 translate-y-8 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]">
                <span className="text-white font-medium uppercase tracking-[0.2em] text-sm md:text-lg">Premium Editorial</span>
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                  <ArrowUpRight className="text-black w-5 h-5" />
                </div>
              </div>
            </div>

            {[1,2,3,4].map((item) => (
              <div key={item} data-cursor-hover className="grid-item group relative aspect-[4/5] bg-zinc-900 rounded-[2rem] overflow-hidden cursor-pointer">
                <div className="absolute inset-0 bg-black/60 group-hover:bg-black/20 transition-colors duration-700 z-10" />
                <img src={`https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3`} alt="work" className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] grayscale group-hover:grayscale-0" />
                <div className="absolute bottom-8 left-8 z-20 flex items-center gap-3 opacity-0 translate-y-6 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]">
                  <span className="text-white font-medium uppercase tracking-wider text-sm">Creative {item}</span>
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                    <ArrowUpRight className="text-black w-4 h-4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="w-full px-5 md:px-10 py-32 z-10 relative bg-[#050505] border-t border-zinc-900/50">
        <div className="max-w-[2000px] mx-auto">
          <h2 className="grid-item text-3xl font-medium tracking-widest text-zinc-500 uppercase mb-20 text-center">
            Client Testimonials
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20">
            <div className="grid-item flex flex-col gap-6">
              <p className="text-2xl md:text-4xl leading-snug font-light text-zinc-300">
                "The best editing studio we have ever worked with. They completely transformed our brand's visual identity."
              </p>
              <div className="flex flex-col">
                <span className="text-white font-bold uppercase tracking-widest">Creator XYZ</span>
                <span className="text-zinc-500 text-sm">1.2M+ Subscribers</span>
              </div>
            </div>
            <div className="grid-item flex flex-col gap-6">
              <p className="text-2xl md:text-4xl leading-snug font-light text-zinc-300">
                "Editify doesn't just cut video, they engineer engagement. Our retention rates doubled on the first project."
              </p>
              <div className="flex flex-col">
                <span className="text-white font-bold uppercase tracking-widest">Agency Alpha</span>
                <span className="text-zinc-500 text-sm">Creative Director</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="w-full px-5 md:px-10 py-32 z-10 relative bg-[#050505] border-t border-zinc-900/50">
        <div className="max-w-[2000px] mx-auto">
          <h2 className="grid-item text-[6vw] md:text-[4vw] font-bold leading-none tracking-tighter uppercase mb-20">
            Investment.
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Art Category */}
            <div className="grid-item flex flex-col gap-5 p-10 rounded-[2rem] border border-zinc-800/50 bg-zinc-950/50 backdrop-blur-sm hover:border-zinc-700 transition-colors duration-500">
              <h3 className="text-2xl font-medium tracking-widest text-zinc-500 uppercase mb-5">Digital Art</h3>
              
              <div className="flex justify-between items-end border-b border-zinc-800 pb-5">
                <div className="flex flex-col">
                  <span className="text-3xl font-bold uppercase">Standard</span>
                  <span className="text-sm text-zinc-500 mt-2">Clean, high-quality bespoke artwork.</span>
                </div>
                <span className="text-3xl font-light">$20</span>
              </div>
              
              <div className="flex justify-between items-end border-b border-zinc-800 pb-5 pt-5">
                <div className="flex flex-col">
                  <span className="text-3xl font-bold uppercase">Premium</span>
                  <span className="text-sm text-zinc-500 mt-2">Complex compositions & unlimited revisions.</span>
                </div>
                <span className="text-3xl font-light">$50</span>
              </div>
            </div>

            {/* Video Category */}
            <div className="grid-item flex flex-col gap-5 p-10 rounded-[2rem] border border-zinc-800/50 bg-zinc-950/50 backdrop-blur-sm hover:border-zinc-700 transition-colors duration-500">
              <h3 className="text-2xl font-medium tracking-widest text-zinc-500 uppercase mb-5">Video Editing</h3>
              
              <div className="flex justify-between items-end border-b border-zinc-800 pb-5">
                <div className="flex flex-col">
                  <span className="text-3xl font-bold uppercase">Standard</span>
                  <span className="text-sm text-zinc-500 mt-2">Professional cuts, color correction & sound.</span>
                </div>
                <span className="text-3xl font-light">$40</span>
              </div>
              
              <div className="flex justify-between items-end border-b border-zinc-800 pb-5 pt-5">
                <div className="flex flex-col">
                  <span className="text-3xl font-bold uppercase text-[#f4f4f4]">Premium</span>
                  <span className="text-sm text-zinc-500 mt-2">Advanced VFX, motion graphics & cinematic grade.</span>
                </div>
                <span className="text-3xl font-light">$100</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Minimal Footer */}
      <footer className="w-full px-10 py-20 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-start md:items-center gap-10 text-zinc-500 uppercase tracking-widest text-xs z-10 relative bg-[#050505]">
        <div>
          <span className="text-white font-bold block mb-2 text-lg">EDITIFY STUDIOS</span>
          © 2026 All Rights Reserved
        </div>
        <div className="flex flex-col md:flex-row gap-5 md:gap-10">
          <a data-cursor-hover href="mailto:hello@editify.studios" className="hover:text-white transition-colors">hello@editify.studios</a>
          <a data-cursor-hover href="https://discord.gg/JMhA5PERdS" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Discord</a>
          <a data-cursor-hover href="https://www.youtube.com/@Editify-n1o" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">YouTube</a>
        </div>
      </footer>
    </main>
  );
}
