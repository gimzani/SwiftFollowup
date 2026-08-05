//-----------------------------------------------------------------------
import { createRouter, createWebHashHistory } from 'vue-router';
//-----------------------------------------------------------------------
//-----------------------------------------------------------------------  app routes
const HomePage = () => import('./pages/HomePage.vue');
const LoginPage = () => import('./pages/LoginPage.vue');
const RegistrationPage = () => import('./pages/RegistrationPage.vue');
const ForgotPasswordPage = () => import('./pages/ForgotPasswordPage.vue');
const DashboardPage = () => import('./pages/DashboardPage.vue');
const BizCardsPage = () => import('./pages/BizCardsPage.vue');
const QrCodesPage = () => import('./pages/QrCodesPage.vue');
const ContactsPage = () => import('./pages/ContactsPage.vue');
const appRoutes = [
  { redirect: '/login', path: '/' },
  { path: '/home', name: 'HomePage', component: HomePage },
  { path: '/login', name: 'LoginPage', component: LoginPage },
  { path: '/register', name: 'RegistrationPage', component: RegistrationPage },
  { path: '/forgot-password', name: 'ForgotPasswordPage', component: ForgotPasswordPage },
  { path: '/dashboard', name: 'DashboardPage', component: DashboardPage },
  { path: '/bizcards', name: 'BizCardsPage', component: BizCardsPage },
  { path: '/qrcodes', name: 'QrCodesPage', component: QrCodesPage },
  { path: '/contacts', name: 'ContactsPage', component: ContactsPage },
];

//----------------------------------------------------------------------- external routes
const ViewBizCardPage = () => import('./pages/ViewBizCardPage.vue');
const ViewQrCodePage = () => import('./pages/ViewQrCodePage.vue');
const SetPasswordPage = () => import('./pages/SetPasswordPage.vue');
const ActivateAccountPage = () => import('./pages/ActivateAccountPage.vue');
const externalRoutes = [
  { path: '/bizcard/:id?', name: 'ViewBizCardPage', component: ViewBizCardPage },
  { path: '/qrcode/:id?', name: 'ViewQrCodePage', component: ViewQrCodePage },
  { path: '/SetPasswordPage/:token?', name: 'SetPasswordPage', component: SetPasswordPage },
  { path: '/ActivateAccountPage/:token?', name: 'ActivateAccountPage', component: ActivateAccountPage },

]
//-----------------------------------------------------------------------
const router = createRouter({
  history: createWebHashHistory(),
  routes: [    
    ...appRoutes,
    ...externalRoutes,
    ...[{ path: '/:catchAll(.*)', redirect: '/404' }]
  ]
});
//-----------------------------------------------------------------------
export default router;                             // FINAL OBJECT EXPORT
//-----------------------------------------------------------------------