import { createRouter, createWebHistory } from 'vue-router'

const isAuthenticated = () => {
  return localStorage.getItem('accessToken') !== null;
};

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      component: () => import('@/components/LoginComponent.vue')
    },

    {
      path: '/admin',
      component: () => import('@/Page/AdminPage.vue'),
      beforeEnter: (to, from, next) => {
        if (!isAuthenticated()) {
          next('/login');
        } else {
          next();
        }
      }
    },
    {
      path: '/admin/categoriy',
      name: 'category',
      component: () => import('@/components/Categoriy.vue')
    }
  ],
})

export default router
