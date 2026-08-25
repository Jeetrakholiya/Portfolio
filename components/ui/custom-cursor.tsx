'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';

export type CursorState = 'DEFAULT' | 'LINK' | 'VIEW' | 'OPEN' | 'WATCH' | 'PLAY';

export const CustomCursor: React.FC = () => {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  const [isEnabled, setIsEnabled] = useState(false);
  const [cursorState, setCursorState] = useState<CursorState>('DEFAULT');
  const [customLabel, setCustomLabel] = useState<string>('');
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const shouldReduce = useReducedMotion();

  // Raw cursor position motion values
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Fast spring for inner dot (immediate follow)
  const dotX = useSpring(mouseX, { stiffness: 1200, damping: 60 });
  const dotY = useSpring(mouseY, { stiffness: 1200, damping: 60 });

  // Damped spring for outer ring / badge
  const ringX = useSpring(mouseX, { stiffness: 350, damping: 30 });
  const ringY = useSpring(mouseY, { stiffness: 350, damping: 30 });

  // Capability check: Fine pointer + hover only (Desktop mouse/trackpad, NOT on admin pages)
  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (isAdmin) {
      setIsEnabled(false);
      document.documentElement.classList.remove('has-custom-cursor');
      return;
    }

    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    const updateEnabled = () => {
      const active = mediaQuery.matches && !shouldReduce && !isAdmin;
      setIsEnabled(active);
      if (active) {
        document.documentElement.classList.add('has-custom-cursor');
      } else {
        document.documentElement.classList.remove('has-custom-cursor');
      }
    };

    updateEnabled();
    mediaQuery.addEventListener('change', updateEnabled);

    return () => {
      mediaQuery.removeEventListener('change', updateEnabled);
      document.documentElement.classList.remove('has-custom-cursor');
    };
  }, [shouldReduce, isAdmin]);

  // Global Pointer & State Event Listeners
  useEffect(() => {
    if (!isEnabled || isAdmin) return;

    const handlePointerMove = (e: PointerEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handlePointerDown = () => setIsClicking(true);
    const handlePointerUp = () => setIsClicking(false);

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    // Event delegation for contextual states
    const handlePointerOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Check for explicit data-cursor on target or ancestors
      const cursorElem = target.closest('[data-cursor]') as HTMLElement | null;
      if (cursorElem) {
        const type = cursorElem.getAttribute('data-cursor')?.toLowerCase();
        const label = cursorElem.getAttribute('data-cursor-label');

        if (type === 'view') {
          setCursorState('VIEW');
          setCustomLabel(label || 'VIEW ↗');
          return;
        }
        if (type === 'open') {
          setCursorState('OPEN');
          setCustomLabel(label || 'OPEN ↗');
          return;
        }
        if (type === 'watch') {
          setCursorState('WATCH');
          setCustomLabel(label || 'WATCH');
          return;
        }
        if (type === 'play') {
          setCursorState('PLAY');
          setCustomLabel(label || 'PLAY');
          return;
        }
        if (type === 'link') {
          setCursorState('LINK');
          setCustomLabel('');
          return;
        }
      }

      // Check for generic interactive links / buttons
      const isInteractive = target.closest('a, button, [role="button"], input[type="submit"]');
      if (isInteractive) {
        setCursorState('LINK');
        setCustomLabel('');
        return;
      }

      // Default state
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

  const isContextual =
    cursorState === 'VIEW' ||
    cursorState === 'OPEN' ||
    cursorState === 'WATCH' ||
    cursorState === 'PLAY';

  const isLink = cursorState === 'LINK';

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden select-none" aria-hidden="true">
      {/* Outer Adaptive Ring / Badge */}
      <motion.div
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isContextual ? 72 : isLink ? 32 : 24,
          height: isContextual ? 72 : isLink ? 32 : 24,
          scale: isClicking ? 0.88 : 1,
          opacity: 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 400,
          damping: 28,
        }}
        className={`fixed flex items-center justify-center rounded-full transition-colors duration-fast ${
          isContextual
            ? 'bg-[#f2f2f0] text-[#09090b] font-mono text-[9px] font-bold tracking-widest uppercase shadow-2xl'
            : 'border border-white/30 bg-white/[0.04]'
        }`}
      >
        {isContextual && (
          <span className="text-center px-1 leading-none select-none">
            {customLabel || cursorState}
          </span>
        )}
      </motion.div>

      {/* Inner Sharp Dot */}
      {!isContextual && (
        <motion.div
          style={{
            x: dotX,
            y: dotY,
            translateX: '-50%',
            translateY: '-50%',
          }}
          animate={{
            scale: isClicking ? 0.7 : isLink ? 0 : 1,
            opacity: isLink ? 0 : 1,
          }}
          transition={{ duration: 0.15 }}
          className="fixed w-1.5 h-1.5 rounded-full bg-[#00f59b]"
        />
      )}
    </div>
  );
};
