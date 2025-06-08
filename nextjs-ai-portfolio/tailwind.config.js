/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0a192f',
        secondary: '#112240',
        accent: '#64ffda',
        text: '#ccd6f6',
        textSecondary: '#8892b0',
      },
      fontFamily: {
        mono: ['SF Mono', 'Fira Code', 'Fira Mono', 'monospace'],
        sans: ['Calibre', 'San Francisco', 'SF Pro Text', 'sans-serif'],
      },
    },
  },
  plugins: [],
} 