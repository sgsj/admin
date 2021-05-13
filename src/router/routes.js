
const routes = [
  {
    path: '/',
    component: () => import('layouts/defaultLayout.vue'),
    children: [
      { path: '', component: () => import('pages/login.vue'), name: 'Login' },
      { path: '/register', component: () => import('pages/register.vue') }
    ]
  },
  {
    path: '/index',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: '/tool', component: () => import('pages/tool.vue') },
      { 
        path: '/articleList',
        component: () => import('pages/articleList.vue'),
        // children: [
        //   { path: '/add', component: () => import('pages/articleAdd.vue') },
        // ]
      },
      { path: '/articleList/add', component: () => import('pages/articleAdd.vue') },
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
