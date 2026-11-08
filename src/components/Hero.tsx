import { useEffect, useRef, useState } from 'react';
import { m, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { heroTicker, profile } from '../data';
import { Portrait } from './Portrait';
import { MarqueeSweep } from './ui';

function Ticker() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = window.setInterval(() => setI((v) => (v + 1) % heroTicker.length), 2400);
    return () => window.clearInterval(id);
  }, []);
  return (
    <p className="scroll-ticker">
      <svg viewBox="0 0 10 10" aria-hidden>
        <path d="M5 1v8M1 5h8" stroke="currentColor" strokeWidth="1.4" />
      </svg>
      <span key={i}>
        <m.span initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
          {heroTicker[i]}
        </m.span>
        <span className="caret"> _</span>
      </span>
    </p>
  );
}

const INTRO = 0.55;

function useIntroDone() {
  const [done, setDone] = useState(() => document.documentElement.dataset.intro === 'done');
  useEffect(() => {
    if (done) return;
    const on = () => setDone(true);
    window.addEventListener('kal:intro-done', on, { once: true });
    return () => window.removeEventListener('kal:intro-done', on);
  }, [done]);
  return done;
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const intro = useIntroDone();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);
  const [first, ...rest] = profile.name.split(' ');

  return (
    <section ref={ref} className="hero" aria-label="Introduction">
      <div className="hero-inner">
        <div className="hero-top">
          <span className="label">Full-stack developer · Kampala</span>
          <span className="label">{profile.location}</span>
        </div>

        <m.div style={{ y, opacity }} className="hero-content">
          <m.div initial={{ opacity: 0, y: 12 }} animate={intro ? { opacity: 1, y: 0 } : {}} transition={{ delay: INTRO, duration: 0.6 }}>
            <Ticker />
          </m.div>

          <Portrait intro={intro} />

          <h1 className="hero-title">
            <m.span
              className="reveal-line"
              initial={{ opacity: 0, y: 60 }}
              animate={intro ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: INTRO + 0.08, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              {first}{' '}
            </m.span>
            <m.span
              className="outline reveal-line"
              initial={{ opacity: 0, y: 60 }}
              animate={intro ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: INTRO + 0.16, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              {rest.join(' ')}
            </m.span>
          </h1>

          <m.p
            className="hero-tagline"
            initial={{ opacity: 0 }}
            animate={intro ? { opacity: 1 } : {}}
            transition={{ delay: INTRO + 0.4, duration: 0.8 }}
          >
            {profile.tagline}
          </m.p>
        </m.div>

        <m.div
          className="hero-bottom"
          initial={{ opacity: 0 }}
          animate={intro ? { opacity: 1 } : {}}
          transition={{ delay: INTRO + 0.6, duration: 0.8 }}
        >
          <Link to="/work" className="cta" data-cursor="view">
            <span>See the work</span>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
              <path d="M7 1v12M1 7l6 6 6-6" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </Link>
          <p className="hero-note">
            <span className="dot" />
            Open to full-stack roles, internships and volunteer work. Replies within a day.
          </p>
        </m.div>
      </div>

      <MarqueeSweep words={['Full-stack', 'React', 'TypeScript', 'Node.js', 'Next.js', 'MongoDB', 'PostgreSQL']} />
    </section>
  );
}
