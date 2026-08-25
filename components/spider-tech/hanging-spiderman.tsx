'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { playThwipSound, playWebStretchSound } from './spider-sound-effects';

export const HangingSpiderman: React.FC = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [speechText, setSpeechText] = useState<string | null>(null);
  const [swayAngle, setSwayAngle] = useState(0);

  // 2D Cartesian displacement coordinates (X and Y)
  const dragX = useMotionValue(0);
  const dragY = useMotionValue(0);

  // Responsive base height anchor
  const [baseHeight, setBaseHeight] = useState(130);

  useEffect(() => {
    const updateSize = () => {
      setBaseHeight(window.innerWidth < 640 ? 100 : 130);
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // Highly responsive physics springs with natural oscillation
  const springX = useSpring(dragX, { stiffness: 320, damping: 14, mass: 0.8 });
  const springY = useSpring(dragY, { stiffness: 320, damping: 14, mass: 0.8 });

  // Ambient pendular wind swaying when not interacting
  useEffect(() => {
    let animId: number;
    let time = 0;
    const animateSway = () => {
      if (!isDragging) {
        time += 0.035;
        setSwayAngle(Math.sin(time) * 3.5);
      }
      animId = requestAnimationFrame(animateSway);
    };
    animId = requestAnimationFrame(animateSway);
    return () => cancelAnimationFrame(animId);
  }, [isDragging]);

  const startDragX = useRef(0);
  const startDragY = useRef(0);
  const lastSoundTime = useRef(0);

  // Dynamic 2D distance calculation (Pythagorean theorem)
  const webHeight = useTransform([springX, springY], ([x, y]: number[]) => {
    return Math.max(35, Math.hypot(x || 0, (y || 0) + baseHeight));
  });

  // Dynamic 2D rope angle in degrees towards user cursor or ambient sway
  const webAngle = useTransform([springX, springY], ([x, y]: number[]) => {
    // In CSS screen coordinates, -atan2 correctly tilts right for positive X and left for negative X
    const pullAngle = -((Math.atan2(x || 0, (y || 0) + baseHeight) * 180) / Math.PI);
    const isStretched = Math.hypot(x || 0, y || 0) > 3;
    return isStretched ? pullAngle : pullAngle + swayAngle;
  });

  // Pointer drag handlers for full 360° omnidirectional stretch & release
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    startDragX.current = e.clientX - dragX.get();
    startDragY.current = e.clientY - dragY.get();
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    playWebStretchSound(0.2);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    // Allow dragging anywhere across screen: left, right, up, down, diagonals
    const newX = Math.max(-600, Math.min(600, e.clientX - startDragX.current));
    const newY = Math.max(-45, Math.min(650, e.clientY - startDragY.current));
    dragX.set(newX);
    dragY.set(newY);

    const now = Date.now();
    if (now - lastSoundTime.current > 120) {
      const tension = Math.min(1, Math.hypot(newX, newY) / 300);
      playWebStretchSound(tension);
      lastSoundTime.current = now;
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging) return;
    setIsDragging(false);
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {}

    const releasedDistance = Math.hypot(dragX.get(), dragY.get());
    dragX.set(0);
    dragY.set(0);

    if (releasedDistance > 45) {
      playThwipSound();
      const snapQuotes = [
        'THWIP! SNAP BACK! 🕸️',
        'WOAAAH! What a recoil!',
        '360° Web-Slinging achieved!',
        'Maximum web tension unlocked!',
        'Back to the patrol spot!',
        'Spring-loaded web slinger!',
      ];
      const quote = snapQuotes[Math.floor(Math.random() * snapQuotes.length)];
      setSpeechText(quote);

      setTimeout(() => {
        setSpeechText(null);
      }, 2600);
    }
  };

  const handleSpideyClick = () => {
    if (isDragging) return;
    playThwipSound();
    const quotes = [
      'THWIP! 🕸️',
      'Hey there, fellow web-slinger!',
      'Drag me anywhere to test the web elasticity!',
      'With great code comes great computation!',
      'Just hanging around in the navbar!',
      'Look out! Here comes the Spider-Man!',
    ];
    setSpeechText(quotes[Math.floor(Math.random() * quotes.length)]);
    setTimeout(() => setSpeechText(null), 2800);
  };

  return (
    <div className="fixed top-0 right-3 sm:right-24 lg:right-36 z-40 pointer-events-none select-none">
      
      {/* Top Navbar Anchor Web Node */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-white border border-black shadow-[0_0_12px_#ffffff] z-30 pointer-events-none" />

      {/* 
        2D Elastic Web Assembly:
        Rotates and stretches dynamically from the top anchor point anywhere the user drags
      */}
      <motion.div
        style={{
          transformOrigin: 'top center',
          rotate: webAngle,
        }}
        className="relative flex flex-col items-center pointer-events-auto cursor-grab active:cursor-grabbing touch-none"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onClick={handleSpideyClick}
        title="Click or drag Spider-Man anywhere to stretch his braided web in 360°!"
      >
        {/* 
          1. EXACT AUTHENTIC BRAIDED COMIC WEB ROPE
          Dynamically stretches in length to connect navbar anchor directly to Spidey's fists
        */}
        <motion.div
          style={{ height: webHeight }}
          className="w-2.5 sm:w-3.5 relative overflow-hidden bg-repeat-y bg-top bg-contain pointer-events-none z-10"
        >
          {/* Repeating braided web texture */}
          <div
            className="w-full h-full bg-repeat-y bg-top"
            style={{
              backgroundImage: "url('/images/web-braided-segment.png')",
              backgroundSize: '100% auto',
            }}
          />
        </motion.div>

        {/* 
          2. SPIDER-MAN BODY (Holding the braided rope with his hands)
          Equipped with glowing animated spider-sense indicators
        */}
        <div className="relative -mt-2 flex flex-col items-center group">
          
          {/* Floating Speech / Comic Thought Bubble */}
          <AnimatePresence>
            {speechText && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 10 }}
                className="absolute -top-12 right-full mr-3 whitespace-nowrap bg-white text-black font-black text-[11px] px-3.5 py-1.5 rounded-2xl border-2 border-black shadow-[0_8px_25px_rgba(0,0,0,0.85)] z-50 font-sans tracking-wide uppercase pointer-events-none"
              >
                {speechText}
                {/* Speech Bubble Arrow */}
                <div className="absolute top-1/2 -right-2 -translate-y-1/2 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[8px] border-l-black" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Upside Down Spider-Man Character Asset */}
          <div className="relative w-24 sm:w-28 h-32 sm:h-36 drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)] transition-transform duration-150">
            <Image
              src="/images/hanging-spiderman.png"
              alt="Upside Down Hanging Spider-Man"
              fill
              sizes="(max-width: 640px) 96px, 112px"
              priority
              className="object-contain"
            />
          </div>

          {/* Subtle Spider-Sense Glow when dragged */}
          {isDragging && (
            <div className="absolute inset-0 bg-[#c40c24]/20 rounded-full blur-xl animate-ping pointer-events-none" />
          )}

        </div>

      </motion.div>

    </div>
  );
};
