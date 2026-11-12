import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  define: {
    // Path-based routing (/sponsor, /archive). The single-file preview build
    // flips this to true to route on #sponsor instead.
    __HASH_ROUTER__: 'false',
  },
  build: {
    target: 'es2020',
    // Never ship source maps to prod (security.md §3: nothing extra in the client bundle).
    sourcemap: false,
  },
})
