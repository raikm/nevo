import { defineNuxtConfig } from 'nuxt'
import svgLoader from 'vite-svg-loader'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: ['@pinia/nuxt', 'nuxt-vue3-google-signin'],
  googleSignIn: {
    clientId: '449255202885-cqnnl6mlvd9jos7tj535t0rg17neaq80.apps.googleusercontent.com'
  },
  axios: {
    proxy: true
  },
  watch: ['pages'],
  alias: {
    // TODO: styles: resolve(__dirname, '../../packages/style')
  },
  vite: {
    plugins: [svgLoader()]
  },
  plugins: ['~/plugins/socketIO.ts']
})
