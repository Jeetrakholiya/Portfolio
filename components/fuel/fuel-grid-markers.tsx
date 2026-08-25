'use client';

import React from 'react';

export const FuelGridMarkers: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`absolute inset-0 pointer-events-none select-none z-10 ${className}`} aria-hidden="true">
      {/* Top Left */}
      <span className="absolute top-4 left-4 font-mono text-xs text-white/30 font-light">+</span>
      {/* Top Right */}
      <span className="absolute top-4 right-4 font-mono text-xs text-white/30 font-light">+</span>
      {/* Bottom Left */}
      <span className="absolute bottom-4 left-4 font-mono text-xs text-white/30 font-light">+</span>
      {/* Bottom Right */}
      <span className="absolute bottom-4 right-4 font-mono text-xs text-white/30 font-light">+</span>
      {/* Center Left */}
      <span className="absolute top-1/2 left-4 -translate-y-1/2 font-mono text-xs text-white/20 font-light">+</span>
      {/* Center Right */}
      <span className="absolute top-1/2 right-4 -translate-y-1/2 font-mono text-xs text-white/20 font-light">+</span>
    </div>
  );
};
