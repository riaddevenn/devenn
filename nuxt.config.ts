// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  modules: [
    // '@nuxt/content', - not needed for now
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxtjs/tailwindcss',
  ],
  ssr: true,
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/'],
    },
  },
  runtimeConfig: {
    GMAIL_USER: '',
    GMAIL_APP_PASSWORD: '',
    CONTACT_RECIPIENTS: '',
  },
  //
  tailwindcss: { cssPath: '~/assets/css/main.css', viewer: false },
  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      title: 'Devenn — Your technology partner for driven transformation',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'Devenn empowers organizations to innovate across the digital landscape. Eight technology horizontals. One delivery standard. Twenty years of excellence in the Saudi market.',
        },
      ],
      link: [
        {
          rel: 'icon',
          type: 'image/x-icon',
          href: '/favicon.ico',
          sizes: '48x48',
        },
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
      ],
    },
  },
  fonts: {
    // Gilroy is licensed. using Figtree is stand-in for now
    families: [
      { name: 'Figtree', provider: 'google', weights: [400, 500, 600, 700] },
    ],
  },
});
