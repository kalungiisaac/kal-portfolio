import { Link } from 'react-router-dom';
import { skills } from '../data';
import { useMeta } from '../hooks/useMeta';
import { Reveal, SectionIntro } from '../components/ui';

const SWATCHES = [
  { hex: '#051A2D', name: 'Deep Navy', note: 'Background in dark zones' },
  { hex: '#A60E35', name: 'Crimson Red', note: 'Accent on paper' },
  { hex: '#FEA24F', name: 'Sunset Orange', note: 'Accent on navy' },
  { hex: '#10BBC3', name: 'Aqua Blue', note: 'Links and highlights' },
  { hex: '#FBF3EA', name: 'Cream', note: 'Background in light zones' },
];

export default function Skills() {
  useMeta('Toolkit', 'The tools Kalungi Isaac reaches for: React, TypeScript and Next.js on the front, Node, Express, MongoDB and PostgreSQL on the back.');
  return (
    <section className="section paper-zone">
      <SectionIntro
        side="What I reach for"
        title="A small toolkit, known well."
        lead="I would rather know a few tools deeply than every tool shallowly. The note next to each one is where it actually gets used."
      />

      <div className="skills-grid">
        {skills.map((g, i) => (
          <Reveal key={g.group} delay={i * 0.05} className="skill-group glass">
            <h2>{g.group}</h2>
            <ul>
              {g.items.map((item) => (
                <li key={item.name}>
                  {item.name}
                  <span>{item.note}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>

      <div className="sub-section">
        <div className="section-head">
          <span className="label side">The system behind this site</span>
        </div>
        <h2 className="display sys-title">
          This site runs on its own <em>tokens</em>.
        </h2>
        <p className="sys-intro">
          Every colour, size and radius below is pulled from the CSS variables that style the page you are reading. It is
          the same approach I take on client work: decide once, reuse everywhere.
        </p>

        <div className="sys-grid">
          <Reveal className="sys-card glass">
            <h3>Type scale <span>Instrument Serif, Space Grotesk, JetBrains Mono</span></h3>
            <div className="type-spec">
              <span className="spec">Display<br />serif / 76</span>
              <span className="serif">Aa</span>
            </div>
            <div className="type-spec">
              <span className="spec">Body<br />sans / 17</span>
              <span className="sans">The whole path, not just the front door.</span>
            </div>
            <div className="type-spec">
              <span className="spec">Label<br />mono / 11</span>
              <span className="mono">(04) Toolkit, KLA 19:42</span>
            </div>
          </Reveal>

          <Reveal delay={0.06} className="sys-card glass">
            <h3>Glass and ink <span>5 tokens</span></h3>
            <div className="swatch-row">
              {SWATCHES.map((s) => (
                <span key={s.hex} className="swatch" data-hex={s.hex} style={{ background: s.hex }} title={`${s.name}: ${s.note}`} />
              ))}
            </div>
            <ul className="sys-list">
              <li>Radius <span>22 to 30px</span></li>
              <li>Glass blur <span>18 to 26px</span></li>
              <li>Border <span>1px, white</span></li>
            </ul>
          </Reveal>

          <Reveal delay={0.12} className="sys-card glass">
            <h3>Spacing rhythm <span>4 to 80px</span></h3>
            <div className="spacing" aria-hidden>
              {[4, 8, 12, 16, 24, 32, 48, 64, 80].map((n) => (
                <i key={n} style={{ height: `${20 + (n / 80) * 80}%` }} />
              ))}
            </div>
            <div className="spacing-labels" aria-hidden>
              {[4, 8, 12, 16, 24, 32, 48, 64, 80].map((n) => (
                <span key={n}>{n}</span>
              ))}
            </div>
            <ul className="sys-list">
              <li>Section padding <span>64 to 120px</span></li>
              <li>Ease curve <span>cubic-bezier(.16,1,.3,1)</span></li>
            </ul>
          </Reveal>
        </div>
      </div>

      <Reveal className="page-next">
        <Link to="/notes" className="next-link">
          <span className="label">Next</span>
          <span className="next-title">Notes <em>/</em> what I keep learning</span>
        </Link>
      </Reveal>
    

    </section>
  );
}
