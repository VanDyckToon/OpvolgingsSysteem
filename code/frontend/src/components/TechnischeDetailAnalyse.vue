<template>
  <div class="min-h-screen bg-[#ECF3EB] flex flex-col">
    <HeaderComponent :begeleiderID="gebruiker?.gebruikerID" />

    <div class="flex-grow flex justify-center items-center">
      <div class="w-full max-w-screen-2xl p-8 bg-white shadow-lg rounded-lg">
        <div class="flex justify-between">
          <h2 class="text-2xl font-bold mb-6 text-center text-[#456A50]">
            Technische Profiel Analyse - {{ gebruiker?.voornaam }} {{ gebruiker?.achternaam }}
          </h2>
          <router-link :to="`/technischeCompetenties/${gebruiker?.gebruikerID}`">
            <button>
              <Icon icon="material-symbols:arrow-back-rounded" class="text-[#456A50] w-8 h-8 cursor-pointer" />
            </button>
          </router-link>
        </div>

        <!-- Filters -->
        <div class="flex flex-wrap mb-6 gap-4">
          <div class="flex items-center">
            <label for="startMonth" class="mr-2 text-[#456A50] font-medium">Start maand:</label>
            <select id="startMonth" v-model="startMonth"
              class="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#456A50]"
              @change="updateCharts">
              <option v-for="month in availableMonths" :key="month.value" :value="month.value">
                {{ month.label }}
              </option>
            </select>
          </div>

          <div class="flex items-center">
            <label for="endMonth" class="mr-2 text-[#456A50] font-medium">Eind maand:</label>
            <select id="endMonth" v-model="endMonth"
              class="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#456A50]"
              @change="updateCharts">
              <option v-for="month in availableMonths" :key="month.value" :value="month.value">
                {{ month.label }}
              </option>
            </select>
          </div>

          <!-- Task Selection Dropdown -->
          <div class="flex items-center">
            <label for="taskSelect" class="mr-2 text-[#456A50] font-medium">Taak:</label>
            <select id="taskSelect" v-model="selectedTask"
              class="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#456A50] min-w-[200px]"
              @change="updateCharts">
              <option value="all">Alle taken</option>
              <option v-for="task in taken" :key="task.taakID" :value="task.taakID">
                {{ task.taakNaam }}
              </option>
            </select>
          </div>

          <!-- Export Button -->
          <div class="flex items-center ml-auto">
            <button @click="openModal"
              class="bg-[#456A50] text-white px-4 py-2 rounded-md hover:bg-[#385643] transition-colors flex items-center gap-2"
              :disabled="loading || filteredTaken.length === 0">
              <Icon icon="material-symbols:add-diamond" class="w-5 h-5" />
              Actiepunten Toevoegen
            </button>
          </div>
        </div>

        <!-- Action Points Modal -->
        <div v-if="showModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[1000]">
          <div class="bg-white rounded-lg p-6 w-11/12 max-w-3xl">
            <div class="flex justify-between">
              <div>
                <label class="block text-[#456A50] text-xl font-bold mb-2 py-1" for="actieName">
                  Actie:
                </label>
                <input v-model="actieNaam" type="text" id="actieName"
                  class="rounded-s-full rounded-r-full shadow appearance-none border rounded-lg py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200 w-full"
                  placeholder="Vul hier de actie in" required>
              </div>
              <div>
                <label class="block text-[#456A50] text-xl font-bold mb-2 py-1" for="actieSoort">
                  Soort:
                </label>
                <input v-model="actieSoort" type="text" id="actieSoort"
                  class="rounded-s-full rounded-r-full shadow appearance-none border rounded-lg py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200 w-full"
                  placeholder="Vul hier de soort in" required>
              </div>
            </div>
            <div>
              <label class="block text-[#456A50] text-xl font-bold mb-2 py-1" for="resultaat">
                Verwachte Resultaat:
              </label>
              <textarea v-model="resultaat" id="resultaat"
                class="rounded-s-2xl rounded-r-2xl shadow appearance-none border rounded-sm py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200 w-full h-[15vh]"
                placeholder="Vul hier het verwachte resultaat in" required>
              </textarea>
            </div>
            <div class="flex justify-between items-end">
              <div>
                <label class="block text-[#456A50] text-xl font-bold mb-2 py-1" for="deadline">
                  Tegen wanneer:
                </label>
                <input v-model="deadline" type="date" id="deadline"
                  class="rounded-s-full rounded-r-full shadow appearance-none border rounded-lg py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200 w-full"
                  required>
              </div>
              <div>
                <label class="block text-[#456A50] text-xl font-bold mb-2 py-1" for="begeleider">
                  Wie kan helpen:
                </label>
                <input v-model="begeleider" type="text" id="begeleider"
                  class="rounded-s-full rounded-r-full shadow appearance-none border rounded-lg py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200 w-full"
                  placeholder="Wie kan hierbij helpen?" required>
              </div>
              <button @click="actiepuntToevoegen"
                class="bg-[#456A50] text-white px-4 py-2 rounded-md hover:bg-[#385643] transition-colors flex items-center gap-2 h-full">
                Toevoegen
              </button>
            </div>
            <div class="mt-4 p-4 bg-gray-100 rounded-lg block">
              <h3 class="text-[#456a50] font-bold mb-2">Toegevoegde actiepunten</h3>
              <div v-for="(actie, index) in actiepunten" :key="index" class="mb-3 p-3 bg-white rounded shadow relative">
                <button @click="removeActiepunt(index)"
                  class="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center transition-colors"
                  title="Verwijder actiepunt">
                  <Icon icon="material-symbols:delete-forever" class="w-4 h-4" />
                </button>
                <p class="flex justify-between pr-8">
                  <span>{{ actie.naam }} ({{ formatDate(actie.deadline) }})</span>
                  <span>{{ actie.begeleider }}</span>
                </p>
                <hr>
                <p>{{ actie.resultaat }}</p>
                <p class="italic">{{ actie.soort }}</p>
              </div>

              <!-- Show message when no action points -->
              <div v-if="actiepunten.length === 0" class="text-gray-500 text-center py-4">
                Nog geen actiepunten toegevoegd
              </div>
            </div>

            <div class="flex justify-between mt-5">
              <button @click="closeModal"
                class="bg-[#6b6b6b] text-white px-4 py-2 rounded-md hover:bg-[#385643] transition-colors flex items-center gap-2">
                Annuleren
              </button>
              <div class="flex gap-2">
                <button @click="exportActiepuntenOnly"
                  class="bg-[#456A50] text-white px-4 py-2 rounded-md hover:bg-[#385643] transition-colors flex items-center gap-2"
                  :disabled="loading || filteredTaken.length === 0">
                  <Icon icon="material-symbols:picture-as-pdf" class="w-5 h-5" />
                  Alleen Actiepunten PDF
                </button>
                <button @click="exportCharts"
                  class="bg-[#456A50] text-white px-4 py-2 rounded-md hover:bg-[#385643] transition-colors flex items-center gap-2"
                  :disabled="loading || filteredTaken.length === 0">
                  <Icon icon="material-symbols:picture-as-pdf" class="w-5 h-5" />
                  PDF Exporteren
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Loading indicator -->
        <div v-if="loading" class="flex justify-center items-center h-[400px]">
          <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#456A50]"></div>
        </div>

        <!-- Task Charts -->
        <div v-else>
          <div :class="selectedTask === 'all' ? 'grid grid-cols-1 sm:grid-cols-2 gap-6' : 'mb-8'">
            <div v-for="task in filteredTaken" :key="task.taakID" class="bg-[#F5F9F4] p-4 rounded-lg shadow mb-4">
              <h3 class="text-xl font-bold text-[#456A50] mb-2">{{ task.taakNaam }}</h3>
              <div :id="`chart-task-${task.taakID}`" class="h-[350px]"></div>
            </div>
          </div>

          <!-- No data message -->
          <div v-if="filteredTaken.length === 0"
            class="flex justify-center items-center h-[200px] bg-[#F5F9F4] rounded-lg shadow">
            <p class="text-lg text-[#456A50]">Geen data beschikbaar voor deze selectie</p>
          </div>
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
import { jsPDF } from 'jspdf'
import html2canvas from 'html2canvas'
import sprongLogo from '../assets/logo-de-sprong.png'
import { beoordelingToDataMap, extractMonthOptions, getDateStr } from '../utils/chartUtils'

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

interface Beoordeling {
  technischeCompetentieGebruikerID: number
  datumBeoordeeld: string
  gebruiker: Gebruiker
  score: Score
}

interface TechnischeCompetentie {
  technischeCompetentieID: number
  naam: string
  beschrijving: string
  beoordeling: Beoordeling[]
}

interface Taak {
  taakID: number
  taakNaam: string
  competenties: TechnischeCompetentie[]
}

interface Actiepunt {
  naam: string
  soort: string
  resultaat: string
  deadline: string
  begeleider: string
}

interface PDFExportData {
  user: string
  period: {
    start: string
    end: string
  }
  charts: Array<{
    taskName: string
    imageBase64: string
  }>
  actiepunten: Actiepunt[]
  opmerkingen: Opmerking[]
}

interface Opmerking {
  opmerkingID: number
  titel: string
  beschrijving: string
  createdAt: string
  begeleider: {
    voornaam: string
    achternaam: string
  }
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
      chartInstances: new Map<number, echarts.ECharts>(),
      loading: true,
      taken: [] as Taak[],
      selectedTask: 'all',
      startMonth: '',
      endMonth: '',
      chartColors: ['#2E7D32', '#1976D2', '#E65100', '#9C27B0', '#F44336', '#00796B', '#FFC107'],
      
      // Modal state
      showModal: false,
      actieNaam: '',
      actieSoort: '',
      resultaat: '',
      deadline: '',
      begeleider: '',
      actiepunten: [] as Actiepunt[],
      opmerkingen: [] as Opmerking[]
    }
  },

  computed: {
    availableMonths(): MonthOption[] {
      // Flatten all beoordelingen from all taken/competenties
      const allBeoordelingen: any[] = []
      this.taken.forEach(taak => {
        taak.competenties?.forEach(comp => {
          comp.beoordeling?.forEach((b: any) => allBeoordelingen.push(b))
        })
      })
      return extractMonthOptions(allBeoordelingen)
    },

    filteredTaken(): Taak[] {
      if (!this.taken.length) return []
      if (!this.startMonth || !this.endMonth) return []

      const [startY, startM] = this.startMonth.split('-').map(Number)
      const [endY, endM] = this.endMonth.split('-').map(Number)

      let filtered = this.taken.map(taak => {
        const filteredCompetenties = taak.competenties.map(comp => {
          const filteredBeoordelingen = comp.beoordeling.filter(beoordeling => {
            const date = new Date(beoordeling.datumBeoordeeld)
            const y = date.getFullYear()
            const m = date.getMonth()
            return (y > startY || (y === startY && m >= startM)) && (y < endY || (y === endY && m <= endM))
          }).sort((a, b) => new Date(a.datumBeoordeeld).getTime() - new Date(b.datumBeoordeeld).getTime())

          return {
            ...comp,
            beoordeling: filteredBeoordelingen
          }
        }).filter(comp => comp.beoordeling.length > 0)

        return {
          ...taak,
          competenties: filteredCompetenties
        }
      }).filter(taak => taak.competenties.length > 0)

      if (this.selectedTask !== 'all') {
        filtered = filtered.filter(taak => taak.taakID === parseInt(this.selectedTask as string))
      }

      return filtered
    }
  },

  watch: {
    startMonth() {
      this.updateCharts()
    },
    endMonth() {
      this.updateCharts() 
    },
    selectedTask() {
      this.updateCharts()
    }
  },

  async mounted() {
    const id = window.location.pathname.split('/').pop() || ''
    await this.fetchGebruiker(id)
    await this.fetchTakenData(id)
    await this.fetchOpmerkingen(id)
    this.$nextTick(() => {
      this.initCharts()
    })

    window.addEventListener('resize', () => {
      this.chartInstances.forEach(instance => instance.resize())
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

    async fetchTakenData(id: string) {
      this.loading = true
      try {
        const token = localStorage.getItem('access_token')
        const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/technische-competentie-gebruiker/werknermer/all/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        this.taken = await response.json()

        const months = this.availableMonths
        if (months.length > 0) {
          this.startMonth = months[0].value
          this.endMonth = months[months.length - 1].value
        }
      } catch (error) {
        console.error('Fout bij het ophalen van taak data:', error)
      } finally {
        this.loading = false
      }
    },

    async fetchOpmerkingen(gebruikerID: string) {
      try {
        const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/opmerking/werknemer/${gebruikerID}`)
        const allOpmerkingen = await response.json()
        const currentYear = new Date().getFullYear()
        this.opmerkingen = allOpmerkingen.filter((opm: Opmerking) => {
          const opmYear = new Date(opm.createdAt).getFullYear()
          return opmYear === currentYear
        })
      } catch (error) {
        console.error('Fout bij ophalen opmerkingen:', error)
      }
    },

    initCharts() {
      this.chartInstances.forEach(instance => {
        instance.dispose()
      })
      this.chartInstances.clear()

      this.$nextTick(() => {
        this.filteredTaken.forEach(taak => {
          const chartDom = document.getElementById(`chart-task-${taak.taakID}`)
          if (chartDom) {
            // Ensure the element is visible and has dimensions
            if (chartDom.offsetWidth === 0 || chartDom.offsetHeight === 0) {
              console.warn(`Chart container ${taak.taakID} has no dimensions`)
            }

            const chart = echarts.init(chartDom)
            this.chartInstances.set(taak.taakID, chart)
            this.renderTaskChart(taak, chart)

            // Ensure chart is fully rendered
            chart.on('finished', () => {
              console.log(`Chart ${taak.taakID} finished rendering`)
            })
          }
        })
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

    shortDateFormatter(value: string, index: number, allDates: string[]) {
      const currentDate = new Date(value)
      const previousDate = index > 0 ? new Date(allDates[index - 1]) : null
      if (index === 0 || (previousDate && currentDate.getMonth() !== previousDate.getMonth())) {
        return currentDate.toLocaleDateString('nl-NL', { month: 'short' })
      }
      return ''
    },

    renderTaskChart(taak: Taak, chart: echarts.ECharts) {
      const allDatesMap = new Map<string, boolean>()
      taak.competenties.forEach(comp => {
        comp.beoordeling.forEach(beoordeling => {
          const dateStr = getDateStr(beoordeling.datumBeoordeeld)
          allDatesMap.set(dateStr, true)
        })
      })

      const allDates = Array.from(allDatesMap.keys()).sort()

      const series: echarts.LineSeriesOption[] = taak.competenties.map((comp, index) => {
        const dataMap = beoordelingToDataMap(comp.beoordeling)
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
      })

      const option: echarts.EChartsOption = {
        title: {
          text: '',
          left: 'center',
          textStyle: {
            color: '#456A50',
            fontSize: 18,
            fontWeight: 'bold'
          }
        },
        tooltip: {
          trigger: 'axis',
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          borderColor: '#456A50',
          borderWidth: 1,
          padding: 10,
          textStyle: { color: '#333' },
          formatter: (params: any) => {
            if (!Array.isArray(params)) return ''

            const dateStr = allDates[params[0].dataIndex]
            const formattedDate = new Date(dateStr).toLocaleDateString('nl-NL', {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            })

            let tooltipContent = `<div style="font-weight:bold;margin-bottom:5px">${formattedDate}</div>`

            params.forEach((param: any) => {
              if (param.value !== null) {
                tooltipContent += `
                  <div style="display:flex;align-items:center;margin-top:3px">
                    <span style="display:inline-block;margin-right:8px;border-radius:10px;width:12px;height:12px;background-color:${param.color};"></span>
                    ${param.seriesName}: <strong>${param.value}%</strong>
                  </div>
                `
              }
            })

            return tooltipContent
          }
        },
        legend: {
          data: taak.competenties.map(comp => comp.naam),
          top: 10,
          textStyle: { color: '#456A50' },
          itemHeight: 12,
          itemWidth: 12,
          itemGap: 20
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          top: '20%',
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
            formatter: (value: string, index: number) => this.shortDateFormatter(value, index, allDates)
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
          splitLine: { show: true, lineStyle: { type: 'dashed', color: '#ddd' } }
        },
        series: series as echarts.LineSeriesOption[]
      }

      chart.setOption(option)
    },

    updateCharts() {
      if (this.loading) return

      this.chartInstances.forEach(instance => {
        instance.dispose()
      })
      this.chartInstances.clear()

      this.$nextTick(() => {
        this.initCharts()
      })
    },

    async exportCharts() {
      this.loading = true
      try {
        // 1. Export the full PDF (zoals nu)
        const exportData: PDFExportData = {
          user: `${this.gebruiker?.voornaam} ${this.gebruiker?.achternaam}`,
          period: {
            start: this.getMonthLabel(this.startMonth),
            end: this.getMonthLabel(this.endMonth)
          },
          charts: [],
          actiepunten: this.actiepunten,
          opmerkingen: this.opmerkingen
        }

        // Use ECharts built-in getDataURL method for better quality
        this.chartInstances.forEach((chartInstance, taakID) => {
          try {
            const taak = this.filteredTaken.find(t => t.taakID === taakID)
            if (taak) {
              const imageBase64 = chartInstance.getDataURL({
                type: 'png',
                pixelRatio: 2,
                backgroundColor: '#ffffff'
              })

              exportData.charts.push({
                taskName: taak.taakNaam,
                imageBase64: imageBase64
              })
            }
          } catch (error) {
            console.error(`Error getting chart data URL for task ${taakID}:`, error)
          }
        })

        if (exportData.charts.length === 0) {
          alert('Geen grafieken kunnen worden geëxporteerd. Probeer het opnieuw.')
          return
        }

        await this.generatePDFExport(exportData)
        await this.exportActiepuntenOnly();
        // 2. Export a second PDF with only the actiepunten
        /*const actiepuntenData: PDFExportData = {
          user: exportData.user,
          period: exportData.period,
          charts: [],
          actiepunten: actiepunten.value,
          opmerkingen: opmerkingen.value
        }
        await generatePDFExport({
          ...actiepuntenData,
          fileNameSuffix: '-alleen-actiepunten'
        })*/

        this.showModal = false
        this.initCharts()

      } catch (error) {
        console.error('Export error:', error)
        alert('Er is een fout opgetreden bij het exporteren. Probeer het opnieuw.')
      } finally {
        this.loading = false
      }
    },

    async exportActiepuntenOnly() {
      this.loading = true
      try {
        const exportData: PDFExportData = {
          user: `${this.gebruiker?.voornaam} ${this.gebruiker?.achternaam}`,
          period: {
            start: this.getMonthLabel(this.startMonth),
            end: this.getMonthLabel(this.endMonth)
          },
          charts: [],
          actiepunten: this.actiepunten,
          opmerkingen: this.opmerkingen
        }
        await this.generatePDFExport({
          ...exportData,
          fileNameSuffix: '-alleen-actiepunten'
        })
        this.showModal = false
        this.initCharts()
      } catch (error) {
        console.error('Export error:', error)
        alert('Er is een fout opgetreden bij het exporteren. Probeer het opnieuw.')
      } finally {
        this.loading = false
      }
    },

    // Pas generatePDFExport aan om optioneel een fileNameSuffix te accepteren:
    async generatePDFExport(exportData: PDFExportData & { fileNameSuffix?: string }) {
      try {
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'mm',
          format: 'a4'
        })

        const pageWidth = pdf.internal.pageSize.getWidth()
        const pageHeight = pdf.internal.pageSize.getHeight()
        const margin = 15
        const usableWidth = pageWidth - margin * 2

        // Add logo in top right corner
        const originalLogoWidth = 272 // Width of original logo image
        const originalLogoHeight = 185 // Height of original logo image
        const aspectRatio = originalLogoWidth / originalLogoHeight

        // Set desired height and calculate width to maintain aspect ratio
        const logoHeight = 15 // height in mm
        const logoWidth = logoHeight * aspectRatio
        const logoX = pageWidth - margin - logoWidth
        const logoY = margin
        pdf.addImage(sprongLogo, 'PNG', logoX, logoY, logoWidth, logoHeight)

        // Header - adjust starting position to account for logo
        pdf.setFontSize(18)
        pdf.setTextColor(69, 106, 80)
        pdf.text('POP Evaluatie', pageWidth / 2, margin + logoHeight, { align: 'center' })

        pdf.setFontSize(12)
        pdf.setTextColor(0)
        pdf.text(`Gebruiker: ${exportData.user}`, margin, margin + logoHeight + 10)
        pdf.text(`Periode: ${exportData.period.start} - ${exportData.period.end}`, margin, margin + logoHeight + 16)
        pdf.text(
          `Geëxporteerd op: ${new Date().toLocaleDateString('nl-NL', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}`,
          margin,
          margin + logoHeight + 22
        )

        let yPosition = margin + logoHeight + 35

        // Add charts section
        pdf.setFontSize(16)
        pdf.setTextColor(69, 106, 80)
        pdf.text('Competentie Ontwikkeling', margin, yPosition)
        yPosition += 10

        exportData.charts.forEach((chartData: any, index: number) => {
          // Add page break if chart won't fit
          if (yPosition > pageHeight - 80) { // 80mm space needed for a chart
            pdf.addPage();
            yPosition = margin;
          }

          // Add task name as heading
          pdf.setFontSize(14);
          pdf.setTextColor(69, 106, 80); // #456A50
          pdf.text(chartData.taskName, margin, yPosition);
          yPosition += 8;

          const chartAspectRatio = 16 / 9;

          const maxWidth = usableWidth;
          const maxHeight = 65;

          let imgWidth = maxWidth;
          let imgHeight = imgWidth / chartAspectRatio;

          if (imgHeight > maxHeight) {
            imgHeight = maxHeight;
            imgWidth = imgHeight * chartAspectRatio;
          }

          const xPosition = margin + (usableWidth - imgWidth) / 2;


          pdf.addImage(chartData.imageBase64, 'PNG', xPosition, yPosition, imgWidth, imgHeight)
          yPosition += imgHeight + 15
        })

        if (exportData.actiepunten && exportData.actiepunten.length > 0) {
          const requiredSpace = 40 + (exportData.actiepunten.length * 25)
          if (yPosition + requiredSpace > pageHeight - 50) {
            pdf.addPage()
            yPosition = margin
          }

          pdf.setFontSize(16)
          pdf.setTextColor(69, 106, 80)
          pdf.text('Actiepunten', margin, yPosition)
          yPosition += 12

          pdf.setDrawColor(69, 106, 80)
          pdf.setLineWidth(0.5)
          pdf.line(margin, yPosition - 2, pageWidth - margin, yPosition - 2)
          yPosition += 5

          exportData.actiepunten.forEach((actie, index) => {
            if (yPosition > pageHeight - 60) {
              pdf.addPage()
              yPosition = margin
            }

            pdf.setFillColor(245, 249, 244)
            pdf.rect(margin, yPosition - 3, usableWidth, 35, 'F')

            pdf.setDrawColor(200, 200, 200)
            pdf.setLineWidth(0.2)
            pdf.rect(margin, yPosition - 3, usableWidth, 35)

            pdf.setFontSize(12)
            pdf.setTextColor(69, 106, 80)
            pdf.text(`${index + 1}. ${actie.naam}`, margin + 3, yPosition + 3)

            const formattedDeadline = new Date(actie.deadline).toLocaleDateString('nl-NL', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric'
            })

            pdf.text(`Deadline: ${formattedDeadline}`, pageWidth - margin - 40, yPosition + 3)

            pdf.setFontSize(10)
            pdf.setTextColor(100, 100, 100)
            pdf.text(`Wie kan helpen: ${actie.begeleider}`, pageWidth - margin - 60, yPosition + 8)

            pdf.setDrawColor(180, 180, 180)
            pdf.setLineWidth(0.1)
            pdf.line(margin + 3, yPosition + 10, pageWidth - margin - 3, yPosition + 10)

            pdf.setFontSize(10)
            pdf.setTextColor(0, 0, 0)
            const resultLines = pdf.splitTextToSize(actie.resultaat, usableWidth - 10)
            pdf.text(resultLines, margin + 3, yPosition + 15)

            pdf.setFont('helvetica', 'italic')
            pdf.setFontSize(9)
            pdf.setTextColor(120, 120, 120)
            pdf.text(`Type: ${actie.soort}`, margin + 3, yPosition + 28)
            pdf.setFont('helvetica', 'normal')

            yPosition += 40
          })

          yPosition += 10
        }

        // Add opmerkingen section if present
        if (exportData.opmerkingen && exportData.opmerkingen.length > 0) {
          if (yPosition > pageHeight - 60) {
            pdf.addPage()
            yPosition = margin
          }
          pdf.setFontSize(16)
          pdf.setTextColor(69, 106, 80)
          pdf.text('Opmerkingen', margin, yPosition)
          yPosition += 10

          exportData.opmerkingen.forEach((opm, idx) => {
            if (yPosition > pageHeight - 40) {
              pdf.addPage()
              yPosition = margin
            }
            pdf.setFontSize(12)
            pdf.setTextColor(69, 106, 80)
            pdf.text(`${idx + 1}. ${opm.titel}`, margin + 2, yPosition)
            pdf.setFontSize(10)
            pdf.setTextColor(0)
            const beschrijvingLines = pdf.splitTextToSize(opm.beschrijving, usableWidth - 10)
            pdf.text(beschrijvingLines, margin + 6, yPosition + 6)
            pdf.setFontSize(9)
            pdf.setTextColor(120, 120, 120)
            pdf.text(
              `Door: ${opm.begeleider.voornaam} ${opm.begeleider.achternaam} op ${new Date(opm.createdAt).toLocaleDateString('nl-NL')}`,
              margin + 6,
              yPosition + 14 + beschrijvingLines.length * 5
            )
            yPosition += 22 + beschrijvingLines.length * 5
          })
          yPosition += 5
        }

        // Add signature boxes
        const signatureBoxHeight = 25
        const signatureBoxWidth = (usableWidth - 10) / 2

        if (yPosition + signatureBoxHeight + 20 > pageHeight - margin) {
          pdf.addPage()
          yPosition = margin
        } else {
          yPosition = Math.max(yPosition, pageHeight - margin - signatureBoxHeight - 15)
        }

        const box1X = margin
        const box2X = margin + signatureBoxWidth + 10

        pdf.setDrawColor(0)
        pdf.setLineWidth(0.3)
        pdf.setFillColor(255, 255, 255)

        pdf.rect(box1X, yPosition, signatureBoxWidth, signatureBoxHeight)
        pdf.rect(box2X, yPosition, signatureBoxWidth, signatureBoxHeight)

        pdf.setFontSize(10)
        pdf.setTextColor(0)
        pdf.text('Handtekening arbeider', box1X + 2, yPosition + signatureBoxHeight + 5)
        pdf.text('Handtekening maatwerkcoach', box2X + 2, yPosition + signatureBoxHeight + 5)

        const dateStr = new Date().toISOString().split('T')[0]
        const suffix = exportData.fileNameSuffix || ''
        const fileName = `POP-evaluatie-${exportData.user.replace(/\s+/g, '-')}-${dateStr}${suffix}.pdf`
        pdf.save(fileName)
      } catch (error) {
        console.error('PDF generation error:', error)
        throw error
      }
    },

    getMonthLabel(monthKey: string) {
      const month = this.availableMonths.find(m => m.value === monthKey)
      return month ? month.label : monthKey
    },

    actiepuntToevoegen() {
      if (!this.actieNaam || !this.actieSoort || !this.resultaat || !this.deadline || !this.begeleider) {
        alert('Vul alle velden in')
        return
      }

      this.actiepunten.push({
        naam: this.actieNaam,
        soort: this.actieSoort,
        resultaat: this.resultaat,
        deadline: this.deadline,
        begeleider: this.begeleider
      })

      this.actieNaam = ''
      this.actieSoort = ''
      this.resultaat = ''
      this.deadline = ''
      this.begeleider = ''
    },

    formatDate(dateString: string) {
      if (!dateString) return ''
      const date = new Date(dateString)
      return date.toLocaleDateString('nl-NL', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      })
    },

    closeModal() {
      this.showModal = false
    },

    openModal() {
      this.showModal = true
    },

    removeActiepunt(index: number) {
      this.actiepunten.splice(index, 1)
    }
  }
})
</script>

<style scoped>
[id^="chart-task-"] {
  width: 100%;
  height: 350px;
}
</style>