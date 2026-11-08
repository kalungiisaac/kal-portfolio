import { useEffect, useState } from 'react';
import { AnimatePresence, m, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { nav, profile } from '../data';
import { YEAR } from '../lib/format';
import { SocialIcon } from './SocialIcons';
import { CursorGlass, ScrollIndex } from './ui';
import { useTimeZone } from '../hooks/useTime';

export function Topbar() {
  const { pathname } = useLocation();
  const dark = pathname.startsWith('/contact') || (pathname.startsWith('/work') && pathname !== '/work');
  const time = useTimeZone(profile.timezone);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    // oxlint-disable-next-line react/set-state-in-effect -- reads the scroll position on mount, e.g. after a route change keeps the offset
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <header className={`topbar ${dark ? 'is-dark' : 'is-light'} ${scrolled ? 'is-scrolled' : ''}`}>
        <Link to="/" className="brand" aria-label={`${profile.name}, home`} onClick={() => setOpen(false)}>
          <span className="brand-name">
            Kalungi<span className="brand-dot">.</span>Isaac
          </span>
          <span className="brand-status">
            <span className="dot" />
            Open to work
          </span>
        </Link>
        <nav className="topnav" aria-label="Primary">
          {nav.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.to === '/'} className={({ isActive }) => (isActive ? 'is-active' : '')}>
              <span>{l.label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="top-right">
          <span className="label top-clock">
            KLA <b key={time.slice(0, 5)}>{time.slice(0, 5)}</b>
            <i>:{time.slice(6)}</i>
          </span>
          <button
            type="button"
            className="menu-toggle"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <m.nav
            id="mobile-menu"
            className={`mobile-menu ${dark ? 'is-dark' : 'is-light'}`}
            aria-label="Mobile"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {nav.map((l, i) => (
              <m.div
                key={l.to}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 + i * 0.04, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link to={l.to} onClick={() => setOpen(false)}>
                  <span className="label">0{i + 1}</span>
                  {l.label}
                </Link>
              </m.div>
            ))}
            <div className="mobile-menu-foot label">
              <span>{profile.email}</span>
              <span>{profile.location}</span>
            </div>
          </m.nav>
        )}
      </AnimatePresence>
    </>
  );
}

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const spring = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  const [value, setValue] = useState(0);
  const [running, setRunning] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => spring.on('change', setValue), [spring]);

  useEffect(() => {
    let idle = 0;
    const onScroll = () => {
      setRunning(true);
      window.clearTimeout(idle);
      idle = window.setTimeout(() => setRunning(false), 220);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.clearTimeout(idle);
    };
  }, []);

  useEffect(() => {
    document.documentElement.dataset.motion = running && !reduce ? 'running' : 'rest';
  }, [running, reduce]);

  if (reduce) return null;
  return <ScrollIndex progress={value} />;
}

export function Footer() {
  return (
    <footer className="footer">
      <span className="label">© {YEAR} {profile.name}</span>
      <nav className="footer-links" aria-label="Elsewhere">
        {profile.socials.map((s) => (
          <a key={s.label} href={s.href} target={s.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer noopener">
            <SocialIcon label={s.label} size={13} />
            {s.label}
          </a>
        ))}
      </nav>
      <Link to="/" className="label back-top">
        Back to index ↑
      </Link>
    </footer>
  );
}

export function Glass() {
  return <CursorGlass />;
}
