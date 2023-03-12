import { App } from 'vue';
import Button from './src/index.vue';
import './style/index.less';

export default {
  install(app: App) {
    app.component(Button.name, Button);
  }
};

