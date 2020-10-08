const imageminMozjpeg = require('imagemin-mozjpeg')
const ImageminPlugin = require('imagemin-webpack-plugin').default
const isDev = process.env.NODE_ENV !== 'production'

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
  mode: 'universal',
  ...(!isDev && {
    modern: 'client'
  }),
  vuetify: {
    customVariables: ['~/assets/variables.scss']
  },
  router: {
    prefetchLinks: false
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
      { src: '~/plugins/TiptapVuetify', mode: 'client' },
      { src: '~~/plugins/vue-lazy-load.js' }
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
    filenames: {
      app: ({ isDev }) => isDev ? '[name].js' : 'js/[contenthash].js',
      chunk: ({ isDev }) => isDev ? '[name].js' : 'js/[contenthash].js',
      css: ({ isDev }) => isDev ? '[name].css' : 'css/[contenthash].css',
      img: ({ isDev }) => isDev ? '[path][name].[ext]' : 'img/[contenthash:7].[ext]',
      font: ({ isDev }) => isDev ? '[path][name].[ext]' : 'fonts/[contenthash:7].[ext]',
      video: ({ isDev }) => isDev ? '[path][name].[ext]' : 'videos/[contenthash:7].[ext]'
    },
    ...(!isDev && {
      html: {
        minify: {
          collapseBooleanAttributes: true,
          decodeEntities: true,
          minifyCSS: true,
          minifyJS: true,
          processConditionalComments: true,
          removeEmptyAttributes: true,
          removeRedundantAttributes: true,
          trimCustomFragments: true,
          useShortDoctype: true
        }
      }
    }),
    ...(!isDev && {
      extractCSS: {
        ignoreOrder: true
      }
    }),
    splitChunks: {
      layouts: true,
      pages: true,
      commons: true
    },
    optimization: {
      minimize: !isDev
    },
    transpile: ['vuetify/lib', 'tiptap-vuetify', 'vue-lazy-hydration', 'intersection-observer'],
    postcss: {
      plugins: {
        ...(!isDev && {
          cssnano: {
            preset: ['advanced', {
              autoprefixer: false,
              cssDeclarationSorter: false,
              zindex: false,
              discardComments: {
                removeAll: true
              }
            }]
          }
        })
      },
      ...(!isDev && {
        preset: {
          browsers: 'cover 99.5%',
          autoprefixer: true
        }
      }),

      order: 'cssnanoLast'
    },
    /*
    ** Run ESLint on save
    */
    // extend (config, ctx) {
    //   if (ctx.isDev && ctx.isClient) {
    //     config.module.rules.push({
    //       enforce: 'pre',
    //       test: /\.(js|vue)$/,
    //       loader: 'eslint-loader',
    //       exclude: /(node_modules)/
    //     })
    //   }
    //   const ORIGINAL_TEST = '/\\.(png|jpe?g|gif|svg|webp)$/i'
    //   const imageMinPlugin = new ImageminPlugin({
    //     pngquant: {
    //       quality: '5-30',
    //       speed: 7,
    //       strip: true
    //     },
    //     jpegtran: {
    //       progressive: true
    //
    //     },
    //     gifsicle: {
    //       interlaced: true
    //     },
    //     plugins: [
    //       imageminMozjpeg({
    //         quality: 70,
    //         progressive: true
    //       })
    //
    //     ]
    //   })
    //   if (!ctx.isDev) config.plugins.push(imageMinPlugin)
    // }
    extend(config, ctx) {
      const ORIGINAL_TEST = '/\\.(png|jpe?g|gif|svg|webp)$/i'
      const vueSvgLoader = [
        {
          loader: 'vue-svg-loader',
          options: {
            svgo: false
          }
        }
      ]
      const imageMinPlugin = new ImageminPlugin({
        pngquant: {
          quality: '5-30',
          speed: 7,
          strip: true
        },
        jpegtran: {
          progressive: true

        },
        gifsicle: {
          interlaced: true
        },
        plugins: [
          imageminMozjpeg({
            quality: 70,
            progressive: true
          })

        ]
      })
      if (!ctx.isDev) config.plugins.push(imageMinPlugin)

      config.module.rules.forEach(rule => {
        if (rule.test.toString() === ORIGINAL_TEST) {
          rule.test = /\.(png|jpe?g|gif|webp)$/i
          rule.use = [
            {
              loader: 'url-loader',
              options: {
                limit: 1000,
                name: ctx.isDev ? '[path][name].[ext]' : 'img/[contenthash:7].[ext]'
              }
            }
          ]
        }
      })
//  Create the custom SVG rule
      const svgRule = {
        test: /\.svg$/,
        oneOf: [
          {
            resourceQuery: /inline/,
            use: vueSvgLoader
          },
          {
            resourceQuery: /data/,
            loader: 'url-loader'
          },
          {
            resourceQuery: /raw/,
            loader: 'raw-loader'
          },
          {
            loader: 'file-loader' // By default, always use file-loader
          }
        ]
      }

      config.module.rules.push(svgRule) // Actually add the rule
    }
  },
  splitChunks: {
    layouts: true,
    pages: true,
    commons: true
  },
  webfontloader: {
    events: false,
    google: {
      families: ['Montserrat:400,500,600:cyrillic&display=swap']
    },
    timeout: 5000
  },
  styleResources: {
    // scss: ['./assets/scss/global-variables.scss'], // alternative: scss
    less: [],
    stylus: []
  },
  buildModules: [
    'nuxt-trailingslash-module',
    'nuxt-webfontloader',
    '@nuxtjs/style-resources',
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
  ],
  css: [
    'normalize.css'
  ]
}
