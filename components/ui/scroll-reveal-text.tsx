'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

export interface ScrollRevealTextProps {
  text: string;
  className?: string;
  colorScheme?: 'light' | 'dark';
}

export const ScrollRevealText: React.FC<ScrollRevealTextProps> = ({
  text,
  className = '',
  colorScheme = 'light',
}) => {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.9', 'end 0.4'],
  });

  const words = text.split(' ');

  return (
    <p ref={containerRef} className={`flex flex-wrap gap-x-[0.25em] gap-y-[0.08em] leading-tight ${className}`}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = Math.min(start + 1.2 / words.length, 1);

        return (
          <Word
            key={i}
            word={word}
            progress={scrollYProgress}
            range={[start, end]}
            colorScheme={colorScheme}
          />
        );
      })}
    </p>
  );
};

const Word: React.FC<{
  word: string;
  progress: MotionValue<number>;
  range: [number, number];
  colorScheme: 'light' | 'dark';
}> = ({ word, progress, range, colorScheme }) => {
  const color = useTransform(
    progress,
    range,
    colorScheme === 'light'
      ? ['rgba(18, 18, 20, 0.18)', 'rgba(18, 18, 20, 1)']
      : ['rgba(244, 244, 240, 0.2)', 'rgba(244, 244, 240, 1)']
  );

  return (
    <motion.span style={{ color }} className="inline-block">
      {word}
    </motion.span>
  );
};
