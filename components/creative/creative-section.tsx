import React from 'react';
import { Container } from '@/components/layout/container';
import { SectionLabel } from '@/components/ui/section-label';
import { CreativeItem } from '@/components/creative/creative-item';
import { CreativeGalleryProvider } from '@/components/creative/creative-gallery-context';
import { creativeWorksData } from '@/data/creative';
import { siteConfig } from '@/data/site';
import { CreativeWork } from '@/types/creative';
import { ArrowUpRight } from 'lucide-react';

export interface CreativeSectionProps {
  creativeWorks?: CreativeWork[];
}

export const CreativeSection: React.FC<CreativeSectionProps> = ({ creativeWorks }) => {
  const dataList = creativeWorks || creativeWorksData;
  const featuredReel = dataList.find((w) => w.orientation === 'vertical' || w.tier === 'featured') || dataList[0];
  const primaryLandscape = dataList.find((w) => w.orientation === 'landscape' || w.tier === 'primary') || dataList[1];
  const supportingWorks = dataList.filter(
    (w) => w.id !== featuredReel?.id && w.id !== primaryLandscape?.id
  );

  return (
    <CreativeGalleryProvider>
      <section
        id="creative"
        aria-label="Creative and Visual Work"
        className="w-full bg-[#09090b] text-[#f2f2f0] section-padding border-b border-white/[0.08] overflow-hidden"
      >
        <Container size="wide">
          {/* =================================================================
              1. SECTION INTRO & STATEMENT
              ================================================================= */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 sm:mb-20 pb-8 border-b border-white/[0.08]">
            <div className="space-y-3 max-w-2xl">
              <SectionLabel
                number="02"
                label={`Creative Domain / ${siteConfig.creativeName}`}
                withDot
                withLine
                className="mb-1 text-muted"
              />
              <h2 className="type-display text-white">
                Visual Stories. <br />
                Through The Lens.
              </h2>
            </div>

            <div className="space-y-2 max-w-md lg:text-right font-mono text-xs text-muted">
              <span className="text-[#00f59b] uppercase tracking-widest block">
                Videography &bull; Video Editing &bull; Storytelling
              </span>
              <p className="type-body-sm text-white/70 leading-relaxed">
                Short-form visuals, dynamic reels, and cinematic storytelling crafted under the identity of @j.gaze_.
              </p>
            </div>
          </div>

          {/* =================================================================
              2. CURATED SHOWCASE: 9:16 PORTRAIT REEL + 16:9 CINEMATIC FRAME
              ================================================================= */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start mb-16 sm:mb-24">
            {/* Left Column: Featured 9:16 Vertical Reel */}
            {featuredReel && (
              <div className="lg:col-span-5">
                <CreativeItem item={featuredReel} index={0} />
              </div>
            )}

            {/* Right Column: Primary 16:9 Landscape Video Study */}
            {primaryLandscape && (
              <div className="lg:col-span-7">
                <CreativeItem item={primaryLandscape} index={1} />
              </div>
            )}
          </div>

          {/* =================================================================
              3. SUPPORTING ARCHIVE GRID (3 COLUMNS)
              ================================================================= */}
          {supportingWorks.length > 0 && (
            <div className="border-t border-white/[0.08] pt-16">
              <div className="flex items-center justify-between font-mono text-xs text-muted mb-8 pb-4 border-b border-white/[0.06]">
                <span className="uppercase tracking-widest text-[#00f59b]">Visual Archive</span>
                <span>{supportingWorks.length} Selected Works</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {supportingWorks.map((work, index) => (
                  <CreativeItem
                    key={work.id}
                    item={work}
                    index={index + 2}
                  />
                ))}
              </div>
            </div>
          )}

          {/* =================================================================
              4. FOOTER INSTAGRAM CHANNEL LINK
              ================================================================= */}
          <div className="mt-16 sm:mt-20 pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs text-muted">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00f59b]" aria-hidden="true" />
              <span className="uppercase tracking-wider text-white font-medium">
                Official Creative Handle:
              </span>
              <span className="text-[#00f59b] font-bold">@j.gaze_</span>
            </div>

            <a
              href={siteConfig.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 text-white hover:text-[#00f59b] transition-colors uppercase tracking-widest pb-0.5 border-b border-white/20 hover:border-[#00f59b]"
            >
              <span>Explore Instagram Channel</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </Container>
      </section>
    </CreativeGalleryProvider>
  );
};
