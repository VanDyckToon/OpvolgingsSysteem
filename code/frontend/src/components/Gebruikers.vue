<template>
  <div class="min-h-screen bg-[#ECF3EB] flex flex-col">
    <HeaderComponent :begeleiderID="begeleiderID" />
    <div class="flex-grow flex justify-center items-center">
      <div class="w-full max-w-4xl p-8 bg-white shadow-lg rounded-lg">
        <h2 class="text-2xl font-bold mb-6 text-center text-[#456A50]">
          Werknemer(s)
        </h2>

        <!-- Search Input -->
        <div class="mb-4">
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Zoek gebruikers..."
            class="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div class="max-h-80 overflow-y-auto [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:rounded-full
  [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:rounded-full
  [&::-webkit-scrollbar-thumb]:bg-[#456A50]
  dark:[&::-webkit-scrollbar-track]:bg-neutral-700
  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 pr-4">
        <ul v-if="filteredGebruikers.length" class="divide-y divide-gray-200">
          <li
            v-for="gebruiker in filteredGebruikers"
            :key="gebruiker.gebruikerID"
            class="py-4 flex items-center justify-between"
          >
            <div class="flex items-center">
              <!-- Profile Image -->
              <img
                v-if="gebruiker.foto"
                :src="`/assets/${gebruiker.foto}.jpg`"
                alt="Profile picture"
                class="w-10 h-10 object-cover rounded-full mr-4"
              />
              <img
                v-else
                :src="`/assets/no_image_available.jpg`"
                alt="No picture available"
                class="w-10 h-10 object-cover rounded-full mr-4"
              />
              <!-- User Details -->
              <div>
                <div class="text-[#456A50] font-bold">
                  {{ gebruiker.voornaam }} {{ gebruiker.achternaam }}
                </div>
                <div class="text-gray-400 text-sm">
                  {{ gebruiker.telefoonnummer }}
                </div>
              </div>
            </div>

            <!-- Icons Section -->
            <div class="flex space-x-4">
              <button>
                <img
                  src="../assets/competentiester.svg"
                  alt="competentiester"
                  class="h-8 w-auto object-contain color-[#101234]"
                  @click="goToCompetenties(gebruiker.gebruikerID)"
                />
              </button>
              <button>
                <img
                  src="../assets/technischecompententie.svg"
                  alt="technischecompententie"
                  class="h-8 w-auto object-contain color-[#101234]"
                  @click="goToTechnischeCompetenties(gebruiker.gebruikerID)"
                />
              </button>
              <button>
                <img
                  src="../assets/more.svg"
                  alt="more"
                  class="h-8 w-auto object-contain color-[#101234]"
                  @click="goToDetails(gebruiker.gebruikerID)"
                />
              </button>
              <button>
                <img
                  src="../assets/opleiding-icoon.svg"
                  alt="comment"
                  class="h-8 w-auto object-contain color-[#101234]"
                  @click="goToOpleidingen(gebruiker.gebruikerID)"
                />
              </button>
              <button>
                <img
                  src="../assets/comment.svg"
                  alt="comment"
                  class="h-8 w-auto object-contain color-[#101234]"
                  @click="goToOpmerkingen(gebruiker.gebruikerID)"
                />
              </button>
            </div>
          </li>
        </ul>
        <p v-else class="text-center text-gray-500">Geen gebruikers gevonden</p>
      </div>
    </div>
    </div>
  </div>
</template>

<script lang="ts">
import axios from 'axios'
import { defineComponent } from 'vue'

import HeaderComponent from '../components/Header.vue'
import { jwtDecode } from 'jwt-decode'

interface Gebruiker {
  gebruikerID: number
  voornaam: string
  achternaam: string
  telefoonnummer: string
  foto: string
}

export default defineComponent({
  name: 'GebruikersPage',
  components: {
    HeaderComponent,
  },
  data() {
    return {
      gebruikers: [] as Gebruiker[],
      begeleiderID: this.$route.params.id as string,
      rolID: null as string | null,
      searchQuery: '', // Add a search query property
    }
  },
  async mounted() {
    const token = localStorage.getItem('access_token')
    if (token) {
      try {
        const decodedToken = jwtDecode(token) as { rol: { rolID: string } }
        this.rolID = decodedToken.rol.rolID
      } catch (error) {
        console.error('Error decoding token:', error)
      }
    }
    this.fetchGebruikers()
  },
  computed: {
    filteredGebruikers() {
      return this.gebruikers.filter(gebruiker => {
        const fullName =
          `${gebruiker.voornaam} ${gebruiker.achternaam}`.toLowerCase()
        return fullName.includes(this.searchQuery.toLowerCase()) // Filter by name
      })
    },
  },
  methods: {
    async fetchGebruikers() {
      try {
        const token = localStorage.getItem('access_token')
        if (this.rolID == '1') {
          // Fetch users with rolID 3
          const response = await axios.get(
            'http://localhost:3000/gebruiker/rol/3',
            {
              headers: { Authorization: `Bearer ${token}` },
            },
          )
          this.gebruikers = response.data
        } else if (this.rolID == '2') {
          const response = await axios.get(
            `http://localhost:3000/gebruiker/begeleider/${this.begeleiderID}`,
            { headers: { Authorization: `Bearer ${token}` } },
          )
          this.gebruikers = response.data
        } else {
          const response = await axios.get('http://localhost:3000/admin', {
            headers: { Authorization: `Bearer ${token}` },
          })
          this.gebruikers = response.data
        }
      } catch (error) {
        console.error(
          'Er is een fout opgetreden bij het ophalen van de gebruikers:',
          error,
        )
      }
    },
    goToDetails(gebruikerID: number) {
      this.$router.push({
        name: 'GebruikerDetail',
        params: { id: gebruikerID, begeleiderID: this.begeleiderID },
      })
    },
    goToOpmerkingen(gebruikerID: number) {
      this.$router.push({
        name: 'OpmerkingenPage',
        params: { id: gebruikerID, begeleiderID: this.begeleiderID },
      })
    },
    goToCompetenties(gebruikerID: number) {
      this.$router.push({
        name: 'CompetentiesPage',
        params: { id: gebruikerID, begeleiderID: this.begeleiderID },
      })
    },
    goToTechnischeCompetenties(gebruikerID: number) {
      this.$router.push({
        name: 'TechnischeCompetentiesPage',
        params: { id: gebruikerID, begeleiderID: this.begeleiderID },
      })
    },
    goToOpleidingen(gebruikerID: number) {
      this.$router.push({
        name: 'OpleidingGebruikerPage',
        params: { id: gebruikerID, begeleiderID: this.begeleiderID },
      })
    },
  },
})
</script>

<style scoped>
/* Voeg hier eventueel extra stijlen toe als dat nodig is */
</style>
