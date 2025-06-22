import React from 'react';
import closed from './assets/chest-closed.png';
import openImg from './assets/chest-open.png';

export default function PirateChest({ open }: { open: boolean }) {
  return (
    <img src={open ? openImg : closed} alt="Chest" className="w-24 h-24 transition-all duration-300" />
  );
}