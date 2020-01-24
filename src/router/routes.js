
const routes = [
  {
    path: '',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      {
        path: '/',
        redirect: 'dashboard'
      },
      { path: 'dashboard', component: () => import('pages/Index.vue') }
    ]
  },
  {
    path: '/user',
    component: () => import('layouts/fullPage/FullPage.vue'),
    children: [
      { path: 'login', component: () => import('pages/Login.vue') }
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
