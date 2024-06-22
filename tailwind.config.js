/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "primary-color": "#7c5e31",
        "secondary-color": "#333",
        "text-color": "#fff"
      },
    }
  },
  plugins: [],
}

