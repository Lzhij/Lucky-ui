import { App } from 'vue';
import Button from './src/button.vue';
import ButtonGroup from './src/button_group.vue';
import './style';

export default {
  install(app: App) {
    app.component(Button.name, Button);
    app.component(ButtonGroup.name, ButtonGroup);
  }
};

export type { ButtonInstance, ButtonGroupInstance } from './src/instance';
