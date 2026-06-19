import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* 
        ====================================================
        HEADER / NAVBAR
        ====================================================
      */}
      <header className="fixed top-0 left-0 w-full h-[70px] bg-[#050505]/80 backdrop-blur-md border-b border-white/10 z-50 flex items-center justify-center">
        {/* Top Left Logo */}
        <div className="fixed top-[10px] left-[20px] w-[50px] h-[50px] rounded-full border-2 border-[#B8860B] shadow-[0_0_15px_rgba(212,175,55,0.15)] overflow-hidden hover:scale-110 hover:rotate-6 transition-transform duration-300 z-[1001]">
          <Image 
            src="/top_logo.jpg" 
            alt="Editify Logo" 
            fill
            className="object-cover" 
          />
        </div>

        {/* Centered Nav Links */}
        <nav className="flex gap-10">
          {["HOME", "WORKS", "REVIEWS", "PRICES", "ABOUT"].map((item) => (
            <Link 
              key={item} 
              href={`#${item.toLowerCase()}`}
              className="font-bebas text-[20px] tracking-[2px] text-[#f8f5ed] hover:text-[#D4AF37] hover:drop-shadow-[0_0_10px_rgba(212,175,55,0.15)] relative group transition-all duration-300"
            >
              {item}
              {/* Golden Underline on Hover */}
              <span className="absolute bottom-[-5px] left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-[#D4AF37] to-[#B8860B] transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>
      </header>

      <div className="mt-[100px] px-5 max-w-[1400px] mx-auto">
        {/* 
          ====================================================
          HOME SECTION
          ====================================================
        */}
        <section id="home" className="text-center py-20">
          {/* Logo Placeholder with gradient border */}
          <div className="w-[180px] h-[180px] mx-auto mb-[30px] rounded-full p-[5px] bg-gradient-to-br from-[#D4AF37] to-[#B8860B] shadow-[0_0_40px_rgba(212,175,55,0.15)] relative">
            <div className="w-full h-full rounded-full border-4 border-[#050505] overflow-hidden relative">
              <Image 
                src="/logo.jpg" 
                alt="Editify Logo" 
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          <h2 className="font-bebas text-[32px] tracking-[2px] text-[#D4AF37] drop-shadow-[0_0_20px_rgba(212,175,55,0.15)] mb-[60px]">
            AN EDITING SERVICE
          </h2>

          {/* 
            ====================================================
            FOUR FEATURE CARDS
            ====================================================
          */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[30px] max-w-[1200px] mx-auto">
            {/* Card 1 */}
            <div className="relative p-10 text-center bg-[#141414]/60 backdrop-blur-md rounded-[20px] border border-white/10 hover:border-[#D4AF37]/50 hover:shadow-[0_20px_40px_rgba(0,0,0,0.5),0_0_20px_rgba(212,175,55,0.15)] hover:-translate-y-[5px] transition-all duration-400 z-10 overflow-hidden group">
              <div className="absolute inset-0 rounded-[20px] bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              <h3 className="font-bebas text-[24px] tracking-[1px] text-[#D4AF37] mb-5">
                ⚡ Fast Turnaround
              </h3>
              <p className="text-[15px] text-[#a0a0a0]">
                Get your projects delivered quickly — whether it's a video edit, animation, banner, or thumbnail. We prioritize speed without compromising quality.
              </p>
            </div>

            {/* Card 2 */}
            <div className="relative p-10 text-center bg-[#141414]/60 backdrop-blur-md rounded-[20px] border border-white/10 hover:border-[#D4AF37]/50 hover:shadow-[0_20px_40px_rgba(0,0,0,0.5),0_0_20px_rgba(212,175,55,0.15)] hover:-translate-y-[5px] transition-all duration-400 z-10 overflow-hidden group">
              <div className="absolute inset-0 rounded-[20px] bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              <h3 className="font-bebas text-[24px] tracking-[1px] text-[#D4AF37] mb-5">
                💰 Best Price Guarantee
              </h3>
              <p className="text-[15px] text-[#a0a0a0]">
                We offer premium creative services at unbeatable prices. You get the best value across editing, design, and animation.
              </p>
            </div>

            {/* Card 3 */}
            <div className="relative p-10 text-center bg-[#141414]/60 backdrop-blur-md rounded-[20px] border border-white/10 hover:border-[#D4AF37]/50 hover:shadow-[0_20px_40px_rgba(0,0,0,0.5),0_0_20px_rgba(212,175,55,0.15)] hover:-translate-y-[5px] transition-all duration-400 z-10 overflow-hidden group">
              <div className="absolute inset-0 rounded-[20px] bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              <h3 className="font-bebas text-[24px] tracking-[1px] text-[#D4AF37] mb-5">
                💻 Top-Tier Creatives
              </h3>
              <p className="text-[15px] text-[#a0a0a0]">
                Our team includes editors, designers, and animators who've worked with well over 100 clients, ensuring top-quality results every time.
              </p>
            </div>

            {/* Card 4 */}
            <div className="relative p-10 text-center bg-[#141414]/60 backdrop-blur-md rounded-[20px] border border-white/10 hover:border-[#D4AF37]/50 hover:shadow-[0_20px_40px_rgba(0,0,0,0.5),0_0_20px_rgba(212,175,55,0.15)] hover:-translate-y-[5px] transition-all duration-400 z-10 overflow-hidden group">
              <div className="absolute inset-0 rounded-[20px] bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              <h3 className="font-bebas text-[24px] tracking-[1px] text-[#D4AF37] mb-5">
                🔄 Unlimited Revisions
              </h3>
              <p className="text-[15px] text-[#a0a0a0]">
                We're not done until you're happy. Enjoy unlimited fair revisions to perfect your project without extra charges.
              </p>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}
