'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ProjectMediaProps {
  title: string;
  category: string;
  imageSrc?: string | null;
  aspectRatio?: '16:10' | '16:9' | '4:3';
  liveUrl?: string | null;
  className?: string;
}

const aspectRatioClasses = {
  '16:10': 'aspect-[16/10]',
  '16:9': 'aspect-[16/9]',
  '4:3': 'aspect-[4/3]',
};

export const ProjectMedia: React.FC<ProjectMediaProps> = ({
  title,
  category,
  imageSrc,
  aspectRatio = '16:10',
  liveUrl,
  className,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduce = useReducedMotion();

  // Smooth pointer parallax
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const smoothX = useSpring(rawX, springConfig);
  const smoothY = useSpring(rawY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduce || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const relativeX = (e.clientX - rect.left) / rect.width - 0.5;
    const relativeY = (e.clientY - rect.top) / rect.height - 0.5;

    rawX.set(relativeX * 12);
    rawY.set(relativeY * 10);
  };

  const handleMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  const isSvg = imageSrc?.endsWith('.svg');

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        'relative w-full overflow-hidden bg-[#0c0c10] border border-white/[0.08] rounded-[2px] select-none transition-all duration-normal group-hover:border-white/25 shadow-2xl',
        aspectRatioClasses[aspectRatio],
        className
      )}
    >
      {/* Top Browser/System Strip */}
      <div className="absolute top-0 inset-x-0 h-7 px-3.5 bg-[#09090b]/95 backdrop-blur-sm border-b border-white/[0.06] flex items-center justify-between z-20 pointer-events-none">
        <div className="flex items-center gap-1.5" aria-hidden="true">
          <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
          <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
          <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
        </div>
        <span className="font-mono text-[10px] uppercase tracking-widest text-[#00f59b]">
          {liveUrl ? 'LIVE PRODUCTION' : category}
        </span>
      </div>

      {/* Main Image or Dark Neutral Placeholder with Parallax & Hover Scale */}
      <motion.div
        style={{
          x: shouldReduce ? 0 : smoothX,
          y: shouldReduce ? 0 : smoothY,
        }}
        className="relative w-full h-full pt-7 overflow-hidden will-change-transform bg-[#09090b]"
      >
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={`${title} interface preview`}
            fill
            unoptimized={isSvg}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 45vw"
            className="object-cover object-top transition-transform duration-cinematic ease-cinematic group-hover:scale-[1.025]"
            priority={false}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-[#141418] to-[#0d0d10] transition-transform duration-cinematic ease-cinematic group-hover:scale-[1.025]">
            <div
              className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"
              aria-hidden="true"
            />

            <span className="font-mono text-xs text-[#00f59b] uppercase tracking-widest mb-2">
              System Architecture
            </span>
            <h4 className="type-h2 font-bold tracking-tight text-white uppercase mb-3">
              {title}
            </h4>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider bg-white/[0.04] border border-white/10 text-muted rounded-[2px]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00f59b]" />
              Interactive Platform Preview
            </span>
          </div>
        )}
      </motion.div>

      {/* Bottom Hover Badge */}
      <div className="absolute bottom-3 right-3 z-20 pointer-events-none opacity-0 translate-y-1.5 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-normal ease-cinematic">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest bg-white text-black font-semibold rounded-[2px] shadow-lg">
          <span>{liveUrl ? 'Visit Live Website ↗' : 'View Spec ↗'}</span>
          <ArrowUpRight className="w-3 h-3" aria-hidden="true" />
        </span>
      </div>
    </div>
  );
};
