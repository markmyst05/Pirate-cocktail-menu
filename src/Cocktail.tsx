
import React, { useState, useEffect } from 'react';

type Cocktail = {
  name: string;
  ingredients: string;
};

export default function CocktailMenu() {
  const [cocktails, setCocktails] = useState<Cocktail[]>([]);
  const [name, setName] = useState('');
  const [ing, setIng] = useState('');
  const [toast, setToast] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem('cocktails');
    if (stored) {
      setCocktails(JSON.parse(stored));
    } else {
      setCocktails([{ name: 'Negroni', ingredients: 'Gin, Vermouth, Campari' }]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cocktails', JSON.stringify(cocktails));
  }, [cocktails]);

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !ing.trim()) return;
    setCocktails([...cocktails, { name: name.trim(), ingredients: ing.trim() }]);
    setName('');
    setIng('');
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
    <div className="relative p-6 max-w-3xl mx-auto">
      <img
        src="/images/burned-edges.png"
        alt="burned edges"
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-10"
      />

      <form onSubmit={add} className="flex gap-4 mb-6 z-20 relative">
        <input
          placeholder="Name o' the Grog"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input
          placeholder="What’s in it, matey?"
          value={ing}
          onChange={e => setIng(e.target.value)}
        />
        <button className="bg-treasure text-sea px-4 py-2 rounded">⚓ Add Potion</button>
      </form>

      {toast && <p className="animate-bounce text-center text-rum z-20">{toast}</p>}

      <ul className="space-y-3 z-20 relative">
        {cocktails.map((c, i) => (
          <li key={i} className="flex justify-between items-center p-4 bg-parchment rounded shadow relative">
            <div className="flex flex-col">
              <strong className="text-treasure">🍹 {c.name}</strong>
              <em>{c.ingredients}</em>
            </div>
            <div className="flex items-center">
              <span className="stamp-x text-bloodred text-3xl mr-2">☓</span>
              <button onClick={() => remove(i)} className="text-sm text-bloodred hover:underline">Toss</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
