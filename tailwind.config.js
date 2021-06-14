const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  purge: [
    './src/**/*.html',
    './src/**/*.vue',
  ],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'black': '#12151E',
        'hot-pink': '#fd2d78',
        'gray-900': '#18191a',
        'gray-800': '#212324',
        'gray-700': '#2F3133',
        'gray-600': '#404345',
        'gray-500': '#55585A',
        'gray-400': '#797B7C',
        'gray-300': '#A7A8A8',
        'gray-200': '#D3D4D4',
        'gray-100': '#ECECEC',
        'gray-50': '#F4F4F4',
      },
      typography: (theme) => ({
        dark: {
          css: [
            {
              color: theme('colors.gray.500'),
              '[class~="lead"]': {
                color: theme('colors.gray.300'),
              },
              a: {
                color: theme('colors.indigo.500'),
              },
              strong: {
                color: theme('colors.gray.200'),
              },
              'ol > li::before': {
                color: theme('colors.gray.400'),
              },
              'ul > li::before': {
                backgroundColor: theme('colors.gray.600'),
              },
              hr: {
                borderColor: theme('colors.gray.700'),
              },
              blockquote: {
                color: theme('colors.gray.200'),
                borderLeftColor: theme('colors.gray.600'),
              },
              h1: {
                color: theme('colors.gray.100'),
              },
              h2: {
                color: theme('colors.gray.100'),
              },
              h3: {
                color: theme('colors.gray.100'),
              },
              h4: {
                color: theme('colors.gray.100'),
              },
              'figure figcaption': {
                color: theme('colors.gray.400'),
              },
              thead: {
                color: theme('colors.white'),
                borderBottomColor: theme('colors.gray.400'),
              },
              'tbody tr': {
                borderBottomColor: theme('colors.gray.600'),
              },
            },
          ],
        },
      }),
      fontFamily: {
        sans: ['Poppins', 'sans-serif', ...defaultTheme.fontFamily.sans],
        body: ['"Londrina Solid"', 'sans-serif']
      },
    },
  },
  variants: {
    extend: {
      fill: ['hover', 'focus'],
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),
    require("@tailwindcss/typography"),
    require('@tailwindcss/line-clamp')
  ],
}
