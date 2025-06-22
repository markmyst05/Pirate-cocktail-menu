import React from 'react';
import NavBar from './components/NavBar';

function App() {
  return (
    <div className="min-h-screen bg-parchment">
      <NavBar />
      <main className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-4xl font-pirate text-rum mb-4">
            Welcome to Captain's Tavern
          </h1>
          <p className="text-lg text-sea">
            Ahoy matey! Welcome aboard our digital tavern.
          </p>
        </div>
      </main>
    </div>
  );
}

export default App;