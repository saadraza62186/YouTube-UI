import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite configuration with proxy
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8800',
        changeOrigin: true,
        // The rewrite is unnecessary since you want to keep /api in the path
        // If your backend expects /api in the URL, you can remove this line
      },
    },
  },
});