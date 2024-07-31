/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        "main-bg": "#e2dcd8",
        "main-text": "#121214",
        secondary: {
          light: "#A49F9D",
          DEFAULT: "#837F7C",
          dark: "#656260",
        },
      },
    },
  },
  plugins: [],
};
