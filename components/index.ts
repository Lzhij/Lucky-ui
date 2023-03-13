import type { App } from 'vue';
import Button from './button';
import './icon.less';

export default {
  install(app: App) {
    app.use(Button);
  }
};
