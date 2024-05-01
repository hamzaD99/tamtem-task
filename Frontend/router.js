import { createRouter, createWebHistory } from 'vue-router';
import ListingPage from './src/views/ListingPage.vue'
import ProductPage from './src/views/ProductPage.vue';
import EditProductPage from './src/views/EditProductPage.vue';
import LoginPage from './src/views/LoginPage.vue'
import { isGuest, isLoggedin } from './middleware'

const routes = [
  {
    path: '/',
    name: 'ListingPage',
    component: ListingPage,
    meta: { title: 'Tamatem Plus - Home' }
  },
  {
    path: '/product/:id',
    name: 'ProductPage',
    component: ProductPage,
    meta: { title: 'Tamatem Plus - Product Page' }
  },
  {
    path: '/product/:id/edit',
    name: 'EditProductPage',
    component: EditProductPage,
    meta: { title: 'Tamatem Plus - Edit Product Page', middleware: isLoggedin }
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: LoginPage,
    meta: { title: 'Tamatem Plus - Login Page', middleware: isGuest }
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/',
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