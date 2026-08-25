'use client';

// Web Audio API Procedural Sound Generator for Spider-Man Suit & Webs
let audioCtx: AudioContext | null = null;
let soundEnabled = true;

export function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

export function isSpiderSoundEnabled(): boolean {
  return soundEnabled;
}

export function toggleSpiderSound(enabled?: boolean): boolean {
  soundEnabled = enabled !== undefined ? enabled : !soundEnabled;
  return soundEnabled;
}

/**
 * Authentic "THWIP!" Web-Shooter Release Sound
 * High-velocity pneumatic hiss followed by sharp polymer snap
 */
export function playThwipSound() {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;

  // 1. High-frequency pneumatic hiss (noise burst)
  const bufferSize = ctx.sampleRate * 0.15;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.04));
  }

  const noise = ctx.createBufferSource();
  noise.buffer = buffer;

  const filter = ctx.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.setValueAtTime(3200, now);
  filter.frequency.exponentialRampToValueAtTime(1200, now + 0.15);
  filter.Q.setValueAtTime(4, now);

  const noiseGain = ctx.createGain();
  noiseGain.gain.setValueAtTime(0.35, now);
  noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

  noise.connect(filter);
  filter.connect(noiseGain);
  noiseGain.connect(ctx.destination);
  noise.start(now);

  // 2. High-whip frequency drop
  const osc = ctx.createOscillator();
  const oscGain = ctx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(1800, now);
  osc.frequency.exponentialRampToValueAtTime(220, now + 0.12);

  oscGain.gain.setValueAtTime(0.2, now);
  oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

  osc.connect(oscGain);
  oscGain.connect(ctx.destination);
  osc.start(now);
  osc.stop(now + 0.12);
}

/**
 * Elastic Web Tension / Stretch Friction Sound
 */
export function playWebStretchSound(tension = 0.5) {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sawtooth';
  const baseFreq = 180 + tension * 400;
  osc.frequency.setValueAtTime(baseFreq, now);
  osc.frequency.linearRampToValueAtTime(baseFreq + 80, now + 0.06);

  gain.gain.setValueAtTime(0.06, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(now);
  osc.stop(now + 0.06);
}

/**
 * Spider-Sense Alert Resonance Chime
 */
export function playSpiderSenseAlert() {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  [520, 680, 840, 1080].forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now + i * 0.04);

    gain.gain.setValueAtTime(0.08, now + i * 0.04);
    gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.04 + 0.2);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now + i * 0.04);
    osc.stop(now + i * 0.04 + 0.2);
  });
}
