'use client';

import React, { useEffect, useState, useRef } from 'react';
import { PORTFOLIO } from './portfolio-data';

// ── Reusable glyph ──────────────────────────────────────────────────────────

export function Tomoe({ size = 24, stage = 'tomoe' }: { size?: number; stage?: string }) {
  return (
    <span className="tomoe-mark" style={{ width: size, height: size, display: 'inline-flex' }}>
      <svg viewBox="-50 -50 100 100" width="100%" height="100%">
        {stage === 'tomoe' && (
          <g fill="currentColor">
            <path d="M 0 -32 A 10 10 0 0 1 0 -12 A 5 5 0 0 1 0 -22 A 5 5 0 0 0 0 -32 Z" transform="rotate(0)" />
            <path d="M 0 -32 A 10 10 0 0 1 0 -12 A 5 5 0 0 1 0 -22 A 5 5 0 0 0 0 -32 Z" transform="rotate(120)" />
            <path d="M 0 -32 A 10 10 0 0 1 0 -12 A 5 5 0 0 1 0 -22 A 5 5 0 0 0 0 -32 Z" transform="rotate(240)" />
          </g>
        )}
        {stage === 'mangekyou' && (
          <g fill="currentColor">
            <path d="M 0 -28 C 8 -22 8 -10 0 -4 C -8 -10 -8 -22 0 -28 Z" transform="rotate(0)" />
            <path d="M 0 -28 C 8 -22 8 -10 0 -4 C -8 -10 -8 -22 0 -28 Z" transform="rotate(60)" />
            <path d="M 0 -28 C 8 -22 8 -10 0 -4 C -8 -10 -8 -22 0 -28 Z" transform="rotate(120)" />
            <path d="M 0 -28 C 8 -22 8 -10 0 -4 C -8 -10 -8 -22 0 -28 Z" transform="rotate(180)" />
            <path d="M 0 -28 C 8 -22 8 -10 0 -4 C -8 -10 -8 -22 0 -28 Z" transform="rotate(240)" />
            <path d="M 0 -28 C 8 -22 8 -10 0 -4 C -8 -10 -8 -22 0 -28 Z" transform="rotate(300)" />
            <circle r="3" />
          </g>
        )}
        {stage === 'eternal' && (
          <g fill="currentColor">
            <path d="M 0 -4 C 5 -14 5 -22 0 -28 C -5 -22 -5 -14 0 -4 Z" transform="rotate(0)" />
            <path d="M 0 -4 C 5 -14 5 -22 0 -28 C -5 -22 -5 -14 0 -4 Z" transform="rotate(60)" />
            <path d="M 0 -4 C 5 -14 5 -22 0 -28 C -5 -22 -5 -14 0 -4 Z" transform="rotate(120)" />
            <path d="M 0 -4 C 5 -14 5 -22 0 -28 C -5 -22 -5 -14 0 -4 Z" transform="rotate(180)" />
            <path d="M 0 -4 C 5 -14 5 -22 0 -28 C -5 -22 -5 -14 0 -4 Z" transform="rotate(240)" />
            <path d="M 0 -4 C 5 -14 5 -22 0 -28 C -5 -22 -5 -14 0 -4 Z" transform="rotate(300)" />
          </g>
        )}
      </svg>
    </span>
  );
}

// ── Hero ────────────────────────────────────────────────────────────────────

export function Hero({ stage, onStage }: { stage: string; onStage: (s: string) => void }) {
  const caw = () => (window as Window & { caw?: () => void }).caw?.();
  return (
    <section className="hero" data-section="hero" id="hero">
      <div className="hero__layout">
        {/* TEXT */}
        <div>
          <div className="hero__eyebrow">
            <span className="eyebrow">影 · Shadow Architect · 2026</span>
          </div>
          <h1 className="hero__title">
            <span className="l1 bleed">Vanessa</span>
            <span className="l2 bleed">Martin<span className="ampersand">.</span></span>
          </h1>
          <p className="hero__lede bleed">
            Frontend engineer building <em>systems</em> from first principles.
          </p>
          <div className="hero__meta">
            <span>Brooklyn ↔ Remote</span>
            <span>Available · Q3 2026</span>
            <span>Soka Labs — founder</span>
          </div>
          <div className="hero__cta">
            <a className="btn btn--primary" href="#work" data-lens onClick={caw}>
              <Tomoe size={14} stage="tomoe" />
              View Selected Work
            </a>
            <a className="btn" href={`mailto:${PORTFOLIO.email}`} data-lens>Make Contact</a>
            <a className="btn btn--ghost" href="#about">Resume ↓</a>
          </div>
        </div>

        {/* EYE */}
        <div className="eye-stage" data-lens>
          <div className="eye" data-stage={stage}>
            <div className="eye__rings">
              <svg viewBox="-100 -100 200 200">
                <circle className="eye__ring-1" r="96" />
                <circle className="eye__ring-2" r="82" />
              </svg>
            </div>
            <div className="eye__iris" />
            {/* Tomoe */}
            <div className="eye__tomoe">
              <div className="spin">
                <svg viewBox="-50 -50 100 100">
                  <g fill="currentColor">
                    <path d="M 0 -32 A 10 10 0 0 1 0 -12 A 5 5 0 0 1 0 -22 A 5 5 0 0 0 0 -32 Z" transform="rotate(0)" />
                    <path d="M 0 -32 A 10 10 0 0 1 0 -12 A 5 5 0 0 1 0 -22 A 5 5 0 0 0 0 -32 Z" transform="rotate(120)" />
                    <path d="M 0 -32 A 10 10 0 0 1 0 -12 A 5 5 0 0 1 0 -22 A 5 5 0 0 0 0 -32 Z" transform="rotate(240)" />
                  </g>
                </svg>
              </div>
            </div>
            {/* Mangekyou */}
            <div className="eye__mange">
              <div className="spin">
                <svg viewBox="-50 -50 100 100">
                  <g fill="currentColor">
                    <path d="M 0 -32 C 9 -25 9 -11 0 -4 C -9 -11 -9 -25 0 -32 Z" transform="rotate(0)" />
                    <path d="M 0 -32 C 9 -25 9 -11 0 -4 C -9 -11 -9 -25 0 -32 Z" transform="rotate(60)" />
                    <path d="M 0 -32 C 9 -25 9 -11 0 -4 C -9 -11 -9 -25 0 -32 Z" transform="rotate(120)" />
                    <path d="M 0 -32 C 9 -25 9 -11 0 -4 C -9 -11 -9 -25 0 -32 Z" transform="rotate(180)" />
                    <path d="M 0 -32 C 9 -25 9 -11 0 -4 C -9 -11 -9 -25 0 -32 Z" transform="rotate(240)" />
                    <path d="M 0 -32 C 9 -25 9 -11 0 -4 C -9 -11 -9 -25 0 -32 Z" transform="rotate(300)" />
                    <circle r="3.5" />
                  </g>
                </svg>
              </div>
            </div>
            {/* Eternal */}
            <div className="eye__eternal">
              <div className="spin">
                <svg viewBox="-50 -50 100 100">
                  <g fill="currentColor">
                    <circle r="30" fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.55" />
                    <circle r="26" fill="none" stroke="currentColor" strokeWidth="0.4" opacity="0.4" strokeDasharray="1 2.5" />
                    <g className="eternal-outer">
                      <path d="M 0 -4 C 5 -14 5 -22 0 -28 C -5 -22 -5 -14 0 -4 Z" transform="rotate(0)" />
                      <path d="M 0 -4 C 5 -14 5 -22 0 -28 C -5 -22 -5 -14 0 -4 Z" transform="rotate(60)" />
                      <path d="M 0 -4 C 5 -14 5 -22 0 -28 C -5 -22 -5 -14 0 -4 Z" transform="rotate(120)" />
                      <path d="M 0 -4 C 5 -14 5 -22 0 -28 C -5 -22 -5 -14 0 -4 Z" transform="rotate(180)" />
                      <path d="M 0 -4 C 5 -14 5 -22 0 -28 C -5 -22 -5 -14 0 -4 Z" transform="rotate(240)" />
                      <path d="M 0 -4 C 5 -14 5 -22 0 -28 C -5 -22 -5 -14 0 -4 Z" transform="rotate(300)" />
                    </g>
                    <g className="eternal-inner">
                      <path d="M 0 -3 C 8 -8 8 -12 0 -16 C -4 -12 -3 -8 0 -3 Z" transform="rotate(30)" />
                      <path d="M 0 -3 C 8 -8 8 -12 0 -16 C -4 -12 -3 -8 0 -3 Z" transform="rotate(150)" />
                      <path d="M 0 -3 C 8 -8 8 -12 0 -16 C -4 -12 -3 -8 0 -3 Z" transform="rotate(270)" />
                    </g>
                  </g>
                </svg>
              </div>
            </div>
            <div className="eye__pupil" />
          </div>

          <div className="stage-picker" role="tablist" aria-label="Sharingan stage">
            {(['tomoe', 'mangekyou', 'eternal'] as const).map(s => (
              <button key={s} role="tab" aria-selected={stage === s}
                className={stage === s ? 'is-active' : ''}
                onClick={() => { onStage(s); caw(); }}>
                {s === 'tomoe' ? '三勾玉 · Sannin' : s === 'mangekyou' ? '万華鏡 · Mangekyō' : '永遠 · Eternal'}
              </button>
            ))}
          </div>

          <span className="kanji-float" style={{ top: '8%', left: '-6%', fontSize: 72 }}>静</span>
          <span className="kanji-float" style={{ bottom: '12%', right: '-4%', fontSize: 58, animationDelay: '-4s' }}>寂</span>
          <span className="kanji-float" style={{ top: '40%', right: '-10%', fontSize: 40, animationDelay: '-9s' }}>烏</span>
        </div>
      </div>

      <div style={{
        position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)',
        fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.22em',
        textTransform: 'uppercase', color: 'var(--fg-muted)', display: 'flex',
        alignItems: 'center', gap: 12,
      }}>
        Scroll · 巻物 · Unfurl <span style={{ width: 32, height: 1, background: 'currentColor' }} />
      </div>
    </section>
  );
}

// ── About ───────────────────────────────────────────────────────────────────

export function About() {
  return (
    <section data-section="about" id="about">
      <div className="section-head reveal">
        <h2 className="bleed"><em>About.</em></h2>
        <div className="section-head__kanji">影</div>
        <div className="section-head__meta">
          <div>02 · About</div>
          <div>The Architect</div>
        </div>
      </div>
      <div className="about">
        <div className="about__lead reveal">
          <span className="eyebrow">縁 · Bonds</span>
          <h2>Eight years <em>making the math become feeling.</em></h2>
          <p style={{ color: 'var(--fg-subtle)', fontSize: 'var(--t-md)', maxWidth: '36ch' }}>
            Frontend architect. Builder of capacity-adaptive frameworks and proportional design systems.
            PlayStation alumna, mid-flight rescue specialist, open-source maintainer.
          </p>
          <div className="kanji-tower">寂 · 蓮 · 縁</div>
        </div>
        <div className="about__body">
          {PORTFOLIO.about.map((a, i) => (
            <div key={i} className="reveal" style={{ display: 'grid', gridTemplateColumns: '60px 1fr', gap: 'var(--s-4)' }}>
              <div style={{ fontFamily: 'var(--font-mincho)', fontSize: 52, color: 'var(--accent)', lineHeight: 1 }}>{a.kicker}</div>
              <p>{a.text}</p>
            </div>
          ))}
          <div className="stat-grid reveal">
            {PORTFOLIO.stats.map((s, i) => (
              <div key={i} className="stat">
                <div className="stat__num">{s.num}</div>
                <div className="stat__label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Work ────────────────────────────────────────────────────────────────────

function WorkShape({ kind, kanji }: { kind: string; kanji: string }) {
  return (
    <svg viewBox="-100 -100 200 200" width="160" height="160" style={{ overflow: 'visible' }}>
      <circle r="92" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
      <circle r="78" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.3" strokeDasharray="2 4">
        <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="40s" repeatCount="indefinite" />
      </circle>
      {kind === 'tomoe' && (
        <g fill="currentColor">
          <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="14s" repeatCount="indefinite" />
          <path d="M 0 -50 A 16 16 0 0 1 0 -18 A 8 8 0 0 1 0 -34 A 8 8 0 0 0 0 -50 Z" transform="rotate(0)" />
          <path d="M 0 -50 A 16 16 0 0 1 0 -18 A 8 8 0 0 1 0 -34 A 8 8 0 0 0 0 -50 Z" transform="rotate(120)" />
          <path d="M 0 -50 A 16 16 0 0 1 0 -18 A 8 8 0 0 1 0 -34 A 8 8 0 0 0 0 -50 Z" transform="rotate(240)" />
        </g>
      )}
      {kind === 'lotus' && (
        <g>
          {[0, 60, 120, 180, 240, 300].map(a => (
            <ellipse key={a} cx="0" cy="-32" rx="14" ry="38" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.7" transform={`rotate(${a})`} />
          ))}
          <circle r="8" fill="currentColor" />
        </g>
      )}
      {kind === 'tree' && (
        <g stroke="currentColor" strokeWidth="1.2" fill="none">
          <line x1="0" y1="60" x2="0" y2="-30" /><line x1="0" y1="-30" x2="-40" y2="-60" />
          <line x1="0" y1="-30" x2="40" y2="-60" /><line x1="0" y1="0" x2="-30" y2="-30" />
          <line x1="0" y1="0" x2="30" y2="-30" /><line x1="0" y1="20" x2="-22" y2="-2" />
          <line x1="0" y1="20" x2="22" y2="-2" />
          <circle cx="-40" cy="-60" r="3" fill="currentColor" /><circle cx="40" cy="-60" r="3" fill="currentColor" />
          <circle cx="-30" cy="-30" r="2" fill="currentColor" /><circle cx="30" cy="-30" r="2" fill="currentColor" />
        </g>
      )}
      {kind === 'book' && (
        <g stroke="currentColor" strokeWidth="1" fill="none">
          <rect x="-40" y="-50" width="80" height="100" /><line x1="0" y1="-50" x2="0" y2="50" />
          <line x1="-30" y1="-30" x2="-8" y2="-30" /><line x1="-30" y1="-20" x2="-8" y2="-20" />
          <line x1="-30" y1="-10" x2="-12" y2="-10" /><line x1="8" y1="-30" x2="30" y2="-30" />
          <line x1="8" y1="-20" x2="30" y2="-20" /><line x1="8" y1="-10" x2="26" y2="-10" />
        </g>
      )}
      <text x="0" y="86" fontFamily="var(--font-mincho)" fontSize="20" fill="currentColor" textAnchor="middle" opacity="0.8">{kanji}</text>
    </svg>
  );
}

function WorkCard({ entry }: { entry: typeof PORTFOLIO.work[number] }) {
  const ref = useRef<HTMLAnchorElement>(null);
  function onMove(e: React.MouseEvent) {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 100;
    const y = ((e.clientY - r.top) / r.height) * 100;
    ref.current.style.setProperty('--mx', x + '%');
    ref.current.style.setProperty('--my', y + '%');
  }
  const caw = () => (window as Window & { caw?: () => void }).caw?.();
  return (
    <a ref={ref} href={entry.link} target="_blank" rel="noreferrer"
      className="work-card reveal" data-lens onMouseMove={onMove} onClick={caw}>
      <div>
        <div className="work-card__index">— {entry.idx} / {String(PORTFOLIO.work.length).padStart(2, '0')}</div>
        <h3 className="work-card__title">{entry.title}</h3>
        <p className="work-card__sub">{entry.sub}</p>
        <div className="work-card__meta">
          {entry.meta.map(m => <span key={m} className="badge">{m}</span>)}
        </div>
      </div>
      <div className="work-card__visual">
        <WorkShape kind={entry.shape} kanji={entry.kanji} />
      </div>
    </a>
  );
}

export function Work() {
  return (
    <section data-section="work" id="work">
      <div className="section-head reveal">
        <h2 className="bleed">Selected <em>Work.</em></h2>
        <div className="section-head__kanji">蓮</div>
        <div className="section-head__meta">
          <div>03 · Work</div>
          <div>{PORTFOLIO.work.length} entries</div>
        </div>
      </div>
      <div className="work-list">
        {PORTFOLIO.work.map(w => <WorkCard key={w.idx} entry={w} />)}
      </div>
    </section>
  );
}

// ── Experience ──────────────────────────────────────────────────────────────

export function Experience() {
  const [active, setActive] = useState<string>(PORTFOLIO.experience[0].year);
  const refs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) setActive((e.target as HTMLElement).dataset.year!); });
    }, { rootMargin: '-40% 0px -40% 0px' });
    Object.values(refs.current).forEach(el => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section data-section="experience" id="experience">
      <div className="section-head reveal">
        <h2 className="bleed">Production <em>Systems.</em></h2>
        <div className="section-head__kanji">道</div>
        <div className="section-head__meta"><div>04 · Experience</div><div>8 years</div></div>
      </div>
      <div className="timeline">
        <div className="timeline__rail">
          {PORTFOLIO.experience.map(e => (
            <div key={e.year}
              className={'timeline__year' + (active === e.year ? ' is-active' : '')}
              onClick={() => refs.current[e.year]?.scrollIntoView({ block: 'center', behavior: 'smooth' })}>
              {e.year}
            </div>
          ))}
        </div>
        <div className="timeline__body">
          {PORTFOLIO.experience.map(e => (
            <article key={e.year} ref={el => { refs.current[e.year] = el; }} data-year={e.year} className="timeline__entry reveal">
              <h3>{e.role}</h3>
              <div className="role-meta">
                <span>@ {e.org}</span><span>· {e.tag}</span><span>· {e.year}</span>
              </div>
              <ul>{e.bullets.map((b, i) => <li key={i}>{b}</li>)}</ul>
              <div className="timeline__stack">{e.stack.map(s => <span key={s} className="badge">{s}</span>)}</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Skills ──────────────────────────────────────────────────────────────────

export function Skills() {
  return (
    <section data-section="skills" id="skills">
      <div className="section-head reveal">
        <h2 className="bleed">Toolkit <em>· 武具.</em></h2>
        <div className="section-head__kanji">具</div>
        <div className="section-head__meta"><div>05 · Stack</div><div>What I reach for</div></div>
      </div>
      <div className="skills">
        {PORTFOLIO.skills.map(g => (
          <div key={g.group} className="skill-group reveal">
            <h4>{g.group}</h4>
            <ul className="skill-list">
              {g.items.map(it => <li key={it}>{it}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── Principles ──────────────────────────────────────────────────────────────

export function Principles() {
  return (
    <section data-section="principles" id="principles">
      <div className="section-head reveal">
        <h2 className="bleed">Principles<em>.</em></h2>
        <div className="section-head__kanji">理</div>
        <div className="section-head__meta"><div>06 · Philosophy</div><div>Operating values</div></div>
      </div>
      <div className="principles">
        {PORTFOLIO.principles.map(p => (
          <div key={p.num} className="principle reveal" data-lens>
            <div className="principle__num">{p.num}</div>
            <h3>
              <span style={{ fontFamily: 'var(--font-mincho)', color: 'var(--accent)', marginRight: 8 }}>{p.kanji}</span>
              {p.title}
            </h3>
            <p>{p.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── Contact ──────────────────────────────────────────────────────────────────

export function Contact() {
  const caw = () => (window as Window & { caw?: () => void }).caw?.();
  return (
    <section data-section="contact" id="contact" className="contact">
      <div className="contact__kanji">縁</div>
      <span className="eyebrow reveal" style={{ justifyContent: 'center' }}>烏 · The crow knows the way</span>
      <h2 className="reveal bleed">Let&apos;s <em>make contact.</em></h2>
      <a className="contact__email reveal" href={`mailto:${PORTFOLIO.email}`} data-lens onClick={caw}>
        {PORTFOLIO.email}
      </a>
      <div className="contact__links reveal">
        <a className="btn" href={`https://github.com/${PORTFOLIO.github}`} target="_blank" rel="noreferrer">GitHub ↗</a>
        <a className="btn" href={PORTFOLIO.substack} target="_blank" rel="noreferrer">Substack ↗</a>
        <a className="btn btn--ghost" href="#hero">↑ Return to the top</a>
      </div>
    </section>
  );
}

// ── Footer ───────────────────────────────────────────────────────────────────

export function Footer() {
  return (
    <footer className="footer">
      <div>© 2026 Vanessa Martin · Soka Labs</div>
      <div style={{ display: 'flex', gap: 'var(--s-4)' }}>
        <a href={`https://github.com/${PORTFOLIO.github}`}>GitHub</a>
        <a href={`mailto:${PORTFOLIO.email}`}>Email</a>
        <a href={PORTFOLIO.substack}>Substack</a>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--accent)' }}>
        <Tomoe size={14} />
        Built on Renge · φ = 1.6180
      </div>
    </footer>
  );
}

// ── Nav ───────────────────────────────────────────────────────────────────────

export function Nav({ activeSection }: { activeSection: string }) {
  const items = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'work', label: 'Work' },
    { id: 'experience', label: 'Path' },
    { id: 'skills', label: 'Stack' },
    { id: 'principles', label: 'Principles' },
    { id: 'contact', label: 'Contact' },
  ];
  return (
    <nav className="nav">
      <a href="#hero" className="nav__brand" data-lens>
        <Tomoe size={22} stage="tomoe" />
        VSM
      </a>
      <div className="nav__links">
        {items.map(it => (
          <a key={it.id} href={`#${it.id}`} className={activeSection === it.id ? 'is-active' : ''}>
            {it.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
