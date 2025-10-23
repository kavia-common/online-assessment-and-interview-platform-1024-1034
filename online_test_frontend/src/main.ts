import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { enableMocks } from '@/api/mocks'

if ((import.meta.env.VITE_USE_MOCKS || 'false') === 'true') {
  enableMocks()
}

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')
