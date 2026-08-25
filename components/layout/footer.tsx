import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/layout/container';
import { siteConfig } from '@/data/site';
import { ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerNavLinks = [
    { label: 'Work', href: '/#work' },
    { label: 'Creative', href: '/#creative' },
    { label: 'About', href: '/#about' },
    { label: 'Capabilities', href: '/#skills' },
    { label: 'Background', href: '/#background' },
    { label: 'Contact', href: '/#contact' },
  ];

  return (
    <footer
      aria-label="Site Footer"
      className="relative w-full py-12 bg-[#09090b] text-[#f2f2f0] border-t border-white/[0.08]"
    >
      <Container size="wide">
        <div className="space-y-8">
          {/* Top Bar: Brand, Role & Back to Top */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.06] font-mono text-xs">
            <div className="flex items-center gap-3">
              <Link
                href="/#home"
                className="font-bold tracking-widest uppercase text-white hover:text-[#00f59b] transition-colors"
              >
                {siteConfig.name}
              </Link>
              <span className="text-white/20">&bull;</span>
              <span className="text-muted uppercase tracking-wider">
                {siteConfig.primaryRole} / {siteConfig.creativeName}
              </span>
            </div>

            {/* Back to Top Link */}
            <a
              href="/#home"
              className="group inline-flex items-center gap-1.5 uppercase tracking-widest text-muted hover:text-white transition-colors"
              aria-label="Back to top of page"
            >
              <span>Back To Top</span>
              <ArrowUp className="w-3.5 h-3.5 transition-transform duration-fast group-hover:-translate-y-0.5 text-[#00f59b]" aria-hidden="true" />
            </a>
          </div>

          {/* Middle Bar: Global Navigation & Socials */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 font-mono text-xs text-muted uppercase tracking-widest">
            <nav aria-label="Footer Navigation" className="flex flex-wrap items-center gap-x-6 gap-y-2">
              {footerNavLinks.map((nav) => (
                <Link
                  key={nav.label}
                  href={nav.href}
                  className="hover:text-white transition-colors"
                >
                  {nav.label}
                </Link>
              ))}
            </nav>

            <div className="flex flex-wrap items-center gap-5">
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
          </div>

          {/* Bottom Bar: Copyright */}
          <div className="pt-6 border-t border-white/[0.04] flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-mono text-[11px] text-muted">
            <span>
              &copy; {currentYear} {siteConfig.name}. All rights reserved.
            </span>
            <span>
              {siteConfig.location} &bull; Next.js &amp; Tailwind CSS
            </span>
          </div>
        </div>
      </Container>
    </footer>
  );
};
