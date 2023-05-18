import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { resolve } from 'path';

export default defineConfig({
  base: './',
  plugins: [
    vue(),
    vueJsx()
  ],
  server: {
    port: 3000,
    open: true,
    host: '0.0.0.0'
  },
  build: {
    rollupOptions: {
      output: {
        chunkFileNames: 'static/js/[name].js',
        entryFileNames: 'static/js/[name].js',
        assetFileNames: 'static/[ext]/[name].[ext]'
      }
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@lucky-ui/com': resolve(__dirname, './components')
    }
  }
});
