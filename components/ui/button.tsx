'use client';

import React from 'react';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { usePageTransition } from '@/components/providers/page-transition-provider';
import { cn } from '@/lib/utils';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'text' | 'arrow' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: 'arrow-up-right' | 'arrow-right' | 'none';
  href?: string;
  target?: string;
  rel?: string;
  className?: string;
  children: React.ReactNode;
  'data-cursor'?: string;
  'data-cursor-label'?: string;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-foreground text-background border border-foreground hover:bg-transparent hover:text-foreground active:scale-[0.98]',
  secondary:
    'bg-surface-secondary text-foreground border border-border hover:border-foreground/40 hover:bg-surface-tertiary active:scale-[0.98]',
  outline:
    'bg-transparent text-foreground border border-border hover:border-foreground hover:bg-white/[0.04] active:scale-[0.98]',
  text:
    'group bg-transparent text-foreground hover:text-[#00f59b] p-0 font-mono tracking-wider active:opacity-70',
  arrow:
    'group bg-transparent text-foreground border-b border-border hover:border-[#00f59b] hover:text-[#00f59b] pb-0.5 font-mono tracking-wider active:opacity-70',
  ghost:
    'bg-transparent text-muted hover:text-foreground p-0 font-mono tracking-wider',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'text-xs px-3 py-1.5 gap-1.5 tracking-wider font-mono uppercase',
  md: 'text-xs px-4 py-2 gap-2 tracking-widest font-mono uppercase',
  lg: 'text-sm px-6 py-2.5 gap-2.5 tracking-widest font-mono uppercase',
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'outline',
      size = 'md',
      icon = 'none',
      href,
      target,
      rel,
      className,
      children,
      disabled,
      'data-cursor': dataCursor,
      'data-cursor-label': dataCursorLabel,
      onClick,
      ...props
    },
    ref
  ) => {
    const { navigate } = usePageTransition();
    const isTextOrArrow = variant === 'text' || variant === 'arrow' || variant === 'ghost';
    const computedSize = isTextOrArrow ? 'text-xs font-mono tracking-widest uppercase' : sizeClasses[size];

    const content = (
      <>
        <span>{children}</span>
        {icon === 'arrow-up-right' && (
          <ArrowUpRight
            className="w-3.5 h-3.5 transition-transform duration-fast ease-cinematic group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden="true"
          />
        )}
        {icon === 'arrow-right' && (
          <ArrowRight
            className="w-3.5 h-3.5 transition-transform duration-fast ease-cinematic group-hover:translate-x-1"
            aria-hidden="true"
          />
        )}
      </>
    );

    const baseClasses = cn(
      'inline-flex items-center justify-center font-mono select-none rounded-[2px] transition-all duration-fast ease-cinematic focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-40 disabled:pointer-events-none',
      variantClasses[variant],
      computedSize,
      className
    );

    if (href) {
      const isExternal =
        target === '_blank' ||
        href.startsWith('http') ||
        href.startsWith('mailto:') ||
        href.startsWith('tel:');

      const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (onClick) onClick(e as unknown as React.MouseEvent<HTMLButtonElement>);
        if (!isExternal && !e.defaultPrevented && !e.metaKey && !e.ctrlKey) {
          e.preventDefault();
          navigate(href);
        }
      };

      return (
        <a
          href={href}
          target={target}
          rel={target === '_blank' ? 'noopener noreferrer' : rel}
          onClick={handleClick}
          data-cursor={dataCursor}
          data-cursor-label={dataCursorLabel}
          className={baseClasses}
        >
          {content}
        </a>
      );
    }

    return (
      <button
        ref={ref}
        disabled={disabled}
        onClick={onClick}
        data-cursor={dataCursor}
        data-cursor-label={dataCursorLabel}
        className={baseClasses}
        {...props}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = 'Button';
