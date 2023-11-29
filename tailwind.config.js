/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      maxWidth: {
        'app': '1440px',
      },
      maxHeight: {
        'app': 'calc(100vh - 64px)',
      },
    },
  },
  plugins: [],
}

