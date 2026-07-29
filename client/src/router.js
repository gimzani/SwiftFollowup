//-----------------------------------------------------------------------
import { createRouter, createWebHashHistory } from 'vue-router';
//-----------------------------------------------------------------------
const HomePage = () => import('./pages/HomePage.vue');
//-----------------------------------------------------------------------
const appRoutes = [
    { path: '/', name: 'HomePage', component: HomePage },
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