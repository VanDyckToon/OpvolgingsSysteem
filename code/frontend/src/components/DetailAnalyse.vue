<template>
  <div class="min-h-screen bg-[#ECF3EB] flex flex-col">
    <HeaderComponent :begeleiderID="gebruiker?.gebruikerID" />

    <div class="flex-grow flex justify-center items-center">
      <div class="w-full max-w-screen-2xl p-8 bg-white shadow-lg rounded-lg">
        <div class="flex justify-between">
          <h2 class="text-2xl font-bold mb-6 text-center text-[#456A50]">
            Competentie Ontwikkeling - {{ gebruiker?.voornaam }} {{ gebruiker?.achternaam }}
          </h2>
          <router-link :to="`/competenties/${gebruiker?.gebruikerID}`">
            <button>
              <Icon icon="material-symbols:arrow-back-rounded" class="text-[#456A50] w-8 h-8 cursor-pointer" />
            </button>
          </router-link>
        </div>

        <!-- Show filters and chart only if there is data -->
        <template v-if="chartData.length">
          <!-- Filters -->
          <div class="flex flex-wrap mb-6 gap-4">
            <div class="flex items-center">
              <label for="startMonth" class="mr-2 text-[#456A50] font-medium">Start maand:</label>
              <select id="startMonth" v-model="startMonth"
                class="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#456A50]"
                @change="updateChart">
                <option v-for="month in availableMonths" :key="month.value" :value="month.value">
                  {{ month.label }}
                </option>
              </select>
            </div>

            <div class="flex items-center">
              <label for="endMonth" class="mr-2 text-[#456A50] font-medium">Eind maand:</label>
              <select id="endMonth" v-model="endMonth"
                class="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#456A50]"
                @change="updateChart">
                <option v-for="month in availableMonths" :key="month.value" :value="month.value">
                  {{ month.label }}
                </option>
              </select>
            </div>
          </div>

          <!-- Chart -->
          <div class="bg-[#F5F9F4] p-4 rounded-lg shadow mb-4">
            <h3 class="text-xl font-bold text-[#456A50] mb-4 text-center">Competentie Ontwikkeling Over Tijd</h3>
            <div id="competentie-chart" class="h-[500px]"></div>
          </div>
        </template>

        <!-- No data message -->
        <div v-else
          class="flex justify-center items-center h-[200px] bg-[#F5F9F4] rounded-lg shadow">
          <p class="text-lg text-[#456A50]">Geen data beschikbaar voor deze selectie</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Icon } from '@iconify/vue'
import * as echarts from 'echarts'
import HeaderComponent from './Header.vue'

interface Gebruiker {
  gebruikerID: number
  voornaam: string
  achternaam: string
}

interface MonthOption {
  value: string
  label: string
}

interface Score {
  kleurcode: string
  scoreID: number
  scoreNaam: string
  waarde: number
}

interface Competentie {
  competentieID: number
  naam: string
  beschrijving: string
}

interface Beoordeling {
  competentieGebruikerID: number
  datumBeoordeeld: string
  gebruiker: any
  score: Score
  competentie: Competentie
}

interface CompetentieData {
  competentieID: number
  beoordelingen: Beoordeling[]
}

interface Actiepunt {
  naam: string
  soort: string
  resultaat: string
  deadline: string
  begeleider: string
}

export default defineComponent({
  name: 'ProfielAnalyse',
  
  components: {
    HeaderComponent,
    Icon,
  },

  data() {
    return {
      gebruiker: null as Gebruiker | null,
      chartInstance: null as echarts.ECharts | null,
      loading: true,
      competentieData: [] as CompetentieData[],
      startMonth: '',
      endMonth: '',
      chartColors: ['#2E7D32', '#1976D2', '#E65100', '#9C27B0', '#F44336', '#00796B', '#FFC107']
    }
  },

  computed: {
    availableMonths(): MonthOption[] {
      const uniqueDates = new Set<string>()
      const monthOptions: MonthOption[] = []

      if (!this.competentieData || this.competentieData.length === 0) {
        return []
      }

      this.competentieData.forEach(comp => {
        if (!comp.beoordelingen) return

        comp.beoordelingen.forEach(beoordeling => {
          const date = new Date(beoordeling.datumBeoordeeld)
          const key = `${date.getFullYear()}-${date.getMonth()}`
          if (!uniqueDates.has(key)) {
            uniqueDates.add(key)
            monthOptions.push({
              value: key,
              label: `${date.toLocaleString('nl-NL', { month: 'long' })} ${date.getFullYear()}`
            })
          }
        })
      })

      return monthOptions.sort((a, b) => {
        const [aYear, aMonth] = a.value.split('-').map(Number)
        const [bYear, bMonth] = b.value.split('-').map(Number)
        return aYear === bYear ? aMonth - bMonth : aYear - bYear
      })
    },

    chartData() {
      if (!this.competentieData.length) return []
      if (!this.startMonth || !this.endMonth) return []

      const [startY, startM] = this.startMonth.split('-').map(Number)
      const [endY, endM] = this.endMonth.split('-').map(Number)

      return this.competentieData.map(comp => {
        const filteredBeoordelingen = comp.beoordelingen.filter(beoordeling => {
          const date = new Date(beoordeling.datumBeoordeeld)
          const y = date.getFullYear()
          const m = date.getMonth()
          return (y > startY || (y === startY && m >= startM)) && (y < endY || (y === endY && m <= endM))
        }).sort((a, b) => new Date(a.datumBeoordeeld).getTime() - new Date(b.datumBeoordeeld).getTime())

        return {
          competentieID: comp.competentieID,
          naam: filteredBeoordelingen.length > 0 ? filteredBeoordelingen[0].competentie.naam : `Competentie ${comp.competentieID}`,
          beoordelingen: filteredBeoordelingen
        }
      }).filter(comp => comp.beoordelingen.length > 0)
    }
  },

  watch: {
    startMonth() {
      this.updateChart()
    },
    endMonth() {
      this.updateChart()
    }
  },

  async mounted() {
    // Haal het id uit de route params en zorg dat het altijd een string is
    const idParam = this.$route?.params?.id
    const id = Array.isArray(idParam) ? idParam[0] : idParam
    await this.fetchGebruiker(id)
    await this.fetchCompetentieData(id)

    this.$nextTick(() => {
      this.initChart()
    })

    window.addEventListener('resize', () => {
      if (this.chartInstance) {
        this.chartInstance.resize()
      }
    })
  },

  methods: {
    async fetchGebruiker(id: string) {
      try {
        const token = localStorage.getItem('access_token')
        const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/gebruiker/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        this.gebruiker = await response.json()
      } catch (error) {
        console.error('Fout bij het ophalen van gebruiker details:', error)
      }
    },

    async fetchCompetentieData(id: string) {
      this.loading = true
      try {
        const token = localStorage.getItem('access_token')
        const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/competentie-gebruiker/werknemer/all/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        this.competentieData = await response.json()

        const months = this.availableMonths
        if (months.length > 0) {
          this.startMonth = months[0].value
          this.endMonth = months[months.length - 1].value
        }
      } catch (error) {
        console.error('Fout bij het ophalen van competentie data:', error)
      } finally {
        this.loading = false
      }
    },

    initChart() {
      if (this.chartInstance) {
        this.chartInstance.dispose()
        this.chartInstance = null
      }

      this.$nextTick(() => {
        const chartDom = document.getElementById('competentie-chart')
        if (chartDom && this.chartData.length > 0) {
          this.chartInstance = echarts.init(chartDom)
          this.renderChart()
        }
      })
    },

    getAxisLineStyle() {
      return { color: '#456A50', width: 2 }
    },

    getAxisTickStyle() {
      return { color: '#456A50' }
    },

    getAxisLabelStyle() {
      return { color: '#666', fontSize: 11 }
    },

    shortDateFormatter(value: string) {
      const date = new Date(value)
      return date.toLocaleDateString('nl-NL', { day: 'numeric', month: 'short' })
    },

    renderChart() {
      if (!this.chartInstance || !this.chartData.length) return

      // Collect all unique dates across all competencies
      const allDatesMap = new Map<string, boolean>()
      this.chartData.forEach(comp => {
        comp.beoordelingen.forEach(beoordeling => {
          const dateStr = beoordeling.datumBeoordeeld.split('T')[0]
          allDatesMap.set(dateStr, true)
        })
      })

      const allDates = Array.from(allDatesMap.keys()).sort()

      // Create series for each competency
      const series: echarts.LineSeriesOption[] = this.chartData.map((comp: any, index: number) => {
        // Define dataMap inside the map callback
        const dataMap = new Map<string, number>()
        comp.beoordelingen.forEach((beoordeling: any) => {
          const dateStr = beoordeling.datumBeoordeeld.split('T')[0]
          dataMap.set(dateStr, beoordeling.score.waarde * 100)
        })
        return {
          name: comp.naam,
          type: 'line',
          showSymbol: true,
          symbolSize: 8,
          lineStyle: { width: 3 },
          color: this.chartColors[index % this.chartColors.length],
          emphasis: {
            focus: 'series',
            itemStyle: {
              borderWidth: 3,
              borderColor: '#fff',
              shadowBlur: 15,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          },
          data: allDates.map(dateStr => dataMap.get(dateStr) ?? null)
        }
      });

      const option: echarts.EChartsOption = {
        title: {
          text: '',
          left: 'center',
          textStyle: {
            color: '#456A50',
            fontSize: 20,
            fontWeight: 'bold'
          }
        },
        tooltip: {
          trigger: 'axis',
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          borderColor: '#456A50',
          borderWidth: 2,
          padding: 15,
          textStyle: { color: '#333', fontSize: 12 },
          formatter: (params: any) => {
            if (!Array.isArray(params)) return ''

            const dateStr = allDates[params[0].dataIndex]
            const formattedDate = new Date(dateStr).toLocaleDateString('nl-NL', {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            })

            let tooltipContent = `<div style="font-weight:bold;margin-bottom:8px;font-size:14px">${formattedDate}</div>`

            params.forEach((param: any) => {
              if (param.value !== null) {
                tooltipContent += `
                  <div style="display:flex;align-items:center;margin-top:5px">
                    <span style="display:inline-block;margin-right:10px;border-radius:50%;width:14px;height:14px;background-color:${param.color};"></span>
                    <span style="flex:1">${param.seriesName}:</span> <strong>${param.value}%</strong>
                  </div>
                `
              }
            })

            return tooltipContent
          }
        },
        legend: {
          data: this.chartData.map(comp => comp.naam),
          top: 15,
          textStyle: { color: '#456A50', fontSize: 12 },
          itemHeight: 14,
          itemWidth: 14,
          itemGap: 25
        },
        grid: {
          left: '5%',
          right: '5%',
          bottom: '8%',
          top: '15%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: allDates,
          axisLine: { lineStyle: this.getAxisLineStyle() },
          axisTick: { alignWithLabel: true, lineStyle: this.getAxisTickStyle() },
          axisLabel: {
            ...this.getAxisLabelStyle(),
            formatter: this.shortDateFormatter
          }
        },
        yAxis: {
          type: 'value',
          min: 0,
          max: 100,
          interval: 25,
          axisLine: { show: true, lineStyle: this.getAxisLineStyle() },
          axisTick: { show: true, lineStyle: this.getAxisTickStyle() },
          axisLabel: { ...this.getAxisLabelStyle(), formatter: '{value}%' },
          splitLine: { show: true, lineStyle: { type: 'dashed', color: '#e0e0e0' } }
        },
        series: series
      }

      this.chartInstance.setOption(option)
    },

    updateChart() {
      if (this.loading) return
      this.$nextTick(() => {
        this.initChart()
      })
    }
  }
})
</script>

<style scoped>
#competentie-chart {
  width: 100%;
  height: 500px;
}
</style>