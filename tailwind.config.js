const { fontFamily } = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

module.exports = {
  mode: "jit",
  darkMode: "class",
  purge: ["./public/**/*.html", "./src/**/*.{astro,js,ts}"],
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/line-clamp"),
    require("daisyui"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
