import React, { useState, useEffect } from 'react'; import { pirateify } from './utils/pirateify';

// Debounce hook function useDebounce<T>(value: T, delay = 300): T { const [debounced, setDebounced] = useState(value); useEffect(() => { const handler = setTimeout(() => setDebounced(value), delay); return () => clearTimeout(handler); }, [value, delay]); return debounced; }

// Types type Cocktail = { name: string; ingredientsPirate: string; ingredientsNormal: string; };

export default function CocktailMenu() { const [cocktails, setCocktails] = useState<Cocktail[]>(() => { if (typeof window !== 'undefined') { const stored = localStorage.getItem('cocktails'); if (stored) { try { return JSON.parse(stored); } catch {} } const defaultCocktails = [ { name: 'Negroni', ingredientsPirate: "a splash o' th' juniper juice, sweet loot, n' crimson cannonfire", ingredientsNormal: 'Gin, Vermouth, Campari', }, ]; localStorage.setItem('cocktails', JSON.stringify(defaultCocktails)); return defaultCocktails; } return []; });

const [name, setName] = useState(''); const [ingNormal, setIngNormal] = useState(''); const [toast, setToast] = useState(''); const [showMenu, setShowMenu] = useState(true);

const debouncedIng = useDebounce(ingNormal, 300); const piratePreview = pirateify(debouncedIng);

useEffect(() => { if (typeof window !== 'undefined') { localStorage.setItem('cocktails', JSON.stringify(cocktails)); } }, [cocktails]);

function generatePDF() { const element = document.getElementById('menu-section'); if (!element) return;

import('html2pdf.js').then(({ default: html2pdf }) => {
  html2pdf()
    .set({
      margin: 0,
      filename: 'captains-menu.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    })
    .from(element)
    .save();
});

}

const add = (e: React.FormEvent) => { e.preventDefault(); const ingPirate = pirateify(ingNormal); if (!name.trim() || !ingNormal.trim()) return; setCocktails([ ...cocktails, { name: name.trim(), ingredientsPirate: ingPirate, ingredientsNormal: ingNormal.trim(), }, ]); setName(''); setIngNormal(''); setToast('☠️ Aye! Added to the hold!'); setTimeout(() => setToast(''), 2000); };

const remove = (index: number) => { const updated = cocktails.filter((_, i) => i !== index); setCocktails(updated); setToast('💀 Drink tossed overboard!'); setTimeout(() => setToast(''), 2000); };

return ( <div className="p-6 font-pirate text-rum"> {/* Form */} <form onSubmit={add} className="flex flex-col gap-4 mb-6 max-w-3xl mx-auto no-print"> <input className="border px-4 py-2 rounded" placeholder="Name o' the Grog" value={name} onChange={e => setName(e.target.value)} /> <input className="border px-4 py-2 rounded" placeholder="What's in it, matey? (Normal ingredients)" value={ingNormal} onChange={e => setIngNormal(e.target.value)} /> {ingNormal && ( <p className="text-yellow-800 italic text-sm"> 🏴‍☠️ Arrr! Becomes: <span className="font-bold text-blue-600">{piratePreview}</span> </p> )} <button className="bg-yellow-600 text-white px-4 py-2 rounded"> ⚓ Add Potion </button> </form>

{/* Toast */}
  {toast && (
    <p className="text-center text-green-700 font-bold mb-4 no-print">{toast}</p>
  )}

  {/* Toggle & PDF Button */}
  <div className="text-center mb-6 flex flex-col items-center gap-4 no-print">
    <button
      onClick={() => setShowMenu(prev => !prev)}
      className="bg-blue-500 text-white px-6 py-2 rounded shadow-md hover:bg-blue-600 transition"
    >
      {showMenu ? "Hide Captain's Menu 🫥" : "Show Captain's Menu ☠️"}
    </button>

    <button
      onClick={generatePDF}
      className="bg-green-600 text-white px-4 py-2 rounded"
    >
      📜 Download Captain's Menu (PDF)
    </button>
  </div>

  {/* Menu */}
  {showMenu && (
    <section
      id="menu-section"
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
        ☠️ Captain's Menu ☠️
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
                <p className="italic text-blue-700">📜 Pirate Brew: {c.ingredientsPirate}</p>
                <p className="text-blue-600">🧾 Translation: {c.ingredientsNormal}</p>
              </div>
              <button
                onClick={() => remove(i)}
                className="text-red-700 hover:text-red-900 font-bold text-xl no-print"
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

); }

