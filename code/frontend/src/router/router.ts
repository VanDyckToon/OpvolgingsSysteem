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
import Subgroep from '@/components/Subgroep.vue'
import Taak from '@/components/Taak.vue'
import Opleiding from '@/components/Opleiding.vue'
import Competentie from '@/components/Competentie.vue'
import TechnischeCompetentie from '@/components/TechnischeCompetentie.vue'
import Gebruiker from '@/components/Gebruiker.vue'
import OpleidingGebruikerPage from '@/components/OpleidingGebruikerPage.vue'
import Detail from '@/components/Detail.vue'
import ProfielAnalyse from '@/components/ProfielAnalyse.vue'
import DetailAnalyse from '@/components/DetailAnalyse.vue'
import { ComponentModel } from 'echarts'
import TechnischeDetailAnalyse from '@/components/TechnischeDetailAnalyse.vue'


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
  {
    path: '/opleidingGebruiker/:id',
    name: 'OpleidingGebruikerPage',
    component: OpleidingGebruikerPage,
  },
  {
    path: '/subgroep',
    name: 'Subgroep',
    component: Subgroep,
  },
  {
    path: '/taak',
    name: 'Taak',
    component: Taak,
  },
  {
    path: '/opleiding',
    name: 'Opleiding',
    component: Opleiding,
  },
  {
    path: '/competentie',
    name: 'Competentie',
    component: Competentie,
  },
  {
    path: '/technischeCompetentie',
    name: 'TechnischeCompetentie',
    component: TechnischeCompetentie,
  },
  {
    path: '/gebruiker',
    name: 'Gebruiker',
    component: Gebruiker,
  },
  {
    path: '/gebruikerinfo/:id',
    name: 'Detail',
    component: Detail,
  },
  {
    path: '/profielanalyse/:id',
    name: 'ProfielAnalyse',
    component: ProfielAnalyse,
  },
  {
    path: '/detailanalyse/:id',
    name: 'DetailAnalyse',
    component: DetailAnalyse,
  },
  {
    path: '/tecnischeDetailanalyse/:id',
    name: 'TechnischeDetailAnalyse',
    component: TechnischeDetailAnalyse
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
