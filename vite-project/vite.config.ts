import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/Pirata-cocktail-menu/', // ← set this to your actual repo name
  plugins: [react()],
})