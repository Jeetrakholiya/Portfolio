import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export type LinkVariant = 'inline' | 'external' | 'nav' | 'subtle';

export interface CustomLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  variant?: LinkVariant;
  showIcon?: boolean;
  className?: string;
  children: React.ReactNode;
}

const variantClasses: Record<LinkVariant, string> = {
  inline:
    'relative inline-flex items-center text-foreground font-medium border-b border-foreground/30 hover:border-foreground transition-colors duration-fast pb-0.5',
  external:
    'group inline-flex items-center gap-1 text-foreground font-medium hover:text-muted transition-colors duration-fast',
  nav:
    'text-xs tracking-widest uppercase font-mono text-muted hover:text-foreground transition-colors duration-fast',
  subtle:
    'text-muted hover:text-foreground transition-colors duration-fast',
};

export const CustomLink: React.FC<CustomLinkProps> = ({
  href,
  variant = 'inline',
  showIcon = variant === 'external',
  className,
  children,
  target,
  rel,
  ...props
}) => {
  const isExternal = href.startsWith('http') || target === '_blank';
  const computedRel = isExternal ? 'noopener noreferrer' : rel;

  return (
    <a
      href={href}
      target={target || (isExternal ? '_blank' : undefined)}
      rel={computedRel}
      className={cn('select-none focus-visible:outline-2 focus-visible:outline-offset-2', variantClasses[variant], className)}
      {...props}
    >
      <span>{children}</span>
      {showIcon && (
        <ArrowUpRight
          className="w-3.5 h-3.5 transition-transform duration-fast ease-cinematic group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          aria-hidden="true"
        />
      )}
    </a>
  );
};
