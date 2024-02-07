/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: ["night", "dark","luxury", "cupcake", "dim","retro"],
  },
  plugins: [require("daisyui")],
}