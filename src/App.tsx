/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        treasure: '#FFD700',
        rum: '#8B4513',
        parchment: '#fef08a',
        sea: '#1E3A8A',
        seafoam: '#a3c7c7',
        brass: '#bfa46f',
        bloodred: '#661111',
        ocean: '#0a2239',
        smoke: '#f5f5dc',
      },
      fontFamily: {
        pirate: ['"Pirata One"', 'cursive'],
      },
      backgroundImage: {
        'vintage-paper': "url('/vintage-paper-texture.jpg')", // This image must be in /public
      },
      keyframes: {
        coin: {
          "0%": { transform: "translateY(0) scale(1)", opacity: "1" },
          "100%": { transform: "translateY(-300px) scale(0.5)", opacity: "0" },
        },
      },
      animation: {
        coin: "coin 2s ease-out forwards",
      },
    },
  },
  plugins: [],
};