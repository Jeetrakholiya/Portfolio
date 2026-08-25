'use client';

import React, { useEffect, useRef } from 'react';
import { playThwipSound } from './spider-sound-effects';

interface CursorParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  life: number;
  maxLife: number;
  alpha: number;
}

interface WebBurstParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
  size: number;
}

interface WebSplatter {
  offsetX: number;
  offsetY: number;
  length: number;
  angle: number;
}

interface WebShot {
  startX: number;
  startY: number;
  targetX: number;
  targetY: number;
  progress: number;
  speed: number;
  curveAmount: number;
  color: string;
  life: number;
  maxLife: number;
  splatters: WebSplatter[];
  element?: HTMLElement | null;
  tugApplied: boolean;
}

export const SpiderWebCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse tracking coordinates
    const mouse = {
      x: width / 2,
      y: height / 2,
      targetX: width / 2,
      targetY: height / 2,
      prevX: width / 2,
      prevY: height / 2,
      isHovered: false,
      speed: 0,
      pulseRadius: 0,
    };

    // Web Color: Strictly Pure White
    const webColor = '#ffffff';

    // Pointer-only particles (spawned ONLY around cursor)
    const cursorParticles: CursorParticle[] = [];

    // Web burst particles (on click)
    let particles: WebBurstParticle[] = [];

    // Active web shots that latch onto nearby DOM elements
    let webShots: WebShot[] = [];

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.isHovered = true;

      // Calculate cursor speed
      const dx = e.clientX - mouse.prevX;
      const dy = e.clientY - mouse.prevY;
      mouse.speed = Math.sqrt(dx * dx + dy * dy);
      mouse.prevX = e.clientX;
      mouse.prevY = e.clientY;

      // Spawn pure white particles ONLY around the mouse cursor when moving
      const spawnCount = Math.min(4, Math.max(1, Math.floor(mouse.speed / 4)));
      for (let i = 0; i < spawnCount; i++) {
        const offsetAngle = Math.random() * Math.PI * 2;
        const offsetDist = Math.random() * 18 + 4;
        const speed = Math.random() * 1.5 + 0.5;

        cursorParticles.push({
          x: e.clientX + Math.cos(offsetAngle) * offsetDist,
          y: e.clientY + Math.sin(offsetAngle) * offsetDist,
          vx: (Math.random() - 0.5) * speed + (dx * 0.08),
          vy: (Math.random() - 0.5) * speed + (dy * 0.08) - 0.4, // slight float upward
          size: Math.random() * 2 + 1.2,
          life: 0,
          maxLife: Math.random() * 22 + 18,
          alpha: 1,
        });
      }

      // Limit particle array size
      if (cursorParticles.length > 90) {
        cursorParticles.splice(0, cursorParticles.length - 90);
      }
    };

    const handleMouseLeave = () => {
      mouse.isHovered = false;
    };

    // Shoot pure white webs to nearby components on click!
    const handleClick = (e: MouseEvent) => {
      const clickX = e.clientX;
      const clickY = e.clientY;

      playThwipSound();

      // 1. Trigger "THWIP!" pure white particle burst at click origin
      const burstCount = 24;
      for (let i = 0; i < burstCount; i++) {
        const angle = (Math.PI * 2 * i) / burstCount + (Math.random() - 0.5) * 0.3;
        const speed = Math.random() * 5 + 3;
        particles.push({
          x: clickX,
          y: clickY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1,
          maxLife: Math.random() * 25 + 20,
          color: webColor,
          size: Math.random() * 3 + 1.5,
        });
      }

      // Trigger expanding white sensory radar wave
      mouse.pulseRadius = 1;

      // 2. Query nearby DOM elements (Cards, Headings, Buttons, Badges, Text)
      const querySelectors =
        'h1, h2, h3, p, a, button, [data-web-hover], [data-spidey-hover], .group, input, textarea, blockquote';
      const domElements = Array.from(document.querySelectorAll<HTMLElement>(querySelectors));

      const nearbyTargets: {
        element: HTMLElement;
        targetX: number;
        targetY: number;
        dist: number;
      }[] = [];

      for (const el of domElements) {
        const rect = el.getBoundingClientRect();

        if (rect.bottom < 0 || rect.top > height || rect.right < 0 || rect.left > width) {
          continue;
        }

        const anchors = [
          { x: rect.left, y: rect.top },
          { x: rect.right, y: rect.top },
          { x: rect.left, y: rect.bottom },
          { x: rect.right, y: rect.bottom },
          { x: (rect.left + rect.right) / 2, y: rect.top },
          { x: (rect.left + rect.right) / 2, y: rect.bottom },
          { x: rect.left, y: (rect.top + rect.bottom) / 2 },
          { x: rect.right, y: (rect.top + rect.bottom) / 2 },
        ];

        let closestAnchor = anchors[0];
        let minDist = Infinity;

        for (const anchor of anchors) {
          const dx = anchor.x - clickX;
          const dy = anchor.y - clickY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < minDist) {
            minDist = dist;
            closestAnchor = anchor;
          }
        }

        if (minDist > 25 && minDist < 650) {
          nearbyTargets.push({
            element: el,
            targetX: closestAnchor.x,
            targetY: closestAnchor.y,
            dist: minDist,
          });
        }
      }

      nearbyTargets.sort((a, b) => a.dist - b.dist);
      const chosenTargets = nearbyTargets.slice(0, 4);

      // 3. Create WebShot strands that shoot and latch
      chosenTargets.forEach((target) => {
        const splatters: WebSplatter[] = [];
        const splatterCount = Math.floor(Math.random() * 4) + 4;
        for (let s = 0; s < splatterCount; s++) {
          splatters.push({
            offsetX: (Math.random() - 0.5) * 16,
            offsetY: (Math.random() - 0.5) * 16,
            length: Math.random() * 18 + 8,
            angle: Math.random() * Math.PI * 2,
          });
        }

        webShots.push({
          startX: clickX,
          startY: clickY,
          targetX: target.targetX,
          targetY: target.targetY,
          progress: 0,
          speed: Math.random() * 0.08 + 0.12,
          curveAmount: (Math.random() - 0.5) * 35,
          color: webColor,
          life: 0,
          maxLife: 130,
          splatters,
          element: target.element,
          tugApplied: false,
        });
      });
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('click', handleClick);

    // Main animation loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.15;
      mouse.y += (mouse.targetY - mouse.y) * 0.15;

      // Update and draw expanding pure white radar wave on click
      if (mouse.pulseRadius > 0) {
        mouse.pulseRadius += 6;
        const alpha = Math.max(0, 1 - mouse.pulseRadius / 180);
        if (alpha > 0) {
          ctx.beginPath();
          ctx.arc(mouse.x, mouse.y, mouse.pulseRadius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.8})`;
          ctx.lineWidth = 1.8;
          ctx.setLineDash([8, 6]);
          ctx.stroke();
          ctx.setLineDash([]);

          ctx.beginPath();
          ctx.arc(mouse.x, mouse.y, mouse.pulseRadius * 0.7, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.5})`;
          ctx.lineWidth = 1.2;
          ctx.stroke();
        } else {
          mouse.pulseRadius = 0;
        }
      }

      // =================================================================
      // 1. DRAW POINTER-ONLY PARTICLES & MICRO-WEB STRANDS
      // =================================================================
      for (let i = cursorParticles.length - 1; i >= 0; i--) {
        const p = cursorParticles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.94;
        p.vy *= 0.94;
        p.life++;

        p.alpha = Math.max(0, 1 - p.life / p.maxLife);

        if (p.alpha <= 0) {
          cursorParticles.splice(i, 1);
          continue;
        }

        // Draw particle dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * p.alpha, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha * 0.9})`;
        ctx.shadowColor = '#ffffff';
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Draw micro web connection from particle to mouse cursor
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const distToMouse = Math.sqrt(dx * dx + dy * dy);

        if (distToMouse < 60) {
          const webAlpha = (1 - distToMouse / 60) * p.alpha * 0.6;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(255, 255, 255, ${webAlpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }

        // Connect nearby cursor particles to each other (micro-web webbing)
        for (let j = i - 1; j >= 0; j--) {
          const p2 = cursorParticles[j];
          const pdx = p.x - p2.x;
          const pdy = p.y - p2.y;
          const pDist = Math.sqrt(pdx * pdx + pdy * pdy);

          if (pDist < 35) {
            const pairAlpha = (1 - pDist / 35) * Math.min(p.alpha, p2.alpha) * 0.5;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${pairAlpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      // =================================================================
      // 2. DRAW SHOT PURE WHITE SPIDER WEBS LATCHED TO NEARBY COMPONENTS
      // =================================================================
      for (let i = webShots.length - 1; i >= 0; i--) {
        const shot = webShots[i];
        shot.life++;

        if (shot.progress < 1) {
          shot.progress = Math.min(1, shot.progress + shot.speed);

          if (shot.progress >= 1 && !shot.tugApplied && shot.element && shot.element !== document.body) {
            shot.tugApplied = true;
            const dx = shot.startX - shot.targetX;
            const dy = shot.startY - shot.targetY;
            const len = Math.sqrt(dx * dx + dy * dy) || 1;
            const tugMagnitude = Math.min(6, len * 0.03);
            const tugX = (dx / len) * tugMagnitude;
            const tugY = (dy / len) * tugMagnitude;

            const el = shot.element;
            const originalTransform = el.style.transform;
            el.style.transition = 'transform 0.12s cubic-bezier(0.16, 1, 0.3, 1)';
            el.style.transform = `translate3d(${tugX}px, ${tugY}px, 0)`;

            setTimeout(() => {
              el.style.transition = 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
              el.style.transform = originalTransform || 'translate3d(0, 0, 0)';
            }, 120);
          }
        }

        const alpha = Math.max(0, 1 - shot.life / shot.maxLife);
        if (alpha <= 0) {
          webShots.splice(i, 1);
          continue;
        }

        const curTipX = shot.startX + (shot.targetX - shot.startX) * shot.progress;
        const curTipY = shot.startY + (shot.targetY - shot.startY) * shot.progress;

        const midX = (shot.startX + curTipX) / 2;
        const midY = (shot.startY + curTipY) / 2 + shot.curveAmount * (1 - shot.progress * 0.4);

        // Draw primary pure white web strand
        ctx.beginPath();
        ctx.moveTo(shot.startX, shot.startY);
        ctx.quadraticCurveTo(midX, midY, curTipX, curTipY);
        ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.95})`;
        ctx.lineWidth = 2.2;
        ctx.shadowColor = '#ffffff';
        ctx.shadowBlur = 10;
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Draw secondary parallel reinforcement pure white web strand
        ctx.beginPath();
        ctx.moveTo(shot.startX, shot.startY);
        ctx.quadraticCurveTo(midX + 4, midY - 3, curTipX, curTipY);
        ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.5})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Draw sticky web anchor splatters at target component edge
        if (shot.progress >= 1) {
          ctx.beginPath();
          ctx.arc(shot.targetX, shot.targetY, 3.5, 0, Math.PI * 2);
          ctx.fillStyle = '#ffffff';
          ctx.shadowColor = '#ffffff';
          ctx.shadowBlur = 6;
          ctx.fill();
          ctx.shadowBlur = 0;

          for (const sp of shot.splatters) {
            const endX = shot.targetX + Math.cos(sp.angle) * sp.length;
            const endY = shot.targetY + Math.sin(sp.angle) * sp.length;

            ctx.beginPath();
            ctx.moveTo(shot.targetX + sp.offsetX, shot.targetY + sp.offsetY);
            ctx.lineTo(endX, endY);
            ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.8})`;
            ctx.lineWidth = 1.2;
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(endX, endY, 1.2, 0, Math.PI * 2);
            ctx.fillStyle = '#ffffff';
            ctx.fill();
          }
        }
      }

      // Draw cross-web threads between active latched shots
      if (webShots.length >= 2) {
        for (let i = 0; i < webShots.length - 1; i++) {
          const shotA = webShots[i];
          const shotB = webShots[i + 1];

          if (shotA.progress >= 0.8 && shotB.progress >= 0.8) {
            const avgAlpha = (Math.max(0, 1 - shotA.life / shotA.maxLife) + Math.max(0, 1 - shotB.life / shotB.maxLife)) / 2;

            for (let step = 1; step <= 2; step++) {
              const ratio = step * 0.33;
              const ax = shotA.startX + (shotA.targetX - shotA.startX) * ratio;
              const ay = shotA.startY + (shotA.targetY - shotA.startY) * ratio;
              const bx = shotB.startX + (shotB.targetX - shotB.startX) * ratio;
              const by = shotB.startY + (shotB.targetY - shotB.startY) * ratio;

              ctx.beginPath();
              ctx.moveTo(ax, ay);
              ctx.lineTo(bx, by);
              ctx.strokeStyle = `rgba(255, 255, 255, ${avgAlpha * 0.5})`;
              ctx.lineWidth = 0.9;
              ctx.stroke();
            }
          }
        }
      }

      // Update and draw burst particles ("THWIP!" on click)
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.94;
        p.vy *= 0.94;
        p.life++;

        const alpha = Math.max(0, 1 - p.life / p.maxLife);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * alpha, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = '#ffffff';
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;

        ctx.beginPath();
        ctx.moveTo(mouse.x, mouse.y);
        ctx.lineTo(p.x, p.y);
        ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.45})`;
        ctx.lineWidth = 0.6;
        ctx.stroke();

        if (p.life >= p.maxLife) {
          particles.splice(i, 1);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('click', handleClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-10 w-full h-full"
    />
  );
};
