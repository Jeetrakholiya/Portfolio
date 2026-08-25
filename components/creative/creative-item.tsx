'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { CreativeWork } from '@/types/creative';
import { CreativeMedia } from '@/components/creative/creative-media';
import { easings } from '@/lib/animations';
import { cn } from '@/lib/utils';
import { ArrowUpRight } from 'lucide-react';

export interface CreativeItemProps {
  item: CreativeWork;
  index: number;
  className?: string;
}

export const CreativeItem: React.FC<CreativeItemProps> = ({
  item,
  index,
  className,
}) => {
  const itemRef = useRef<HTMLElement>(null);
  const shouldReduce = useReducedMotion();
  const formattedIndex = String(index + 1).padStart(2, '0');

  const { scrollYProgress } = useScroll({
    target: itemRef,
    offset: ['start end', 'end start'],
  });

  const mediaY = useTransform(scrollYProgress, [0, 1], ['-8px', '8px']);

  const itemVariants = {
    hidden: shouldReduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: shouldReduce
        ? { duration: 0.01 }
        : {
            duration: 0.7,
            ease: easings.cinematic,
            delay: (index % 2) * 0.1,
          },
    },
  };

  const isFeatured = item.tier === 'featured';

  return (
    <motion.article
      ref={itemRef}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      variants={itemVariants}
      aria-label={`Creative Work: ${item.title}`}
      className={cn(
        'group flex flex-col justify-between space-y-4 p-5 sm:p-6 bg-white/[0.02] border border-white/[0.08] rounded-[2px] transition-all duration-normal hover:border-white/20 hover:bg-white/[0.04]',
        isFeatured && 'border-white/[0.12] bg-white/[0.03]',
        className
      )}
    >
      <div className="space-y-4">
        {/* Header Metadata */}
        <div className="flex items-center justify-between border-b border-white/[0.06] pb-3 font-mono text-xs text-muted">
          <div className="flex items-center gap-2 uppercase tracking-widest">
            <span className="text-[#00f59b] font-bold">{formattedIndex}</span>
            <span className="text-white/20">/</span>
            <span>{item.year}</span>
          </div>
          <span className="text-[11px] uppercase tracking-wider text-muted">
            {item.category}
          </span>
        </div>

        {/* Media Frame with subtle scroll depth */}
        <motion.div style={shouldReduce ? {} : { y: mediaY }} className="will-change-transform rounded-[2px] overflow-hidden border border-white/[0.06]">
          {item.instagramUrl ? (
            <a
              href={item.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="watch"
              className="block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              aria-label={`View ${item.title} on J.GAZE_ Instagram`}
            >
              <CreativeMedia
                id={item.id}
                title={item.title}
                category={item.category}
                orientation={item.orientation}
                imageSrc={item.thumbnail}
                videoSrc={item.video}
                posterSrc={item.posterImage}
                instagramUrl={item.instagramUrl}
              />
            </a>
          ) : (
            <CreativeMedia
              id={item.id}
              title={item.title}
              category={item.category}
              orientation={item.orientation}
              imageSrc={item.thumbnail}
              videoSrc={item.video}
              posterSrc={item.posterImage}
            />
          )}
        </motion.div>

        {/* Title & Narrative Description */}
        <div className="space-y-2 pt-2">
          <h3
            className={cn(
              'font-bold tracking-tight text-white group-hover:text-white transition-transform duration-fast ease-cinematic group-hover:translate-x-1',
              isFeatured ? 'text-2xl sm:text-3xl' : 'text-lg sm:text-xl'
            )}
          >
            {item.instagramUrl ? (
              <a
                href={item.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="watch"
                className="hover:underline flex items-center justify-between gap-2"
                aria-label={`Watch ${item.title} on Instagram`}
              >
                <span>{item.title}</span>
                <ArrowUpRight className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
              </a>
            ) : (
              item.title
            )}
          </h3>

          <p className="type-body-sm text-muted leading-relaxed">
            {item.description}
          </p>
        </div>
      </div>

      {/* Footer Role Metadata Strip */}
      <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between font-mono text-[11px] text-muted uppercase tracking-widest">
        <span>Role &bull; {Array.isArray(item.role) ? item.role.join(', ') : item.role}</span>
        <span className="text-[#00f59b] font-medium">{item.category}</span>
      </div>
    </motion.article>
  );
};
