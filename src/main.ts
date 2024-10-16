import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './static/fontawesome-free-6.6.0-web/css/all.min.css'
import App from './App.vue'

const app = createApp(App)

app.use(createPinia())

app.mount('#app')
