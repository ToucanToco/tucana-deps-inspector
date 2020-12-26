import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

const app = createApp(App)
  .use(router)
  .mount('#app');

if (import.meta.hot) {
  import.meta.hot.accept();
  import.meta.hot.dispose(() => {
    app.unmount();
  });
}
