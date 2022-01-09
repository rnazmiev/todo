
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/Todo.vue') },
      { path: '/work', component: () => import('src/pages/WorkList.vue') },
      { path: '/about', component: () => import('src/pages/About.vue') },
      { path: '/policy', component: () => import('src/pages/Policy.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
