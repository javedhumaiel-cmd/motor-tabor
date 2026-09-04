/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0a0a0a',
        paper: '#f7f6f3',
        stone: {
          50: '#faf9f7',
          100: '#f2f0ec',
          200: '#e4e0d8',
          300: '#cfc9bd',
          400: '#a89f8e',
          500: '#8a8172',
          600: '#6f6759',
          700: '#565044',
          800: '#3a352d',
          900: '#211e18',
        },
        gold: '#b08d57',
      },
      fontFamily: {
        display: ['"Fraunces"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.05em',
      },
    },
  },
  plugins: [],
}
