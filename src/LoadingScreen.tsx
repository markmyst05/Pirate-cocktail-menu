import React from 'react';

export default function Loading() {
  return (
    <div
      className="relative flex flex-col items-center justify-center h-screen w-screen font-pirate bg-cover bg-center overflow-hidden"
      style={{
        backgroundImage: "url('/images/treasure-map.jpg')",
        backgroundColor: '#f8f1dc' // fallback parchment tone
      }}
    >
      {/* Soft parchment blend over the map */}
      <div className="absolute inset-0 bg-parchment opacity-30 mix-blend-multiply z-0 pointer-events-none" />

      {/* Dark vignette around edges */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-transparent to-black/30 z-0 pointer-events-none" />

      {/* Arched Header */}
      <svg width="300" height="100" viewBox="0 0 300 100" className="mb-4 z-10">
        <path id="curve" d="M10,90 Q150,10 290,90" fill="transparent" />
        <text width="300">
          <textPath
            href="#curve"
            startOffset="50%"
            textAnchor="middle"
            className="text-2xl fill-rum"
          >
            The Drunken Parrot
          </textPath>
        </text>
      </svg>

      {/* Spinning Coin */}
      <img
        src="/images/gold-coin.png"
        alt="Spinning Coin"
        className="w-24 h-24 animate-spin-slow z-10"
      />
    </div>
  );
}