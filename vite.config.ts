import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  esbuild: {
    keepNames: true
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      input: {
        'background': "src/background.ts",
        'content-script': "src/content-script.ts",
      },
      output: {
        entryFileNames: chunkInfo => {
          return `${chunkInfo.name}.js`
        }
      },
      // No tree-shaking otherwise it removes functions from Content Scripts.
      treeshake: false
    },
    // TODO: How do we configured ESBuild to keep functions?
    minify: false
  }
})
