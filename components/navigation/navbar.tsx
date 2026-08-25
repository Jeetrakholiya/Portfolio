'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Container } from '@/components/layout/container';
import { MobileMenu } from '@/components/navigation/mobile-menu';
import { siteConfig } from '@/data/site';
import { cn } from '@/lib/utils';
import { useInterfaceMode } from '@/components/providers/interface-mode-provider';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { mode } = useInterfaceMode();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('/#home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sectionIds = ['home', 'work', 'creative', 'about', 'skills', 'background', 'contact'];
    const sectionElements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (sectionElements.length === 0) return;

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`/#${entry.target.id}`);
          }
        });
      },
      {
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0,
      }
    );

    sectionElements.forEach((el) => sectionObserver.observe(el));

    return () => {
      sectionObserver.disconnect();
    };
  }, []);

  const navItems = [
    { label: 'Work', href: '/#work' },
    { label: 'Creative', href: '/#creative' },
    { label: 'About', href: '/#about' },
    { label: 'Capabilities', href: '/#skills' },
    { label: 'Contact', href: '/#contact' },
  ];

  // Unconditional render guard: only render Syntax navbar when in syntax mode and outside admin
  if (pathname?.startsWith('/admin') || mode !== 'syntax') {
    return null;
  }

  return (
    <>
      <header
        aria-label="Main Navigation"
        className={cn(
          'fixed top-0 inset-x-0 z-40 transition-all duration-normal ease-cinematic',
          isScrolled
            ? 'bg-[#09090b]/85 backdrop-blur-md border-b border-white/[0.08] py-3.5 sm:py-4'
            : 'bg-transparent py-5 sm:py-7 border-b border-transparent'
        )}
      >
        <Container size="wide">
          <div className="flex items-center justify-between">
            {/* Left: Brand Identity & Live Status */}
            <a
              href="/#home"
              aria-label={`${siteConfig.name} - Home`}
              className="group flex items-center gap-3 select-none focus-visible:outline-2 focus-visible:outline-offset-4"
            >
              <span className="font-mono text-xs sm:text-sm font-bold tracking-widest uppercase text-foreground group-hover:text-white transition-colors">
                {siteConfig.name}
              </span>
              <span className="hidden sm:inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-muted pl-3 border-l border-white/10">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00f59b] animate-pulse" aria-hidden="true" />
                <span>Available</span>
              </span>
            </a>

            {/* Right: Desktop Navigation Items */}
            <div className="hidden md:flex items-center gap-7">
              <nav aria-label="Desktop Navigation Links" className="flex items-center gap-6">
                {navItems.map((item) => {
                  const isActive = activeSection === item.href;

                  return (
                    <a
                      key={item.href}
                      href={item.href}
                      className={cn(
                        'group flex items-center gap-1.5 py-1 font-mono text-xs uppercase tracking-widest transition-colors duration-fast select-none focus-visible:outline-2 focus-visible:outline-offset-4',
                        isActive
                          ? 'text-white font-semibold'
                          : 'text-muted hover:text-white'
                      )}
                    >
                      {isActive && (
                        <span className="w-1 h-1 rounded-full bg-[#00f59b]" aria-hidden="true" />
                      )}
                      <span>{item.label}</span>
                    </a>
                  );
                })}
              </nav>

              <span className="h-3 w-px bg-white/10" aria-hidden="true" />

              {/* Direct Mail Text Link */}
              <a
                href={`mailto:${siteConfig.email}`}
                className="font-mono text-xs uppercase tracking-widest text-[#00f59b] hover:underline"
              >
                Inquire ↗
              </a>
            </div>

            {/* Mobile Menu Toggle Button */}
            <div className="flex md:hidden items-center">
              <button
                type="button"
                onClick={() => setIsMenuOpen((prev) => !prev)}
                aria-expanded={isMenuOpen}
                aria-controls="mobile-menu"
                aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                className="inline-flex items-center gap-2 px-3 py-1.5 font-mono text-xs uppercase tracking-widest text-foreground bg-white/[0.04] border border-white/10 rounded-[2px] hover:bg-white/[0.08] transition-colors duration-fast focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                <span className="font-semibold">{isMenuOpen ? 'CLOSE' : 'MENU'}</span>
                <span
                  className={cn(
                    'w-1.5 h-1.5 rounded-full transition-colors duration-fast',
                    isMenuOpen ? 'bg-white' : 'bg-[#00f59b]'
                  )}
                  aria-hidden="true"
                />
              </button>
            </div>
          </div>
        </Container>
      </header>

      {/* Mobile Menu Overlay */}
      <MobileMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        activeSection={activeSection}
      />
    </>
  );
};
