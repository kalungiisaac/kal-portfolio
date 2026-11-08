import { useEffect } from 'react';

const SITE = 'https://kalungiisaac.dev';

export function useMeta(title: string, description: string) {
  useEffect(() => {
    document.title = `${title} · Kalungi Isaac`;
    const set = (selector: string, attr: 'name' | 'property', key: string, content: string) => {
      let el = document.head.querySelector<HTMLMetaElement>(selector);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };
    set('meta[name="description"]', 'name', 'description', description);
    set('meta[property="og:title"]', 'property', 'og:title', `${title} · Kalungi Isaac`);
    set('meta[property="og:description"]', 'property', 'og:description', description);
    set('meta[property="og:url"]', 'property', 'og:url', `${SITE}${window.location.pathname}`);
    set('meta[property="og:type"]', 'property', 'og:type', 'website');
    set('meta[property="og:image"]', 'property', 'og:image', `${SITE}/avatar.jpg`);
    set('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
    set('meta[name="twitter:title"]', 'name', 'twitter:title', `${title} · Kalungi Isaac`);
    set('meta[name="twitter:description"]', 'name', 'twitter:description', description);
  }, [title, description]);
}
