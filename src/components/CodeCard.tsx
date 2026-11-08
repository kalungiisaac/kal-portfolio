import { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

export type CodeLine = { text: string; tone?: 'kw' | 'fn' | 'str' | 'cm' | 'dim' };

const TOKEN = /(\/\/.*$)|('[^']*')|\b(import|export|from|const|return|await|async|new|default)\b|(\b[a-zA-Z]+(?=\())/g;

function line(text: string, tone?: CodeLine['tone']) {
  if (tone) return [{ text, tone }] as CodeLine[];
  let last = 0;
  const out: CodeLine[] = [];
  for (const m of text.matchAll(TOKEN)) {
    const i = m.index ?? 0;
    if (i > last) out.push({ text: text.slice(last, i) });
    const t: CodeLine['tone'] = m[1] ? 'cm' : m[2] ? 'str' : m[3] ? 'kw' : 'fn';
    out.push({ text: m[0], tone: t });
    last = i + m[0].length;
  }
  if (last < text.length) out.push({ text: text.slice(last) });
  return out;
}

export function CodeCard({
  name,
  source,
  tabs,
  className = '',
}: {
  name: string;
  source: string[];
  tabs?: string[];
  className?: string;
}) {
  const reduce = useReducedMotion();
  const lines = source.map((l) => line(l));
  const total = source.length;
  const [typed, setTyped] = useState(reduce ? total : 0);

  useEffect(() => {
    if (reduce || typed >= total) return;
    const id = window.setTimeout(() => setTyped((n) => n + 1), typed === 0 ? 900 : 260);
    return () => window.clearTimeout(id);
  }, [typed, total, reduce]);

  return (
    <figure className={`code-card ${className}`} aria-label={`${name} snippet`}>
      <div className="code-bar" aria-hidden>
        <span className="code-dots">
          <i />
          <i />
          <i />
        </span>
        <span className="code-tabs">
          {(tabs ?? [name]).map((t) => (
            <span key={t} className={t === name ? 'is-on' : ''}>
              {t}
            </span>
          ))}
        </span>
        <span className="code-mode">TS</span>
      </div>
      <pre className="code-body">
        <code>
          {lines.map((tokens, i) => (
            <span key={i} className={`code-line ${i < typed ? 'is-on' : ''}`}>
              <span className="code-no">{String(i + 1).padStart(2, '0')}</span>
              <span className="code-text">
                {tokens.map((t, j) => (
                  <span key={j} className={t.tone ? `tk-${t.tone}` : undefined}>
                    {t.text}
                  </span>
                ))}
              </span>
            </span>
          ))}
          <span className="code-line is-on code-cursor-line" aria-hidden>
            <span className="code-no">{String(total + 1).padStart(2, '0')}</span>
            <span className="code-caret" />
          </span>
        </code>
      </pre>
      <figcaption className="code-foot">
        <span>{name}</span>
        <span>{typed}/{total} lines</span>
      </figcaption>
    </figure>
  );
}
