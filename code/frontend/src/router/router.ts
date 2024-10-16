import { createRouter, createWebHistory } from 'vue-router'
import Login from '../components/Login.vue'
import Overview from '../components/Overview.vue'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
  },
  {
    path: '/begeleider/:id',
    name: 'Overview',
    component: Overview,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
