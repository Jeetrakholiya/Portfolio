'use client';

import React, { useEffect, useState, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';

export const FuelCursor: React.FC = () => {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');
  const shouldReduce = useReducedMotion();

  const [isEnabled, setIsEnabled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [cursorState, setCursorState] = useState<'DEFAULT' | 'INTERACTIVE' | 'VIEW' | 'PLAY'>('DEFAULT');
  const [customLabel, setCustomLabel] = useState<string>('');

  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);

  // Springs for smooth fluid following
  const coreX = useSpring(mouseX, { stiffness: 1200, damping: 50 });
  const coreY = useSpring(mouseY, { stiffness: 1200, damping: 50 });

  const haloX = useSpring(mouseX, { stiffness: 320, damping: 26 });
  const haloY = useSpring(mouseY, { stiffness: 320, damping: 26 });

  const trailX = useSpring(mouseX, { stiffness: 160, damping: 20 });
  const trailY = useSpring(mouseY, { stiffness: 160, damping: 20 });

  useEffect(() => {
    if (typeof window === 'undefined' || isAdmin) return;

    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    const updateEnabled = () => {
      setIsEnabled(mediaQuery.matches && !shouldReduce && !isAdmin);
    };

    updateEnabled();
    mediaQuery.addEventListener('change', updateEnabled);

    return () => {
      mediaQuery.removeEventListener('change', updateEnabled);
    };
  }, [shouldReduce, isAdmin]);

  useEffect(() => {
    if (!isEnabled || isAdmin) return;

    const handlePointerMove = (e: PointerEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      // Update CSS variables for card spotlights
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);

      if (!isVisible) setIsVisible(true);
    };

    const handlePointerDown = () => setIsClicking(true);
    const handlePointerUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handlePointerOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorElem = target.closest('[data-cursor]') as HTMLElement | null;
      if (cursorElem) {
        const type = cursorElem.getAttribute('data-cursor')?.toLowerCase();
        const label = cursorElem.getAttribute('data-cursor-label');

        if (type === 'view') {
          setCursorState('VIEW');
          setCustomLabel(label || 'VIEW ↗');
          return;
        }
        if (type === 'play' || type === 'watch') {
          setCursorState('PLAY');
          setCustomLabel(label || 'WATCH');
          return;
        }
      }

      const isInteractive = target.closest('a, button, [role="button"], input[type="submit"]');
      if (isInteractive) {
        setCursorState('INTERACTIVE');
        setCustomLabel('');
        return;
      }

      setCursorState('DEFAULT');
      setCustomLabel('');
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointerup', handlePointerUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseover', handlePointerOver, { passive: true });

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseover', handlePointerOver);
    };
  }, [isEnabled, isVisible, mouseX, mouseY, isAdmin]);

  if (!isEnabled || !isVisible || isAdmin) return null;

  const isContextual = cursorState === 'VIEW' || cursorState === 'PLAY';
  const isInteractive = cursorState === 'INTERACTIVE';

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden select-none" aria-hidden="true">
      {/* 1. Large Fluid Fuel Energy Trail Halo (Orange / Violet Glowing Mist) */}
      <motion.div
        style={{
          x: trailX,
          y: trailY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        className="fixed w-80 h-80 rounded-full opacity-35 blur-[50px] bg-[radial-gradient(circle,_rgba(255,85,0,0.45)_0%,_rgba(124,58,237,0.25)_45%,_transparent_70%)] pointer-events-none"
      />

      {/* 2. Interactive Outer Fuel Halo Ring */}
      <motion.div
        style={{
          x: haloX,
          y: haloY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isContextual ? 80 : isInteractive ? 48 : 32,
          height: isContextual ? 80 : isInteractive ? 48 : 32,
          scale: isClicking ? 0.82 : 1,
          borderColor: isContextual
            ? 'rgba(255, 255, 255, 0.9)'
            : isInteractive
            ? 'rgba(255, 85, 0, 0.9)'
            : 'rgba(255, 85, 0, 0.5)',
          boxShadow: isContextual
            ? '0 0 35px rgba(255, 255, 255, 0.6), 0 0 60px rgba(255, 85, 0, 0.4)'
            : isInteractive
            ? '0 0 25px rgba(255, 85, 0, 0.7), 0 0 50px rgba(124, 58, 237, 0.4)'
            : '0 0 15px rgba(255, 85, 0, 0.4)',
        }}
        transition={{
          type: 'spring',
          stiffness: 450,
          damping: 28,
        }}
        className={`fixed flex items-center justify-center rounded-full border backdrop-blur-[2px] transition-colors ${
          isContextual
            ? 'bg-white text-black font-mono text-[10px] font-black uppercase tracking-widest'
            : isInteractive
            ? 'bg-[#ff5500]/15'
            : 'bg-[#ff5500]/5'
        }`}
      >
        {isContextual && (
          <span className="text-center px-1 font-bold leading-none select-none">
            {customLabel || cursorState}
          </span>
        )}
      </motion.div>

      {/* 3. Intense Inner Core Flame Dot */}
      {!isContextual && (
        <motion.div
          style={{
            x: coreX,
            y: coreY,
            translateX: '-50%',
            translateY: '-50%',
          }}
          animate={{
            scale: isClicking ? 1.6 : isInteractive ? 0 : 1,
            opacity: isInteractive ? 0 : 1,
          }}
          transition={{ duration: 0.12 }}
          className="fixed w-2 h-2 rounded-full bg-[#ff5500] shadow-[0_0_12px_#ff5500,0_0_24px_#ffaa00]"
        />
      )}
    </div>
  );
};
