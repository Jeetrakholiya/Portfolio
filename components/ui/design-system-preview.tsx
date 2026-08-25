'use client';

import React, { useState } from 'react';
import { Container } from '@/components/layout/container';
import { Button } from '@/components/ui/button';
import { CustomLink } from '@/components/ui/custom-link';
import { SectionLabel } from '@/components/ui/section-label';
import { Tag } from '@/components/ui/tag';
import { Divider } from '@/components/ui/divider';
import { MediaFrame } from '@/components/ui/media-frame';

export const DesignSystemPreview: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'typography' | 'primitives' | 'media' | 'theme'>('all');

  return (
    <div className="w-full min-h-screen py-12 md:py-16 bg-background text-foreground transition-colors duration-normal">
      {/* Top Banner */}
      <Container size="wide" className="mb-12">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 md:p-6 bg-surface border border-border rounded-sm">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-mono text-xs uppercase tracking-widest text-muted">
                Step 2 Verification &bull; Design System
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-medium tracking-tight">
              Design System & Visual Foundation
            </h1>
          </div>
          <div className="flex flex-wrap gap-1.5 font-mono text-xs">
            {(['all', 'typography', 'primitives', 'media', 'theme'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 uppercase transition-colors rounded-sm ${
                  activeTab === tab
                    ? 'bg-accent text-accent-foreground font-medium'
                    : 'bg-surface-secondary text-muted hover:text-foreground'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </Container>

      {/* 1. TYPOGRAPHY SYSTEM */}
      {(activeTab === 'all' || activeTab === 'typography') && (
        <section className="mb-20">
          <Container size="wide">
            <SectionLabel number="01" label="Typography System (Fluid Clamp)" withLine className="mb-8" />

            <div className="space-y-10 p-6 md:p-10 bg-surface border border-border rounded-sm">
              <div className="border-b border-border pb-8">
                <span className="block font-mono text-xs text-muted uppercase tracking-widest mb-3">
                  Display XL &bull; clamp(3.25rem, 8.5vw, 8.5rem)
                </span>
                <p className="type-display-xl tracking-tightest font-medium">
                  Jeet Rakholiya
                </p>
              </div>

              <div className="border-b border-border pb-8">
                <span className="block font-mono text-xs text-muted uppercase tracking-widest mb-3">
                  Display &bull; clamp(2.5rem, 5.5vw, 5.25rem)
                </span>
                <p className="type-display tracking-tighter font-medium">
                  Digital Products &amp; Visual Stories.
                </p>
              </div>

              <div className="border-b border-border pb-8">
                <span className="block font-mono text-xs text-muted uppercase tracking-widest mb-3">
                  H1 &bull; clamp(2rem, 3.8vw, 3.5rem)
                </span>
                <p className="type-h1 tracking-tight font-medium">
                  Engineering Intelligent Web Systems
                </p>
              </div>

              <div className="border-b border-border pb-8">
                <span className="block font-mono text-xs text-muted uppercase tracking-widest mb-3">
                  H2 &bull; clamp(1.5rem, 2.6vw, 2.25rem)
                </span>
                <p className="type-h2 tracking-tight font-medium">
                  LearnWise: AI-Powered Learning Platform
                </p>
              </div>

              <div className="border-b border-border pb-8">
                <span className="block font-mono text-xs text-muted uppercase tracking-widest mb-3">
                  H3 &bull; clamp(1.2rem, 1.8vw, 1.5rem)
                </span>
                <p className="type-h3 font-medium">
                  Full-Stack Architecture &amp; Gemini Integration
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-b border-border pb-8">
                <div>
                  <span className="block font-mono text-xs text-muted uppercase tracking-widest mb-2">
                    Body Large &bull; Lead Paragraphs
                  </span>
                  <p className="type-body-lg text-foreground/90">
                    Crafting modern digital products with a focus on editorial clarity, intuitive interaction, and robust full-stack engineering.
                  </p>
                </div>
                <div>
                  <span className="block font-mono text-xs text-muted uppercase tracking-widest mb-2">
                    Body &bull; Standard Body Copy
                  </span>
                  <p className="type-body text-muted">
                    Bridging foundational software engineering and generative AI to create seamless, high-performance web applications with refined user experiences.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
                <div>
                  <span className="block font-mono text-xs text-muted uppercase tracking-widest mb-2">
                    Body Small
                  </span>
                  <p className="type-body-sm text-muted">
                    Responsive EV showcase website with multi-page structure and custom CSS design.
                  </p>
                </div>
                <div>
                  <span className="block font-mono text-xs text-muted uppercase tracking-widest mb-2">
                    Label (Uppercase Tracking)
                  </span>
                  <p className="type-label text-foreground">
                    Selected Case Study &bull; 2024
                  </p>
                </div>
                <div>
                  <span className="block font-mono text-xs text-muted uppercase tracking-widest mb-2">
                    Monospace / Metadata
                  </span>
                  <p className="type-mono text-foreground">
                    ID: 01-LWISE &bull; FASTAPI + REACT &bull; 100% TS
                  </p>
                </div>
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* 2. COLOR SYSTEM & DESIGN TOKENS */}
      {(activeTab === 'all' || activeTab === 'primitives') && (
        <section className="mb-20">
          <Container size="wide">
            <SectionLabel number="02" label="Color Tokens & Neutrals" withLine className="mb-8" />

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
              <div className="p-4 bg-background border border-border rounded-sm">
                <div className="h-10 mb-2 rounded-sm border border-border" style={{ backgroundColor: 'var(--background)' }} />
                <span className="block font-mono text-xs text-foreground font-semibold">Background</span>
                <span className="font-mono text-[10px] text-muted">var(--background)</span>
              </div>
              <div className="p-4 bg-surface border border-border rounded-sm">
                <div className="h-10 mb-2 rounded-sm border border-border" style={{ backgroundColor: 'var(--surface)' }} />
                <span className="block font-mono text-xs text-foreground font-semibold">Surface</span>
                <span className="font-mono text-[10px] text-muted">var(--surface)</span>
              </div>
              <div className="p-4 bg-surface-secondary border border-border rounded-sm">
                <div className="h-10 mb-2 rounded-sm border border-border" style={{ backgroundColor: 'var(--surface-secondary)' }} />
                <span className="block font-mono text-xs text-foreground font-semibold">Surface Sec</span>
                <span className="font-mono text-[10px] text-muted">var(--surface-sec)</span>
              </div>
              <div className="p-4 bg-surface border border-border rounded-sm">
                <div className="h-10 mb-2 rounded-sm border border-border" style={{ backgroundColor: 'var(--border)' }} />
                <span className="block font-mono text-xs text-foreground font-semibold">Border</span>
                <span className="font-mono text-[10px] text-muted">var(--border)</span>
              </div>
              <div className="p-4 bg-surface border border-border rounded-sm">
                <div className="h-10 mb-2 rounded-sm border border-border" style={{ backgroundColor: 'var(--muted)' }} />
                <span className="block font-mono text-xs text-foreground font-semibold">Muted</span>
                <span className="font-mono text-[10px] text-muted">var(--muted)</span>
              </div>
              <div className="p-4 bg-surface border border-border rounded-sm">
                <div className="h-10 mb-2 rounded-sm border border-border" style={{ backgroundColor: 'var(--foreground)' }} />
                <span className="block font-mono text-xs text-foreground font-semibold">Foreground</span>
                <span className="font-mono text-[10px] text-muted">var(--foreground)</span>
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* 3. BUTTONS, LINKS, TAGS & PRIMITIVES */}
      {(activeTab === 'all' || activeTab === 'primitives') && (
        <section className="mb-20">
          <Container size="wide">
            <SectionLabel number="03" label="UI Primitives & Interactive Elements" withLine className="mb-8" />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Buttons */}
              <div className="p-6 md:p-8 bg-surface border border-border rounded-sm space-y-6">
                <span className="block font-mono text-xs text-muted uppercase tracking-widest">
                  Button System &bull; Variants &amp; Hover States
                </span>

                <div className="flex flex-wrap items-center gap-3">
                  <Button variant="primary" size="md" icon="arrow-up-right">
                    View Project
                  </Button>
                  <Button variant="secondary" size="md">
                    Explore Work
                  </Button>
                  <Button variant="outline" size="md">
                    Case Study
                  </Button>
                  <Button variant="arrow" icon="arrow-right">
                    Watch Reel
                  </Button>
                  <Button variant="text">
                    Contact Me
                  </Button>
                </div>

                <div className="pt-4 border-t border-border flex flex-wrap items-center gap-3">
                  <span className="font-mono text-xs text-muted mr-2">Sizes:</span>
                  <Button variant="primary" size="sm">Small</Button>
                  <Button variant="primary" size="md">Medium</Button>
                  <Button variant="primary" size="lg">Large</Button>
                </div>
              </div>

              {/* Links & Tags */}
              <div className="p-6 md:p-8 bg-surface border border-border rounded-sm space-y-6">
                <span className="block font-mono text-xs text-muted uppercase tracking-widest">
                  Link &amp; Tag Badges
                </span>

                <div className="flex flex-wrap items-center gap-6">
                  <CustomLink href="https://pdf-craft-oprs.vercel.app" variant="external">
                    PDF Craft Live
                  </CustomLink>
                  <CustomLink href="https://metro-times-nu.vercel.app" variant="external">
                    Metro Times Live
                  </CustomLink>
                  <CustomLink href="#sample" variant="inline">
                    Inline Article Link
                  </CustomLink>
                  <CustomLink href="#sample" variant="nav">
                    NAV / WORK
                  </CustomLink>
                </div>

                <Divider />

                <div className="space-y-3">
                  <span className="block font-mono text-xs text-muted uppercase tracking-widest">
                    Technology &amp; Metadata Tags (Non-bubbly editorial style)
                  </span>
                  <div className="flex flex-wrap gap-2">
                    <Tag variant="default">React.js</Tag>
                    <Tag variant="default">FastAPI</Tag>
                    <Tag variant="default">Google Gemini</Tag>
                    <Tag variant="default">MongoDB</Tag>
                    <Tag variant="default">C# / .NET</Tag>
                    <Tag variant="default">TypeScript</Tag>
                    <Tag variant="accent">J.GAZE_</Tag>
                    <Tag variant="outline">2024</Tag>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* 4. MEDIA ASPECT RATIOS */}
      {(activeTab === 'all' || activeTab === 'media') && (
        <section className="mb-20">
          <Container size="wide">
            <SectionLabel number="04" label="Media Aspect Ratio Framework" withLine className="mb-8" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <MediaFrame
                aspectRatio="16:9"
                caption="16:9 Widescreen &bull; Case Studies & Web Showcase"
                placeholderText="16:9 Landscape"
              />
              <MediaFrame
                aspectRatio="4:3"
                caption="4:3 Editorial &bull; Project Previews"
                placeholderText="4:3 Editorial"
              />
              <MediaFrame
                aspectRatio="3:2"
                caption="3:2 Photography &bull; Visual Frames"
                placeholderText="3:2 Photo"
              />
              <MediaFrame
                aspectRatio="9:16"
                caption="9:16 Vertical &bull; J.GAZE_ Video Reels"
                placeholderText="9:16 Vertical Reel"
              />
            </div>
          </Container>
        </section>
      )}

      {/* 5. THEME INVERSION CAPABILITY (LIGHT VS DARK SECTION) */}
      {(activeTab === 'all' || activeTab === 'theme') && (
        <section className="mb-20">
          <Container size="wide">
            <SectionLabel number="05" label="Section-Level Theme Inversion" withLine className="mb-8" />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Light Environment */}
              <div className="p-8 bg-background border border-border rounded-sm space-y-6">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-muted uppercase tracking-widest">
                    Default Theme (Light Neutral)
                  </span>
                  <Tag variant="outline">Light Mode</Tag>
                </div>
                <h3 className="type-h2 font-medium tracking-tight">
                  Full-Stack Engineering
                </h3>
                <p className="type-body text-muted">
                  The primary portfolio environment uses a calm, editorial off-white backdrop with crisp typography and subtle borders.
                </p>
                <div className="flex flex-wrap gap-3 pt-2">
                  <Button variant="primary" icon="arrow-up-right">View Project</Button>
                  <Button variant="secondary">Case Study</Button>
                </div>
              </div>

              {/* Inverted Dark Section (e.g. J.GAZE_ / Creative Realm) */}
              <div data-theme="dark" className="theme-dark p-8 bg-background text-foreground border border-border rounded-sm space-y-6 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-muted uppercase tracking-widest">
                    Inverted Theme (Dark / Cinematic)
                  </span>
                  <Tag variant="accent">J.GAZE_ Creative</Tag>
                </div>
                <h3 className="type-h2 font-medium tracking-tight">
                  Cinematic Storytelling
                </h3>
                <p className="type-body text-muted">
                  Seamlessly inverts tokens for visual reels, cinematography, and media showcases without modifying individual components.
                </p>
                <div className="flex flex-wrap gap-3 pt-2">
                  <Button variant="primary" icon="arrow-up-right">Watch Reel</Button>
                  <Button variant="secondary">Instagram ↗</Button>
                </div>
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* 6. RESPONSIVE GRID LAYOUT TEST */}
      {activeTab === 'all' && (
        <section className="mb-12">
          <Container size="wide">
            <SectionLabel number="06" label="12-Column Responsive Grid Structure" withLine className="mb-8" />

            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-3 p-4 bg-surface border border-border rounded-sm">
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  className="h-16 flex items-center justify-center bg-surface-secondary border border-border-subtle font-mono text-xs text-muted rounded-sm"
                >
                  Col {i + 1}
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}
    </div>
  );
};
