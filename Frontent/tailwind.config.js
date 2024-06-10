/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    screens:{
      'xs': '480px',     // Custom small breakpoint
      'sm': '640px',     // Default small breakpoint
      'md': '768px',     // Default medium breakpoint
      'lg': '1024px',    // Default large breakpoint
      'xl': '1280px',    // Default extra large breakpoint
      '2xl': '1536px',   // Default 2x extra large breakpoint
      'custom': '900px', // Custom breakpoint
    }
  },
  plugins: [],
}

