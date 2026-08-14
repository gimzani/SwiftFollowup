//-----------------------------------------------------------------------
import { createRouter, createWebHashHistory } from 'vue-router';
//-----------------------------------------------------------------------
//-----------------------------------------------------------------------
//#region APP ROUTES
//-----------------------------------------------------------------------
const HomePage = () => import('./pages/app/HomePage.vue');
const LoginPage = () => import('./pages/app/LoginPage.vue');
const RegistrationPage = () => import('./pages/app/RegistrationPage.vue');
const ForgotPasswordPage = () => import('./pages/app/ForgotPasswordPage.vue');
const DashboardPage = () => import('./pages/app/DashboardPage.vue');
const MyAccountPage = () => import('./pages/app/MyAccountPage.vue');
const BizCardsPage = () => import('./pages/app/BizCardsPage.vue');
const QrCodesPage = () => import('./pages/app/QrCodesPage.vue');
const ContactsPage = () => import('./pages/app/ContactsPage.vue');
const QrCodeEditorPage = () => import('./pages/app/QrCodeEditorPage.vue');
const BizCardEditorPage = () => import('./pages/app/BizCardEditorPage.vue');
const appRoutes = [
  { redirect: '/login', path: '/' },
  { path: '/home', name: 'HomePage', component: HomePage },
  { path: '/login', name: 'LoginPage', component: LoginPage },
  { path: '/register', name: 'RegistrationPage', component: RegistrationPage },
  { path: '/forgot-password', name: 'ForgotPasswordPage', component: ForgotPasswordPage },
  { path: '/dashboard', name: 'DashboardPage', component: DashboardPage },
  { path: '/my-account', name: 'MyAccountPage', component: MyAccountPage },
  { path: '/bizcards', name: 'BizCardsPage', component: BizCardsPage },
  { path: '/qrcodes', name: 'QrCodesPage', component: QrCodesPage },
  { path: '/contacts', name: 'ContactsPage', component: ContactsPage },
  { path: '/qrcode-editor', name: 'QrCodeEditorPage', component: QrCodeEditorPage },
  { path: '/bizcard-editor', name: 'BizCardEditorPage', component: BizCardEditorPage },
];
//-----------------------------------------------------------------------
//#endregion
//-----------------------------------------------------------------------
//#region ADMIN ROUTES
//----------------------------------------------------------------------- admin routes
const UserAccountsPage = () => import('./pages/admin/UserAccountsPage.vue');
const AppSettingsPage = () => import('./pages/admin/AppSettingsPage.vue');
const adminRoutes = [
  { path: '/useraccounts', name: 'UserAccountsPage', component: UserAccountsPage },
  { path: '/app-settings', name: 'AppSettingsPage', component: AppSettingsPage },
];
//-----------------------------------------------------------------------
//#endregion
//-----------------------------------------------------------------------
//#region EXTERNAL ROUTES
//-----------------------------------------------------------------------
const ViewBizCardPage = () => import('./pages/external/ViewBizCardPage.vue');
const ViewQrCodePage = () => import('./pages/external/ViewQrCodePage.vue');
const SetPasswordPage = () => import('./pages/external/SetPasswordPage.vue');
const ActivateAccountPage = () => import('./pages/external/ActivateAccountPage.vue');
const externalRoutes = [
  { path: '/bizcard/:id?', name: 'ViewBizCardPage', component: ViewBizCardPage },
  { path: '/qrcode/:id?', name: 'ViewQrCodePage', component: ViewQrCodePage },
  { path: '/SetPasswordPage/:token?', name: 'SetPasswordPage', component: SetPasswordPage },
  { path: '/ActivateAccountPage/:token?', name: 'ActivateAccountPage', component: ActivateAccountPage },

]
//-----------------------------------------------------------------------
//#endregion
//-----------------------------------------------------------------------
const router = createRouter({
  history: createWebHashHistory(),
  routes: [    
    ...appRoutes,
    ...adminRoutes,
    ...externalRoutes,
    ...[{ path: '/:catchAll(.*)', redirect: '/404' }]
  ]
});
//-----------------------------------------------------------------------
export default router;                             // FINAL OBJECT EXPORT
//-----------------------------------------------------------------------