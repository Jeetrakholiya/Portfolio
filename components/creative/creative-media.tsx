'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import { useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Play } from 'lucide-react';
import { useCreativeGallery } from '@/components/creative/creative-gallery-context';
import { cn } from '@/lib/utils';

export interface CreativeMediaProps {
  id?: string;
  title: string;
  category: string;
  orientation?: 'vertical' | 'landscape' | 'square';
  imageSrc?: string | null;
  videoSrc?: string | null;
  posterSrc?: string | null;
  instagramUrl?: string | null;
  className?: string;
}

export const CreativeMedia: React.FC<CreativeMediaProps> = ({
  id,
  title,
  category,
  orientation = 'landscape',
  imageSrc,
  videoSrc,
  posterSrc,
  instagramUrl,
  className,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const shouldReduce = useReducedMotion();
  const { activeMediaId, setActiveMediaId } = useCreativeGallery();

  const isCurrentActive = id && activeMediaId === id;

  // Sync video play/pause with global active media state
  useEffect(() => {
    if (!videoRef.current || !videoSrc) return;

    if (isCurrentActive && !shouldReduce) {
      videoRef.current
        .play()
        .catch(() => {
          // Autoplay policy fallback
        });
    } else {
      videoRef.current.pause();
    }
  }, [isCurrentActive, shouldReduce, videoSrc]);

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  const handleMouseEnter = () => {
    if (shouldReduce || !videoSrc || !id) return;

    hoverTimeoutRef.current = setTimeout(() => {
      setActiveMediaId(id);
    }, 150);
  };

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    if (isCurrentActive && id) {
      setActiveMediaId(null);
    }
  };

  const isVertical = orientation === 'vertical';
  const isSquare = orientation === 'square';

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        'group relative w-full overflow-hidden bg-[#0c0c10] border border-white/10 rounded-[2px] select-none transition-all duration-normal hover:border-white/30',
        isVertical && 'aspect-[9/16] max-h-[580px] sm:max-h-[640px] mx-auto',
        orientation === 'landscape' && 'aspect-[16/9]',
        isSquare && 'aspect-square',
        className
      )}
    >
      {/* Top Camera Viewfinder Header */}
      <div className="absolute top-0 inset-x-0 h-8 px-4 bg-black/75 backdrop-blur-md border-b border-white/10 flex items-center justify-between z-20 pointer-events-none font-mono text-[10px] uppercase tracking-widest text-muted">
        <div className="flex items-center gap-2">
          <span
            className={cn(
              'w-1.5 h-1.5 rounded-full transition-colors',
              isCurrentActive ? 'bg-[#00f59b] animate-pulse' : 'bg-white/40'
            )}
            aria-hidden="true"
          />
          <span className="text-white font-medium">
            {isCurrentActive ? 'PLAY' : 'REC'}
          </span>
          <span className="text-white/30">|</span>
          <span>{isVertical ? '9:16 Reel' : isSquare ? '1:1 Frame' : '16:9 Film'}</span>
        </div>

        <div className="flex items-center gap-2">
          <span>24 FPS</span>
          <span className="text-white/30">&bull;</span>
          <span className="text-white/80">{category}</span>
        </div>
      </div>

      {/* Main Video / Image or Cinematic Placeholder */}
      <div className="relative w-full h-full pt-8 overflow-hidden">
        {videoSrc ? (
          <video
            ref={videoRef}
            src={videoSrc}
            poster={posterSrc || undefined}
            muted
            playsInline
            loop
            preload="metadata"
            className="w-full h-full object-cover transition-transform duration-cinematic ease-cinematic group-hover:scale-[1.02]"
            aria-label={`${title} video preview`}
          />
        ) : imageSrc ? (
          <Image
            src={imageSrc}
            alt={`${title} visual preview`}
            fill
            sizes={
              isVertical
                ? '(max-width: 768px) 100vw, 400px'
                : '(max-width: 768px) 100vw, 800px'
            }
            className="object-cover transition-transform duration-cinematic ease-cinematic group-hover:scale-[1.02]"
            priority={false}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-[#141418] to-[#08080b] transition-transform duration-cinematic ease-cinematic group-hover:scale-[1.02]">
            {/* Viewfinder Crosshairs */}
            <div
              className="absolute inset-4 border border-white/5 pointer-events-none flex flex-col justify-between p-2"
              aria-hidden="true"
            >
              <div className="flex justify-between text-white/20 font-mono text-[9px]">
                <span>+</span>
                <span>+</span>
              </div>
              <div className="flex justify-between text-white/20 font-mono text-[9px]">
                <span>+</span>
                <span>+</span>
              </div>
            </div>

            <div className="w-10 h-10 rounded-full border border-white/20 bg-white/5 flex items-center justify-center mb-3 transition-transform duration-fast group-hover:scale-110 group-hover:bg-white/10">
              <Play className="w-4 h-4 text-white/80 translate-x-0.5" aria-hidden="true" />
            </div>

            <span className="font-mono text-[10px] text-[#00f59b] uppercase tracking-widest mb-1">
              J.GAZE_ Visuals
            </span>
            <h4 className="type-h2 font-bold tracking-tight text-white uppercase mb-2">
              {title}
            </h4>
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider bg-white/5 border border-white/10 text-muted rounded-[2px]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00f59b]" />
              Visual Story
            </span>
          </div>
        )}
      </div>

      {/* Bottom Interactive Hover Badge */}
      <div className="absolute bottom-3 right-3 z-20 pointer-events-none opacity-0 translate-y-1.5 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-normal ease-cinematic">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest bg-white text-black font-semibold rounded-[2px] shadow-lg">
          <span>{isVertical ? 'Watch Reel' : 'Instagram'}</span>
          <ArrowUpRight className="w-3 h-3" aria-hidden="true" />
        </span>
      </div>
    </div>
  );
};
