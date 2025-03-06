import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: '../backend/public',
    emptyOutDir: true,
  },
  // add a @ routing to src folder
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})
