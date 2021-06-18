import config from './karngyan.config'

const createSitemapRoutes = async () => {
  let routes = [];
  const { $content } = require('@nuxt/content')
  const articles = await $content('posts').fetch();

  if (config.blog.enabled) {
    for (const article of articles) {
      routes.push(`blog/${article.slug}`);
    }
  }

  if (config.projects.enabled) {
    const projects = await $content('projects').fetch();
    for (const project of projects) {
      routes.push(`projects/${project.slug}`);
    }
  }
  return routes;
}


const nuxtConfig = {

  publicRuntimeConfig: config,

  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: `home -- ${config.name}`,
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: config.strings.en_US.hero.description },
      { name: 'title', content: `${config.name} | friendly neighborhood developer` },
      { name: 'author', content: config.name },
      { property: 'og:type', content: 'website'},
      { property: 'og:url', content: config.social },
      { property: 'og:title', content: `${config.name} | friendly neighborhood developer` },
      { property: 'og:description', content: config.strings.en_US.hero.description },
      { property: 'og:image', content: `${config.image}` },

      { property: 'twitter:card', content: `${config.image}` },
      { property: 'twitter:url', content: `${config.domain}`},
      { property: 'twitter:title', content: `${config.name} | friendly neighborhood developer` },
      { property: 'twitter:description', content: config.strings.en_US.hero.description },
      { property: 'twitter:image', content: `${config.image}` },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://rsms.me/inter/inter.css'}
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'aos/dist/aos.css',
    'github-calendar/dist/github-calendar-responsive.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/vuetyper.js', ssr: false},
    { src: '~/plugins/directives.js', ssr: false},
    { src: '~/plugins/aos.js', ssr: false},
    { src: '~/plugins/vueGtag.js', ssr: false},
    { src: '~/plugins/vueClapButton.js', ssr: false},
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: [
    '@/components',
    '@/components/home',
    '@/components/logos',
    '@/components/blog',
    '@/components/projects',
  ],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/dotenv',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxt/content',
    '@nuxtjs/robots',
    'nuxt-i18n',
    '@nuxtjs/pwa',
    '@nuxtjs/toast',
    '@nuxtjs/sitemap'
  ],

  pwa: {
    icon: {
      fileName: 'favicon.ico'
    }
  },

  sitemap: {
    hostname: `https://${config.domain}`,
    routes: createSitemapRoutes
  },

  toast: {
    position: 'bottom-center'
  },

  router: {
    middleware: []
  },

  i18n: {
    lazy: true,
    langDir: 'lang/',
    locales: [
      {code: 'en', name: 'English', file: 'en_US.js'}
    ],
    defaultLocale: 'en',
    vueI18n: {
      fallbackLocale: 'en',
    },
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      onlyOnRoot: true,  // recommended
    }
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {
    liveEdit: true,
    dir: 'content',
    markdown: {
      prism: {
        theme: 'prism-themes/themes/prism-atom-dark.css'
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    splitChunks: {
      layout: true
    },
  },

  tailwindcss: {
    jit: true
  },

  loadingIndicator: {
    name: config.loadingIndicator.name || 'chasing-dots',
    color: '#fd2d78',
    background: '#212324'
  },

  loading: {
    color: '#fd2d78',
    height: '1px',
    throttle: 0
  },

  hooks: {
    'content:file:beforeInsert': (document) => {
      if (document.extension === '.md') {
        const { text } = require('reading-time')(document.text)

        document.readingTime = text
      }
    }
  }
}

if (config.firebase.enabled) {
  nuxtConfig.modules.unshift('@nuxtjs/firebase')
  nuxtConfig.router.middleware.push('auth')
  nuxtConfig.firebase = {
    config: {
      apiKey: process.env.API_KEY,
      authDomain: process.env.AUTH_DOMAIN,
      projectId: process.env.PROJECT_ID,
      storageBucket: process.env.STORAGE_BUCKET,
      messagingSenderId: process.env.MESSAGING_SENDER_ID,
      appId: process.env.APP_ID,
      measurementId: process.env.MEASUREMENT_ID
    },
    services: {
      auth: {
        persistence: 'local',
        initialize: {
          onAuthStateChangedAction: 'authAction',
          subscribeManually: false
        },
        ssr: false,
      },
      firestore: true
    }
  }
}

if (config.googleAnalyticsV4.enabled) {
  nuxtConfig.buildModules.unshift('@nuxtjs/google-analytics')
  nuxtConfig.googleAnalytics = {
    id: config.googleAnalyticsV4.id
  }
}

if (config.plausibleAnalytics.enabled) {
  nuxtConfig.modules.unshift('vue-plausible')
  nuxtConfig.plausible = {
    ...config.plausibleAnalytics
  }
  nuxtConfig.router.middleware.push('analytics')
}

export default nuxtConfig
