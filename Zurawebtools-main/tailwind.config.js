/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./index.tsx",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./data/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-blue': '#007BFF',
        'brand-cyan': '#00C6FF',
        'brand-green': '#10B981',
        'brand-orange': '#fa7e1e',
      },
    },
  },
  plugins: [],
}
