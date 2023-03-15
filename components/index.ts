import type { App } from 'vue';
import Button from './button';
import Input from './input';
import './icon.less';

export default {
  install(app: App) {
    app.use(Button);
    app.use(Input);
  }
};
