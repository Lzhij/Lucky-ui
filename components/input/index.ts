import { App } from 'vue';
import Input from './src/input.vue';
import './style/input.less';

export default {
  install(app: App) {
    app.component(Input.name, Input);
  }
};
