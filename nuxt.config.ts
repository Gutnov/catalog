// https://nuxt.com/docs/api/configuration/nuxt-config
import svgLoader from 'vite-svg-loader'
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  srcDir: 'src/',
  modules: [
    '@nuxtjs/tailwindcss',
    'vuetify-nuxt-module'
  ],
  vite: {

    plugins: [
      svgLoader()
    ]
  }
})
