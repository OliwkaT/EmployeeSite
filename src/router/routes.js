
const routes = [
  {
    path: '',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      {
        path: '/',
        redirect: 'dashboard'
      },
      { path: 'dashboard', component: () => import('pages/Dashboard.vue') },
      { path: 'tasks', component: () => import('pages/Tasks.vue') },
      { path: 'employees', component: () => import('pages/Employees.vue') },
      { path: 'chat', component: () => import('pages/Chat.vue') }
    ]
  },
  {
    path: '/user',
    component: () => import('layouts/fullPage/FullPage.vue'),
    children: [
      { path: 'login', component: () => import('pages/Login.vue') }
    ]
  },
  {
    path: '/chat',
    component: () => import('layouts/ChatLayout.vue'),
    children: [
      { path: 'messages', component: () => import('pages/Chat.vue') }
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
