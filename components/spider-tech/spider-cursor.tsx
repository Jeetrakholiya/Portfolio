'use client';

import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export const SpiderCursor: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Damped smooth spring for the trailing Spider-Sense radar ring
  const trailX = useSpring(mouseX, { damping: 20, stiffness: 260, mass: 0.3 });
  const trailY = useSpring(mouseY, { damping: 20, stiffness: 260, mass: 0.3 });

  useEffect(() => {
    // Check if device supports fine pointer
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    setIsVisible(true);
    document.documentElement.classList.add('has-spider-cursor');
    document.body.classList.add('has-spider-cursor');

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[role="button"]') ||
        target.closest('input') ||
        target.closest('textarea') ||
        target.closest('[data-web-hover]') ||
        target.closest('[data-spidey-hover]')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleElementHover);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleElementHover);
      document.documentElement.classList.remove('has-spider-cursor');
      document.body.classList.remove('has-spider-cursor');
    };
  }, [mouseX, mouseY]);

  return (
    <>
      {/* 
        Native hardware-accelerated Spider-Man cursor:
        Default: Dark Suit Red Spider (#c40c24)
        Hover: White Spider with Dark Red halo (#ffffff)
      */}
      <style jsx global>{`
        html.has-spider-cursor,
        html.has-spider-cursor body,
        html.has-spider-cursor div,
        html.has-spider-cursor section,
        html.has-spider-cursor footer,
        html.has-spider-cursor p,
        html.has-spider-cursor span,
        html.has-spider-cursor h1,
        html.has-spider-cursor h2,
        html.has-spider-cursor h3 {
          cursor: url('/images/spidey-cursor.svg') 16 16, auto !important;
        }

        html.has-spider-cursor a,
        html.has-spider-cursor button,
        html.has-spider-cursor [role="button"],
        html.has-spider-cursor input,
        html.has-spider-cursor textarea,
        html.has-spider-cursor select,
        html.has-spider-cursor [data-web-hover],
        html.has-spider-cursor [data-spidey-hover] {
          cursor: url('/images/spidey-cursor-white.svg') 16 16, pointer !important;
        }
      `}</style>

      {/* Spider-Sense Sensory Radar Ring following the Spider Pointer */}
      {isVisible && (
        <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden select-none">
          <motion.div
            style={{
              x: trailX,
              y: trailY,
              translateX: '-50%',
              translateY: '-50%',
            }}
            className={`absolute rounded-full transition-all duration-300 pointer-events-none ${
              isHovered
                ? 'w-14 h-14 border-2 border-[#c40c24] bg-[#c40c24]/20 shadow-[0_0_25px_rgba(196,12,36,0.7)]'
                : 'w-8 h-8 border border-white/30 bg-white/5 shadow-[0_0_10px_rgba(255,255,255,0.2)]'
            }`}
          >
            {isHovered && (
              <>
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 font-mono text-[9px] font-black text-[#c40c24] tracking-widest animate-bounce">
                  ! ! !
                </div>
                <div className="absolute inset-0 rounded-full border-t border-b border-white animate-spin" />
              </>
            )}
          </motion.div>
        </div>
      )}
    </>
  );
};
