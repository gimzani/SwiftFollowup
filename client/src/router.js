//-----------------------------------------------------------------------
import { createRouter, createWebHashHistory } from 'vue-router';
//-----------------------------------------------------------------------
const HomePage = () => import('./pages/HomePage.vue');
const LoginPage = () => import('./pages/LoginPage.vue');
//-----------------------------------------------------------------------
const appRoutes = [
  { redirect: '/login', path: '/' },
  { path: '/home', name: 'HomePage', component: HomePage },
  { path: '/login', name: 'LoginPage', component: LoginPage },
];
//-----------------------------------------------------------------------
const router = createRouter({
  history: createWebHashHistory(),
  routes: [    
    ...appRoutes,
    ...[{ path: '/:catchAll(.*)', redirect: '/404' }]
  ]
});
//-----------------------------------------------------------------------
export default router;                             // FINAL OBJECT EXPORT
//-----------------------------------------------------------------------