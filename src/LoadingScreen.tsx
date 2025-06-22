import React, { useState, useEffect } from 'react';
import PirateChest from './PirateChest';
import coin from './assets/coin.png';

export default function LoadingScreen() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const intv = setInterval(() => setOpen(o => !o), 800);
    return () => clearInterval(intv);
  }, []);

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-black text-white overflow-hidden">
      <div className="absolute bottom-16 flex flex-col items-center">
        <div className="relative w-24 h-24">
          {[...Array(12)].map((_, i) => (
            <img key={i} src={coin} className="absolute w-6 h-6 animate-coin" style={{
              left: `${50 + (Math.random() * 100 - 50)}%`,
              animationDelay: `${Math.random() * 2}s`
            }} />
          ))}
        </div>
        <PirateChest open={open} />
      </div>
      <div className="z-20 text-center">
        <h1 className="text-4xl">Treasure Awaits...</h1>
        <p className="text-yellow-300 italic">Loading yer loot...</p>
      </div>
    </div>
  );
}