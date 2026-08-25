'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { SiteContent } from '@/types/content';
import { siteConfig } from '@/data/site';
import { Send, Check, Github, Linkedin, Instagram, Mail } from 'lucide-react';

export interface SpiderContactProps {
  siteContent?: SiteContent;
}

export const SpiderContact: React.FC<SpiderContactProps> = ({ siteContent }) => {
  const email = siteContent?.email || siteConfig.email;
  const github = siteContent?.github || siteConfig.github;
  const linkedin = siteContent?.linkedin || siteConfig.linkedin;
  const instagram = siteContent?.instagram || siteConfig.instagram;
  const name = siteContent?.name || siteConfig.name;

  const [formSent, setFormSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
    setTimeout(() => setFormSent(false), 4500);
  };

  return (
    <footer
      id="spider-contact"
      aria-label="Spider-Signal Dispatch Terminal"
      className="relative w-full pt-24 pb-16 px-6 sm:px-12 lg:px-16 bg-transparent text-[#ffffff] select-none font-sans border-t border-white/15 overflow-hidden"
    >
      <div className="max-w-5xl mx-auto space-y-16 sm:space-y-24 relative z-10">
        
        {/* =================================================================
            1. SPIDER-SIGNAL DISPATCH HEADER
            ================================================================= */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-3">
            <span className="w-8 h-0.5 bg-gradient-to-r from-transparent to-[#c40c24]" />
            <span className="font-mono text-xs text-[#c40c24] uppercase tracking-[0.34em] font-bold">
              COMMUNICATION BEACON ACTIVE
            </span>
            <span className="w-8 h-0.5 bg-gradient-to-r from-[#c40c24] to-transparent" />
          </div>

          <h2 className="text-4xl sm:text-7xl font-black uppercase tracking-[-0.03em] text-white">
            PROJECT THE <span className="text-[#c40c24] drop-shadow-[0_0_25px_rgba(196,12,36,0.7)]">SPIDER-SIGNAL</span>
          </h2>

          <p className="max-w-2xl mx-auto font-sans text-xs sm:text-sm text-white/70 uppercase tracking-wider leading-relaxed">
            NEED A HIGH-SPEED WEB APPLICATION, AN AI AGENT SYSTEM, OR FULL-STACK ARCHITECTURE? TRANSMIT YOUR BRIEF DIRECTLY TO THE SPIDER-NETWORK.
          </p>
        </div>

        {/* =================================================================
            2. SPIDER-MAN CONTACT TERMINAL (DARK SUIT RED, BLACK, WHITE)
            ================================================================= */}
        <div className="max-w-2xl mx-auto bg-[#0a0a0c] border-2 border-white/20 rounded-[12px] p-6 sm:p-10 shadow-[0_0_40px_rgba(196,12,36,0.25)] relative">
          
          <form onSubmit={handleSubmit} className="space-y-6 font-mono text-xs">
            
            {/* Name Field */}
            <div className="space-y-2">
              <label className="text-[#c40c24] uppercase tracking-wider block text-[11px] font-bold">
                TRANSMITTER IDENTITY (NAME)*
              </label>
              <input
                type="text"
                required
                placeholder="PETER PARKER / MILES MORALES"
                className="w-full px-4 py-3 bg-black border border-white/20 rounded text-white placeholder:text-white/30 font-mono text-sm focus:outline-none focus:border-[#c40c24] focus:shadow-[0_0_15px_rgba(196,12,36,0.35)] transition-all"
              />
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-[#c40c24] uppercase tracking-wider block text-[11px] font-bold">
                FREQUENCY COORDINATE (EMAIL)*
              </label>
              <input
                type="email"
                required
                placeholder="YOUR.EMAIL@SPIDERMAN.COM"
                className="w-full px-4 py-3 bg-black border border-white/20 rounded text-white placeholder:text-white/30 font-mono text-sm focus:outline-none focus:border-[#c40c24] focus:shadow-[0_0_15px_rgba(196,12,36,0.35)] transition-all"
              />
            </div>

            {/* Mission Brief Message */}
            <div className="space-y-2">
              <label className="text-[#c40c24] uppercase tracking-wider block text-[11px] font-bold">
                MISSION BRIEF (PROJECT DETAILS)*
              </label>
              <textarea
                rows={3}
                required
                placeholder="DESCRIBE THE OBJECTIVE, TECH REQUIREMENTS, AND TIMELINE"
                className="w-full px-4 py-3 bg-black border border-white/20 rounded text-white placeholder:text-white/30 font-mono text-sm focus:outline-none focus:border-[#c40c24] focus:shadow-[0_0_15px_rgba(196,12,36,0.35)] transition-all resize-none"
              />
            </div>

            {/* Dispatch Button with Dark Suit Red Chamfer Styling */}
            <div className="pt-2">
              <button
                type="submit"
                data-web-hover="true"
                className="w-full relative p-[2px] bg-gradient-to-b from-[#c40c24] to-[#60000e] [clip-path:polygon(14px_0,100%_0,100%_calc(100%-14px),calc(100%-14px)_100%,0_100%,0_14px)] shadow-[0_10px_30px_rgba(196,12,36,0.6)] active:scale-95 transition-transform block"
              >
                <span className="w-full py-4 bg-gradient-to-b from-[#c40c24] to-[#800010] [clip-path:polygon(12px_0,100%_0,100%_calc(100%-12px),calc(100%-12px)_100%,0_100%,0_12px)] text-white font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-2">
                  {formSent ? <Check className="w-4 h-4" /> : <Send className="w-4 h-4" />}
                  <span>{formSent ? 'TRANSMISSION DISPATCHED TO SPIDER-NETWORK' : 'TRANSMIT SPIDER-SIGNAL 🕸️'}</span>
                </span>
              </button>
            </div>

          </form>

        </div>

        {/* =================================================================
            3. CHANNELS & COPYRIGHT (DARK SUIT RED, BLACK, WHITE)
            ================================================================= */}
        <div className="pt-8 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-6 font-mono text-xs">
          
          {/* Social Links */}
          <div className="flex flex-wrap items-center gap-6">
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              data-web-hover="true"
              className="flex items-center gap-1.5 text-white/70 hover:text-[#c40c24] transition-colors uppercase tracking-wider"
            >
              <Github className="w-4 h-4" />
              <span>GITHUB</span>
            </a>

            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              data-web-hover="true"
              className="flex items-center gap-1.5 text-white/70 hover:text-[#c40c24] transition-colors uppercase tracking-wider"
            >
              <Linkedin className="w-4 h-4" />
              <span>LINKEDIN</span>
            </a>

            <a
              href={instagram}
              target="_blank"
              rel="noopener noreferrer"
              data-web-hover="true"
              className="flex items-center gap-1.5 text-white/70 hover:text-[#c40c24] transition-colors uppercase tracking-wider"
            >
              <Instagram className="w-4 h-4" />
              <span>INSTAGRAM</span>
            </a>

            <a
              href={`mailto:${email}`}
              data-web-hover="true"
              className="flex items-center gap-1.5 text-white/70 hover:text-white transition-colors uppercase tracking-wider"
            >
              <Mail className="w-4 h-4" />
              <span>{email.toUpperCase()}</span>
            </a>
          </div>

          {/* Right Location & Copyright */}
          <div className="text-right space-y-0.5 text-white/60 uppercase tracking-widest text-[11px]">
            <div>&copy; 2026 // {name.toUpperCase()}</div>
            <div className="text-[#c40c24] font-bold">J.GAZE_</div>
          </div>

        </div>

      </div>
    </footer>
  );
};
