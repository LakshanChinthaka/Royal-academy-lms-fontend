/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {

    extend: {
      "sm":"640px",
      "md":"768px",
      "lg":"1024px",
      "xl":"1280px",

      "c-md":"1270px",
      "c-sm":"530px"
     },
  },
  plugins: [ 
    require('tailwind-scrollbar')
  ],
}