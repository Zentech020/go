import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false
      }
    }
  },
  define: {
    'import.meta.env.VITE_CODESPACES': JSON.stringify(process.env.CODESPACES || 'false'),
    'import.meta.env.VITE_CODESPACE_NAME': JSON.stringify(process.env.CODESPACE_NAME || ''),
    'import.meta.env.VITE_GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN': JSON.stringify(
      process.env.GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN || 'app.github.dev'
    )
  }
})