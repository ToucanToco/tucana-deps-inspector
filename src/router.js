import { createRouter, createWebHashHistory } from 'vue-router';
import IO from './IO.vue';
import Inspect from './Inspect.vue';
import Range from './Range.vue';

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/io', component: IO },
    { path: '/inspect', component: Inspect },
    { path: '/range', component: Range },
    { path: '/:pathMatch(.*)*', redirect: '/io' },
  ],
});
