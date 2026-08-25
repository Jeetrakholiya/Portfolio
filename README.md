# Jeet Rakholiya — Portfolio & Visual Showcase

> **Full-Stack Developer** & **Visual Creator (`J.GAZE_`)**  
> Built with Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS, Framer Motion, and Lenis.

---

## 1. Overview & Core Philosophy

This portfolio embodies the duality between **Software Engineering** and **Cinematic Storytelling**:
- **Code Identity (Default Light Theme)**: Clean, structured, architectural presentation of full-stack engineering work, scalable systems, and verified certifications.
- **Lens Identity (`#creative` Obsidian Theme)**: Immersive, dark gallery showcasing short-form visual stories, reels, and videography under the creative moniker **`J.GAZE_`**.

---

## 2. Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router, SSG static exports)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict mode)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + CSS Variables
- **Motion & Interactions**: [Framer Motion](https://www.framer.com/motion/)
- **Smooth Scroll**: [Lenis](https://github.com/darkroomengineering/lenis) (Native touch preserved)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 3. Development & Build Commands

```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Run strict TypeScript type check
npm run typecheck

# Run ESLint validation
npm run lint

# Create optimized production build
npm run build

# Start production server
npm start
```

---

## 4. Content Editing & Architecture Guide

All portfolio content is decoupled from layout components and centralized inside the `data/` directory.

### 4.1. General Site Configuration
- **File**: `data/site.ts`
- **What to update**: Name, creative title, email, verified social URLs (GitHub, LinkedIn, Instagram), location, and availability status.

### 4.2. Projects & Case Studies
- **File**: `data/projects.ts`
- **What to update**: Add, remove, or modify projects.
- **Fields**:
  - `slug`: Unique URL slug (e.g. `/projects/my-new-project`)
  - `featured`: `true` for 2-column featured cards, `false` for secondary grid
  - `image`: Screenshot / thumbnail path in `public/images/projects/`
  - `technologies`: Array of tech stack tags
  - `liveUrl` & `githubUrl`: Verified live demo and source code links
  - `features`, `architecture`, `challenges`, `metrics`: Case study deep-dive sections

### 4.3. Creative Work (`J.GAZE_`)
- **File**: `data/creative.ts`
- **What to update**: Add or update creative reels, videos, and photography.
- **Media Specs**:
  - `orientation`: `'portrait'` (9:16) or `'landscape'` (16:9)
  - `thumbnail`: WebP / JPG image poster in `public/images/creative/`
  - `video`: Optional compressed H.264 MP4 loop preview in `public/videos/`
  - `instagramUrl`: Direct link to the Instagram reel / post

### 4.4. Skills & Capabilities
- **File**: `data/skills.ts`
- **What to update**: Core competencies organized by category (Languages, Frontend, Backend, AI/ML, Creative Tools).

### 4.5. Background & Certifications
- **Files**: `data/background.ts`, `data/certifications.ts`
- **What to update**: Academic background (L.J. Institute) and verified credential links (IBM, HackerRank, freeCodeCamp, etc.).

---

## 5. Deployment

The application is fully optimized for **Vercel** or any static/Node.js host.

- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Node.js Version**: 18+ or 20+
- **Environment Variables**:
  - `NEXT_PUBLIC_SITE_URL`: Production domain (e.g. `https://jeetrakholiya.dev`)
