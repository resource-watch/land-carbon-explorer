/* eslint-disable @typescript-eslint/no-var-requires */
const forms = require('@tailwindcss/forms');

const lineClamp = require('./lib/tailwind/line-clamp');

module.exports = {
  purge: {
    enabled: process.env.NODE_ENV !== 'development',
    content: ['./**/*.ts', './**/*.tsx'],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ['Lato', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
      },
      colors: {
        'rw-pink': '#c32d7b',
        'rw-gray': '#393f44',
        'rw-gray-2': '#717171'
      },
    },
  },
  variants: {
    extend: {
      margin: ['first'],
    },
  },
  plugins: [forms, lineClamp],
};
