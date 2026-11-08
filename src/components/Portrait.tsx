import { m, useReducedMotion } from 'framer-motion';
import portrait from '../assets/kal-portrait.webp';
import { profile } from '../data';
import { LazyCodeCard } from './lazy';

const ORBIT = [
  'const',
  '{ }',
  '=>',
  'await',
  'ts',
  '</>',
  'db',
  'map()',
  'node',
  'git',
  'type',
  'api',
];

function CodeBall() {
  const reduce = useReducedMotion();
  return (
    <div className={`code-ball${reduce ? ' is-still' : ''}`} aria-hidden>
      <span className="code-ball-core">
        <svg viewBox="0 0 24 24" width="15" height="15">
          <path
            d="m8 6-5 6 5 6M16 6l5 6-5 6M13.5 4l-3 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      {ORBIT.map((t, i) => (
        <span
          key={t}
          className="code-bit"
          style={{ '--d': `${(-i * 2.6).toFixed(1)}s` } as React.CSSProperties}
        >
          {t}
        </span>
      ))}
    </div>
  );
}

const SNIPPET = [
  'export async function handler(req: Request) {',
  "  const input = schema.parse(await req.json())",
  '  const draft = await db.project.create(input)',
  '  return json({ ok: true, draft })',
  '}',
];

export function Portrait({ intro }: { intro: boolean }) {
  return (
    <m.div
      className="portrait"
      initial={{ opacity: 0, scale: 0.85 }}
      animate={intro ? { opacity: 1, scale: 1 } : {}}
      transition={{ delay: 0.45, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      data-cursor="kal"
    >
      <div className="portrait-img-wrap">
        <img
          src={portrait}
          alt={`Portrait of ${profile.name}`}
          className="portrait-img"
          width={720}
          height={720}
          decoding="async"
        />
      </div>

      <m.div
        className="portrait-code"
        initial={{ opacity: 0, y: 16, rotate: 3 }}
        animate={intro ? { opacity: 1, y: 0, rotate: 1.5 } : {}}
        transition={{ delay: 0.8, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <LazyCodeCard name="route.ts" tabs={['page.tsx', 'route.ts']} source={SNIPPET} />
      </m.div>

      <CodeBall />
    </m.div>
  );
}
