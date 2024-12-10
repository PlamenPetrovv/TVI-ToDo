import { createApp } from 'vue'
import { createVuetify } from 'vuetify'
import 'vuetify/styles' // Импортиране на стиловете на Vuetify

import App from './App.vue'

const vuetify = createVuetify()

createApp(App).use(vuetify).mount('#app')
