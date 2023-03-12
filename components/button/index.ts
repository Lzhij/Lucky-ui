import { App } from 'vue';
import Button from './src/button.vue';
import './style/index.less';

export {
  Button
};

export default {
  install(app: App) {
    app.component(Button.name, Button);
  }
};

