import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router' // Import the router

// Create the app with the router
const app = createApp(App)
app.use(router) // Tell the app to use the router
app.mount('#app')
