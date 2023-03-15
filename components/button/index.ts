import { App } from 'vue';
import Button from './src/button.vue';
import './style/button.less';

export {
  Button
};

export default {
  install(app: App) {
    app.component(Button.name, Button);
  }
};
