'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { templatesCatalog } from '@/data/templates';
import { TemplateProduct } from '@/types/templates';
import { CheckoutModal } from '@/components/templates/checkout-modal';
import {
  Terminal,
  Zap,
  Tv,
  Sparkles,
  Check,
  ArrowRight,
  Eye,
  Shield,
  Code2,
  Sliders,
  Download,
  HelpCircle,
  ChevronRight,
  Lock,
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function TemplatesMarketplacePage() {
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateProduct | null>(null);

  return (
    <div className="min-h-screen bg-[#09090b] text-[#f4f4f5] font-sans selection:bg-[#00f59b] selection:text-black">
      
      {/* =================================================================
          HEADER NAVIGATION
          ================================================================= */}
      <header className="sticky top-0 z-40 bg-[#09090b]/90 backdrop-blur-xl border-b border-white/10 px-4 sm:px-8 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center font-mono font-black text-white text-xs group-hover:border-[#00f59b] transition-colors">
            JG
          </div>
          <span className="font-bold text-sm tracking-tight text-white">TEMPLATES STORE</span>
        </Link>

        <div className="flex items-center gap-3 font-mono text-xs">
          <Link
            href="/"
            className="px-3.5 py-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/5 transition-colors hidden sm:block"
          >
            ← BACK TO PORTFOLIO
          </Link>

          <Link
            href="/admin"
            className="px-4 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/15 text-white font-bold transition-all flex items-center gap-1.5"
          >
            <Sliders className="w-3.5 h-3.5 text-[#00f59b]" />
            <span>PORTFOLIO BUILDER</span>
          </Link>
        </div>
      </header>

      {/* =================================================================
          HERO BANNER
          ================================================================= */}
      <section className="relative px-4 sm:px-8 pt-16 pb-12 max-w-6xl mx-auto text-center space-y-6">
        
        {/* Glow effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#00f59b]/10 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 font-mono text-[11px] text-[#00f59b]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>SIGNATURE PORTFOLIO TEMPLATE ENGINES</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white max-w-3xl mx-auto leading-[1.1]">
          Build &amp; Launch Your Signature Portfolio in Minutes.
        </h1>

        <p className="text-sm sm:text-base text-white/60 font-mono max-w-2xl mx-auto">
          Choose between Dark Terminal Cyber Monospace, Spider-Verse 360° Omnidirectional Physics, or Vintage 90s CRT TV Editorial. Complete with an integrated CMS Portfolio Builder.
        </p>

        {/* Guarantees Badges */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2 font-mono text-xs text-white/70">
          <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5 text-[#00f59b]" />
            Next.js 14 &amp; React 19
          </span>
          <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5 text-[#00f59b]" />
            CMS Admin Builder Included
          </span>
          <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5 text-[#00f59b]" />
            Commercial Use License
          </span>
          <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5 text-[#00f59b]" />
            1-Click Vercel Deploy
          </span>
        </div>

      </section>

      {/* =================================================================
          TEMPLATE CATALOG & CARDS
          ================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {templatesCatalog.filter((t) => t.themeKey !== 'all').map((template) => (
            <motion.div
              key={template.id}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className={`bg-[#111116] border rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden group shadow-xl ${
                template.popular ? 'border-[#c40c24]/50 shadow-[0_0_30px_rgba(196,12,36,0.15)]' : 'border-white/10'
              }`}
            >
              {template.popular && (
                <div className="absolute top-4 right-4 px-2.5 py-0.5 rounded-full bg-[#c40c24] text-white font-mono font-bold text-[10px] uppercase tracking-wider">
                  MOST POPULAR
                </div>
              )}

              <div className="space-y-4">
                
                {/* Image Preview */}
                <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-black/80 border border-white/10 group-hover:border-white/30 transition-all">
                  <Image
                    src={template.image}
                    alt={template.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  
                  <div className="absolute bottom-3 left-3 flex items-center gap-2">
                    <Link
                      href={template.livePreviewUrl}
                      target="_blank"
                      className="px-3 py-1 rounded-lg bg-black/80 hover:bg-black text-white font-mono text-[11px] border border-white/20 flex items-center gap-1.5 backdrop-blur-md transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5 text-[#00f59b]" />
                      <span>LIVE DEMO</span>
                    </Link>
                  </div>
                </div>

                {/* Badge & Title */}
                <div>
                  <span
                    className="font-mono text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded"
                    style={{ backgroundColor: `${template.accentColor}20`, color: template.accentColor }}
                  >
                    {template.badge}
                  </span>

                  <h3 className="text-xl font-bold text-white mt-2 group-hover:text-[#00f59b] transition-colors">
                    {template.name}
                  </h3>

                  <p className="text-xs text-white/60 font-mono mt-1 line-clamp-2">
                    {template.tagline}
                  </p>
                </div>

                {/* Pricing Block */}
                <div className="pt-2 flex items-baseline gap-2">
                  <span className="text-3xl font-black font-mono text-white">${template.price}</span>
                  {template.originalPrice && (
                    <span className="text-sm font-mono text-white/40 line-through">
                      ${template.originalPrice}
                    </span>
                  )}
                  <span className="text-[11px] font-mono text-white/50">USD • ONE-TIME</span>
                </div>

                {/* Features List */}
                <div className="space-y-2 pt-2 border-t border-white/10 font-mono text-xs text-white/80">
                  {template.features.slice(0, 4).map((f, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-[#00f59b] flex-shrink-0 mt-0.5" />
                      <span className="text-[11px] text-white/70">{f}</span>
                    </div>
                  ))}
                </div>

              </div>

              {/* Action Buttons */}
              <div className="pt-6 mt-6 border-t border-white/10 space-y-2 font-mono text-xs">
                <button
                  onClick={() => setSelectedTemplate(template)}
                  className="w-full py-3 bg-[#00f59b] hover:bg-[#00f59b]/90 text-black font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(0,245,155,0.3)] active:scale-98"
                >
                  <span>BUY TEMPLATE (${template.price})</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <div className="flex items-center justify-center gap-1.5 text-[10px] text-white/40 pt-1">
                  <Lock className="w-3 h-3 text-[#00f59b]" />
                  <span>Instant Access &amp; Builder Included</span>
                </div>
              </div>

            </motion.div>
          ))}
        </div>

        {/* =================================================================
            FEATURED: ALL-ACCESS TRIPLE BUNDLE CARD ($199)
            ================================================================= */}
        {(() => {
          const bundle = templatesCatalog.find((t) => t.themeKey === 'all')!;
          return (
            <div className="bg-gradient-to-r from-[#111116] via-[#161622] to-[#111116] border-2 border-[#00f59b] rounded-3xl p-6 sm:p-10 relative overflow-hidden shadow-[0_0_50px_rgba(0,245,155,0.2)]">
              
              <div className="absolute top-0 right-0 bg-[#00f59b] text-black font-mono font-black text-xs px-6 py-1.5 rounded-bl-xl uppercase tracking-wider">
                BEST VALUE // SAVE $168
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                <div className="lg:col-span-7 space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00f59b]/10 text-[#00f59b] font-mono text-xs font-bold border border-[#00f59b]/30">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>TRIPLE TEMPLATE SUITE</span>
                  </div>

                  <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                    {bundle.name}
                  </h2>

                  <p className="text-sm text-white/70 font-mono">
                    {bundle.description}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 font-mono text-xs">
                    {bundle.features.map((f, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-[#00f59b] flex-shrink-0" />
                        <span className="text-white/85 text-[11px]">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-5 bg-black/60 border border-white/15 rounded-2xl p-6 sm:p-8 flex flex-col justify-between space-y-6 text-center">
                  <div>
                    <span className="text-xs font-mono text-white/50 uppercase block mb-1">
                      COMPLETE BUNDLE PRICE
                    </span>
                    <div className="flex items-center justify-center gap-3">
                      <span className="text-4xl sm:text-5xl font-black font-mono text-white">
                        ${bundle.price}
                      </span>
                      <span className="text-lg font-mono text-white/40 line-through">
                        ${bundle.originalPrice}
                      </span>
                    </div>
                    <span className="text-[11px] font-mono text-[#00f59b] font-bold block mt-1">
                      ONE-TIME PAYMENT • ALL 3 TEMPLATES INCLUDED
                    </span>
                  </div>

                  <button
                    onClick={() => setSelectedTemplate(bundle)}
                    className="w-full py-4 bg-[#00f59b] hover:bg-[#00f59b]/90 text-black font-mono font-black text-sm rounded-xl flex items-center justify-center gap-2 transition-all shadow-[0_0_30px_rgba(0,245,155,0.5)] active:scale-98"
                  >
                    <span>BUY ALL 3 TEMPLATES ($199)</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <p className="text-[10px] font-mono text-white/40">
                    Includes source code repository, multi-theme CMS builder, lifetime updates &amp; commercial rights.
                  </p>
                </div>

              </div>

            </div>
          );
        })()}

      </section>

      {/* =================================================================
          FEATURE COMPARISON TABLE
          ================================================================= */}
      <section className="max-w-6xl mx-auto px-4 sm:px-8 py-16">
        <div className="text-center space-y-2 mb-10">
          <h2 className="text-2xl sm:text-3xl font-black text-white">Template Engine Breakdown</h2>
          <p className="text-xs text-white/60 font-mono">
            Compare features across Syntax, Spider-Tech, and Eric Cole.
          </p>
        </div>

        <div className="border border-white/10 rounded-2xl overflow-x-auto bg-[#111116]">
          <table className="w-full text-left font-mono text-xs min-w-[650px]">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.02] text-white/60">
                <th className="p-4">FEATURE / CAPABILITY</th>
                <th className="p-4 text-[#00f59b]">SYNTAX ($89)</th>
                <th className="p-4 text-[#c40c24]">SPIDER-TECH ($129)</th>
                <th className="p-4 text-white">ERIC COLE ($149)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-white/80">
              <tr>
                <td className="p-4 font-bold text-white">Target Persona</td>
                <td className="p-4">Full-Stack / AI Dev</td>
                <td className="p-4">Superhero / Sci-Fi</td>
                <td className="p-4">Filmmaker / Editorial</td>
              </tr>
              <tr>
                <td className="p-4 font-bold text-white">Signature Micro-Interactions</td>
                <td className="p-4">Terminal Marquee</td>
                <td className="p-4">360° Elastic Spider Spring</td>
                <td className="p-4">Vintage CRT Boot &amp; Glitch</td>
              </tr>
              <tr>
                <td className="p-4 font-bold text-white">Interactive Particle Canvas</td>
                <td className="p-4">Monospace Matrix</td>
                <td className="p-4">Pointer Web Shooter</td>
                <td className="p-4">Phosphor Scanlines</td>
              </tr>
              <tr>
                <td className="p-4 font-bold text-white">Full-Stack CMS Admin Builder</td>
                <td className="p-4 text-[#00f59b] font-bold">✓ Included</td>
                <td className="p-4 text-[#00f59b] font-bold">✓ Included</td>
                <td className="p-4 text-[#00f59b] font-bold">✓ Included</td>
              </tr>
              <tr>
                <td className="p-4 font-bold text-white">Source Code Download (.zip)</td>
                <td className="p-4 text-[#00f59b] font-bold">✓ Included</td>
                <td className="p-4 text-[#00f59b] font-bold">✓ Included</td>
                <td className="p-4 text-[#00f59b] font-bold">✓ Included</td>
              </tr>
              <tr>
                <td className="p-4 font-bold text-white">Commercial Rights</td>
                <td className="p-4 text-[#00f59b] font-bold">✓ 100% Rights</td>
                <td className="p-4 text-[#00f59b] font-bold">✓ 100% Rights</td>
                <td className="p-4 text-[#00f59b] font-bold">✓ 100% Rights</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* =================================================================
          FREQUENTLY ASKED QUESTIONS
          ================================================================= */}
      <section className="max-w-4xl mx-auto px-4 sm:px-8 pb-24 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-white">Frequently Asked Questions</h2>
          <p className="text-xs text-white/60 font-mono">
            Everything you need to know about customizing and launching your portfolio.
          </p>
        </div>

        <div className="space-y-4 font-mono text-xs">
          {[
            {
              q: 'How do I customize my portfolio details after buying?',
              a: 'Immediately upon checkout, you receive instant access to the CMS Admin Builder where you can fill in your name, bio, projects, video reels, and skills without writing any code. You can also export your configuration or deploy directly.',
            },
            {
              q: 'Can I host this on Vercel or my own domain?',
              a: 'Yes! The templates are built with Next.js 14 and require zero configuration to deploy to Vercel, Netlify, Cloudflare, or your own VPS.',
            },
            {
              q: 'What is included in the source code package?',
              a: 'You receive the complete Next.js 14 repository with all animations, 360° spring physics, CRT TV shaders, and the CMS admin dashboard with 100% commercial rights.',
            },
            {
              q: 'Can I switch between themes later?',
              a: 'If you purchase the All-Access Triple Bundle ($199), you get all 3 templates and can toggle between them anytime in the CMS or frontend switcher.',
            },
          ].map((faq, idx) => (
            <div key={idx} className="bg-[#111116] border border-white/10 rounded-xl p-5 space-y-2">
              <h4 className="font-bold text-sm text-white flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-[#00f59b] flex-shrink-0" />
                <span>{faq.q}</span>
              </h4>
              <p className="text-white/70 pl-6 leading-relaxed">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* =================================================================
          CHECKOUT & PAYMENT MODAL
          ================================================================= */}
      {selectedTemplate && (
        <CheckoutModal
          template={selectedTemplate}
          onClose={() => setSelectedTemplate(null)}
        />
      )}

    </div>
  );
}
