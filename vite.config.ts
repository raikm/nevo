import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { defineConfig } from 'vite'
const root = resolve(__dirname, 'src/render')
const outDir = resolve(__dirname, 'dist/render')

// https://vitejs.dev/config/
export default defineConfig({
  root,
  base: process.env.ELECTRON=="true" ? './' : ".",
  build: {
    outDir,
    emptyOutDir: true
  },
  plugins: [vue()],
  
})
