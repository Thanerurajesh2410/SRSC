/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          light: '#F9E79F',
          DEFAULT: '#D4AF37',
          dark: '#9A7D0A',
        },
        saffron: {
          light: '#FFB74D',
          DEFAULT: '#FF9933',
          dark: '#E65100',
        },
        sacred: {
          crimson: '#900C3F',
          maroon: '#4A0E17',
          dark: '#2B070C',
        }
      },
      fontFamily: {
        heading: ['Cinzel', 'serif'],
        telugu: ['Noto Sans Telugu', 'sans-serif'],
        body: ['Outfit', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
