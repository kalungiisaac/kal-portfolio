import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const ROUTE = /^\/(about|work|experience|skills|notes|contact)(\/|$)|\/work\/[^/]+$/

// `vite preview` ships no SPA fallback, so deep links would 404 the way a misconfigured host does.
// Mirror the production rewrite (vercel.json / _redirects) so previews behave like the real deploy.
const spaPreviewFallback = {
  name: 'spa-preview-fallback',
  configurePreviewServer(server: { middlewares: { use: (fn: unknown) => void } }) {
    server.middlewares.use((req: { method?: string; url?: string }, _res: unknown, next: () => void) => {
      const path = req.url?.split('?')[0] ?? ''
      if (req.method === 'GET' && ROUTE.test(path) && !path.includes('.')) req.url = '/index.html'
      next()
    })
  },
}

export default defineConfig({
  plugins: [react(), spaPreviewFallback],
})
