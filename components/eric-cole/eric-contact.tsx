'use client';

import React, { useState } from 'react';
import { SiteContent } from '@/types/content';
import { siteConfig } from '@/data/site';
import { ArrowUpRight, Check } from 'lucide-react';

export interface EricContactProps {
  siteContent?: SiteContent;
}

export const EricContact: React.FC<EricContactProps> = ({ siteContent }) => {
  const email = siteContent?.email || siteConfig.email;
  const github = siteContent?.github || siteConfig.github;
  const linkedin = siteContent?.linkedin || siteConfig.linkedin;
  const instagram = siteContent?.instagram || siteConfig.instagram;
  const name = siteContent?.name || siteConfig.name;

  const [selectedBudget, setSelectedBudget] = useState('LESS THAN $5K');
  const [formSent, setFormSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
    setTimeout(() => setFormSent(false), 4000);
  };

  return (
    <footer
      id="contact"
      aria-label="Eric Cole Contact & Client Proof"
      className="relative w-full pt-24 pb-12 px-6 sm:px-12 lg:px-16 bg-transparent select-none font-sans"
    >
      <div className="max-w-5xl mx-auto space-y-20 sm:space-y-28">
        {/* =================================================================
            1. CONTACT FORM HEADER (EXACT VIDEO MATCH 00:22)
            ================================================================= */}
        <div className="space-y-4 text-center">
          <span className="font-mono text-xs text-white/50 uppercase tracking-widest block">
            [ LET&apos;S TALK ]
          </span>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-[-0.03em] text-white leading-tight">
            GOOD PRODUCT STARTS WITH GOOD COLLABORATION
          </h2>
        </div>

        {/* =================================================================
            2. MINIMALIST CONTACT FORM
            ================================================================= */}
        <form onSubmit={handleSubmit} className="space-y-8 font-mono text-xs max-w-2xl mx-auto">
          {/* Name Field */}
          <div className="space-y-2">
            <label className="text-white/60 uppercase tracking-wider block text-[11px]">
              NAME*
            </label>
            <input
              type="text"
              required
              placeholder="JOHN DOE"
              className="w-full pb-2 bg-transparent border-b border-white/20 text-white placeholder:text-white/20 font-mono text-sm focus:outline-none focus:border-white transition-colors"
            />
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <label className="text-white/60 uppercase tracking-wider block text-[11px]">
              EMAIL*
            </label>
            <input
              type="email"
              required
              placeholder="EXAMPLE@EMAIL.COM"
              className="w-full pb-2 bg-transparent border-b border-white/20 text-white placeholder:text-white/20 font-mono text-sm focus:outline-none focus:border-white transition-colors"
            />
          </div>

          {/* What are you building? */}
          <div className="space-y-2">
            <label className="text-white/60 uppercase tracking-wider block text-[11px]">
              WHAT ARE YOU BUILDING?*
            </label>
            <textarea
              rows={3}
              required
              placeholder="DESCRIBE YOUR PROJECT IN A FEW WORDS"
              className="w-full pb-2 bg-transparent border-b border-white/20 text-white placeholder:text-white/20 font-mono text-sm focus:outline-none focus:border-white transition-colors resize-none"
            />
          </div>

          {/* Budget Selector */}
          <div className="space-y-3">
            <label className="text-white/60 uppercase tracking-wider block text-[11px]">
              BUDGET (USD)*
            </label>
            <div className="flex flex-wrap gap-3">
              {['LESS THAN $5K', '$5K - $10K', '+$10K'].map((b) => (
                <button
                  key={b}
                  type="button"
                  onClick={() => setSelectedBudget(b)}
                  className={`px-4 py-2 rounded-[2px] border text-xs font-bold uppercase transition-all ${
                    selectedBudget === b
                      ? 'bg-white text-black border-white'
                      : 'bg-transparent text-white/60 border-white/20 hover:border-white/50 hover:text-white'
                  }`}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-4 bg-white text-black font-black uppercase tracking-widest text-xs rounded-[2px] hover:bg-white/90 transition-all flex items-center justify-center gap-2 shadow-xl"
            >
              {formSent ? <Check className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
              <span>{formSent ? 'MESSAGE TRANSMITTED' : 'START CONVERSATION'}</span>
            </button>
          </div>
        </form>

        {/* =================================================================
            3. MASSIVE PANORAMIC CRT TV: CLIENT PROOF (EXACT MATCH TO SCREENSHOT)
            ================================================================= */}
        <div className="w-full relative bg-[#18181b] border-2 border-white/20 rounded-[12px] sm:rounded-[18px] overflow-hidden shadow-2xl">
          
          {/* Top Floating Navigation Overlaid on the TV Housing (Exact Match to Screenshot) */}
          <div className="w-full px-6 sm:px-10 py-4 flex items-center justify-between border-b border-white/10 font-mono text-xs text-white/70 bg-black/60 backdrop-blur-sm z-20 relative">
            <a href="#home" className="flex flex-col leading-none font-black text-xs uppercase tracking-tight text-white">
              <span className="flex items-center">
                <span className="font-flourish text-lg lowercase pr-0.5 text-white">j</span>eet
              </span>
              <span className="flex items-center tracking-tighter">
                rakholiy<span className="font-flourish text-lg lowercase text-white">a</span>
              </span>
            </a>

            <div className="hidden sm:flex items-center gap-8 font-mono text-xs uppercase tracking-widest text-white/80">
              <a href="#work" className="hover:text-white font-semibold transition-colors">+ WORK</a>
              <a href="#about" className="hover:text-white font-semibold transition-colors">+ ABOUT</a>
              <a href="#services" className="hover:text-white font-semibold transition-colors">+ SERVICES</a>
            </div>

            <a
              href="#contact"
              className="font-mono text-xs uppercase tracking-widest text-white font-bold hover:underline inline-flex items-center gap-1"
            >
              <span>CONTACT</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Main Panoramic TV Body */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 relative bg-[#121214]">
            
            {/* LEFT / CENTER: GIANT CRT PHOSPHOR SCREEN (~75% WIDTH) */}
            <div className="lg:col-span-9 p-6 sm:p-12 bg-black relative overflow-hidden flex flex-col justify-between min-h-[440px] border-b lg:border-b-0 lg:border-r border-white/15">
              
              {/* Cathode Ray Scanline Overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.5)_51%)] bg-[length:100%_4px] opacity-40 pointer-events-none" />
              
              {/* Screen Content */}
              <div className="relative z-10 space-y-8 my-auto">
                <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-wider text-white text-center sm:text-left">
                  CLIENT PROOF
                </h3>

                <div className="space-y-6 font-mono text-xs">
                  {/* Row 1 */}
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-6 items-start">
                    <div className="sm:col-span-4 text-white/40 space-y-0.5 uppercase tracking-wider text-[11px]">
                      <div className="font-bold text-white/70">DANIEL KIM</div>
                      <div>PRODUCT MANAGER</div>
                    </div>
                    <div className="sm:col-span-8 text-white/80 uppercase leading-relaxed text-[11px]">
                      HE DELIVERED EVERYTHING FASTER THAN EXPECTED AND WITH A LEVEL OF PRECISION THAT MADE OUR PRODUCT FEEL POLISHED FROM DAY ONE.
                    </div>
                  </div>

                  {/* Row 2 */}
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-6 items-start pt-4 border-t border-white/10">
                    <div className="sm:col-span-4 text-white/40 space-y-0.5 uppercase tracking-wider text-[11px]">
                      <div className="font-bold text-white/70">MICHAEL TURNER</div>
                      <div>STARTUP FOUNDER</div>
                    </div>
                    <div className="sm:col-span-8 text-white/80 uppercase leading-relaxed text-[11px]">
                      WORKING WITH HIM WAS SMOOTH FROM START TO FINISH. HE UNDERSTOOD OUR NEEDS QUICKLY AND BUILT A SOLID, RELIABLE PRODUCT.
                    </div>
                  </div>

                  {/* Row 3 */}
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-6 items-start pt-4 border-t border-white/10">
                    <div className="sm:col-span-4 text-white/40 space-y-0.5 uppercase tracking-wider text-[11px]">
                      <div className="font-bold text-white/70">EMMA RICHARDS</div>
                      <div>TECH LEAD</div>
                    </div>
                    <div className="sm:col-span-8 text-white/80 uppercase leading-relaxed text-[11px]">
                      SUPER RELIABLE AND DETAIL-ORIENTED. YOU CAN TRUST HIM TO TAKE OWNERSHIP AND SHIP HIGH-QUALITY WORK WITHOUT HAND-HOLDING.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT: VINTAGE METALLIC RIBBED SPEAKER & DIAL PANEL (~25% WIDTH) */}
            <div className="lg:col-span-3 bg-gradient-to-b from-[#2a2a2e] via-[#1e1e22] to-[#141416] p-6 flex flex-col justify-between gap-6 border-l border-white/10">
              {/* Dial Knobs */}
              <div className="flex flex-col items-center gap-4 py-2">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#161618] via-[#333338] to-[#4e4e56] border-2 border-white/30 shadow-md flex items-center justify-center">
                  <div className="w-8 h-1 bg-white/50 rounded-full" />
                </div>
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#161618] via-[#333338] to-[#4e4e56] border-2 border-white/30 shadow-md flex items-center justify-center">
                  <div className="w-8 h-1 bg-white/50 rounded-full" />
                </div>
              </div>

              {/* Horizontal Metallic Ribbed Speaker Grilles (Exact Screenshot Match) */}
              <div className="space-y-1.5 py-4">
                {Array.from({ length: 14 }).map((_, i) => (
                  <div key={i} className="h-1.5 w-full bg-[#0d0d0f] rounded-full shadow-inner border-b border-white/10" />
                ))}
              </div>

              <div className="text-center font-mono text-[9px] text-white/40 uppercase tracking-widest">
                MODEL: 1994 &bull; HI-FI
              </div>
            </div>

          </div>

          {/* Bottom 4-Column Grid Channel Bar (Exact Match to Screenshot) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-white/15 border-t border-white/15 font-mono text-xs text-white/70 bg-[#0d0d0f]">
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="py-4 px-6 hover:text-white hover:bg-white/5 transition-colors uppercase tracking-widest text-center"
            >
              + GITHUB
            </a>
            <a
              href={instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="py-4 px-6 hover:text-white hover:bg-white/5 transition-colors uppercase tracking-widest text-center"
            >
              + X/TWITTER
            </a>
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="py-4 px-6 hover:text-white hover:bg-white/5 transition-colors uppercase tracking-widest text-center"
            >
              + LINKEDIN
            </a>
            <a
              href={`mailto:${email}`}
              className="py-4 px-6 hover:text-white hover:bg-white/5 transition-colors uppercase tracking-widest text-center"
            >
              + EMAIL
            </a>
          </div>

        </div>

        {/* Bottom Time & Copyright */}
        <div className="pt-6 border-t border-white/10 flex items-center justify-between font-mono text-xs text-white/50 uppercase tracking-widest">
          <span>&odot; GUJARAT, IN  (UTC+5:30)</span>
          <span className="text-2xl font-black text-white">&copy;2026</span>
        </div>
      </div>
    </footer>
  );
};
