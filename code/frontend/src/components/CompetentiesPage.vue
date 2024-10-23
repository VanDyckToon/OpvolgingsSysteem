<template>
  <div class="min-h-screen bg-[#ECF3EB] flex flex-col">
    <HeaderComponent :begeleiderID="begeleiderID" />
    <div class="flex-grow flex justify-center items-center">
      <div class="w-full max-w-4xl p-8 bg-white shadow-lg rounded-lg">
        <h2 class="text-2xl font-bold mb-6 text-center text-[#456A50]">
          Competenties
        </h2>

        <ul v-if="competenties.length" class="divide-y divide-gray-200">
          <li
            v-for="competentie in competenties"
            :key="competentie.competentieID"
            class="py-4 flex items-center justify-between"
          >
            <!-- Competentie Naam -->
            <div class="text-[#456A50] font-bold">
              {{ competentie.naam }}
            </div>

            <!-- Dropdown met mogelijke scores en standaardwaarde -->
            <div class="flex items-center space-x-4">
              <select
                v-model="selectedScores[competentie.competentieID]"
                class="border border-gray-300 p-2 rounded"
              >
                <!-- Voeg een standaard 'selecteer' optie toe -->
                <option disabled value="">Selecteer een score</option>
                <option
                  v-for="score in scores"
                  :key="score.scoreID"
                  :value="score.scoreNaam"
                >
                  {{ score.scoreNaam }}
                </option>
              </select>

              <!-- Info Icon met Popup -->
              <Icon
                icon="material-symbols:info"
                class="text-[#456A50] w-8 h-8 cursor-pointer"
                @click="openPopup(competentie)"
              />
            </div>
          </li>
        </ul>
        <p v-else class="text-center text-gray-500">
          Geen competenties gevonden
        </p>
      </div>
    </div>

    <!-- Popup Modal -->
    <div
      v-if="showPopup"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <div class="bg-white p-6 rounded-lg shadow-lg max-w-lg">
        <h3 class="text-xl font-bold text-[#456A50]">
          {{ selectedCompetentie?.naam }}
        </h3>
        <p class="mt-4">{{ selectedCompetentie?.beschrijving }}</p>
        <button
          class="mt-6 text-white bg-[#456A50] px-4 py-2 rounded"
          @click="closePopup"
        >
          Sluiten
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Icon } from '@iconify/vue'
import axios from 'axios'
import HeaderComponent from '../components/Header.vue'

interface Competentie {
  competentieID: number
  naam: string
  beschrijving: string
}

interface Score {
  scoreID: number
  scoreNaam: string
}

export default defineComponent({
  name: 'CompetentiesPage',
  components: {
    HeaderComponent,
    Icon,
  },
  data() {
    return {
      begeleiderID: this.$route.params.id as string,
      competenties: [] as Competentie[],
      scores: [] as Score[], // Houdt alle mogelijke scores bij
      selectedScores: {} as Record<number, string>, // Houdt geselecteerde score per competentie bij
      showPopup: false,
      selectedCompetentie: null as Competentie | null,
    }
  },
  async mounted() {
    await this.fetchCompetenties()
    await this.fetchScores() // Haal scores op bij het laden van de component
  },
  methods: {
    async fetchCompetenties() {
      try {
        const token = localStorage.getItem('access_token')
        const response = await axios.get('http://localhost:3000/competentie', {
          headers: { Authorization: `Bearer ${token}` },
        })
        this.competenties = response.data
      } catch (error) {
        console.error(
          'Er is een fout opgetreden bij het ophalen van de competenties:',
          error,
        )
      }
    },
    async fetchScores() {
      try {
        const token = localStorage.getItem('access_token')
        const response = await axios.get('http://localhost:3000/score', {
          headers: { Authorization: `Bearer ${token}` },
        })
        this.scores = response.data
      } catch (error) {
        console.error(
          'Er is een fout opgetreden bij het ophalen van de scores:',
          error,
        )
      }
    },
    openPopup(competentie: Competentie) {
      this.selectedCompetentie = competentie
      this.showPopup = true
    },
    closePopup() {
      this.showPopup = false
      this.selectedCompetentie = null
    },
  },
})
</script>

<style scoped>
/* Voeg hier extra stijlen toe als dat nodig is */
</style>
