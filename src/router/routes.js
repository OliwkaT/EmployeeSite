
const routes = [
  {
    path: '',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      {
        path: '/',
        redirect: 'dashboard'
      },
      { path: 'dashboard', component: () => import('pages/Dashboard.vue') }
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

if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
