import { Suspense, lazy, useRef, type ComponentProps } from 'react';
import { useInView } from 'framer-motion';

type CodeCardProps = ComponentProps<typeof import('./CodeCard').CodeCard>;

const CodeCard = lazy(() => import('./CodeCard').then((m) => ({ default: m.CodeCard })));

export function LazyCodeCard(props: CodeCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const near = useInView(ref, { margin: '400px' });
  return (
    <div ref={ref} className="lazy-code">
      {near && (
        <Suspense fallback={<div className="code-card code-skeleton" aria-hidden />}>
          <CodeCard {...props} />
        </Suspense>
      )}
    </div>
  );
}
