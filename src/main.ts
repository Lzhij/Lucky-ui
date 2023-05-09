import { createApp } from 'vue';
import App from './App.vue';
import LuckyUI from '../components';

const app = createApp(App);

app.use(LuckyUI).mount('#app');
