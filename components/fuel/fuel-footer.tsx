'use client';

import React from 'react';
import Link from 'next/link';
import { SiteContent } from '@/lib/content-service';
import { siteConfig } from '@/data/site';
import { Flame, ArrowUp } from 'lucide-react';

export interface FuelFooterProps {
  siteContent?: SiteContent;
}

export const FuelFooter: React.FC<FuelFooterProps> = ({ siteContent }) => {
  const name = siteContent?.name || siteConfig.name;
  const creativeName = siteContent?.creativeName || siteConfig.creativeName;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#050507] text-[#f8fafc] border-t border-white/10 px-6 sm:px-12 lg:px-16 py-10 font-mono text-xs select-none">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <Flame className="w-4 h-4 text-[#ff5500]" />
          <span className="font-bold uppercase tracking-wider text-white">
            {name} &bull; {creativeName}
          </span>
          <span className="text-white/30 hidden sm:inline">&bull;</span>
          <span className="text-muted hidden sm:inline uppercase">Fuel Interface Edition</span>
        </div>

        <div className="flex items-center gap-6 text-muted">
          <Link href="/admin" className="hover:text-[#ff5500] uppercase tracking-widest text-[11px] transition-colors">
            Admin CMS
          </Link>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-white hover:text-[#ff5500] uppercase tracking-widest text-[11px] transition-colors"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5 text-[#ff5500]" />
          </button>
        </div>
      </div>
    </footer>
  );
};
