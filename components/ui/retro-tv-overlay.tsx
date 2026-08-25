'use client';

import React from 'react';

export const RetroTVOverlay: React.FC = () => {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-30 overflow-hidden select-none"
    >
      {/* 1. Concentrated Horizontal Cathode Scanlines (Crisp 3px raster matrix) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.16)_51%)] bg-[length:100%_3px] opacity-90 animate-tv-lines" />

      {/* 2. Primary Traveling V-Sync Rolling Scan Beam (90s broadcast signal drift) */}
      <div className="absolute inset-x-0 h-44 bg-gradient-to-b from-transparent via-black/[0.12] to-transparent animate-scanline-roll">
        <div className="w-full h-1 bg-white/[0.2] blur-[1px]" />
      </div>

      {/* 3. Secondary Faint Interference Signal Sweep */}
      <div className="absolute inset-x-0 h-28 bg-gradient-to-b from-transparent via-black/[0.08] to-transparent animate-scanline-secondary" />

      {/* 4. High-Density Analog TV Static Grain & Broadcast Noise */}
      <div
        className="absolute inset-0 opacity-[0.09] animate-tv-noise bg-repeat"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* 5. Curved CRT Screen Glass Bevel & Radial Corner Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(0,0,0,0.22)_100%)] shadow-[inset_0_0_90px_rgba(0,0,0,0.25)] animate-crt-pulse" />
    </div>
  );
};
