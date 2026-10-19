import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// The blog lives on blog.meritleaders.com, which sends no CORS headers, so the
// site reads it through same-origin /blog-proxy paths (rewritten in vercel.json).
const blogProxy = {
  target: 'https://blog.meritleaders.com',
  changeOrigin: true,
  rewrite: (path) => (path === '/blog-proxy/home' ? '/' : path.replace(/^\/blog-proxy/, '')),
}

export default defineConfig({
  plugins: [react()],
  server: { port: 5173, open: true, proxy: { '/blog-proxy': blogProxy } },
})
