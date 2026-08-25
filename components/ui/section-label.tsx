import React from 'react';
import { cn } from '@/lib/utils';

export interface SectionLabelProps {
  number?: string;
  label: string;
  className?: string;
  withLine?: boolean;
  withDot?: boolean;
}

export const SectionLabel: React.FC<SectionLabelProps> = ({
  number,
  label,
  className,
  withLine = false,
  withDot = true,
}) => {
  return (
    <div className={cn('inline-flex items-center gap-2 select-none font-mono text-xs tracking-widest uppercase text-muted', className)}>
      {withDot && (
        <span className="w-1.5 h-1.5 rounded-full bg-[#00f59b] shrink-0" aria-hidden="true" />
      )}
      {number && (
        <span className="text-foreground font-semibold">
          {number} <span className="text-muted-foreground">/</span>
        </span>
      )}
      <span className="tracking-wider text-muted hover:text-foreground transition-colors font-medium">
        {label}
      </span>
      {withLine && (
        <span className="h-px w-6 sm:w-10 bg-border inline-block ml-1" aria-hidden="true" />
      )}
    </div>
  );
};
