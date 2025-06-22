import React from 'react';

export default function NavBar() {
  return (
    <nav className="bg-rum text-parchment p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center font-pirate text-2xl">
        <span>☠️ Captain’s Tavern</span>
        <ul className="flex space-x-6 text-lg">
          <li className="hover:text-treasure transition">Home</li>
          <li className="hover:text-treasure transition">Drinks</li>
          <li className="hover:text-treasure transition">Crew</li>
        </ul>
      </div>
    </nav>
  );
}