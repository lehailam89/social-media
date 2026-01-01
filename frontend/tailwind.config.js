/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'fb-blue': '#1877f2',
        'fb-green': '#42b72a',
      },
    },
  },
  plugins: [],
}
