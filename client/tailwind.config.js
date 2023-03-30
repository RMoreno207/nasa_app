/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'hero-pattern': "url('/img/hero-pattern.svg')",
        'footer-texture': "url('/img/footer-texture.png')",
      },
      minHeight: {
        '1/2': '100%',
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'marker': ['Permanent Marker', 'sans-serif']
      }
    },
  },
  plugins: [],
}