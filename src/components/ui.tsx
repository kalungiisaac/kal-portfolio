import { useEffect, useRef, useState, type ReactNode } from 'react';
import { m, useInView, useReducedMotion, useScroll, useTransform } from 'framer-motion';

const EASE = [0.16, 1, 0.3, 1] as const;

export function Reveal({
  children,
  delay = 0,
  className,
  as = 'div',
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: 'div' | 'li' | 'section';
}) {
  const Tag = m[as];
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, delay, ease: EASE }}
    >
      {children}
    </Tag>
  );
}

export function SectionIntro({
  side,
  title,
  lead,
}: {
  side: string;
  title: string;
  lead?: ReactNode;
}) {
  return (
    <header className="page-head">
      <div className="section-head">
        <span className="label side">{side}</span>
      </div>
      <h1 className="page-title">
        <Reveal>{title}</Reveal>
      </h1>
      {lead && (
        <Reveal delay={0.1}>
          <p className="lead">{lead}</p>
        </Reveal>
      )}
    </header>
  );
}


export function ScrollIndex({ progress }: { progress: number }) {
  const cap = Math.sin(progress * Math.PI * 5) * 38;
  return (
    <div className="scroll-runner" aria-hidden>
      <div className="runner-track">
        <b style={{ transform: `scaleY(${progress})` }} />
        <i
          className="runner-fig"
          style={{ top: `${Math.min(progress * 100, 97)}%`, rotate: `${cap}deg` }}
        >
          <svg viewBox="0 0 16 24" width="16" height="24">
            <circle cx="8" cy="3.5" r="2.6" fill="currentColor" />
            <path
              d="M8 7.5v7.5M8 9.5 3.5 12M8 9.5l4.5 2.5M8 15l-3 6.5M8 15l3 6.5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
          <span className="runner-dust" />
        </i>
      </div>
    </div>
  );
}

export function Marquee({ words, className = '' }: { words: string[]; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: '120px' });
  const reduce = useReducedMotion();
  const set = (
    <div className="marquee-set">
      {words.map((w, i) => (
        <span key={w + i} className="marquee-item">
          {w}
          <span className="marquee-star">{i % 2 ? '·' : '✳'}</span>
        </span>
      ))}
    </div>
  );
  return (
    <div ref={ref} className={`marquee ${className}`} aria-hidden>
      <div className="marquee-track" style={{ animationPlayState: inView && !reduce ? 'running' : 'paused' }}>
        {set}
        {set}
      </div>
    </div>
  );
}

export function MarqueeSweep({ words }: { words: string[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const xFast = useTransform(scrollYProgress, [0, 1], ['2%', '-16%']);
  const xSlow = useTransform(scrollYProgress, [0, 1], ['-14%', '4%']);
  const ease = reduce ? '0%' : undefined;
  const set = (variant: '' | 'alt') => (
    <div className="marquee-set">
      {words.map((w) => (
        <span key={w} className={`marquee-item ${variant}`}>
          {w}
          <span className="marquee-star">✳</span>
        </span>
      ))}
    </div>
  );
  return (
    <div ref={ref} className="marquee-sweep" aria-hidden>
      <m.div className="marquee-track" style={{ x: ease ?? xFast }}>
        {set('')}
        {set('alt')}
      </m.div>
      <m.div className="marquee-track is-muted" style={{ x: ease ?? xSlow }}>
        {set('alt')}
        {set('')}
      </m.div>
    </div>
  );
}

export function CursorGlass() {
  const [label, setLabel] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    let x = -100;
    let y = -100;
    const move = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!raf) {
        raf = requestAnimationFrame(() => {
          el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
          raf = 0;
        });
      }
      const next = (e.target as HTMLElement).closest<HTMLElement>('[data-cursor]')?.dataset.cursor ?? null;
      // Only re-render when the hovered label actually changes
      setLabel((prev) => (prev === next ? prev : next));
    };
    window.addEventListener('pointermove', move, { passive: true });
    return () => {
      window.removeEventListener('pointermove', move);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={ref} className={`cursor ${label ? 'is-on' : ''}`} aria-hidden>
      {label}
    </div>
  );
}

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const field = document.createElement('textarea');
    field.value = text;
    field.setAttribute('readonly', '');
    field.style.position = 'fixed';
    field.style.opacity = '0';
    document.body.appendChild(field);
    field.select();
    const ok = document.execCommand('copy');
    field.remove();
    return ok;
  }
}

export function CopyEmail({ email }: { email: string }) {
  const [state, setState] = useState<'idle' | 'copied' | 'failed'>('idle');
  const timer = useRef(0);
  useEffect(() => () => window.clearTimeout(timer.current), []);
  return (
    <button
      type="button"
      className={`copy-email ${state !== 'idle' ? `is-${state}` : ''}`}
      aria-describedby="copy-email-status"
      onClick={async () => {
        const ok = await copyText(email);
        setState(ok ? 'copied' : 'failed');
        window.clearTimeout(timer.current);
        timer.current = window.setTimeout(() => setState('idle'), ok ? 2000 : 4000);
      }}
    >
      <svg viewBox="0 0 16 16" fill="none" aria-hidden>
        {state === 'copied' ? (
          <path d="M3 8.5 6.5 12 13 4.5" stroke="currentColor" strokeWidth="1.6" />
        ) : state === 'failed' ? (
          <path d="M8 3.5v5.5M8 12v.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        ) : (
          <>
            <rect x="5.5" y="5.5" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
            <path d="M10.5 5.5v-1a1.5 1.5 0 0 0-1.5-1.5H4A1.5 1.5 0 0 0 2.5 4.5v5A1.5 1.5 0 0 0 4 11h1" stroke="currentColor" strokeWidth="1.3" />
          </>
        )}
      </svg>
      <span>{state === 'copied' ? 'Copied to clipboard' : state === 'failed' ? 'Copy blocked, select it instead' : 'Copy email'}</span>
      <span id="copy-email-status" className="sr-only" role="status" aria-live="polite">
        {state === 'copied' ? 'Email address copied to clipboard.' : state === 'failed' ? 'Automatic copying was blocked. Select the address above instead.' : ''}
      </span>
    </button>
  );
}

export const ArrowUpRight = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 18 18" fill="none" aria-hidden>
    <path d="M4 14 14 4M6 4h8v8" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);
