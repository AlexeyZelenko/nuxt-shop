module.exports = {
  auth: {
    persistence: 'local', // default
    initialize: {
      onAuthStateChangedMutation: 'ON_AUTH_STATE_CHANGED_MUTATION',
      onAuthStateChangedAction: 'onAuthStateChangedAction'
    },
    ssr: false // default
  },
  /*
   ** Rendering mode
   ** Doc: https://nuxtjs.org/api/configuration-mode
   */
  mode: "universal",
  vuetify: {
    customVariables: ['~/assets/variables.scss']
  },
  /*
  ** Headers of the page
  */
  title: 'teploservis',
  head: {
    titleTemplate: '%s | teploservis',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'teploservis68.com.ua' }
    ],
    plugins: [
      { src: '~/plugins/TiptapVuetify', mode: 'client' }
    ],
    link: [
      { rel: 'image', type: 'image/png', href: '/service.png' },
      // Iconfonts for Vuetify. You need to leave only which one you use
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900|Material+Icons' },
      { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css' },
      { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/MaterialDesign-Webfont/4.4.95/css/materialdesignicons.min.css' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: '~/components/loading.vue',
  // loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    transpile: ['vuetify/lib', 'tiptap-vuetify'],
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
    'vue-social-sharing/nuxt',
    ['@nuxtjs/vuetify'],
      [
      'vue-sweetalert2/nuxt',
      {
        confirmButtonColor: '#41b882',
        cancelButtonColor: '#ff7674'
      }
    ],
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
