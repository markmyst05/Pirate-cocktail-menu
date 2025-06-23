import React, { useState, useEffect } from 'react';
import { pirateify } from './utils/pirateify';
import html2canvas from 'html2canvas';

// Debounce hook
function useDebounce<T>(value: T, delay = 300): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debounced;
}

type Cocktail = {
  name: string;
  ingredientsPirate: string;
  ingredientsNormal: string;
};

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
          ingredientsPirate: "a splash o' th' juniper juice, sweet loot, n' crimson cannonfire",
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
  const [downloading, setDownloading] = useState(false);
  const debouncedIng = useDebounce(ingNormal, 300);
  const piratePreview = pirateify(debouncedIng);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cocktails', JSON.stringify(cocktails));
    }
  }, [cocktails]);

  const exportPNG = () => {
    if (!showMenu) {
      setShowMenu(true);
      setTimeout(() => actuallyExportPNG(), 100);
    } else {
      actuallyExportPNG();
    }
  };

  const actuallyExportPNG = () => {
    const element = document.getElementById('menu-section');
    if (!element) {
      console.error('❌ Menu section not found');
      setToast("⚠️ Couldn't find the Captain's Menu!");
      setTimeout(() => setToast(''), 2000);
      return;
    }

    setDownloading(true);
    setToast('📸 Capturing your Captain’s Menu...');
    document.body.classList.add('exporting');

    html2canvas(element, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#f8f1dc',
    })
      .then(canvas => {
        const link = document.createElement('a');
        link.download = 'captains-menu.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
        setToast('✅ Captain’s Menu PNG downloaded!');
      })
      .catch(error => {
        console.error('PNG export failed:', error);
        setToast('❌ Failed to download the Captain’s Menu!');
      })
      .finally(() => {
        document.body.classList.remove('exporting');
        setDownloading(false);
        setTimeout(() => setToast(''), 3000);
      });
  };

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !ingNormal.trim()) return;

    setCocktails(prev => [
      ...prev,
      {
        name: name.trim(),
        ingredientsPirate: pirateify(ingNormal.trim()),
        ingredientsNormal: ingNormal.trim(),
      },
    ]);

    setName('');
    setIngNormal('');
    setToast('☠️ Aye! Added to the hold!');
    setTimeout(() => setToast(''), 2000);
  };

  const remove = (index: number) => {
    setCocktails(prev => prev.filter((_, i) => i !== index));
    setToast('💀 Drink tossed overboard!');
    setTimeout(() => setToast(''), 2000);
  };

  return (
    <div className="p-6 font-pirate text-rum">
      {/* Form */}
      <form onSubmit={add} className="flex flex-col gap-4 mb-6 max-w-3xl mx-auto no-print">
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
            🏴‍☠️ Arrr! Becomes: <span className="font-bold text-blue-600">{piratePreview}</span>
          </p>
        )}
        <button className="bg-yellow-600 text-white px-4 py-2 rounded">
          ⚓ Add Potion
        </button>
      </form>

      {/* Toast */}
      {toast && (
        <p className="text-center text-green-700 font-bold mb-4 no-print">{toast}</p>
      )}

      {/* Toggle & PNG Button */}
      <div className="text-center mb-6 flex flex-col items-center gap-4 no-print">
        <button
          onClick={() => setShowMenu(prev => !prev)}
          className="bg-blue-500 text-white px-6 py-2 rounded shadow-md hover:bg-blue-600 transition"
        >
          {showMenu ? "Hide Captain's Menu 🫥" : "Show Captain's Menu ☠️"}
        </button>

        <button
          onClick={exportPNG}
          className="bg-green-600 text-white px-4 py-2 rounded"
          disabled={downloading}
        >
          📸 Download Captain's Menu (PNG)
        </button>
      </div>

      {/* Menu */}
      {showMenu && (
        <section
          id="menu-section"
          className="relative border-[6px] border-yellow-700 shadow-2xl rounded-3xl p-8 max-w-3xl mx-auto font-pirate text-rum bg-cover bg-center"
          style={{ backgroundImage: "url('/vintage-paper-texture.jpg')" }}
        >
          <div className="flex justify-center mb-4">
            <img
              src="/pirate-logo.png"
              alt="Pirate Logo"
              className="w-24 h-24 rounded-full border-4 border-yellow-800 shadow-lg bg-yellow-200"
            />
          </div>

          <h2 className="text-4xl mb-6 text-yellow-900 font-extrabold text-center tracking-widest underline decoration-wavy decoration-yellow-800">
            ☠️ Captain's Menu ☠️
          </h2>

          <ul className="space-y-5">
            {cocktails.map((c, i) => (
              <li key={i} className="bg-transparent border-none p-4 hover:scale-[1.02] transition-all">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-2xl font-bold text-yellow-800 mb-1">🍹 {c.name}</p>
                    <p className="italic text-blue-700">📜 Pirate Brew: {c.ingredientsPirate}</p>
                    <p className="text-blue-600">🧾 Translation: {c.ingredientsNormal}</p>
                  </div>
                  <button
                    onClick={() => remove(i)}
                    className="text-red-700 hover:text-red-900 font-bold text-xl no-print no-export"
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