import React, { useState } from 'react';

export default function CocktailMenu() {
  const [cocktails, setCocktails] = useState([
    { name: 'Negroni', ingredients: 'Gin, Vermouth, Campari' },
  ]);
  const [name, setName] = useState('');
  const [ing, setIng] = useState('');
  const [toast, setToast] = useState('');

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !ing) return;
    setCocktails([...cocktails, { name, ingredients: ing }]);
    setName('');
    setIng('');
    setToast('☠️ Aye! Added to the hold!');
    setTimeout(() => setToast(''), 2000);
  };

  return (
    <div className="space-y-6">
      <form onSubmit={add} className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <input
          className="border-2 border-brass bg-smoke p-2 rounded-lg w-full sm:w-1/3 font-serif placeholder:text-brass"
          placeholder="Name o' the Grog"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="border-2 border-brass bg-smoke p-2 rounded-lg w-full sm:w-1/2 font-serif placeholder:text-brass"
          placeholder="What’s in it, matey?"
          value={ing}
          onChange={(e) => setIng(e.target.value)}
        />
        <button className="bg-treasure text-rum font-bold px-4 py-2 rounded-lg shadow-md hover:bg-yellow-400 transition">
          ⚓ Add Potion
        </button>
      </form>

      {toast && (
        <p className="text-center text-brass text-lg font-semibold animate-bounce">{toast}</p>
      )}

      <ul className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {cocktails.map((c, i) => (
          <li
            key={i}
            className="bg-parchment border-2 border-brass rounded-xl p-4 shadow-lg font-serif text-ocean backdrop-blur-sm"
          >
            <h2 className="text-xl text-rum font-pirate mb-1">🍹 {c.name}</h2>
            <p className="italic text-seafoam">{c.ingredients}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}