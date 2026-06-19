import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white font-sans selection:bg-[#cca845] selection:text-black">
      {/* 
        ====================================================
        NAVBAR
        ====================================================
      */}
      <nav className="fixed top-0 left-0 w-full p-6 flex justify-between items-center z-50 bg-black/80 backdrop-blur-md">
        <div className="flex items-center">
          <Image 
            src="/logo.jpg" 
            alt="Editify Logo" 
            width={40} 
            height={40} 
            className="rounded-full border border-[#cca845]" 
          />
        </div>
        
        {/* Desktop Links */}
        <div className="hidden md:flex gap-8 text-sm tracking-[0.2em] font-semibold">
          <Link href="#home" className="hover:text-[#cca845] transition-colors">HOME</Link>
          <Link href="#works" className="hover:text-[#cca845] transition-colors">WORKS</Link>
          <Link href="#reviews" className="hover:text-[#cca845] transition-colors">REVIEWS</Link>
          <Link href="#prices" className="hover:text-[#cca845] transition-colors">PRICES</Link>
          <Link href="#about" className="hover:text-[#cca845] transition-colors">ABOUT</Link>
        </div>

        {/* Small hidden links shown in screenshot (Home Live Industry Gaming Sector Reviews Prices About) */}
        <div className="hidden lg:flex gap-2 text-xs text-blue-600 underline opacity-0 pointer-events-none">
          {/* This matches the odd blue links visible in their raw screenshot, but keeping it hidden for cleanliness */}
          <span>Home Live Industry Gaming Sector Reviews Prices About</span>
        </div>
      </nav>

      {/* 
        ====================================================
        HERO SECTION
        ====================================================
      */}
      <section id="home" className="pt-40 pb-20 px-4 flex flex-col items-center justify-center text-center">
        {/* The Golden Circle Logo */}
        <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-full border-4 border-[#cca845] flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(204,168,69,0.3)] bg-white">
          <Image 
            src="/logo.jpg" 
            alt="Editify Studios" 
            width={180} 
            height={180} 
            className="object-contain" 
          />
        </div>

        <h2 className="text-2xl md:text-3xl text-[#cca845] tracking-[0.1em] font-bold mt-4">
          AN EDITING SERVICE
        </h2>
      </section>

      {/* 
        ====================================================
        FOUR FEATURE CARDS
        ====================================================
      */}
      <section className="max-w-7xl mx-auto px-4 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card 1 */}
          <div className="bg-[#111] border border-[#222] rounded-xl p-8 text-center hover:-translate-y-2 transition-transform duration-300">
            <h3 className="text-xl text-[#cca845] font-bold mb-4 flex items-center justify-center gap-2">
              <span>⚡</span> FAST TURNAROUND
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Get your projects delivered quickly — whether it's a video edit, animation, banner, or thumbnail. We prioritize speed without compromising quality.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-[#111] border border-[#222] rounded-xl p-8 text-center hover:-translate-y-2 transition-transform duration-300">
            <h3 className="text-xl text-[#cca845] font-bold mb-4 flex items-center justify-center gap-2">
              <span>💰</span> BEST PRICE GUARANTEE
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              We offer premium creative services at unbeatable prices. You get the best value across editing, design, and animation.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-[#111] border border-[#222] rounded-xl p-8 text-center hover:-translate-y-2 transition-transform duration-300">
            <h3 className="text-xl text-[#cca845] font-bold mb-4 flex items-center justify-center gap-2">
              <span>💻</span> TOP-TIER CREATIVES
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Our team includes editors, designers, and animators who've worked with well over 100 clients, ensuring top-quality results every time.
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-[#111] border border-[#222] rounded-xl p-8 text-center hover:-translate-y-2 transition-transform duration-300">
            <h3 className="text-xl text-[#cca845] font-bold mb-4 flex items-center justify-center gap-2">
              <span>🔄</span> UNLIMITED REVISIONS
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              We're not done until you're happy. Enjoy unlimited fair revisions to perfect your project without extra charges.
            </p>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-10 border-t border-[#222] text-gray-600 text-sm">
        <p>© 2026 Editify Studios. All rights reserved.</p>
      </footer>
    </main>
  );
}
