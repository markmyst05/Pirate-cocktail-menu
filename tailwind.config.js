module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        pirate: ['"Pirata One"', 'cursive'],
      },
      colors: {
        parchment: '#f8f1dc',
        treasure: '#d4af37',
        bloodred: '#7c0a02',
        rum: '#3e2723',
        sea: '#0077b6',
      },
      animation: {
        'spin-slow': 'spin 2s linear infinite',
      }
    }
  },
  plugins: [],
}