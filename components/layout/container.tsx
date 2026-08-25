import React from 'react';
import { cn } from '@/lib/utils';

export type ContainerSize = 'standard' | 'wide' | 'editorial' | 'full';

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  size?: ContainerSize;
  className?: string;
  as?: React.ElementType;
}

const sizeClasses: Record<ContainerSize, string> = {
  standard: 'max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12',
  wide: 'max-w-[92rem] mx-auto px-4 sm:px-6 md:px-8 lg:px-12',
  editorial: 'max-w-3xl mx-auto px-4 sm:px-6 md:px-8',
  full: 'w-full px-4 sm:px-6 md:px-8',
};

export const Container: React.FC<ContainerProps> = ({
  children,
  size = 'standard',
  className,
  as: Component = 'div',
  ...props
}) => {
  return (
    <Component
      className={cn(sizeClasses[size], 'w-full', className)}
      {...props}
    >
      {children}
    </Component>
  );
};
