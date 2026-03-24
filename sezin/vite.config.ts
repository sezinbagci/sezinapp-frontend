import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/admin': {
        target: 'http://www.adminapp.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/admin/, ''),
      },
      '/api/user': {
        target: 'http://www.userapp.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/user/, ''),
      }
    }
  }
})

