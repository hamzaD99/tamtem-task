import { createRouter, createWebHistory } from 'vue-router';
import ListingPage from './src/views/ListingPage.vue'
import ProductPage from './src/views/ProductPage.vue';
import { isLoggedins, isGuest } from './middleware'

const routes = [
  {
    path: '/',
    name: 'ListingPage',
    component: ListingPage,
    meta: { title: 'Tamatem Plus' }
  },
  {
    path: '/product/:id',
    name: 'ProductPage',
    component: ProductPage,
    meta: { title: 'Tamatem Plus - Product Page' }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'Tamatem Plus';
  if (to.meta.middleware) {
    to.meta.middleware({ to, from, next });
  }
  next();
});

export default router;