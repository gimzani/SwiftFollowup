import { createApp } from 'vue'
import App from './App.vue'

import router from './router.js'

import '@sf/styles'

const app = createApp(App)

app.use(router)

app.mount('#app')
