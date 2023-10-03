/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {},
    fontFamily: {
      sans: ["Montreal", "sans-serif"],
      diatype: ["ABC Diatype Light", "sans-serif"],
    },
  },
  plugins: [],
};
