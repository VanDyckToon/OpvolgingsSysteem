<template>
  <div class="min-h-screen bg-[#ECF3EB] flex flex-col">
    <HeaderComponent :begeleiderID="begeleiderID" />
    <div class="flex-grow flex justify-center items-center">
      <div class="w-full max-w-4xl p-8 bg-white shadow-lg rounded-lg">
        <div v-if="gebruiker" class="space-y-4">
          <div class="flex items-start">
            <div class="w-1/2 pr-4">
              <h2 class="text-2xl font-bold mb-2 text-left text-black">
                Persoon gegevens
              </h2>
              <div class="flex flex-col text-[#104116] rounded-md">
                <p class="font-bold">
                  {{ gebruiker.voornaam }} {{ gebruiker.achternaam }}
                </p>
                <p class="font-bold">
                  {{ gebruiker.straat }} {{ gebruiker.nummer }},
                  {{ gebruiker.postcode }} {{ gebruiker.woonplaats }}
                </p>
              </div>
              <div class="pt-6">
                <h2 class="text-2xl font-bold mb-2 text-left text-black">
                  Contact gegevens
                </h2>
                <div class="flex flex-col text-[#104116] rounded-md">
                  <p class="font-bold">GSM: {{ gebruiker.telefoonnummer }}</p>
                  <p class="font-bold">E-mailadres: {{ gebruiker.email }}</p>
                  <p class="font-bold text-[#C72C41]">
                    ICE: {{ gebruiker.ICENaam }} -
                    {{ gebruiker.ICETelefoonnummer }}
                  </p>
                </div>
              </div>
              <div class="py-6">
                <h2 class="text-2xl font-bold mb-2 text-left text-black">
                  Extra opmerkingen
                </h2>
                <div class="flex flex-col text-[#104116] rounded-md">
                  <p class="font-bold">{{ gebruiker.extraOpmerking }}</p>
                </div>
              </div>
            </div>
            <div class="w-1/2">
              <img
                v-if="gebruiker.foto"
                :src="`/src/assets/${gebruiker.foto}.jpg`"
                alt="Profile picture"
                class="w-72 h-72 object-cover rounded-full mb-4 float-right m-8"
              />
              <img
                v-else
                :src="`/src/assets/no_image_available.jpg`"
                alt="No picture available"
                class="w-72 h-72 object-cover rounded-full mb-4 float-right m-8"
              />
            </div>
          </div>
        </div>
        <p v-else class="text-center text-gray-500">Geen gegevens gevonden</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import axios from 'axios'
import { defineComponent } from 'vue'
import HeaderComponent from '../components/Header.vue'

interface Gebruiker {
  gebruikerID: number
  voornaam: string
  achternaam: string
  straat: string
  nummer: string
  postcode: string
  woonplaats: string
  email: string
  ICENaam: string
  ICETelefoonnummer: string
  foto: string
  telefoonnummer: string
  extraOpmerking: string
}

export default defineComponent({
  name: 'GebruikerDetailPage',
  components: {
    HeaderComponent,
  },
  data() {
    return {
      gebruiker: null as Gebruiker | null,
      begeleiderID: this.$route.params.id as string, // Retrieve the begeleiderID from route parameters
    }
  },
  async mounted() {
    this.fetchGebruikerDetails()
  },
  methods: {
    async fetchGebruikerDetails() {
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
  },
})
</script>

<style scoped>
/* Add any additional styling here */
</style>
