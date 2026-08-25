import React from 'react';
import { cn } from '@/lib/utils';

export type AspectRatio = '16:9' | '4:3' | '3:2' | '9:16' | '1:1';

export interface MediaFrameProps extends React.HTMLAttributes<HTMLDivElement> {
  aspectRatio?: AspectRatio;
  caption?: string;
  placeholderText?: string;
  className?: string;
  children?: React.ReactNode;
}

const aspectRatioClasses: Record<AspectRatio, string> = {
  '16:9': 'aspect-[16/9]',
  '4:3': 'aspect-[4/3]',
  '3:2': 'aspect-[3/2]',
  '9:16': 'aspect-[9/16]',
  '1:1': 'aspect-square',
};

export const MediaFrame: React.FC<MediaFrameProps> = ({
  aspectRatio = '16:9',
  caption,
  placeholderText,
  className,
  children,
  ...props
}) => {
  return (
    <figure className={cn('w-full flex flex-col', className)} {...props}>
      <div
        className={cn(
          'relative w-full overflow-hidden bg-surface-secondary border border-border rounded-sm select-none transition-all duration-normal ease-cinematic group',
          aspectRatioClasses[aspectRatio]
        )}
      >
        {children ? (
          children
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center bg-surface-secondary/80">
            <span className="font-mono text-xs uppercase tracking-widest text-muted">
              {placeholderText || `Media Frame (${aspectRatio})`}
            </span>
          </div>
        )}
      </div>
      {caption && (
        <figcaption className="mt-2 text-xs font-mono text-muted tracking-wide">
          {caption}
        </figcaption>
      )}
    </figure>
  );
};
