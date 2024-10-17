import { createRouter, createWebHistory } from 'vue-router'
import Login from '../components/Login.vue'
import Gebruikers from '../components/Gebruikers.vue'
import Adminpanel from '../components/Adminpanel.vue'

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
  {
    path: '/adminpanel',
    name: 'AdminPanel',
    component: Adminpanel,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
