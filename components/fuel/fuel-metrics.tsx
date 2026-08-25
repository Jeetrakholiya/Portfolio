'use client';

import React from 'react';
import { FuelGridMarkers } from './fuel-grid-markers';

export const FuelMetrics: React.FC = () => {
  const metrics = [
    {
      value: '2.06M',
      label: 'Global Impressions',
      sublabel: 'Fuel-inspired digital reach & creative viewer impressions across platforms.',
    },
    {
      value: '160K+',
      label: 'Community Reach',
      sublabel: 'Engaged developer and creative community interacting with open source systems.',
    },
    {
      value: '750+',
      label: 'Creative Hours Logged',
      sublabel: 'Dedicated development, video editing, and algorithmic architecture.',
    },
    {
      value: '100%',
      label: 'Production Reliability',
      sublabel: 'Tested systems engineered with precision, responsive design, and zero downtime.',
    },
  ];

  return (
    <section className="relative w-full py-20 sm:py-28 px-6 sm:px-12 lg:px-16 bg-[#070709] text-[#f8fafc] border-b border-white/10 select-none">
      <FuelGridMarkers />

      <div className="max-w-6xl mx-auto space-y-16 sm:space-y-24">
        {/* Giant Quote Section (Matching Video Exact Statement) */}
        <div className="max-w-4xl space-y-4">
          <span className="font-mono text-xs text-[#ff5500] uppercase tracking-widest block">
            04/ Verified Impact
          </span>
          <blockquote className="text-3xl sm:text-5xl lg:text-6xl font-normal leading-[1.15] text-white tracking-tight">
            &ldquo;Fuel delivered with clarity. Their structured workflow and fast turnaround made our digital launch seamless. A trusted partner for every creative push.&rdquo;
          </blockquote>
          <span className="font-mono text-xs text-muted uppercase tracking-wider block pt-2">
            &mdash; Jeet Rakholiya &bull; J.GAZE_ Studio
          </span>
        </div>

        {/* 4-Bento Metrics Matrix */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pt-10 border-t border-white/10">
          {metrics.map((m) => (
            <div key={m.label} className="space-y-2">
              <div className="text-5xl sm:text-6xl font-black text-white tracking-tight">
                {m.value}
              </div>
              <h4 className="font-mono text-xs uppercase tracking-wider text-[#ff5500] font-bold">
                {m.label}
              </h4>
              <p className="font-mono text-[11px] text-muted leading-relaxed">
                {m.sublabel}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
