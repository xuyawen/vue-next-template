import { createApp } from 'vue'
import router, { setupRouter } from '/@/router';
import App from './App.vue'
import 'ant-design-vue/dist/antd.css';
import '/@/design/index.less';

const app = createApp(App);

setupRouter(app);

router.isReady().then(() => {
  app.mount('#app');
});
