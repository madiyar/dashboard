/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        my: {
          blue: '#233D82',
          black: '#2B2B2B',
          body: '#E9F5FF',
        }
      }
    },
  },
  plugins: [],
}

