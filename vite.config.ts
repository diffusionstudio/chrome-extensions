import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    minify: false,
    outDir: 'dist',
    assetsDir: '.', // output assets into the root of outDir
    rollupOptions: {
      // Custom Rollup configuration
      input: {
        // Specify entries for your files here
        'service-worker': 'src/service-worker.ts',
        'content-script': 'src/content-script.ts',
        // Add other entry points if needed
        index: 'index.html'
      },
      output: {
        // Preserve specific file names
        format: 'es',
        // Override the filenames for service-worker.ts and content-script.ts
        entryFileNames: '[name].js', // or whatever format you prefer
        chunkFileNames: '[name]-[hash].js', // include hash for other chunks
        assetFileNames: '[name]-[hash][extname]', // include hash for assets
      },
    },
  },
})
