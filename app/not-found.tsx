import React from 'react';
import { Container } from '@/components/layout/container';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/data/site';

export default function NotFound() {
  return (
    <main className="w-full min-h-screen flex flex-col justify-between py-24 sm:py-32 bg-[#09090b] text-[#f2f2f0] selection:bg-[#00f59b] selection:text-[#09090b]">
      <Container size="wide" className="my-auto">
        <div className="max-w-2xl space-y-8">
          <div className="space-y-3">
            <span className="font-mono text-xs text-[#00f59b] uppercase tracking-widest block">
              Error 404 &bull; Page Not Found
            </span>
            <h1 className="text-[clamp(3.5rem,10vw,8.5rem)] font-black tracking-tighter leading-[0.84] text-white uppercase select-none">
              Lost In <br />
              Frame.
            </h1>
          </div>

          <p className="type-body-lg text-muted max-w-lg leading-relaxed">
            The page or project case study you are looking for does not exist or has been moved.
          </p>

          <div className="pt-4 flex flex-wrap items-center gap-6 font-mono text-xs uppercase tracking-widest">
            <Button href="/" variant="primary" size="lg" icon="arrow-right">
              Return Home
            </Button>
            <Button href="/#work" variant="outline" size="lg">
              Selected Work
            </Button>
          </div>
        </div>
      </Container>

      <Container size="wide" className="pt-8 border-t border-white/[0.08] font-mono text-xs text-muted flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <span>{siteConfig.name} &bull; {siteConfig.creativeName}</span>
        <span>{siteConfig.location}</span>
      </Container>
    </main>
  );
}
