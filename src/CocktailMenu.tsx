import React, { useState, useEffect } from 'react';
import { pirateify } from './utils/pirateify';

type Cocktail = {
  name: string;
  ingredientsPirate: string;
  ingredientsNormal: string;
};

function useTypewriter(text: string, speed = 40) {
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    setDisplayed('');
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(prev => prev + text[i]);
      i++;
      if (i >= text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [text]);

  return displayed;
}

export default function CocktailMenu() {
  const [cocktails, setCocktails] = useState<Cocktail[]>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('cocktails');
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch {}
      }
      const defaultCocktails = [
        {
          name: 'Negroni',
          ingredientsPirate: 'a splash o’ th’ juniper grog sea, sailor’s silk winds, n’ crimson cannonfire',
          ingredientsNormal: 'Gin, Vermouth, Campari',
        },
      ];
      localStorage.setItem('cocktails', JSON.stringify(defaultCocktails));
      return defaultCocktails;
    }
    return [];
  });

  const [name, setName] = useState('');
  const [ingNormal, setIngNormal] = useState('');
  const [toast, setToast] = useState('');
  const [showMenu, setShowMenu] = useState(true);

  const piratePreview = useTypewriter(pirateify(ingNormal));

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cocktails', JSON.stringify(cocktails));
    }
  }, [cocktails]);

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !ingNormal.trim()) return;
    const ingPirate = pirateify(ingNormal);
    setCocktails([
      ...cocktails,
      {
        name: name.trim(),
        ingredientsPirate: ingPirate,
        ingredientsNormal: ingNormal.trim(),
      },
    ]);
    setName('');
    setIngNormal('');
    setToast('☠️ Aye! Added to the hold!');
    setTimeout(() => setToast(''), 2000);
  };

  const remove = (index: number) => {
    const updated = cocktails.filter((_, i) => i !== index);
    setCocktails(updated);
    setToast('💀 Drink tossed overboard!');
    setTimeout(() => setToast(''), 2000);
  };

  return (
    <div className="p-6 font-pirate text-rum">
      <form onSubmit={add} className="flex flex-col gap-4 mb-6 max-w-3xl mx-auto">
        <input
          className="border px-4 py-2 rounded"
          placeholder="Name o' the Grog"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input
          className="border px-4 py-2 rounded"
          placeholder="What's in it, matey? (Normal ingredients)"
          value={ingNormal}
          onChange={e => setIngNormal(e.target.value)}
        />
        {ingNormal && (
          <p className="text-yellow-800 italic text-sm">
            🏴‍☠️ Arrr! Becomes: <span className="font-bold">{piratePreview}</span>
          </p>
        )}
        <button
          type="submit"
          className="bg-yellow-600 text-white px-4 py-2 rounded"
        >
          ⚓ Add Potion
        </button>
      </form>

      {toast && (
        <p className="text-center text-green-700 font-bold mb-4">{toast}</p>
      )}

      <div className="text-center mb-6">
        <button
          onClick={() => setShowMenu(prev => !prev)}
          className="bg-blue-500 text-white px-6 py-2 rounded shadow-md hover:bg-blue-600 transition"
        >
          {showMenu ? 'Hide Captain’s Menu 🫥' : 'Show Captain’s Menu ☠️'}
        </button>
      </div>

      {showMenu && (
        <section
          className="relative border-[6px] border-yellow-700 shadow-2xl rounded-3xl p-8 max-w-3xl mx-auto font-pirate text-rum bg-cover bg-center"
          style={{ backgroundImage: "url('/vintage-paper-texture.jpg')" }}
        >
          <div className="absolute -top-14 left-1/2 transform -translate-x-1/2">
            <img
              src="/pirate-logo.png"
              alt="Pirate Logo"
              className="w-24 h-24 rounded-full border-4 border-yellow-800 shadow-lg bg-yellow-200"
            />
          </div>

          <h2 className="text-4xl mt-12 mb-6 text-yellow-900 font-extrabold text-center tracking-widest underline decoration-wavy decoration-yellow-800">
            ☠️ Captain’s Menu ☠️
          </h2>

          <ul className="space-y-5">
            {cocktails.map((c, i) => (
              <li
                key={i}
                className="bg-transparent border-none p-4 hover:scale-[1.02] transition-all"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-2xl font-bold text-yellow-800 mb-1">🍹 {c.name}</p>
                    <p className="italic text-gray-800">📜 Pirate Brew: {c.ingredientsPirate}</p>
                    <p className="text-gray-700">🧾 Translation: {c.ingredientsNormal}</p>
                  </div>
                  <button
                    onClick={() => remove(i)}
                    className="text-red-700 hover:text-red-900 font-bold text-xl"
                  >
                    ❌
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}