/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#E65100',
        'primary-dark': '#BF360C',
        'primary-light': '#FFB74D',
        accent: '#FF6F00',
        surface: '#FFFFFF',
        bg: '#FFF8E1',
      },
      fontFamily: {
        sans: ['Noto Sans Kannada', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
