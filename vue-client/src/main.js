import './assets/css/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import PButton from '@/components/theme/PButton.vue'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.component('PButton', PButton)

app.use(createPinia())
app.use(router)

app.mount('#app')
