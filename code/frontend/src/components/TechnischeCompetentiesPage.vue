<template>
  <div class="min-h-screen bg-[#ECF3EB] flex flex-col">
    <HeaderComponent :begeleiderID="begeleiderID" />
    <div class="flex-grow flex justify-center items-center">
      <div class="w-full max-w-4xl p-8 bg-white shadow-lg rounded-lg">
        <h2 class="text-2xl font-bold text-center text-[#456A50] pb-3">
          Technische Competenties - {{ gebruiker?.voornaam }}
          {{ gebruiker?.achternaam }}
        </h2>

        <div class="flex justify-end mb-4">
          <!-- Toggle knop om NVT te tonen/verborgen te maken, helemaal rechts en kleur aangepast -->
          <button
            class="px-6 py-2 text-white rounded shadow transition duration-300 mb-6"
            :class="{
              'bg-[#456A50] hover:bg-[#3a5742]': !showNVT,
              'bg-[#104116] hover:bg-[#104116]': showNVT,
            }"
            @click="toggleShowNVT"
          >
            {{ showNVT ? 'Verberg NVT' : 'Toon NVT' }}
          </button>
        </div>
        <div
          class="md:h-[28rem] lg:h-[22rem] overflow-y-scroll [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#456A50] dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
        >
          <ul
            v-if="filteredCompetenties.length"
            class="divide-y divide-gray-200"
          >
            <li
              v-for="taak in taken"
              :key="taak.taakID"
              class="py-4 flex items-center justify-between"
            >
              <!-- Taak Naam + Technische Competenties op dezelfde lijn -->
              <div class="flex items-start w-full">
                <div class="text-[#456A50] font-bold w-1/3 py-2">
                  {{ taak.naam }}
                </div>
                <div class="flex-grow">
                  <ul>
                    <li
                      v-for="competentie in filteredCompetentiesForTaak(
                        taak.taakID,
                      )"
                      :key="competentie.technischeCompetentieID"
                      class="py-2 flex items-start"
                    >
                      <div class="flex-grow">
                        {{ competentie.naam }}
                        <span
                          v-if="
                            latestScores[competentie.technischeCompetentieID]
                          "
                          :style="{
                            color:
                              latestScores[competentie.technischeCompetentieID]
                                .kleurcode,
                          }"
                          class="ml-2 font-bold"
                          ><br />
                          (Laatste score:
                          {{
                            latestScores[competentie.technischeCompetentieID]
                              ?.scoreNaam
                          }})
                        </span>
                      </div>
                      <div class="flex items-center space-x-4">
                        <select
                          v-model="
                            selectedScores[competentie.technischeCompetentieID]
                          "
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
                </div>
              </div>
            </li>
          </ul>

          <p v-else class="text-center text-gray-500">
            Geen technische competenties gevonden
          </p>
        </div>
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

    <!-- Popup Modal -->
    <div
      v-if="showPopup"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <div class="bg-white p-6 rounded-lg shadow-lg max-w-lg">
        <h3 class="text-xl font-bold text-[#456A50]">
          {{ selectedTechnischeCompetentie?.naam }}
        </h3>
        <p class="mt-4">{{ selectedTechnischeCompetentie?.beschrijving }}</p>
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

interface TechnischeCompetentie {
  technischeCompetentieID: number
  naam: string
  beschrijving: string
}

interface TechnischeCompetentieGebruiker {
  technischeCompetentie: {
    technischeCompetentieID: number
    taakID: number
  }
  score: {
    scoreID: number
    scoreNaam: string
    kleurcode: string
  }
}

interface Score {
  scoreID: number
  scoreNaam: string
  kleurcode: string
}

interface Taak {
  taakID: number
  naam: string
  technischeCompetenties: TechnischeCompetentie[]
  groep: {
    groepID: number
  }
}
interface Gebruiker {
  gebruikerID: number
  voornaam: string
  achternaam: string
}

export default defineComponent({
  name: 'TechnischeCompetentiesPage',
  components: {
    HeaderComponent,
    Icon,
  },
  data() {
    return {
      begeleiderID: this.$route.params.id as string,
      taken: [] as Taak[],
      scores: [] as Score[],
      selectedScores: {} as Record<number, number | null>, // Gebruiker's geselecteerde scores per technische competentie
      showPopup: false,
      selectedTechnischeCompetentie: null as TechnischeCompetentie | null,
      latestScores: {} as Record<
        number,
        { scoreID: number; scoreNaam: string; kleurcode: string }
      >,
      showNVT: false, // Nieuwe data-eigenschap om de NVT-scores te tonen/verbergen
      gebruiker: null as Gebruiker | null,
    }
  },
  computed: {
    // Filter de competenties afhankelijk van de showNVT-status en de taakID
    filteredCompetenties() {
      return this.taken.flatMap(taak =>
        taak.technischeCompetenties.filter(competentie => {
          // Als showNVT false is, filter de NVT-scores uit
          if (!this.showNVT) {
            return (
              this.latestScores[competentie.technischeCompetentieID]
                ?.scoreNaam !== 'NVT'
            )
          }
          // Als showNVT true is, toon alles, inclusief NVT
          return true
        }),
      )
    },
  },
  methods: {
    // Haal de competenties voor een specifieke taak op
    filteredCompetentiesForTaak(taakID: number) {
      return (
        this.taken
          .find(taak => taak.taakID === taakID)
          ?.technischeCompetenties.filter(competentie => {
            // Filteren op basis van de NVT-status en de taakID
            if (!this.showNVT) {
              return (
                this.latestScores[competentie.technischeCompetentieID]
                  ?.scoreNaam !== 'NVT'
              )
            }
            return true
          }) || []
      )
    },

    // Toggle voor het tonen/verbergen van NVT-scores
    toggleShowNVT() {
      this.showNVT = !this.showNVT
    },

    // Haal de taken voor de gebruiker op
    async fetchTaken() {
      try {
        const token = localStorage.getItem('access_token')
        const response = await axios.get(
          `${import.meta.env.VITE_APP_API_URL}/taak/gebruiker/${this.begeleiderID}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        )
        this.taken = response.data.sort(
          (a: Taak, b: Taak) => a.groep.groepID - b.groep.groepID,
        )
      } catch (error) {
        console.error(
          'Er is een fout opgetreden bij het ophalen van de taken:',
          error,
        )
      }
    },

    async fetchWerknemer() {
      try {
        const token = localStorage.getItem('access_token')

        const response = await axios.get(
          `${import.meta.env.VITE_APP_API_URL}/gebruiker/${this.$route.params.id}`,
          { headers: { Authorization: `Bearer ${token}` } },
        )
        this.gebruiker = response.data
      } catch (error) {
        console.error('Fout bij het ophalen van gebruiker details:', error)
      }
    },

    // Haal de beschikbare scores op
    async fetchScores() {
      try {
        const token = localStorage.getItem('access_token')
        const response = await axios.get(
          `${import.meta.env.VITE_APP_API_URL}/score`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        )
        this.scores = response.data
      } catch (error) {
        console.error(
          'Er is een fout opgetreden bij het ophalen van de scores:',
          error,
        )
      }
    },

    // Haal de laatste scores op voor de gebruiker
    async fetchLatestScores() {
      try {
        const token = localStorage.getItem('access_token')
        const response = await axios.get(
          `${import.meta.env.VITE_APP_API_URL}/technische-competentie-gebruiker/werknemer/${this.begeleiderID}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        )
        response.data.forEach((competentie: TechnischeCompetentieGebruiker) => {
          this.latestScores[
            competentie.technischeCompetentie.technischeCompetentieID
          ] = {
            scoreID: competentie.score?.scoreID,
            scoreNaam: competentie.score?.scoreNaam || 'Geen score',
            kleurcode: competentie.score?.kleurcode || '#000000', // Default color
          }
        })
      } catch (error) {
        console.error(
          'Er is een fout opgetreden bij het ophalen van de laatste scores:',
          error,
        )
      }
    },

    // Sla de geselecteerde scores op
    async saveScores() {
      try {
        const token = localStorage.getItem('access_token')
        const payload = Object.keys(this.selectedScores).map(
          technischeCompetentieID => ({
            datumBeoordeeld: new Date(),
            gebruiker: { gebruikerID: this.begeleiderID },
            score: {
              scoreID: this.selectedScores[parseInt(technischeCompetentieID)],
            },
            technischeCompetentie: {
              technischeCompetentieID: parseInt(technischeCompetentieID),
            },
          }),
        )

        // Verstuur de payload naar de backend om de scores op te slaan
        await axios.post(
          `${import.meta.env.VITE_APP_API_URL}/technische-competentie-gebruiker`,
          payload,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        )
        window.location.reload()
      } catch (error) {
        console.error(
          'Er is een fout opgetreden bij het opslaan van de scores:',
          error,
        )
        alert('Er is een fout opgetreden bij het opslaan van de scores.')
      }
    },

    openPopup(competentie: TechnischeCompetentie) {
      this.selectedTechnischeCompetentie = competentie
      this.showPopup = true
    },

    closePopup() {
      this.showPopup = false
      this.selectedTechnischeCompetentie = null
    },
  },

  async mounted() {
    await this.fetchTaken()
    await this.fetchScores()
    await this.fetchLatestScores()
    await this.fetchWerknemer()
  },
})
</script>
