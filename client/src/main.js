import { createApp } from 'vue'
import App from './App.vue'

import router from './router.js'

import '@SwiftFollowup/styles'

const app = createApp(App)

app.use(router)

app.mount('#app')
