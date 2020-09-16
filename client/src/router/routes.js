const routes = [{
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    meta: {
      auth: true,
    },
    children: [{
        path: '',
        name: 'Home',
        component: () => import('pages/Index.vue')
      },
      {
        path: 'orders',
        name: 'Orders',
        component: () => import('pages/Orders.vue')
      },
      {
        path: 'orders/:id',
        name: 'Order',
        component: () => import('pages/Order.vue')
      },
      {
        path: 'completed',
        name: 'Completed',
        component: () => import('pages/Completed.vue')
      },
      {
        path: 'products',
        name: 'Products',
        component: () => import('pages/Products.vue')
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    name: 'Login',
    path: '/login',
    meta: {
      guest: true
    },
    component: () => import('pages/login.vue')
  },
  {
    meta: {
      guest: true
    },
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
