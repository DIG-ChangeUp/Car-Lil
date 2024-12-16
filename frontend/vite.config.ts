import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:4000',
    },
    //サーバ起動時に自動的にブラウザも開く設定
    open: true,
  },
  build: {
    outDir: '../backend/dist',
  },
});
