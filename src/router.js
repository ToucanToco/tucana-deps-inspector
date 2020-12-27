import { createRouter, createWebHashHistory } from 'vue-router';
import IO from './IO.vue';
import Inspect from './Inspect.vue';
import Range from './Range.vue';
import Circular from './Circular.vue';

export const routes = [
  { path: '/io', name: 'io', component: IO },
  { path: '/inspect', name: 'inspect', component: Inspect },
  { path: '/range', name: 'range', component: Range },
  { path: '/circular', name: 'circular', component: Circular },
];

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    ...routes,
    { path: '/:pathMatch(.*)*', redirect: '/io' },
  ],
});
