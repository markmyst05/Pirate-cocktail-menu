<li
  key={i}
  className="relative flex justify-between items-center mb-3 p-4 bg-parchment rounded-xl border-4 border-dotted border-brass shadow font-pirate text-ocean"
>
  {/* Decorative X stamp - moved to a corner container */}
  <div className="absolute -top-3 -right-3 w-10 h-10 pointer-events-none">
    <img
      src="/images/x-stamp.png"
      alt="X marks the spot"
      className="w-full h-full animate-stamp opacity-80"
    />
  </div>

  <div>
    <strong className="text-xl text-rum">🍹 {c.name}</strong>: <em>{c.ingredients}</em>
  </div>

  <button
    onClick={() => remove(i)}
    className="ml-4 text-sm text-bloodred hover:underline z-10"
  >
    ✖ Toss
  </button>
</li>