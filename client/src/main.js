import { createApp } from 'vue'
import { RegleVuePlugin } from '@regle/core';
import App from './App.vue'

import router from './router.js'
import AppIcons from './code/AppIcons.js'


import "toastify-js/src/toastify.css"
import '@sf/qr-codes/css'
import '@sf/styles'

const app = createApp(App)

app.use(router)
app.use(AppIcons)
app.use(RegleVuePlugin)

app.mount('#app')
