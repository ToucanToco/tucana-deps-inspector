import { createApp } from "vue";
import App from "./App.vue";

const app = createApp(App);
app.mount("#app");

if (import.meta.hot) {
  import.meta.hot.accept();
  import.meta.hot.dispose(() => {
    app.unmount();
  });
}
