import { createRouter, createWebHashHistory } from 'vue-router';

export const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/home/index.vue'),
    meta: {
      title: '首页',
      isHide: true
    }
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes
});

export default router;
