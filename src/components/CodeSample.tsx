import { useEffect, useState } from 'react';
import { AnimatePresence, m, useReducedMotion } from 'framer-motion';
import { LazyCodeCard } from './lazy';

const SAMPLES = [
  {
    file: 'app/layout.tsx',
    note: 'Server layout',
    lines: [
      "export default function RootLayout({ children }: Props) {",
      '  return (',
      '    <html lang="en">',
      '      <body>{children}</body>',
      '    </html>',
      '  )',
      '}',
    ],
  },
  {
    file: 'api/meetings/route.ts',
    note: 'Route handler',
    lines: [
      'export async function GET() {',
      '  const meetings = await db.meeting.findMany({',
      '    where: { date: { gte: new Date() } },',
      "    orderBy: { date: 'asc' },",
      '  })',
      '  return Response.json(meetings)',
      '}',
    ],
  },
  {
    file: 'lib/schema.ts',
    note: 'Validation',
    lines: [
      'export const meetingSchema = z.object({',
      '  topic: z.string().min(3),',
      '  speaker: z.string().min(2),',
      '  date: z.coerce.date(),',
      '})',
      '',
      'export type Meeting = z.infer<typeof meetingSchema>',
    ],
  },
  {
    file: 'models/contact.js',
    note: 'Mongo model',
    lines: [
      'const contactSchema = new Schema({',
      '  name: { type: String, required: true },',
      '  email: { type: String, required: true },',
      '  org: String,',
      '}, { timestamps: true })',
      '',
      "export default model('Contact', contactSchema)",
    ],
  },
];

const CYCLE = 5200;

export function CodeSample() {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const t = window.setTimeout(() => setI((n) => (n + 1) % SAMPLES.length), CYCLE);
    return () => window.clearTimeout(t);
  }, [i, reduce]);

  const sample = SAMPLES[i];

  return (
    <figure className="code-sample">
      <div className="code-stack" aria-hidden />
      <AnimatePresence mode="wait" initial={false}>
        <m.div
          key={sample.file}
          className="code-sample-card"
          initial={reduce ? false : { opacity: 0, y: 14, rotate: -1 }}
          animate={{ opacity: 1, y: 0, rotate: 1.2 }}
          exit={reduce ? undefined : { opacity: 0, y: -12, rotate: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          <LazyCodeCard name={sample.file} source={sample.lines} tabs={[sample.file]} />
        </m.div>
      </AnimatePresence>

      <div className="code-sample-meta">
        <span className="label">{String(i + 1).padStart(2, '0')} / {String(SAMPLES.length).padStart(2, '0')}</span>
        <span className="label">{sample.note}</span>
        <span className="code-sample-bars" aria-hidden>
          {SAMPLES.map((s, n) => (
            <i key={s.file} className={n === i ? 'is-on' : ''} />
          ))}
        </span>
      </div>
    </figure>
  );
}
