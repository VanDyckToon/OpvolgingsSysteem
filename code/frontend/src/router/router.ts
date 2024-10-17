import { createRouter, createWebHistory } from 'vue-router'
import Login from '../components/Login.vue'
import Gebruikers from '../components/Gebruikers.vue'

const routes = [
  {
    path: '/',
    name: 'LoginPage',
    component: Login,
  },
  {
    path: '/begeleider/:id',
    name: 'GebruikersPage',
    component: Gebruikers,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
