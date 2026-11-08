import { Link, useParams } from 'react-router-dom';
import { notes } from '../data';
import { useMeta } from '../hooks/useMeta';
import { Reveal } from '../components/ui';
import { formatDate } from '../lib/format';
import NotFound from './NotFound';

export default function Note() {
  const { slug } = useParams();
  const note = notes.find((n) => n.slug === slug);
  useMeta(note ? note.title : 'Note not found', note ? note.dek : 'Note not found.');

  if (!note) return <NotFound />;

  const i = notes.indexOf(note);
  const next = notes[(i + 1) % notes.length];

  return (
    <article className="section paper-zone note-page">
      <div className="section-head">
        <Link to="/notes" className="label side">← All notes</Link>
        <span className="label side">{note.tag}</span>
      </div>

      <header className="note-head">
        <span className="label">
          {formatDate(note.date)} · {note.read} read
        </span>
        <h1 className="page-title">{note.title}</h1>
        <p className="lead">{note.dek}</p>
      </header>

      <div className="prose">
        {note.body.map((p, idx) => (
          <Reveal key={idx} delay={idx * 0.03}>
            <p>
              {idx === 0 && (
                <span className="drop-cap" aria-hidden>
                  {p[0]}
                </span>
              )}
              {idx === 0 ? p.slice(1) : p}
            </p>
          </Reveal>
        ))}
      </div>

      <Reveal className="page-next">
        <Link to={`/notes/${next.slug}`} className="next-link">
          <span className="label">Next note</span>
          <span className="next-title">{next.title}</span>
        </Link>
      </Reveal>
    

    </article>
  );
}
