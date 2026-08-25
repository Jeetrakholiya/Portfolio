'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { easings } from '@/lib/animations';

interface PageTransitionContextType {
  navigate: (url: string) => void;
  isTransitioning: boolean;
}

const PageTransitionContext = createContext<PageTransitionContextType>({
  navigate: () => {},
  isTransitioning: false,
});

export const usePageTransition = () => useContext(PageTransitionContext);

export const PageTransitionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const shouldReduce = useReducedMotion();

  // Reset transition state whenever pathname changes
  useEffect(() => {
    setIsTransitioning(false);
  }, [pathname]);

  // Safety fallback: ensure overlay never gets stuck
  useEffect(() => {
    if (!isTransitioning) return;
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, [isTransitioning]);

  const navigate = (url: string) => {
    if (shouldReduce) {
      router.push(url);
      return;
    }

    if (url.startsWith('http') || url.startsWith('mailto:') || url.startsWith('tel:')) {
      window.location.href = url;
      return;
    }

    const [targetPath, targetHash] = url.split('#');
    const isCurrentPath = !targetPath || targetPath === pathname || (targetPath === '/' && pathname === '/');

    if (isCurrentPath && targetHash) {
      const element = document.getElementById(targetHash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    if (isTransitioning) return;

    setIsTransitioning(true);

    setTimeout(() => {
      router.push(url);
    }, 280);
  };

  return (
    <PageTransitionContext.Provider value={{ navigate, isTransitioning }}>
      {children}

      {/* Dark Curtain Wipe */}
      <AnimatePresence mode="wait">
        {isTransitioning && !shouldReduce && (
          <motion.div
            key="page-transition-curtain"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            exit={{ scaleY: 0 }}
            transition={{
              duration: 0.3,
              ease: easings.cinematic,
            }}
            style={{ transformOrigin: 'bottom' }}
            className="fixed inset-0 z-50 bg-[#09090b] border-t border-white/10 pointer-events-auto flex flex-col items-center justify-center text-white"
            aria-hidden="true"
          >
            <div className="font-mono text-xs uppercase tracking-widest text-muted flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-[#00f59b] animate-pulse" />
              <span>Loading...</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageTransitionContext.Provider>
  );
};

export interface TransitionLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
}

export const TransitionLink: React.FC<TransitionLinkProps> = ({
  href,
  children,
  onClick,
  className,
  ...props
}) => {
  const { navigate } = usePageTransition();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) onClick(e);
    if (!e.defaultPrevented && !props.target && !e.metaKey && !e.ctrlKey) {
      e.preventDefault();
      navigate(href);
    }
  };

  return (
    <a href={href} onClick={handleClick} className={className} {...props}>
      {children}
    </a>
  );
};
