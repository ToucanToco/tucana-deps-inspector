import { createRouter, createWebHashHistory } from 'vue-router';
import IO from './IO.vue';

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/io', component: IO },
    { path: '/:pathMatch(.*)*', redirect: '/io' },
  ],
});
