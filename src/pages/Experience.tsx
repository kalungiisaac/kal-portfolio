import { Link } from 'react-router-dom';
import { experience, profile } from '../data';
import { useMeta } from '../hooks/useMeta';
import { Reveal, SectionIntro } from '../components/ui';

export default function Experience() {
  useMeta('Experience', 'Kalungi Isaac is open to software internships, junior roles and volunteer work in Kampala or remote, alongside BYU-Pathway Worldwide coursework and open-source builds.');
  return (
    <section className="section paper-zone">
      <SectionIntro
        side="Timeline, newest first"
        title="Learning in public, on purpose."
        lead="Coursework supplied the deadlines. Open-source builds supplied the real APIs, the deployments and the bugs that only appear in public."
      />

      <div className="timeline">
        {experience.map((e, i) => (
          <Reveal key={e.role + e.year} delay={i * 0.08} className={`timeline-row glass${e.now ? ' is-now' : ''}`}>
            <span className="timeline-year">
              {e.now && <i className="dot" aria-hidden />}
              {e.year}
            </span>
            <div className="timeline-main">
              <h2>
                {e.role} <span className="muted">· {e.org}</span>
              </h2>
              <p>{e.detail}</p>
            </div>
            <span className="timeline-dot" aria-hidden />
          </Reveal>
        ))}
      </div>

      <Reveal className="experience-now">
        <div className="now-card glass">
          <span className="label">Right now</span>
          <p>
            Finishing a full-stack programme at BYU-Pathway Worldwide while looking for an internship, a junior role or
            volunteer work where I can own a feature from the database to the interface. Based in {profile.location},
            working across <span className="tz">{profile.timezoneLabel} (UTC+3)</span>.
          </p>
          <Link to="/contact" className="pill-link">
            Get in touch
          </Link>
        </div>
      </Reveal>

      <Reveal className="page-next">
        <Link to="/skills" className="next-link">
          <span className="label">Next</span>
          <span className="next-title">Toolkit <em>/</em> what I reach for</span>
        </Link>
      </Reveal>
    

    </section>
  );
}
