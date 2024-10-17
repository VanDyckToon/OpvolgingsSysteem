// src/main.ts
import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router'
import './index.css'

const app = createApp(App)

app.use(router) // Gebruik Vue Router in de app
app.mount('#app')
