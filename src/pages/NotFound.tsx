import { Link } from 'react-router-dom';
import { useMeta } from '../hooks/useMeta';

export default function NotFound() {
  useMeta('Page not found', 'That page does not exist. Head back to the index.');
  return (
    <section className="section paper-zone not-found">
      <div className="glass not-found-card">
        <span className="not-found-no">404</span>
        <h1>This page took a different route.</h1>
        <p>The link may be old, or mistyped. The index has everything.</p>
        <Link to="/" className="cta cta-dark">
          <span>Back to the index</span>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
            <path d="M7 1v12M1 7l6 6 6-6" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </Link>
      </div>
    

    </section>
  );
}
