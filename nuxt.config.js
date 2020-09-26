module.exports = {
  vuetify: {
    customVariables: ['~/assets/variables.scss']
  },
  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: '%s | nuxt-shop',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  buildModules: [
    'nuxt-sweetalert2',
    '@nuxtjs/vuetify',
    [
      '@nuxtjs/firebase',
      {
        config: {
          apiKey: "AIzaSyC3-ZS8dG3MtrHboMzI_K7Yh4L6wHZugy0",
          authDomain: "nuxt-shop-9842c.firebaseapp.com",
          databaseURL: "https://nuxt-shop-9842c.firebaseio.com",
          projectId: "nuxt-shop-9842c",
          storageBucket: "nuxt-shop-9842c.appspot.com",
          messagingSenderId: "49572454955",
          appId: "1:49572454955:web:4938b9776db4f1a497806e",
          measurementId: 'G-SD6MJEPBNL'
        },
        services: {
          auth: true,
          firestore: true,
          functions: true,
          storage: true,
          realtimeDb: true,
          messaging: true,
          performance: true,
          analytics: true,
          remoteConfig: true
        }
      },
    ]
  ]
}
