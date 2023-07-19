import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


export default defineConfig({
  plugins: [react()],
  publicDir : 'public',
  build : {
    rollupOptions: {
      output : {
        assetFileNames : (file) => {
          return `assets/css/index.min.css`;
        },
        entryFileNames : (file) => {
          return `assets/js/index.min.js`
        }
      }
    }
  }
})
