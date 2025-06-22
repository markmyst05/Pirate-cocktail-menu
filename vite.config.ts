// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: [
      'f52c734e-ec2a-48ad-8ed5-3d1e9e30ff37-00-246a8uv140uv3.kirk.replit.dev'
    ]
  }
});