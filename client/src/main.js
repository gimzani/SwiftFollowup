import { createApp } from 'vue'
import App from './App.vue'

import router from './router.js'
import AppIcons from './code/AppIcons.js'

import '@sf/qr-codes/css'
import '@sf/styles'

const app = createApp(App)

app.use(router)
app.use(AppIcons)

app.mount('#app')
