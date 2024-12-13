import { defineConfig } from 'vite'; //viteの設定を定義する
import react from '@vitejs/plugin-react'; //viteでReactを使用するための環境構築が出来る

export default defineConfig({
  plugins: [react()],
  server: {
    //サーバ起動時に自動的にブラウザも開く設定
    open: true,
  },
  build: {
    outDir: '../back/dist',
  },
});
