import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)
const apiBaseUrl = 'https://your-render-api-url.com'
app.use(createPinia())
app.use(router)

app.mount('#app')
