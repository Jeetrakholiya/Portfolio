import React from 'react';
import { cn } from '@/lib/utils';

export type TagVariant = 'default' | 'muted' | 'outline' | 'accent' | 'green';
export type TagSize = 'sm' | 'md';

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  variant?: TagVariant;
  size?: TagSize;
  className?: string;
}

const variantClasses: Record<TagVariant, string> = {
  default:
    'bg-white/[0.04] text-foreground/90 border border-white/10 hover:border-white/20',
  muted:
    'bg-transparent text-muted border border-white/5',
  outline:
    'bg-transparent text-foreground/80 border border-white/10',
  accent:
    'bg-foreground text-background border border-foreground font-semibold',
  green:
    'bg-[#00f59b]/10 text-[#00f59b] border border-[#00f59b]/20 font-semibold',
};

const sizeClasses: Record<TagSize, string> = {
  sm: 'text-[10px] px-2 py-0.5 tracking-widest',
  md: 'text-[11px] px-2.5 py-0.5 tracking-wider',
};

export const Tag: React.FC<TagProps> = ({
  children,
  variant = 'default',
  size = 'sm',
  className,
  ...props
}) => {
  return (
    <span
      className={cn(
        'inline-flex items-center font-mono uppercase rounded-[2px] select-none transition-colors duration-fast',
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};
