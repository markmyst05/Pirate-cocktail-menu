import React from 'react';

interface CocktailCardProps {
  name: string;
  ingredients: string[];
  description: string;
  image: string;
}

export default function CocktailCard({ name, ingredients, description, image }: CocktailCardProps) {
  return (
    <div className="bg-parchment border-4 border-rum rounded-2xl shadow-xl p-4 flex flex-col items-center text-sea font-pirate transition transform hover:scale-105 hover:shadow-2xl max-w-sm">
      <img
        src={image}
        alt={name}
        className="rounded-xl mb-4 border-4 border-treasure w-full h-48 object-cover"
      />
      <h2 className="text-2xl mb-2 text-rum">{name}</h2>
      <ul className="text-left list-disc list-inside mb-2 text-sea">
        {ingredients.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <p className="text-sm italic text-rum">{description}</p>
    </div>
  );
}