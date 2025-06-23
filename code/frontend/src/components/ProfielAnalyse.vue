<template>
  <div class="min-h-screen bg-[#ECF3EB] flex flex-col">
    <HeaderComponent :begeleiderID="gebruiker?.gebruikerID" />
    
    <div class="flex-grow flex justify-center items-center">
      <div class="w-full max-w-5xl p-8 bg-white shadow-lg rounded-lg">
        <div class="flex justify-between">
          <h2 class="text-2xl font-bold mb-6 text-center text-[#456A50]">
            Profiel Analyse - {{ gebruiker?.voornaam }} {{ gebruiker?.achternaam }}
          </h2>
          <router-link :to="`/detailanalyse/${gebruiker?.gebruikerID}`">
            <button>
              <Icon
                icon="material-symbols:dashboard"
                class="text-[#456A50] w-8 h-8 cursor-pointer"
              />
            </button>
          </router-link>
        </div>
        
        <!-- Radar Chart Container of Geen data -->
        <div v-if="competentieData && competentieData.competentiesGemiddeld && competentieData.competentiesGemiddeld.length > 0">
          <div id="main" class="w-full h-[400px]"></div>
        </div>
        <div v-else class="flex justify-center items-center h-[200px] bg-[#F5F9F4] rounded-lg shadow">
          <p class="text-lg text-[#456A50]">Geen data gevonden</p>
        </div>

        <div>
          <router-link :to="`/competenties/${gebruiker?.gebruikerID}`">
            <button>
              <Icon
                icon="material-symbols:arrow-back"
                class="text-[#456A50] w-8 h-8 cursor-pointer"
              />
            </button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { Icon } from '@iconify/vue'
import * as echarts from 'echarts'
import HeaderComponent from '../components/Header.vue'
import { useRoute } from 'vue-router'

interface Gebruiker {
  gebruikerID: number
  voornaam: string
  achternaam: string
  email?: string
  telefoonnummer?: string
  wachtwoord?: string | null
  straat?: string
  huisNummer?: string
  postcode?: string
  woonplaats?: string
  ICENaam?: string
  ICETelefoonnummer?: string
  foto?: string
  extraOpmerking?: string
  subgroepID?: number | null
  begeleiderID?: number | null
}

interface Competentie {
  competentieID: number
  naam: string
  beschrijving: string
}

interface CompetentieGemiddeld {
  competentie: Competentie
  gemiddeldeScore: number
  aantalBeoordelingen: number
}

interface CompetentieData {
  gebruiker: Gebruiker
  competentiesGemiddeld: CompetentieGemiddeld[]
}

export default defineComponent({
  name: 'ProfielAnalyse',
  components: {
    HeaderComponent,
    Icon,
  },
  setup() {
    const route = useRoute()
    const gebruiker = ref<Gebruiker | null>(null)
    const competentieData = ref<CompetentieData | null>(null)

    const fetchCompetentieData = async () => {
      try {
        const token = localStorage.getItem('access_token')
        const url = `${import.meta.env.VITE_APP_API_URL}/competentie-gebruiker/werknemer/avg/${route.params.id}`
        console.log('API request:', url)
        const response = await fetch(
          url,
          { headers: { Authorization: `Bearer ${token}` } }
        )
        const data = await response.json()
        competentieData.value = data
        gebruiker.value = data.gebruiker
      } catch (error) {
        console.error('Fout bij het ophalen van competentie data:', error)
      }
    }

    const initChart = () => {
      const chartDom = document.getElementById('main')
      if (!chartDom) return

      const myChart = echarts.init(chartDom)

      if (!competentieData.value) return

      const indicators = competentieData.value.competentiesGemiddeld.map(item => ({
        name: item.competentie.naam,
        max: 1
      }))

      const values = competentieData.value.competentiesGemiddeld.map(item =>
        item.gemiddeldeScore
      )

      const option: echarts.EChartsOption = {
        tooltip: {
          trigger: 'item',
          formatter: function(params: any) {
            if (!competentieData.value) return '';

            let tooltipContent = `
              <div style="font-weight: bold; margin-bottom: 8px; font-size: 16px;">
                ${gebruiker.value?.voornaam} ${gebruiker.value?.achternaam}
              </div>
            `;

            competentieData.value.competentiesGemiddeld.forEach((item, index) => {
              const percentage = Math.round(item.gemiddeldeScore * 100);

              tooltipContent += `
                <div style="margin-bottom: 6px;">
                  <span>${item.competentie.naam}: </span>
                  <span style="font-size: '14px' color: #456A50;">
                    ${percentage}% (${item.aantalBeoordelingen} reviews)
                  </span>
                </div>
              `;
            });
            return tooltipContent;
          },
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          borderColor: '#456A50',
          borderWidth: 1,
          padding: 10,
          textStyle: {
            color: '#333'
          }
        },
        radar: {
          indicator: indicators,
          shape: 'circle',
          splitNumber: 5,
          axisName: {
            color: '#456A50'
          },
          splitLine: {
            lineStyle: {
              color: 'rgba(69, 106, 80, 0.2)'
            }
          }
        },
        series: [
          {
            name: 'Vaardigheden Analyse',
            type: 'radar',
            data: [
              {
                value: values,
                name: 'Gemiddelde Score',
                areaStyle: {
                  color: 'rgba(69, 106, 80, 0.4)'
                },
                lineStyle: {
                  color: '#456A50'
                },
                symbol: 'circle',
                itemStyle: {
                  color: '#456A50'
                }
              }
            ]
          }
        ]
      }

      myChart.setOption(option)
      window.addEventListener('resize', () => myChart.resize())
    }

    onMounted(async () => {
      await fetchCompetentieData()
      initChart()
    })

    return {
      gebruiker,
      competentieData,
    }
  }
})
</script>

<style scoped>
#main {
  width: 100%;
  height: 400px;
}
</style>