'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';

export const HangingSpiderman: React.FC = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [speechText, setSpeechText] = useState<string | null>(null);
  const [swayAngle, setSwayAngle] = useState(0);
  
  const startDragX = useRef(0);
  const startDragY = useRef(0);

  // 2D Motion values for omnidirectional free stretching (X and Y anywhere)
  const dragX = useMotionValue(0);
  const dragY = useMotionValue(0);

  // Natural high-performance 2D spring physics for smooth elastic snap-back & recoil
  const springX = useSpring(dragX, {
    stiffness: 460,
    damping: 17,
    mass: 0.8,
  });

  const springY = useSpring(dragY, {
    stiffness: 460,
    damping: 17,
    mass: 0.8,
  });

  // Base resting height of braided web from navbar anchor
  const baseHeight = 75;

  // Gentle ambient resting pendulum sway
  useEffect(() => {
    let t = 0;
    let animId: number;
    const animate = () => {
      t += 0.022;
      setSwayAngle(Math.sin(t) * 3.2);
      animId = requestAnimationFrame(animate);
    };
    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Dynamic 2D braided web rope length via Pythagorean distance
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
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    // Allow dragging anywhere across screen: left, right, up, down, diagonals
    const newX = Math.max(-600, Math.min(600, e.clientX - startDragX.current));
    const newY = Math.max(-45, Math.min(650, e.clientY - startDragY.current));
    dragX.set(newX);
    dragY.set(newY);
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
        */}
        <div className="relative w-16 h-28 sm:w-24 sm:h-36 -mt-1 sm:-mt-2 group">
          
          {/* Speech Bubble on click / snap */}
          <AnimatePresence>
            {speechText && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -10 }}
                className="absolute top-full mt-2 sm:mt-3 left-1/2 -translate-x-1/2 w-36 sm:w-48 px-2.5 sm:px-3 py-1.5 sm:py-2 bg-[#0a0a0c]/95 backdrop-blur-md border border-[#c40c24] rounded-lg shadow-[0_0_25px_rgba(196,12,36,0.7)] font-mono text-[9px] sm:text-[10px] text-white text-center uppercase tracking-wider z-50 pointer-events-none"
              >
                <div className="text-[#c40c24] font-black pb-0.5">SPIDEY:</div>
                <div className="font-bold">{speechText}</div>
                <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#0a0a0c] border-t border-l border-[#c40c24] rotate-45" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Character Cutout Graphic */}
          <div className="w-full h-full relative pointer-events-none select-none">
            <Image
              src="/images/spiderman-body.png"
              alt="Upside Down Hanging Spider-Man"
              fill
              priority
              draggable={false}
              sizes="(max-width: 640px) 64px, 96px"
              className="object-contain drop-shadow-[0_15px_25px_rgba(0,0,0,0.95)] drop-shadow-[0_0_20px_rgba(196,12,36,0.5)] pointer-events-none select-none"
            />
          </div>

          {/* Subtle Hover Hint */}
          {!isDragging && !speechText && (
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity font-mono text-[8px] sm:text-[9px] text-white font-bold whitespace-nowrap bg-black/85 px-2 py-0.5 rounded border border-[#c40c24]/50 pointer-events-none shadow-md">
              &harr; STRETCH ANYWHERE &varr;
            </div>
          )}
        </div>

      </motion.div>
    </div>
  );
};
