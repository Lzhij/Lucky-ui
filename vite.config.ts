import { defineConfig } from 'vite';
import vueJsxPlugin from '@vitejs/plugin-vue-jsx';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  server: {
    open: true,
    port: 9999
  },
  plugins: [
    vue(),
    vueJsxPlugin()
  ]
});
