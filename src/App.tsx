import { Suspense, lazy, useEffect, useRef } from 'react';
import { AnimatePresence, LazyMotion, MotionConfig, m, useReducedMotion } from 'framer-motion';
import { Route, Routes, useLocation } from 'react-router-dom';
import { useSmoothScroll } from './useSmoothScroll';
import { Loader } from './components/Loader';
import { Footer, ScrollProgress, Topbar, Glass } from './components/SiteChrome';

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Work = lazy(() => import('./pages/Work'));
const CaseStudy = lazy(() => import('./pages/CaseStudy'));
const Experience = lazy(() => import('./pages/Experience'));
const Skills = lazy(() => import('./pages/Skills'));
const Notes = lazy(() => import('./pages/Notes'));
const Note = lazy(() => import('./pages/Note'));
const Contact = lazy(() => import('./pages/Contact'));
const NotFound = lazy(() => import('./pages/NotFound'));

function PageFallback() {
  return <div className="route-fallback" aria-hidden />;
}

function Routed() {
  const location = useLocation();
  const reduce = useReducedMotion();
  const main = useRef<HTMLElement>(null);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        requestAnimationFrame(() => el.scrollIntoView());
        return;
      }
    }
    window.scrollTo(0, 0);
    main.current?.focus({ preventScroll: true });
  }, [location.pathname]);

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Topbar />
      <ScrollProgress />
      <Glass />
      <main id="main" ref={main} tabIndex={-1} className="route-main">
        <Suspense fallback={<PageFallback />}>
          <AnimatePresence mode="wait" initial={false}>
            <m.div
              key={location.pathname}
              className="route"
              initial={reduce ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              <Routes location={location}>
                <Route index element={<Home />} />
                <Route path="about" element={<About />} />
                <Route path="work" element={<Work />} />
                <Route path="work/:slug" element={<CaseStudy />} />
                <Route path="experience" element={<Experience />} />
                <Route path="skills" element={<Skills />} />
                <Route path="notes" element={<Notes />} />
                <Route path="notes/:slug" element={<Note />} />
                <Route path="contact" element={<Contact />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </m.div>
          </AnimatePresence>
        </Suspense>
      </main>
      <Footer />
    </>
  );
}

const loadFeatures = () => import('framer-motion').then((mod) => mod.domAnimation);

export default function App() {
  useSmoothScroll();
  return (
    <LazyMotion features={loadFeatures} strict>
      <MotionConfig reducedMotion="user">
        <Loader />
        <div className="noise" aria-hidden />
        <Routed />
      </MotionConfig>
    </LazyMotion>
  );
}
