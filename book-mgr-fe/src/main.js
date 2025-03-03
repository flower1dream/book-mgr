import { createApp } from 'vue';
import App from './App';
import router from './router';
import store from './store';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css'; // 3.x 版本的 CSS 文件

createApp(App).use(store).use(router).use(Antd).mount('#app');
