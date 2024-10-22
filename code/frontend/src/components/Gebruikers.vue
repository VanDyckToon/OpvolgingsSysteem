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

        <ul v-if="filteredGebruikers.length" class="divide-y divide-gray-200">
          <li
            v-for="gebruiker in filteredGebruikers"
            :key="gebruiker.gebruikerID"
            class="py-4 flex items-center justify-between"
          >
            <div>
              <div class="text-[#456A50] font-bold">
                {{ gebruiker.voornaam }} {{ gebruiker.achternaam }}
              </div>
              <div class="text-gray-400 text-sm">
                {{ gebruiker.telefoonnummer }}
              </div>
            </div>
            <div class="flex space-x-4">
              <Icon
                icon="fluent:person-star-16-filled"
                class="text-[#456A50] w-8 h-8"
              />
              <Icon
                icon="material-symbols:task"
                class="text-[#456A50] w-8 h-8"
              />
              <Icon
                icon="pepicons-pop:dots-x-circle-filled"
                class="text-[#456A50] w-8 h-8"
                @click="goToDetails(gebruiker.gebruikerID)"
              />
              <Icon
                icon="mdi:comments"
                class="text-[#456A50] w-8 h-8"
                @click="goToOpmerkingen(gebruiker.gebruikerID)"
              />
            </div>
          </li>
        </ul>
        <p v-else class="text-center text-gray-500">Geen gebruikers gevonden</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import axios from 'axios'
import { defineComponent } from 'vue'
import { Icon } from '@iconify/vue'
import HeaderComponent from '../components/Header.vue'
import { jwtDecode } from 'jwt-decode'

interface Gebruiker {
  gebruikerID: number
  voornaam: string
  achternaam: string
  telefoonnummer: string
}

export default defineComponent({
  name: 'GebruikersPage',
  components: {
    Icon,
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
  },
})
</script>

<style scoped>
/* Voeg hier eventueel extra stijlen toe als dat nodig is */
</style>
