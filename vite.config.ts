import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Required for Replit to expose the server
    allowedHosts: [
      // Allow connections from the Replit preview window
      '.replit.dev'
    ],
  },
})
