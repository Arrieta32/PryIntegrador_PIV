import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages project site: https://<user>.github.io/PryIntegrador_PIV/
export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE || '/PryIntegrador_PIV/',
})
