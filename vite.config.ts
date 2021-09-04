import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { defineConfig } from 'vite'
import svgLoader from 'vite-svg-loader'

const root = resolve(__dirname, 'src/render')
const outDir = resolve(__dirname, 'dist/render')
const path = require('path');

// https://vitejs.dev/config/
export default defineConfig({
  root,
  base: process.env.ELECTRON=="true" ? './' : ".",
  build: {
    outDir,
    emptyOutDir: true
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/render'),
    },
  },
  plugins: [vue(), svgLoader()],
  
})
