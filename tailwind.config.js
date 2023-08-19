/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.tsx", "./src/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        background: "#000014",
        gray: {
          200: "#CCCCCC",
          800: "#333333",
        },
        type: {
          grass: "#63BC5A",
          fire: "#FF9D55",
          water: "#5090D6",
          bug: "#91C12F",
          electric: "#F4D23C",
          normal: "#919AA2",
          ground: "#D97845",
          fairy: "#EC8FE6",
          rock: "#C5B78C",
          poison: "#B567CE",
          psychic: "#FA7179",
          steel: "#5A8EA2",
          dragon: "#0B6DC3",
          fighting: "#CE416B",
          dark: "#5A5465",
          ghost: "#5269AD",
          ice: "#73CEC0",
          flying: "#89AAE3",
        },
        gender: {
          female: "#FF7596",
          male: "#2551C4",
        },
      },
      fontFamily: {
        400: "Poppins_400Regular",
        500: "Poppins_500Medium",
        600: "Poppins_600SemiBold",
      },
    },
  },
  plugins: [],
};
