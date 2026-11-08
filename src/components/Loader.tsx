import { useEffect, useState } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { profile } from '../data';

const KEY = 'kal-seen';
const WELCOME = 'Welcome.';
const DURATION = 650;
const HOLD = 260;
const EXIT = 0.62;

function shouldShow() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  try {
    return sessionStorage.getItem(KEY) !== '1';
  } catch {
    return true;
  }
}

export function Loader() {
  const [done, setDone] = useState(() => !shouldShow());

  useEffect(() => {
    if (done) return;
    try {
      sessionStorage.setItem(KEY, '1');
    } catch {
      // private mode: show the intro once per page load
    }
    const timeout = window.setTimeout(() => setDone(true), DURATION + HOLD);
    return () => window.clearTimeout(timeout);
  }, [done]);

  // The hero waits on this flag so its entrance begins as the curtain lifts.
  useEffect(() => {
    if (!done) return;
    window.dispatchEvent(new CustomEvent('kal:intro-done'));
    document.documentElement.dataset.intro = 'done';
  }, [done]);

  return (
    <AnimatePresence>
      {!done && (
        <m.div
          className="loader"
          initial={{ opacity: 1 }}
          exit={{ y: '-100%' }}
          transition={{ duration: EXIT, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="loader-inner">
            <m.p
              className="loader-hello"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="dot" />
              {WELCOME}
            </m.p>
            <div className="loader-mark">
              <span>{profile.initials}</span>
            </div>
            <div className="loader-bar">
              <m.div
                className="loader-fill"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: DURATION / 1000, ease: [0.65, 0, 0.35, 1] }}
              />
            </div>
            <div className="loader-meta">
              <span className="label">
                {profile.name} · {profile.role}
              </span>
              <span className="label">Kampala</span>
            </div>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
