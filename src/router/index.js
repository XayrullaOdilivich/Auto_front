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
      component: () => import('@/components/Categoriy/Categoriy.vue')
    },
    {
      path: '/admin/categoriy/create',
      name: 'category-create',
      component: () => import('@/components/Categoriy/Create.vue')
    },
    {
      path: '/admin/categoriy/update',
      name: 'category-update',
      component: () => import('@/components/Categoriy/Update.vue')
    },
    {
      path: '/admin/categoriy/get',
      name: 'category-get',
      component: () => import('@/components/Categoriy/Get.vue')
    },
    {
      path: '/admin/categoriy/delete',
      name: 'category-delete',
      component: () => import('@/components/Categoriy/Delete.vue')
    },

    {
      path: '/admin/brand',
      name: 'brand',
      component: () => import('@/components/Brands/Brands.vue')
    },
    {
      path: '/admin/brand/create',
      name: 'brand-create',
      component: () => import('@/components/Brands/Create.vue')
    },
    {
      path: '/admin/brand/update',
      name: 'brand-update',
      component: () => import('@/components/Brands/Update.vue')
    },
    {
      path: '/admin/brand/get',
      name: 'brand-get',
      component: () => import('@/components/Brands/Get.vue')
    },
    {
      path: '/admin/brand/delete',
      name: 'brand-delete',
      component: () => import('@/components/Brands/Delete.vue')
    },

    {
      path: '/admin/cities',
      name: 'cites',
      component: () => import('@/components/Cities/Cities.vue')
    },
    {
      path: '/admin/cities/create',
      name: 'cities-create',
      component: () => import('@/components/Cities/Create.vue')
    },
    {
      path: '/admin/cities/update',
      name: 'cities-update',
      component: () => import('@/components/Cities/Update.vue')
    },
    {
      path: '/admin/cities/get',
      name: 'cities-get',
      component: () => import('@/components/Cities/Get.vue')
    },
    {
      path: '/admin/cities/delete',
      name: 'cities-delete',
      component: () => import('@/components/Cities/Delete.vue')
    },

    {
      path: '/admin/location',
      name: 'location',
      component: () => import('@/components/Locations/Locations.vue')
    },
    {
      path: '/admin/location/create',
      name: 'location-create',
      component: () => import('@/components/Locations/Create.vue')
    },
    {
      path: '/admin/location/update',
      name: 'location-update',
      component: () => import('@/components/Locations/Update.vue')
    },
    {
      path: '/admin/location/get',
      name: 'location-get',
      component: () => import('@/components/Locations/Get.vue')
    },
    {
      path: '/admin/location/delete',
      name: 'location-delete',
      component: () => import('@/components/Locations/Delete.vue')
    },

    {
      path: '/admin/car',
      name: 'car',
      component: () => import('@/components/Cars/Cars.vue')
    },
    {
      path: '/admin/car/create',
      name: 'create',
      component: () => import('@/components/Cars/create.vue')
    },
    {
      path: '/admin/car/delete',
      name: 'car-delete',
      component: () => import('@/components/Cars/Delete.vue')
    },
    {
      path: '/admin/car/get',
      name: 'car-get',
      component: () => import('@/components/Cars/Get.vue')
    },
    {
      path: '/admin/car/get-id',
      name: 'car-get-id',
      component: () => import('@/components/Cars/getID.vue')
    },

    {
      path: '/admin/model',
      name: 'model',
      component: () => import('@/components/Models/Models.vue')
    },
    {
      path: '/admin/model/create',
      name: 'model-create',
      component: () => import('@/components/Models/Create.vue')
    },
    {
      path: '/admin/model/update',
      name: 'model-update',
      component: () => import('@/components/Models/Update.vue')
    },
    {
      path: '/admin/model/get',
      name: 'model-get',
      component: () => import('@/components/Models/Get.vue')
    },
    {
      path: '/admin/model/get-id',
      name: 'model-get-id',
      component: () => import('@/components/Models/GetId.vue')
    },
    {
      path: '/admin/model/delete',
      name: 'model-delete',
      component: () => import('@/components/Models/Delete.vue')
    }
  ],
})

export default router
