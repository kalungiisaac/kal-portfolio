import { Link } from 'react-router-dom';
import { notes } from '../data';
import { useMeta } from '../hooks/useMeta';
import { Reveal, SectionIntro } from '../components/ui';
import { formatDate } from '../lib/format';

export default function Notes() {
  useMeta('Notes', 'Short write-ups from Kalungi Isaac on interface design, server rendering, load performance and building for slow connections.');
  return (
    <section className="section paper-zone">
      <SectionIntro
        side={`${notes.length} notes`}
        title="Notes from the build."
        lead="Short posts written after shipping something: what worked, what broke, and the rule I keep from it."
      />

      <div className="notes-grid">
        {notes.map((n, i) => (
          <Reveal key={n.slug} delay={(i % 3) * 0.05} className="note glass">
            <Link to={`/notes/${n.slug}`} className="note-link">
              <div className="note-meta">
                <span><strong>{n.tag}</strong></span>
                <span>{formatDate(n.date)} · {n.read}</span>
              </div>
              <h2>{n.title}</h2>
              <p>{n.dek}</p>
              <span className="note-cta">Read note →</span>
            </Link>
          </Reveal>
        ))}
      </div>

      <Reveal className="page-next">
        <Link to="/contact" className="next-link">
          <span className="label">Next</span>
          <span className="next-title">Contact <em>/</em> say hello</span>
        </Link>
      </Reveal>
    

    </section>
  );
}
