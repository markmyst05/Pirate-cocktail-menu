import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/Pirate-cocktail-menu/', // match your GitHub repo name
  plugins: [react()],
});