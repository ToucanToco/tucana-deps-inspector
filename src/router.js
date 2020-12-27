import { createRouter, createWebHashHistory } from 'vue-router';
import IO from './IO.vue';
import Inspect from './Inspect.vue';

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/io', component: IO },
    { path: '/inspect', component: Inspect },
    { path: '/:pathMatch(.*)*', redirect: '/io' },
  ],
});
