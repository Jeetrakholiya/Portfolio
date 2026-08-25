import React from 'react';
import { cn } from '@/lib/utils';

export type DividerVariant = 'subtle' | 'default' | 'strong';
export type DividerOrientation = 'horizontal' | 'vertical';

export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: DividerVariant;
  orientation?: DividerOrientation;
  className?: string;
}

const variantClasses: Record<DividerVariant, string> = {
  subtle: 'border-border-subtle',
  default: 'border-border',
  strong: 'border-border-strong',
};

export const Divider: React.FC<DividerProps> = ({
  variant = 'default',
  orientation = 'horizontal',
  className,
  ...props
}) => {
  if (orientation === 'vertical') {
    return (
      <div
        role="separator"
        aria-orientation="vertical"
        className={cn('w-px self-stretch border-l', variantClasses[variant], className)}
        {...props}
      />
    );
  }

  return (
    <div
      role="separator"
      aria-orientation="horizontal"
      className={cn('w-full border-t', variantClasses[variant], className)}
      {...props}
    />
  );
};
