'use client';

import React, { useEffect, useRef } from 'react';
import { siteConfig } from '@/data/site';
import { cn } from '@/lib/utils';

export interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  activeSection: string;
}

const navLinks = [
  { number: '01', label: 'Work', href: '/#work' },
  { number: '02', label: 'Creative', href: '/#creative' },
  { number: '03', label: 'About', href: '/#about' },
  { number: '04', label: 'Capabilities', href: '/#skills' },
  { number: '05', label: 'Contact', href: '/#contact' },
];

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  activeSection,
}) => {
  const menuRef = useRef<HTMLDivElement>(null);

  // Body scroll lock effect
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      // Handle Escape key
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };

      window.addEventListener('keydown', handleKeyDown);

      return () => {
        document.body.style.overflow = originalOverflow;
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      id="mobile-menu"
      ref={menuRef}
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation Menu"
      className="fixed inset-0 z-50 h-[100dvh] w-full flex flex-col justify-between p-6 sm:p-10 bg-[#09090b]/98 text-foreground backdrop-blur-2xl transition-all duration-normal ease-cinematic"
    >
      {/* Top Bar */}
      <div className="flex items-center justify-between pt-4 pb-4 border-b border-white/10">
        <span className="font-mono text-xs text-muted uppercase tracking-widest">
          {siteConfig.name} &bull; Menu
        </span>
        <button
          type="button"
          onClick={onClose}
          className="font-mono text-xs font-semibold uppercase tracking-widest text-[#00f59b] hover:text-white"
        >
          Close ✕
        </button>
      </div>

      {/* Main Numbered Navigation Links */}
      <nav aria-label="Mobile Menu Links" className="flex-1 flex flex-col justify-center py-6 space-y-4">
        {navLinks.map((link) => {
          const isActive = activeSection === link.href;

          return (
            <a
              key={link.href}
              href={link.href}
              onClick={onClose}
              className={cn(
                'group flex items-baseline justify-between border-b border-white/[0.06] pb-3 transition-all duration-fast select-none focus-visible:outline-2 focus-visible:outline-offset-4',
                isActive ? 'text-white font-bold border-white/30' : 'text-muted hover:text-white'
              )}
            >
              <div className="flex items-baseline gap-4">
                <span className="font-mono text-xs text-[#00f59b]">
                  {link.number}
                </span>
                <span className="type-h1 text-2xl sm:text-4xl tracking-tight uppercase group-hover:translate-x-1 transition-transform duration-fast">
                  {link.label}
                </span>
              </div>
              <span className="font-mono text-xs text-muted group-hover:text-white">
                ↗
              </span>
            </a>
          );
        })}
      </nav>

      {/* Footer Socials & Metadata */}
      <div className="pt-6 border-t border-white/10 space-y-4 font-mono text-xs text-muted">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-4 uppercase tracking-widest">
            {siteConfig.socialLinks.map((social) => (
              <a
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                {social.label} ↗
              </a>
            ))}
          </div>
          <span className="text-[11px] text-muted">
            {siteConfig.location}
          </span>
        </div>
      </div>
    </div>
  );
};
