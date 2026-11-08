import { Fragment } from 'react';
import { Link, useParams } from 'react-router-dom';
import { projects } from '../data';
import { useMeta } from '../hooks/useMeta';
import { Reveal } from '../components/ui';
import NotFound from './NotFound';

export default function CaseStudy() {
  const { slug } = useParams();
  const i = projects.findIndex((p) => p.slug === slug);
  const project = projects[i];
  useMeta(project ? project.title : 'Project not found', project ? project.summary : 'Project not found.');

  if (!project) return <NotFound />;

  const next = projects[(i + 1) % projects.length];
  const facts = [
    ['Role', project.role],
    ['Year', project.year],
    ['Status', project.status],
    ['Stack', project.stack.join(', ')],
    ...(project.live ? [['Live', project.live.replace(/^https?:\/\//, '').replace(/\/$/, '')]] : []),
    ...(project.preview ? [['Preview', project.preview.replace(/^https?:\/\//, '')]] : []),
  ];

  return (
    <article className="section case-study dark-zone">
      <div className="section-head">
        <Link to="/work" className="label side">
          ← All work
        </Link>
        <span className="label side">{project.kind}</span>
      </div>

      <header className="case-head">
        <Reveal>
          <span className="case-kind">{project.kind}</span>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="page-title">{project.title}</h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="lead case-summary">{project.summary}</p>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="case-actions">
            {project.live && (
              <a href={project.live} className="pill-link" target="_blank" rel="noreferrer noopener">
                Live site ↗
              </a>
            )}
            {project.preview && (
              <a href={project.preview} className="pill-link" target="_blank" rel="noreferrer noopener">
                Preview ↗
              </a>
            )}
            <a href={project.repo} className="pill-link pill-ghost" target="_blank" rel="noreferrer noopener">
              Source on GitHub ↗
            </a>
          </div>
        </Reveal>
      </header>

      <Reveal className="case-figure">
        <div className="case-visual glass" aria-hidden>
          <div className="case-visual-grid" />
          <div className="case-visual-glow" />
          <span className="case-visual-word">{project.title.split(' ')[0]}</span>
        </div>
      </Reveal>

      <div className="case-body">
        <aside className="case-facts glass">
          <h2 className="label">Fact sheet</h2>
          <dl>
            {facts.map(([k, v]) => (
              <Fragment key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </Fragment>
            ))}
            <dt>Timeframe</dt>
            <dd>{project.timeframe}</dd>
          </dl>
        </aside>

        <div className="case-copy">
          <Reveal>
            <h2 className="case-h2">The brief</h2>
            <p>{project.brief}</p>
          </Reveal>

          <Reveal>
            <h2 className="case-h2">The hard parts</h2>
            <ul className="case-list">
              {project.challenge.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </Reveal>

          <Reveal>
            <h2 className="case-h2">How I built it</h2>
          </Reveal>
          <div className="case-steps">
            {project.approach.map((s, idx) => (
              <Reveal key={s.title} delay={idx * 0.04} className="case-step glass">
                <span className="case-step-mark" aria-hidden />
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <h2 className="case-h2">Where it landed</h2>
          </Reveal>
          <div className="case-outcome">
            {project.outcome.map((o) => (
              <Reveal key={o.title} className="outcome-item">
                <h3>{o.title}</h3>
                <p>{o.body}</p>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <blockquote className="case-quote">
              <p>{project.learned}</p>
              <cite className="label">What I took from it</cite>
            </blockquote>
          </Reveal>
        </div>
      </div>

      <Reveal className="page-next">
        <Link to={`/work/${next.slug}`} className="next-link">
          <span className="label">Next project</span>
          <span className="next-title">{next.title}</span>
        </Link>
      </Reveal>
    </article>
  );
}
