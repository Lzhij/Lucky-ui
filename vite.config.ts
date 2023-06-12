import { defineConfig } from 'vite';
import vueJsxPlugin from '@vitejs/plugin-vue-jsx';
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';

export default defineConfig({
  server: {
    open: true,
    port: 9999
  },
  plugins: [
    vue(),
    vueJsxPlugin(),
    Components({
      resolvers: [AntDesignVueResolver()]
    })
  ]
});
