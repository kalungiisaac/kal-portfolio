import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { projects } from '../data';
import { useMeta } from '../hooks/useMeta';
import { Reveal } from '../components/ui';
import { LazyCodeCard } from '../components/lazy';

const FILTERS = ['All', 'Live', 'Open source'] as const;

export default function Work() {
  useMeta('Work', 'Case studies from Kalungi Isaac: a RAWG game store, a Next.js ward planner, REST APIs, storefronts and Python tools, each written up end to end.');
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>('All');
  const [preview, setPreview] = useState(0);
  const visible = useMemo(() => projects.filter((p) => filter === 'All' || p.status === filter), [filter]);
  const p = visible[Math.min(preview, visible.length - 1)];

  return (
    <section className="section paper-zone">
      <header className="page-head">
        <div className="section-head">
          <span className="label side">Selected work</span>
          <span className="label side">{projects.length} projects, each with a write-up</span>
        </div>
        <h1 className="page-title">
          <Reveal>Things I&apos;ve built, and what I&apos;d change.</Reveal>
        </h1>
        <Reveal delay={0.1}>
          <p className="lead">
            Every project has a page with the brief, the hard parts, the decisions and the honest outcome. Hover a row to
            preview it.
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="filter-row" role="group" aria-label="Filter projects">
            {FILTERS.map((f) => (
              <button
                key={f}
                type="button"
                className={`filter-chip ${filter === f ? 'is-on' : ''}`}
                aria-pressed={filter === f}
                onClick={() => {
                  setFilter(f);
                  setPreview(0);
                }}
              >
                {f}
                <span>{f === 'All' ? projects.length : projects.filter((x) => x.status === f).length}</span>
              </button>
            ))}
          </div>
        </Reveal>
      </header>

      <div className="work-layout">
        <div className="work-list" onMouseLeave={() => setPreview(0)}>
          {visible.map((item, i) => (
            <Reveal key={item.slug} delay={Math.min(i, 6) * 0.03} as="div">
              <Link
                to={`/work/${item.slug}`}
                className={`work-row ${p?.slug === item.slug ? 'is-active' : ''}`}
                onMouseEnter={() => setPreview(i)}
                onFocus={() => setPreview(i)}
                data-cursor="read"
              >
                <span className="work-row-main">
                  <span className="work-row-title">
                    {item.title}
                    <svg className="arrow" width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
                      <path d="M4 14 14 4M6 4h8v8" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                  </span>
                  <span className="work-row-kind">{item.kind}</span>
                </span>
                <span className="work-row-side">
                  <span className={`status status-${item.status.toLowerCase().replace(' ', '-')}`}>{item.status}</span>
                  <span className="work-year">{item.year}</span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>

        <aside className="work-detail" aria-live="polite" aria-label="Project preview">
          {p && (
            <div className="work-detail-frame glass-dark">
              <div className="work-detail-bg" aria-hidden>
                <div className="work-code">
                  <LazyCodeCard key={p.slug} name={p.code.file} source={p.code.lines} />
                </div>
              </div>
              <div className="work-detail-body" key={p.slug}>
                <span className={`status status-${p.status.toLowerCase().replace(' ', '-')}`}>{p.status}</span>
                <h2>{p.title}</h2>
                <p>{p.summary}</p>
                <ul className="chips">
                  {p.stack.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
                <div className="work-detail-links">
                  <Link to={`/work/${p.slug}`} className="pill-link pill-dark">
                    Read the case study
                  </Link>
                  {p.live && (
                    <a href={p.live} className="pill-link pill-dark" target="_blank" rel="noreferrer noopener">
                      Visit live ↗
                    </a>
                  )}
                </div>
              </div>
            </div>
          )}
        </aside>
      </div>
    </section>
  );
}
