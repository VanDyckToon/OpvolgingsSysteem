<template>
  <div class="min-h-screen bg-[#ECF3EB] flex flex-col">
    <HeaderComponent :begeleiderID="begeleiderID" />
    <div class="flex-grow flex justify-center items-center">
      <div class="w-full max-w-4xl p-8 bg-white shadow-lg rounded-lg">
        <h2 class="text-2xl font-bold mb-6 text-center text-[#456A50]">
          Competenties - {{ gebruiker?.voornaam }}
          {{ gebruiker?.achternaam }}
        </h2>

        <ul v-if="competenties.length" class="divide-y divide-gray-200">
          <li
            v-for="competentie in competenties"
            :key="competentie.competentieID"
            class="py-4 flex items-center justify-between"
          >
            <div class="text-[#456A50] font-bold">
              {{ competentie.naam }}
              <span
                v-if="latestScores[competentie.competentieID]"
                :style="{
                  color: latestScores[competentie.competentieID].kleurcode,
                }"
                class="ml-2"
              >
                (Laatste score:
                {{ latestScores[competentie.competentieID].scoreNaam }})
              </span>
            </div>

            <div class="flex items-center space-x-4">
              <select
                v-model="selectedScores[competentie.competentieID]"
                class="border border-gray-300 p-2 rounded"
              >
                <option disabled value="">Selecteer een score</option>
                <option
                  v-for="score in scores"
                  :key="score.scoreID"
                  :value="score.scoreID"
                >
                  {{ score.scoreNaam }}
                </option>
              </select>
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

        <div class="text-center mt-6">
          <button
            class="px-6 py-2 text-white bg-[#456A50] rounded shadow hover:bg-[#3a5742] transition duration-300"
            @click="saveScores"
          >
            Opslaan
          </button>
        </div>
      </div>
    </div>

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

interface CompetentieGebruiker {
  competentie: {
    competentieID: number
  }
  score: {
    scoreID: number
    scoreNaam: string
    kleurcode: string // Add kleurcode to the score object
  }
}

interface Gebruiker {
  gebruikerID: number
  voornaam: string
  achternaam: string
}

interface Score {
  scoreID: number
  scoreNaam: string
  kleurcode: string // Add kleurcode here as well
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
      scores: [] as Score[],
      selectedScores: {} as Record<number, number | null>,
      showPopup: false,
      selectedCompetentie: null as Competentie | null,
      latestScores: {} as Record<
        number,
        { scoreID: number; scoreNaam: string; kleurcode: string }
      >,
      gebruiker: null as Gebruiker | null,
    }
  },
  async mounted() {
    await this.fetchCompetenties()
    await this.fetchScores()
    await this.fetchLatestScoredCompetencies()
    await this.fetchWerknemer()
    this.startPolling() // Start polling for updates
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
    async fetchWerknemer() {
      try {
        const token = localStorage.getItem('access_token')

        const response = await axios.get(
          `http://localhost:3000/gebruiker/${this.$route.params.id}`,
          { headers: { Authorization: `Bearer ${token}` } },
        )
        this.gebruiker = response.data
      } catch (error) {
        console.error('Fout bij het ophalen van gebruiker details:', error)
      }
    },

    async fetchLatestScoredCompetencies() {
      try {
        const token = localStorage.getItem('access_token')
        const response = await axios.get(
          `http://localhost:3000/competentie-gebruiker/werknemer/${this.begeleiderID}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        )

        response.data.forEach((competentie: CompetentieGebruiker) => {
          this.latestScores[competentie.competentie.competentieID] = {
            scoreID: competentie.score?.scoreID,
            scoreNaam: competentie.score?.scoreNaam || 'Geen score',
            kleurcode: competentie.score?.kleurcode || '#000000', // Default color if not provided
          }
          // Set the selected score to the latest score
          this.selectedScores[competentie.competentie.competentieID] =
            competentie.score?.scoreID || null
        })
      } catch (error) {
        console.error(
          'Er is een fout opgetreden bij het ophalen van de laatste scores:',
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
    async saveScores() {
      try {
        const token = localStorage.getItem('access_token')
        const payload = Object.keys(this.selectedScores).map(competentieID => ({
          datumBeoordeeld: new Date(),
          gebruiker: { gebruikerID: this.begeleiderID },
          score: { scoreID: this.selectedScores[parseInt(competentieID)] },
          competentie: { competentieID: parseInt(competentieID) },
        }))

        await axios.post(
          'http://localhost:3000/competentie-gebruiker',
          payload,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        )

        // Reload the page after saving
        window.location.reload() // Reloads the entire page
      } catch (error) {
        console.error(
          'Er is een fout opgetreden bij het opslaan van de scores:',
          error,
        )
        alert('Er is een fout opgetreden bij het opslaan van de scores.')
      }
    },

    startPolling() {
      setInterval(() => {
        this.fetchCompetenties()
        this.fetchScores()
        this.fetchLatestScoredCompetencies(),
      }, 5000) // Poll every 5000 ms (5 seconds)
    },
  },
})
</script>
