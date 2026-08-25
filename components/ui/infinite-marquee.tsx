'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export interface InfiniteMarqueeProps {
  items?: string[];
  speed?: number;
  className?: string;
}

const defaultItems = [
  'REACT.JS',
  'NEXT.JS 14',
  'FASTAPI',
  'PYTHON',
  'TYPESCRIPT',
  'TAILWIND CSS',
  'GOOGLE GEMINI API',
  'MONGODB ATLAS',
  'VIDEOGRAPHY',
  'VIDEO EDITING',
  'J.GAZE_ VISUALS',
  'C# / .NET',
  'SQL SERVER',
  'REST APIS',
  'FRAMER MOTION',
];

export const InfiniteMarquee: React.FC<InfiniteMarqueeProps> = ({
  items = defaultItems,
  speed = 28,
  className = '',
}) => {
  const shouldReduce = useReducedMotion();

  // Duplicate items array 4 times for seamless continuous looping
  const marqueeItems = [...items, ...items, ...items, ...items];

  if (shouldReduce) {
    return (
      <div className={`w-full overflow-x-auto py-3 bg-white/[0.02] border-y border-white/[0.08] ${className}`}>
        <div className="flex items-center gap-6 px-6 font-mono text-xs text-muted uppercase tracking-widest whitespace-nowrap">
          {items.map((item, idx) => (
            <span key={idx} className="inline-flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-[#00f59b]" aria-hidden="true" />
              <span>{item}</span>
            </span>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      aria-hidden="true"
      className={`relative w-full overflow-hidden py-3.5 bg-white/[0.02] border-y border-white/[0.08] select-none ${className}`}
    >
      {/* Edge gradient masks for seamless fade out */}
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#09090b] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#09090b] to-transparent z-10 pointer-events-none" />

      <motion.div
        className="flex w-max items-center gap-8 font-mono text-xs text-muted uppercase tracking-widest"
        animate={{
          x: ['0%', '-50%'],
        }}
        transition={{
          repeat: Infinity,
          ease: 'linear',
          duration: speed,
        }}
      >
        {marqueeItems.map((item, idx) => (
          <span key={idx} className="inline-flex items-center gap-3 shrink-0 hover:text-white transition-colors">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00f59b]" aria-hidden="true" />
            <span className="font-semibold text-white/80">{item}</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
};
