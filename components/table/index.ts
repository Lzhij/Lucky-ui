import { App } from 'vue';
import Table from './src/table/index.vue';
import './style';

export default {
  install(app: App) {
    app.component(Table.name, Table);
  }
};
