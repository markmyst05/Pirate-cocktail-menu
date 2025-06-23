<div
  className="bg-cover bg-center bg-no-repeat p-6 rounded-2xl shadow-lg mb-6"
  style={{ backgroundImage: "url('/images/treasure-map.jpg')" }}
>
  <form onSubmit={add} className="flex flex-col gap-4 z-10 relative">
    <input
      className="rounded px-4 py-2 w-full text-lg"
      placeholder="Name o' the Grog"
      value={name}
      onChange={e => setName(e.target.value)}
    />
    <input
      className="rounded px-4 py-2 w-full text-lg"
      placeholder="What’s in it, matey? (Pirate talk)"
      value={ing}
      onChange={e => setIng(e.target.value)}
    />
    <input
      className="rounded px-4 py-2 w-full text-lg"
      placeholder="Translation (Normal ingredients)"
      value={translation}
      onChange={e => setTranslation(e.target.value)}
    />
    <button className="bg-treasure text-sea font-bold px-4 py-2 rounded hover:bg-gold transition">
      ⚓ Add Potion
    </button>
  </form>

  {/* Toast Message */}
  {toast && (
    <p className="animate-bounce text-center text-rum z-10 mb-4">{toast}</p>
  )}

  {/* Cocktail List */}
  <ul className="space-y-4 z-10 relative">
    {cocktails.map((c, i) => (
      <li
        key={i}
        className="bg-[url('/images/burned-edges.png')] bg-cover bg-center text-rum p-6 rounded-2xl shadow-md relative flex justify-between items-center transition-transform duration-300 hover:scale-[1.02]"
      >
        <div>
          <p className="text-xl font-bold text-treasure mb-1">🍹 {c.name}</p>
          <p className="italic text-ocean">{c.ingredients}</p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-3xl animate-pulse text-bloodred">☓</span>
          <button
            onClick={() => remove(i)}
            className="text-bloodred text-sm font-semibold hover:underline"
          >
            Toss
          </button>
        </div>
      </li>
    ))}
  </ul>
</div>