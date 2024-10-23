import { createRouter, createWebHistory } from 'vue-router'
import Login from '../components/Login.vue'
import Gebruikers from '../components/Gebruikers.vue'
import Adminpanel from '../components/Adminpanel.vue'
import GebruikerDetailPage from '../components/GebruikerDetailPage.vue'
import Materiaal from '@/components/Materiaal.vue'
import Rol from '@/components/Rol.vue'
import OpmerkingenPage from '@/components/OpmerkingenPage.vue'
import Groep from '@/components/Groep.vue'

import Score from '@/components/Score.vue'
import CompetentiesPage from '@/components/CompetentiesPage.vue'
import TechnischeCompetentiesPage from '@/components/TechnischeCompetentiesPage.vue'

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
  {
    path: '/gebruiker/:id',
    name: 'GebruikerDetail',
    component: GebruikerDetailPage,
  },
  {
    path: '/materiaal',
    name: 'Materiaal',
    component: Materiaal,
  },
  {
    path: '/rol',
    name: 'Rol',
    component: Rol,
  },
  {
    path: '/opmerkingen/:id',
    name: 'OpmerkingenPage',
    component: OpmerkingenPage,
  },
  {
    path: '/groep',
    name: 'Groep',
    component: Groep,
  },
  {
    path: '/score',
    name: 'Score',
    component: Score,
  },
  {
    path: '/competenties/:id',
    name: 'CompetentiesPage',
    component: CompetentiesPage,
  },
  {
    path: '/technischeCompetenties/:id',
    name: 'TechnischeCompetentiesPage',
    component: TechnischeCompetentiesPage,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
