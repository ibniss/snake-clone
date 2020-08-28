const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: ['./index.html', './src/**/*.vue', './src/**/*.ts'],
  },
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  future: {
    removeDeprecatedGapUtilities: true,
  },
  experimental: 'all',
}
