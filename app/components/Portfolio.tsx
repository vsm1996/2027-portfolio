'use client';

import React, { useEffect, useState } from 'react';
import { Nav, Hero, About, Work, Experience, Skills, Principles, Contact, Footer } from './sections';
import {
  useTweaks, TweaksPanel, TweakSection,
  TweakRadio, TweakColor, TweakSlider, TweakToggle, TweakButton,
} from './TweaksPanel';

// ── Globals typed ──────────────────────────────────────────────────────────
declare global {
  interface Window {
    caw?: () => void;
    _caw_real?: () => void;
    genjutsuFlip?: (cb?: () => void) => void;
    cornerTear?: () => void;
    // scatterCrowsAt?: (x: number, y: number, force?: number) => void;
    // crowBurstAt?: (x: number, y: number, force?: number) => void;
    // setCrowDensity?: (mult: number) => void;
    // _crowBurstEnabled?: boolean;
    _inkRippleEnabled?: boolean;
    observeReveal?: () => void;
    observeBleed?: () => void;
    paintHexFrames?: () => void;
  }
}

const TWEAK_DEFAULTS = {
  profile: 'shrine',
  stage: 'tomoe',
  motion: 10,
  // crowDensity: 1,
  // crowsEnabled: true,
  lensEnabled: true,
  audioEnabled: false,
  inkRipple: true,
  // crowBurst: true,
};

const PROFILE_PALETTES: Record<string, string[]> = {
  shrine: ['#b91c1c', '#0a0608', '#e7d9c5'],
  amaterasu: ['#d4a72c', '#0a0608', '#f0e6cd'],
  tsukuyomi: ['#f5f5f5', '#3a0a0a', '#dc2626'],
};
const PALETTE_TO_PROFILE = Object.fromEntries(
  Object.entries(PROFILE_PALETTES).map(([k, v]) => [v[0].toLowerCase(), k])
);

// ── Crow flock simulation ──────────────────────────────────────────────────
// function setupCrowFlock() {
//   const canvas = document.getElementById('crow-flock') as HTMLCanvasElement;
//   if (!canvas) return () => { };
//   const ctx = canvas.getContext('2d')!;
//   let W = 0, H = 0;
//   const dpr = Math.min(2, window.devicePixelRatio || 1);

//   function resize() {
//     W = window.innerWidth; H = window.innerHeight;
//     canvas.width = W * dpr; canvas.height = H * dpr;
//     canvas.style.width = W + 'px'; canvas.style.height = H + 'px';
//     ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
//   }
//   resize();
//   window.addEventListener('resize', resize);

//   function getAccentColor() {
//     return getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#b91c1c';
//   }

//   const N_BASE = 14;

//   class Crow {
//     x = 0; y = 0; vx = 0; vy = 0; size = 0; flap = 0; speed = 0; scatter = 0;
//     scatterX = 0; scatterY = 0;

//     constructor() {
//       this.reset(true);
//       this.flap = Math.random() * Math.PI * 2;
//       this.speed = 0.6 + Math.random() * 0.6;
//     }
//     reset(initial = false) {
//       const side = Math.floor(Math.random() * 4);
//       if (initial) { this.x = Math.random() * W; this.y = Math.random() * H; }
//       else if (side === 0) { this.x = -30; this.y = Math.random() * H; }
//       else if (side === 1) { this.x = W + 30; this.y = Math.random() * H; }
//       else if (side === 2) { this.x = Math.random() * W; this.y = -30; }
//       else { this.x = Math.random() * W; this.y = H + 30; }
//       this.vx = (Math.random() - 0.5) * 1.2;
//       this.vy = (Math.random() - 0.5) * 1.2;
//       if (Math.abs(this.vx) < 0.2) this.vx = 0.3 * Math.sign(this.vx || 1);
//       this.size = 14 + Math.random() * 16;
//       this.scatter = 0;
//     }
//     step(crows: Crow[], t: number) {
//       let ax = 0, ay = 0, cohx = 0, cohy = 0, count = 0;
//       for (const c of crows) {
//         if (c === this) continue;
//         const dx = c.x - this.x, dy = c.y - this.y;
//         const d2 = dx * dx + dy * dy;
//         if (d2 < 12000 && d2 > 0) {
//           ax += c.vx; ay += c.vy; cohx += c.x; cohy += c.y; count++;
//           if (d2 < 1500) { this.vx -= dx * 0.0008; this.vy -= dy * 0.0008; }
//         }
//       }
//       if (count > 0) {
//         ax /= count; ay /= count; cohx /= count; cohy /= count;
//         this.vx += (ax - this.vx) * 0.02; this.vy += (ay - this.vy) * 0.02;
//         this.vx += (cohx - this.x) * 0.00002; this.vy += (cohy - this.y) * 0.00002;
//       }
//       this.vy += Math.sin(t * 0.001 + this.flap) * 0.01;
//       if (this.scatter > 0) {
//         this.vx += this.scatterX * this.scatter * 0.12;
//         this.vy += this.scatterY * this.scatter * 0.12;
//         this.scatter *= 0.92;
//       }
//       const speed = Math.hypot(this.vx, this.vy);
//       const max = 2.6 * this.speed;
//       if (speed > max) { this.vx = (this.vx / speed) * max; this.vy = (this.vy / speed) * max; }
//       this.x += this.vx; this.y += this.vy;
//       this.flap += 0.16 + speed * 0.04;
//       if (this.x < -60 || this.x > W + 60 || this.y < -60 || this.y > H + 60) this.reset();
//     }
//     draw(color: string) {
//       ctx.save();
//       ctx.translate(this.x, this.y);
//       ctx.rotate(Math.atan2(this.vy, this.vx));
//       const flap = Math.sin(this.flap);
//       const s = this.size;
//       ctx.fillStyle = color; ctx.strokeStyle = color;
//       ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.globalAlpha = 0.95;
//       const tipBackX = -s * (0.08 + Math.abs(flap) * 0.04);
//       const tipOutY = s * (0.45 - Math.abs(flap) * 0.12);
//       const flapY = flap * s * 0.18;
//       const elbowX = -s * 0.04, elbowY = s * 0.18;
//       ctx.beginPath();
//       ctx.moveTo(0, -s * 0.04);
//       ctx.bezierCurveTo(-s * 0.02, -elbowY - flapY * 0.4, tipBackX + s * 0.12, -tipOutY - flapY * 0.8, tipBackX, -tipOutY - flapY);
//       ctx.bezierCurveTo(tipBackX * 0.5, -elbowY * 0.55 - flapY * 0.4, elbowX, -s * 0.05 - flapY * 0.2, -s * 0.02, -s * 0.02);
//       ctx.closePath(); ctx.fill();
//       ctx.beginPath();
//       ctx.moveTo(s * 0.15, -s * 0.02); ctx.lineTo(s * 0.28, 0); ctx.lineTo(s * 0.15, s * 0.02);
//       ctx.closePath(); ctx.fill();
//       ctx.beginPath();
//       ctx.moveTo(0, s * 0.04);
//       ctx.bezierCurveTo(-s * 0.02, elbowY - flapY * 0.4, tipBackX + s * 0.12, tipOutY - flapY * 0.8, tipBackX, tipOutY - flapY);
//       ctx.bezierCurveTo(tipBackX * 0.5, elbowY * 0.55 - flapY * 0.4, elbowX, s * 0.05 - flapY * 0.2, -s * 0.02, s * 0.02);
//       ctx.closePath(); ctx.fill();
//       ctx.beginPath(); ctx.ellipse(s * 0.02, 0, s * 0.18, s * 0.08, 0, 0, Math.PI * 2); ctx.fill();
//       ctx.restore();
//     }
//   }

//   // const crows: Crow[] = [];

//   // function setDensity(mult: number) {
//   //   const target = Math.round(N_BASE * mult);
//   //   while (crows.length < target) crows.push(new Crow());
//   //   while (crows.length > target) crows.pop();
//   // }
//   // setDensity(1);

//   // function scatterAt(x: number, y: number, force = 1) {
//   //   for (const c of crows) {
//   //     const dx = c.x - x, dy = c.y - y, d = Math.hypot(dx, dy) || 1;
//   //     if (d < 320) {
//   //       const f = (1 - d / 320) * force;
//   //       c.scatter = Math.max(c.scatter, f * 2.2);
//   //       c.scatterX = dx / d; c.scatterY = dy / d;
//   //     }
//   //   }
//   // }

//   // function burstAt(x: number, y: number, force = 1) {
//   //   if (!window._crowBurstEnabled) return;
//   //   const n = 2 + Math.floor(Math.random() * 2);
//   //   for (let i = 0; i < n; i++) {
//   //     const crow = new Crow();
//   //     crow.x = x + (Math.random() - 0.5) * 18;
//   //     crow.y = y + (Math.random() - 0.5) * 18;
//   //     const ang = -Math.PI / 2 + (Math.random() - 0.5) * (Math.PI * 0.75);
//   //     const speed = (2.4 + Math.random() * 1.4) * force;
//   //     crow.vx = Math.cos(ang) * speed; crow.vy = Math.sin(ang) * speed;
//   //     crow.size = 12 + Math.random() * 8;
//   //     crow.flap = Math.random() * Math.PI * 2;
//   //     crows.push(crow);
//   //   }
//   //   window.caw?.();
//   // }

//   // window.scatterCrowsAt = scatterAt;
//   // window.crowBurstAt = burstAt;
//   // window.setCrowDensity = setDensity;
//   // window._crowBurstEnabled = true;

//   const clickHandler = (e: MouseEvent) => {
//     scatterAt(e.clientX, e.clientY, 1);
//     const lens = (e.target as Element)?.closest?.('[data-lens]');
//     if (lens) {
//       const r = lens.getBoundingClientRect();
//       burstAt(r.left + r.width / 2, r.top + r.height / 2);
//     }
//   };
//   document.addEventListener('click', clickHandler);

//   let lastScrollY = window.scrollY, scrollBurstAt = 0;
//   const scrollHandler = () => {
//     const dy = window.scrollY - lastScrollY;
//     if (Math.abs(dy) > 80 && performance.now() - scrollBurstAt > 1000) {
//       scatterAt(W * 0.5, H * (dy > 0 ? 0.1 : 0.9), 0.5);
//       scrollBurstAt = performance.now();
//     }
//     lastScrollY = window.scrollY;
//   };
//   window.addEventListener('scroll', scrollHandler, { passive: true });

//   let raf: number;
//   let lastT = performance.now();
//   // function tick(t: number) {
//   //   const dt = Math.min(50, t - lastT); void dt;
//   //   lastT = t;
//   //   ctx.clearRect(0, 0, W, H);
//   //   const color = getAccentColor();
//   //   for (const c of crows) c.step(crows, t);
//   //   for (const c of crows) c.draw(color);
//   //   raf = requestAnimationFrame(tick);
//   // }
//   // raf = requestAnimationFrame(tick);

//   // if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
//   //   cancelAnimationFrame(raf);
//   // }

//   // return () => {
//   //   cancelAnimationFrame(raf);
//   //   document.removeEventListener('click', clickHandler);
//   //   window.removeEventListener('scroll', scrollHandler);
//   //   window.removeEventListener('resize', resize);
//   // };
// }

// ── Cursor lens ────────────────────────────────────────────────────────────
function setupLens() {
  const lens = document.getElementById('lens');
  if (!lens) return () => { };
  let x = 0, y = 0, tx = 0, ty = 0, active = false;

  const pointerHandler = (e: PointerEvent) => {
    tx = e.clientX; ty = e.clientY;
    const el = document.elementFromPoint(tx, ty);
    const hover = el?.closest('[data-lens]');
    if (hover && !active) { active = true; document.body.classList.add('lens-active'); }
    else if (!hover && active) { active = false; document.body.classList.remove('lens-active'); }
  };
  window.addEventListener('pointermove', pointerHandler, { passive: true });

  let raf: number;
  function loop() {
    x += (tx - x) * 0.18; y += (ty - y) * 0.18;
    lens!.style.transform = `translate(${x - 42}px, ${y - 42}px)`;
    raf = requestAnimationFrame(loop);
  }
  raf = requestAnimationFrame(loop);

  return () => {
    window.removeEventListener('pointermove', pointerHandler);
    cancelAnimationFrame(raf);
  };
}

// ── Ink ripple ─────────────────────────────────────────────────────────────
function setupInkRipple() {
  const canvas = document.createElement('canvas');
  canvas.id = 'ink-ripple';
  canvas.setAttribute('aria-hidden', 'true');
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d')!;
  let W = 0, H = 0;
  const dpr = Math.min(2, window.devicePixelRatio || 1);

  function resize() {
    W = window.innerWidth; H = window.innerHeight;
    canvas.width = W * dpr; canvas.height = H * dpr;
    canvas.style.width = W + 'px'; canvas.style.height = H + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  resize();
  window.addEventListener('resize', resize);

  type Ripple = { kind: 'ring' | 'stroke'; x: number; y: number; t: number; max: number; c: string; ang?: number; len?: number };
  const ripples: Ripple[] = [];

  function accent() {
    return getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#b91c1c';
  }

  window._inkRippleEnabled = true;
  const pointerHandler = (e: PointerEvent) => {
    if (!window._inkRippleEnabled) return;
    if ((e.target as Element)?.closest?.('input, textarea, select, [contenteditable]')) return;
    const c = accent();
    ripples.push({ kind: 'ring', x: e.clientX, y: e.clientY, t: 0, max: 32, c });
    for (let i = 0; i < 3; i++) {
      ripples.push({ kind: 'stroke', x: e.clientX, y: e.clientY, t: 0, max: 26, ang: Math.random() * Math.PI * 2, c, len: 14 + Math.random() * 22 });
    }
  };
  window.addEventListener('pointerdown', pointerHandler, { passive: true });

  let raf: number;
  function tick() {
    ctx.clearRect(0, 0, W, H);
    for (let i = ripples.length - 1; i >= 0; i--) {
      const r = ripples[i];
      r.t += 1;
      const p = r.t / r.max;
      if (p >= 1) { ripples.splice(i, 1); continue; }
      ctx.save(); ctx.translate(r.x, r.y);
      if (r.kind === 'ring') {
        ctx.globalAlpha = (1 - p) * 0.55;
        ctx.strokeStyle = r.c; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.arc(0, 0, 4 + p * 28, 0, Math.PI * 2); ctx.stroke();
      } else {
        ctx.rotate(r.ang!); ctx.globalAlpha = (1 - p) * 0.7;
        ctx.strokeStyle = r.c; ctx.lineCap = 'round';
        ctx.lineWidth = 1.6 * (1 - p) + 0.4;
        const reach = r.len! * (1 + p * 0.4);
        ctx.beginPath(); ctx.moveTo(0, 0);
        ctx.bezierCurveTo(reach * 0.3, -1.2, reach * 0.7, 1.2, reach, 0); ctx.stroke();
      }
      ctx.restore();
    }
    raf = requestAnimationFrame(tick);
  }
  raf = requestAnimationFrame(tick);

  return () => {
    cancelAnimationFrame(raf);
    window.removeEventListener('pointerdown', pointerHandler);
    window.removeEventListener('resize', resize);
    canvas.remove();
  };
}

// ── Reveal observer ────────────────────────────────────────────────────────
function setupRevealObserver() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if (en.isIntersecting) { en.target.classList.add('is-visible'); io.unobserve(en.target); }
    });
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.05 });

  window.observeReveal = () => {
    document.querySelectorAll<HTMLElement>('.reveal:not([data-observed])').forEach(el => {
      el.setAttribute('data-observed', '1'); io.observe(el);
    });
  };
  window.observeReveal();
  return () => io.disconnect();
}

// ── Bleed observer ─────────────────────────────────────────────────────────
function setupBleedObserver() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if (en.isIntersecting) { en.target.classList.add('bleed-in'); io.unobserve(en.target); }
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.1 });

  function isInView(el: Element) {
    const r = el.getBoundingClientRect();
    return r.top < window.innerHeight * 0.95 && r.bottom > 0;
  }

  window.observeBleed = () => {
    document.querySelectorAll<HTMLElement>('.bleed:not([data-bleed-observed])').forEach((el, i) => {
      el.setAttribute('data-bleed-observed', '1');
      if (isInView(el)) {
        const delay = Math.min(220, i * 60);
        setTimeout(() => el.classList.add('bleed-in'), delay);
      } else {
        io.observe(el);
      }
    });
  };
  window.observeBleed();
  return () => io.disconnect();
}

// ── Genjutsu flip ──────────────────────────────────────────────────────────
function setupGenjutsu() {
  window.genjutsuFlip = (cb?: () => void) => {
    document.body.classList.add('genjutsu-flip');
    window.cornerTear?.();
    setTimeout(() => cb?.(), 280);
    setTimeout(() => document.body.classList.remove('genjutsu-flip'), 1000);
  };
}

// ── Corner tear ────────────────────────────────────────────────────────────
function setupCornerTear() {
  let wrap: HTMLElement | null = null;

  function ensure() {
    if (wrap) return wrap;
    wrap = document.createElement('div');
    wrap.id = 'corner-tear';
    wrap.setAttribute('aria-hidden', 'true');
    wrap.innerHTML = `<svg viewBox="0 0 100 100" preserveAspectRatio="none"><g class="ct-strokes" fill="none" stroke="currentColor" stroke-width="0.35" stroke-linecap="round" stroke-linejoin="round" vector-effect="non-scaling-stroke"><path d="M0 0 L8 1 L4 4 L12 3 L7 7 L16 6 L11 11 L20 10"/><path d="M0 0 L1 9 L5 7 L4 16 L9 12 L8 20"/><path d="M100 0 L92 1 L96 4 L88 3 L93 7 L84 6 L89 11 L80 10"/><path d="M100 0 L99 9 L95 7 L96 16 L91 12 L92 20"/><path d="M0 100 L8 99 L4 96 L12 97 L7 93 L16 94 L11 89 L20 90"/><path d="M0 100 L1 91 L5 93 L4 84 L9 88 L8 80"/><path d="M100 100 L92 99 L96 96 L88 97 L93 93 L84 94 L89 89 L80 90"/><path d="M100 100 L99 91 L95 93 L96 84 L91 88 L92 80"/></g></svg>`;
    document.body.appendChild(wrap);
    return wrap;
  }

  window.cornerTear = () => {
    const el = ensure();
    el.classList.remove('is-tearing');
    void el.offsetWidth;
    el.classList.add('is-tearing');
  };
}

// ── Hex frames ─────────────────────────────────────────────────────────────
function setupHexFrames() {
  window.paintHexFrames = () => {
    document.querySelectorAll<HTMLElement>('.hex-frame:not([data-hex-painted])').forEach(el => {
      el.setAttribute('data-hex-painted', '1');
      const svgWrap = document.createElement('div');
      svgWrap.className = 'hex-frame__svg';
      svgWrap.innerHTML = `<svg viewBox="0 0 100 100" preserveAspectRatio="none"><polygon points="6,2 94,2 99,50 94,98 6,98 1,50"/></svg>`;
      const corners = document.createElement('div');
      corners.className = 'hex-frame__corners';
      el.prepend(svgWrap);
      el.appendChild(corners);
    });
  };
}

// ── Caw audio ──────────────────────────────────────────────────────────────
function setupCaw() {
  let actx: AudioContext | null = null;
  window.caw = () => {
    if (!actx) {
      try { actx = new AudioContext(); } catch { return; }
    }
    if (actx.state === 'suspended') actx.resume();
    const t0 = actx.currentTime, dur = 0.32;
    const buf = actx.createBuffer(1, actx.sampleRate * dur, actx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < data.length; i++) {
      const p = i / data.length;
      const env = Math.exp(-p * 6) * (1 + Math.sin(p * 60) * 0.4);
      data[i] = (Math.random() * 2 - 1) * env;
    }
    const src = actx.createBufferSource();
    src.buffer = buf;
    const bp = actx.createBiquadFilter();
    bp.type = 'bandpass'; bp.Q.value = 4;
    bp.frequency.setValueAtTime(900, t0);
    bp.frequency.exponentialRampToValueAtTime(420, t0 + dur);
    const gain = actx.createGain();
    gain.gain.setValueAtTime(0, t0);
    gain.gain.linearRampToValueAtTime(0.18, t0 + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, t0 + dur);
    src.connect(bp).connect(gain).connect(actx.destination);
    src.start(t0); src.stop(t0 + dur);
  };
}

// ── Portfolio app ──────────────────────────────────────────────────────────

export default function Portfolio() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [activeSection, setActiveSection] = useState('hero');

  // one-time interaction setup
  useEffect(() => {
    // const cleanupCrows = setupCrowFlock();
    const cleanupLens = setupLens();
    const cleanupRipple = setupInkRipple();
    const cleanupReveal = setupRevealObserver();
    const cleanupBleed = setupBleedObserver();
    setupGenjutsu();
    setupCornerTear();
    setupHexFrames();
    setupCaw();
    window.paintHexFrames?.();
    return () => {
      // cleanupCrows(); 
      cleanupLens(); cleanupRipple(); cleanupReveal(); cleanupBleed();
    };
  }, []);

  // re-run observers when content changes
  useEffect(() => {
    requestAnimationFrame(() => window.observeReveal?.());
    requestAnimationFrame(() => window.observeBleed?.());
    requestAnimationFrame(() => window.paintHexFrames?.());
  });

  // apply profile to <html>
  useEffect(() => {
    const html = document.documentElement;
    const current = html.getAttribute('data-profile');
    if (current !== t.profile) {
      window.genjutsuFlip?.(() => html.setAttribute('data-profile', t.profile));
    } else {
      html.setAttribute('data-profile', t.profile);
    }
  }, [t.profile]);

  // apply stage to <html> + flash eye
  useEffect(() => {
    document.documentElement.setAttribute('data-stage', t.stage);
    const eye = document.querySelector('.eye');
    if (eye) {
      eye.classList.remove('is-flashing');
      void (eye as HTMLElement).offsetWidth;
      eye.classList.add('is-flashing');
    }
  }, [t.stage]);

  // motion multiplier
  useEffect(() => {
    const mult = Math.max(0, t.motion) / 10;
    document.documentElement.style.setProperty('--motion-mult', String(mult || 0.001));
  }, [t.motion]);

  // crow density
  // useEffect(() => {
  //   window.setCrowDensity?.(t.crowsEnabled ? t.crowDensity : 0);
  // }, [t.crowsEnabled, t.crowDensity]);

  // lens toggle
  useEffect(() => {
    const lens = document.getElementById('lens');
    if (lens) lens.style.display = t.lensEnabled ? '' : 'none';
  }, [t.lensEnabled]);

  // audio stub
  useEffect(() => {
    if (!t.audioEnabled) {
      if (!window._caw_real) window._caw_real = window.caw;
      window.caw = () => { };
    } else if (window._caw_real) {
      window.caw = window._caw_real;
    }
  }, [t.audioEnabled]);

  // effect flags
  useEffect(() => { window._inkRippleEnabled = !!t.inkRipple; }, [t.inkRipple]);
  // useEffect(() => { window._crowBurstEnabled = !!t.crowBurst; }, [t.crowBurst]);

  // active section observer for nav
  useEffect(() => {
    const els = document.querySelectorAll('section[data-section]');
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) setActiveSection((e.target as HTMLElement).dataset.section!);
      });
    }, { rootMargin: '-40% 0px -50% 0px' });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  // palette ↔ profile bridge
  const currentPalette = PROFILE_PALETTES[t.profile] || PROFILE_PALETTES.shrine;
  const onPaletteChange = (pal: string[]) => {
    const next = PALETTE_TO_PROFILE[String(pal[0]).toLowerCase()] || 'shrine';
    setTweak('profile', next);
  };

  return (
    <>
      {/* crow flock canvas */}
      {/* <canvas id="crow-flock" aria-hidden="true" /> */}

      {/* ambient veil */}
      <div className="veil" aria-hidden="true">
        <div className="veil__noise" />
        <div className="veil__vignette" />
        <div className="veil__scan" />
      </div>

      {/* cursor lens */}
      <div id="lens" aria-hidden="true">
        <svg viewBox="-50 -50 100 100">
          <circle r="48" className="lens-ring" />
          <circle r="36" className="lens-iris" />
          <g className="lens-tomoe" fill="currentColor">
            <path d="M 0 -32 A 10 10 0 0 1 0 -12 A 5 5 0 0 1 0 -22 A 5 5 0 0 0 0 -32 Z" transform="rotate(0)" />
            <path d="M 0 -32 A 10 10 0 0 1 0 -12 A 5 5 0 0 1 0 -22 A 5 5 0 0 0 0 -32 Z" transform="rotate(120)" />
            <path d="M 0 -32 A 10 10 0 0 1 0 -12 A 5 5 0 0 1 0 -22 A 5 5 0 0 0 0 -32 Z" transform="rotate(240)" />
          </g>
          <g className="lens-mange">
            <path d="M 0 -32 C 9 -25 9 -11 0 -4 C -9 -11 -9 -25 0 -32 Z" transform="rotate(0)" />
            <path d="M 0 -32 C 9 -25 9 -11 0 -4 C -9 -11 -9 -25 0 -32 Z" transform="rotate(60)" />
            <path d="M 0 -32 C 9 -25 9 -11 0 -4 C -9 -11 -9 -25 0 -32 Z" transform="rotate(120)" />
            <path d="M 0 -32 C 9 -25 9 -11 0 -4 C -9 -11 -9 -25 0 -32 Z" transform="rotate(180)" />
            <path d="M 0 -32 C 9 -25 9 -11 0 -4 C -9 -11 -9 -25 0 -32 Z" transform="rotate(240)" />
            <path d="M 0 -32 C 9 -25 9 -11 0 -4 C -9 -11 -9 -25 0 -32 Z" transform="rotate(300)" />
          </g>
          <g className="lens-eternal">
            <circle r="30" className="lens-eternal-ring" fill="none" strokeWidth={0.8} opacity="0.55" />
            <circle r="26" className="lens-eternal-ring" fill="none" strokeWidth={0.4} opacity="0.4" strokeDasharray="1 2.5" />
            <g className="lens-eternal-outer">
              <path d="M 0 -4 C 5 -14 5 -22 0 -28 C -5 -22 -5 -14 0 -4 Z" transform="rotate(0)" />
              <path d="M 0 -4 C 5 -14 5 -22 0 -28 C -5 -22 -5 -14 0 -4 Z" transform="rotate(60)" />
              <path d="M 0 -4 C 5 -14 5 -22 0 -28 C -5 -22 -5 -14 0 -4 Z" transform="rotate(120)" />
              <path d="M 0 -4 C 5 -14 5 -22 0 -28 C -5 -22 -5 -14 0 -4 Z" transform="rotate(180)" />
              <path d="M 0 -4 C 5 -14 5 -22 0 -28 C -5 -22 -5 -14 0 -4 Z" transform="rotate(240)" />
              <path d="M 0 -4 C 5 -14 5 -22 0 -28 C -5 -22 -5 -14 0 -4 Z" transform="rotate(300)" />
            </g>
            <g className="lens-eternal-inner">
              <path d="M 0 -3 C 8 -8 8 -12 0 -16 C -4 -12 -3 -8 0 -3 Z" transform="rotate(30)" />
              <path d="M 0 -3 C 8 -8 8 -12 0 -16 C -4 -12 -3 -8 0 -3 Z" transform="rotate(150)" />
              <path d="M 0 -3 C 8 -8 8 -12 0 -16 C -4 -12 -3 -8 0 -3 Z" transform="rotate(270)" />
            </g>
          </g>
          <circle r="7" className="lens-pupil" />
        </svg>
      </div>

      {/* shared SVG defs */}
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
        <defs>
          <symbol id="hex-frame" viewBox="-100 -100 200 200">
            <polygon points="0,-92 80,-46 80,46 0,92 -80,46 -80,-46" fill="none" stroke="currentColor" strokeWidth="1" />
            <polygon points="0,-78 68,-39 68,39 0,78 -68,39 -68,-39" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
          </symbol>
        </defs>
      </svg>

      {/* tsukuyomi overlays */}
      <div className="tsukuyomi-moon" aria-hidden="true" />
      <div className="tsukuyomi-veil" aria-hidden="true" />
      <div className="tsukuyomi-spokes" aria-hidden="true" />

      <Nav activeSection={activeSection} />

      <main>
        <Hero stage={t.stage} onStage={s => setTweak('stage', s)} />
        <About />
        <Work />
        <Experience />
        <Skills />
        <Principles />
        <Contact />
        <Footer />
      </main>

      {/* tweaks FAB */}
      <button
        type="button"
        className="tweaks-fab"
        aria-label="Open tweaks"
        onClick={() => window.postMessage({ type: '__activate_edit_mode' }, '*')}
      >
        <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.4">
          <circle cx="8" cy="8" r="2.2" />
          <path d="M8 1 v2 M8 13 v2 M1 8 h2 M13 8 h2 M3 3 l1.4 1.4 M11.6 11.6 l1.4 1.4 M3 13 l1.4 -1.4 M11.6 4.4 l1.4 -1.4" />
        </svg>
        <span>調整</span>
      </button>

      <TweaksPanel title="Tweaks · 調整">
        <TweakSection label="Sharingan · 眼力">
          <TweakRadio
            label="Stage"
            value={t.stage}
            options={[
              { value: 'tomoe', label: '三勾' },
              { value: 'mangekyou', label: '万華' },
              { value: 'eternal', label: '永遠' },
            ]}
            onChange={v => { setTweak('stage', v); window.caw?.(); }}
          />
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'rgba(41,38,27,.55)', letterSpacing: '.08em', textTransform: 'uppercase' }}>
            {t.stage === 'tomoe' && 'Sannin · three tomoe spinning'}
            {t.stage === 'mangekyou' && 'Mangekyō · kaleidoscope'}
            {t.stage === 'eternal' && 'Eternal · six-petal lock'}
          </div>
        </TweakSection>

        <TweakSection label="Palette · 色">
          <TweakColor
            label="Profile"
            value={currentPalette as string[]}
            options={[PROFILE_PALETTES.shrine, PROFILE_PALETTES.amaterasu, PROFILE_PALETTES.tsukuyomi]}
            onChange={onPaletteChange}
          />
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'rgba(41,38,27,.55)', letterSpacing: '.08em', textTransform: 'uppercase' }}>
            {t.profile === 'shrine' && 'Shrine · crimson on ink'}
            {t.profile === 'amaterasu' && 'Amaterasu · gold flame'}
            {t.profile === 'tsukuyomi' && 'Tsukuyomi · bloodmoon · inverted'}
          </div>
        </TweakSection>

        <TweakSection label="Motion · 動">
          <TweakSlider label="Intensity" min={0} max={10} step={1} value={t.motion} onChange={v => setTweak('motion', v)} />
          {/* <TweakToggle label="Crow flock" value={t.crowsEnabled} onChange={v => setTweak('crowsEnabled', v)} />
          {t.crowsEnabled && (
            <TweakSlider label="Crow density" min={0.3} max={3} step={0.1} value={t.crowDensity} onChange={v => setTweak('crowDensity', v)} />
          )} */}
        </TweakSection>

        <TweakSection label="Senses · 感">
          <TweakToggle label="Cursor lens" value={t.lensEnabled} onChange={v => setTweak('lensEnabled', v)} />
          {/* <TweakToggle label="Crow caws" value={t.audioEnabled} onChange={v => setTweak('audioEnabled', v)} /> */}
          <TweakToggle label="Ink ripple" value={t.inkRipple} onChange={v => setTweak('inkRipple', v)} />
          {/* <TweakToggle label="Crow burst on tap" value={t.crowBurst} onChange={v => setTweak('crowBurst', v)} /> */}
        </TweakSection>

        <TweakSection label="Reset · 解">
          <TweakButton label="Release Genjutsu" onClick={() => {
            window.genjutsuFlip?.();
            setTweak(TWEAK_DEFAULTS);
          }} />
        </TweakSection>
      </TweaksPanel>
    </>
  );
}
