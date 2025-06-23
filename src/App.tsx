import React, { useState, useEffect } from 'react';
import CocktailMenu from './CocktailMenu';
import LoadingScreen from './LoadingScreen';
import './styles.css';

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <LoadingScreen />;

  return (
    <div className="relative min-h-screen bg-[url('/images/treasure-map.jpg')] bg-cover bg-center text-sea font-pirate">
      {/* Burned edge overlay */}
      <img
        src="/images/burned-edges.png"
        alt="Burned edges"
        className="pointer-events-none absolute inset-0 w-full h-full object-cover z-10"
      />

      {/* Main content */}
      <div className="relative z-20">
        <header className="text-center py-12">
          <h1 className="text-5xl text-rum drop-shadow-lg">🏴‍☠️ The Drunken Parrot</h1>
          <p className="mt-2 italic text-lg text-black">Sail in for a legendary sip...</p>
        </header>

        <main className="max-w-4xl mx-auto px-4 relative">
          <div className="absolute bottom-4 left-4 text-4xl rotate-[15deg] opacity-30">☠️</div>
          <CocktailMenu />
        </main>

        <footer className="text-center py-8 text-sm text-sea/80 italic">
          © 1725 - The Drunken Parrot Tavern. All Rights Reserved.
        </footer>
      </div>
    </div>
  );
}