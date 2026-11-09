import { Link } from 'react-router-dom';
import { notes, profile, projects, stats } from '../data';
import { useMeta } from '../hooks/useMeta';
import { Hero } from '../components/Hero';
import { Reveal } from '../components/ui';
import { formatDate } from '../lib/format';

const INDEX = [
  { to: '/about', title: 'About', line: 'How I got here, and how I work.' },
  { to: '/work', title: 'Work', line: 'Case studies with the decisions behind them.' },
  { to: '/experience', title: 'Experience', line: 'Coursework, open source, deployments.' },
  { to: '/skills', title: 'Toolkit', line: 'The tools, and the system behind this site.' },
  { to: '/notes', title: 'Notes', line: 'Short write-ups from the build.' },
  { to: '/contact', title: 'Contact', line: 'Roles, freelance builds, or a hello.' },
];

export default function Home() {
  useMeta(
    'Full-stack developer in Kampala',
    'Kalungi Isaac, a full-stack developer in Kampala, Uganda. React, TypeScript, Node, Express and Next.js, built end to end.',
  );

  return (
    <>
      <Hero />

      <section className="paper-zone home-index" aria-labelledby="home-index-title">
        <div className="grain" />
        <div className="section">
          <div className="section-head">
            <span className="label side">Index</span>
          
          </div>

          <div className="home-intro">
            <h2 id="home-index-title" className="display">
              Hi, I&apos;m <em>Kal</em>. I build web apps and all aplication softwares from the database to the button.
            </h2>
            <div>
              <p className="lead">
                I&apos;m in {profile.location}, mostly developing softwares with mordern techs like React, TypeScript and Node.
              </p>
              <div className="home-stats">
                {stats.map((s) => (
                  <span key={s.label} className="home-stat">
                    <b>
                      {s.value}
                      {s.sup}
                    </b>
                    {s.label}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <nav className="index-list" aria-label="Site index">
            {INDEX.map((item, i) => (
              <Reveal key={item.to} delay={i * 0.04} as="div">
                <Link to={item.to} className="index-row" data-cursor="open">
                  <span className="index-title">{item.title}</span>
                  <span className="index-line">{item.line}</span>
                  <span className="index-arrow" aria-hidden>↗</span>
                </Link>
              </Reveal>
            ))}
          </nav>
        </div>
      </section>

      <section className="paper-zone paper-zone-2" aria-labelledby="home-work-title">
        <div className="grain" />
        <div className="section">
          <div className="section-head">
            <span className="label side">Selected work</span>
            <Link to="/work" className="label side link-underline">
              All work →
            </Link>
          </div>
          <h2 id="home-work-title" className="display home-display">
            A few things I&apos;ve <em>shipped</em>.
          </h2>

          <div className="feature-grid">
            {projects.slice(0, 3).map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.06}>
                <Link to={`/work/${p.slug}`} className="feature-card glass">
                  <span className={`status status-${p.status.toLowerCase().replace(' ', '-')}`}>{p.status}</span>
                  <h3>{p.title}</h3>
                  <p>{p.summary}</p>
                  <span className="feature-meta">
                    {p.stack.slice(0, 3).join(' · ')}
                  </span>
                  <span className="feature-cta">Case study →</span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="paper-zone paper-zone-3" aria-labelledby="home-notes-title">
        <div className="grain" />
        <div className="section">
          <div className="section-head">
            <span className="label side">Notes</span>
            <Link to="/notes" className="label side link-underline">
              All notes →
            </Link>
          </div>
          <h2 id="home-notes-title" className="display home-display">
            Recently <em>noted</em>.
          </h2>
          <div className="home-notes">
            {notes.slice(0, 3).map((n, i) => (
              <Reveal key={n.slug} delay={i * 0.05}>
                <Link to={`/notes/${n.slug}`} className="home-note">
                  <span className="label">{formatDate(n.date)}</span>
                  <span className="home-note-title">{n.title}</span>
                  <span className="home-note-dek">{n.dek}</span>
                </Link>
              </Reveal>
            ))}
          </div>

          <Reveal className="home-cta">
            <div className="glass home-cta-card">
              <div>
                <span className="label">Have something to build?</span>
                <p>I&apos;m open to roles and freelance work. Email me, or send a WhatsApp to {profile.phone}.</p>
              </div>
              <Link to="/contact" className="cta cta-dark" data-cursor="write">
                <span>Start a conversation</span>
                <svg width="14" height="14" viewBox="0 0 18 18" fill="none" aria-hidden>
                  <path d="M4 14 14 4M6 4h8v8" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
