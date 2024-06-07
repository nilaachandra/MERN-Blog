/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        light: {
          bg: "#ffffff",
          text: "#000000",
        },
        dark: {
          bg: "#000000",
          text: "#ffffff",
        },
      },
    },
  },
  plugins: [],
};
