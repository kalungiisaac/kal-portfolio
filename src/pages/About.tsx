import { Link } from 'react-router-dom';
import { process, profile, stats } from '../data';
import { useMeta } from '../hooks/useMeta';
import { Reveal, SectionIntro } from '../components/ui';
import { CodeSample } from '../components/CodeSample';

export default function About() {
  useMeta('About', 'Kalungi Isaac is a full-stack developer in Kampala, Uganda, building web apps end to end with React, TypeScript, Node and Next.js.');
  return (
    <section className="section paper-zone">
      <SectionIntro
        side="About the developer"
        title="The whole path, not just the front door."
        lead={`I'm ${profile.name}, a full-stack developer in ${profile.location}. I like the part of the job where the interface, the API and the data model have to agree.`}
      />

      <div className="about-grid">
        <Reveal>
          <CodeSample />
        </Reveal>

        <div className="about-copy">
          <Reveal>
            <p>
              I started with the basics: semantic HTML, real CSS, and JavaScript before any framework. That order stuck.
              When I picked up React and TypeScript, I understood what they were abstracting over, and when I moved to Node
              and Express, the requests and responses looked like things I had already built by hand.
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <p>
              These days I build with React and TypeScript on the client, Node and Express on the server, MongoDB and
              PostgreSQL for data, and Next.js when a project needs both. Python and C# shaped how I think about structure:
              I treat the problem, not the syntax, as the hard part.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p>
              What I care about in the result is mostly invisible: pages that load on a slow connection, forms that explain
              what went wrong, and states for empty, loading and error that someone actually wrote. I would rather ship
              three clear screens than ten clever ones.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="about-sign">
              <img src={profile.avatar} alt="" width={44} height={44} loading="lazy" />
              <span>
                Kalungi Isaac
                <small>{profile.role} · {profile.location}</small>
              </span>
            </div>
          </Reveal>

          <div className="stats">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={0.05 * i} className="stat glass">
                <span className="stat-value">
                  {s.value}
                  {s.sup && <sup>{s.sup}</sup>}
                </span>
                <span className="stat-label">{s.label}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      <div className="sub-section">
        <div className="section-head">
          <span className="label side">How I work</span>
        </div>
        <div className="process">
          {process.map((p, i) => (
            <Reveal key={p.no} delay={i * 0.06} className="step glass">
              <span className="step-no">{p.no}</span>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
              <span className="step-tag">{p.tag}</span>
            </Reveal>
          ))}
        </div>
      </div>

      <Reveal className="page-next">
        <Link to="/work" className="next-link">
          <span className="label">Next</span>
          <span className="next-title">Work <em>/</em> what I shipped, and why</span>
        </Link>
      </Reveal>
    

    </section>
  );
}
