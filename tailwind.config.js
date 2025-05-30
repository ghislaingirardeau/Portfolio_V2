/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    borderColor: (theme) => ({
      ...theme('colors'),
      DEFAULT: theme('colors.gray.300', 'currentColor'),
      secondary: '#005264',
      ['dark-primary']: '#1ed3f7',
    }),
    extend: {
      backgroundImage: {
        space: "url('/public/space.jpg')",
        electricity: "url('/public/images/2.jpg')",
      },
    },
    rotate: {
      20: '20deg',
    },
  },
  plugins: [],
}
