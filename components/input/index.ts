import { App } from 'vue';
import Input from './src/input.vue';
import './style/index';

export default {
  install(app: App) {
    app.component(Input.name, Input);
  }
};

export type { InputInstance } from './src/instance';
