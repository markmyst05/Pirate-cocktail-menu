import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import nodePolyfills from 'rollup-plugin-node-polyfills';

export default defineConfig({
  base: '/pirate-cocktail-menu/',
  plugins: [react()],
  resolve: {
    alias: {
      crypto: 'crypto-browserify',
    },
  },
  define: {
    'process.env': {},
    global: 'window',
  },
  build: {
    rollupOptions: {
      plugins: [nodePolyfills()],
    },
  },
});