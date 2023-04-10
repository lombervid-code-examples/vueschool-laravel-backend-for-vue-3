// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@vueuse/nuxt', '@nuxtjs/tailwindcss', '@formkit/nuxt'],
  css: ['@/assets/css/main.css'],
  tailwindcss: {
    config: {
      content: ['./node_modules/laravel-vue-pagination/**/*.vue'],
    },
  },
  runtimeConfig: {
    public: {
      appURL: '',
    },
  },
  ssr: false,
  // routeRules: {
  //   '/profiles/*': { swr: true },
  //   '/*': { ssr: false },
  // },
})
