<template>
  <div class="p-8 bg-white shadow-lg rounded-lg">
    <h2 class="text-2xl font-bold mb-6 text-center text-[#456A50]">
      Instellingen
    </h2>
    <div v-if="gebruiker" class="space-y-4">
      <div><strong>Voornaam:</strong> {{ gebruiker.voornaam }}</div>
      <div><strong>Achternaam:</strong> {{ gebruiker.achternaam }}</div>
      <div><strong>E-mail:</strong> {{ gebruiker.email }}</div>
      <div><strong>Straat:</strong> {{ gebruiker.straat }}</div>
      <div><strong>Huisnummer:</strong> {{ gebruiker.huisNummer }}</div>
      <div><strong>Postcode:</strong> {{ gebruiker.postcode }}</div>
      <div><strong>Woonplaats:</strong> {{ gebruiker.woonplaats }}</div>
      <div><strong>ICENaam:</strong> {{ gebruiker.ICENaam }}</div>
      <div>
        <strong>Telefoonnummer:</strong> {{ gebruiker.ICETelefoonnummer }}
      </div>
      <img
        v-if="gebruiker.foto"
        :src="gebruiker.foto"
        alt="Gebruiker Foto"
        class="w-32 h-32 rounded-full"
      />
    </div>
    <p v-else class="text-center text-gray-500">Loading...</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import axios from 'axios'

interface Gebruiker {
  gebruikerID: number
  voornaam: string
  achternaam: string
  email: string
  straat: string
  huisNummer: string
  postcode: string
  woonplaats: string
  ICENaam: string
  ICETelefoonnummer: string
  foto: string
}

export default defineComponent({
  name: 'SettingsPage',
  data() {
    return {
      gebruiker: null as Gebruiker | null,
    }
  },
  async mounted() {
    await this.fetchGebruiker()
  },
  methods: {
    async fetchGebruiker() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_API_URL}/gebruiker/${this.$route.params.id}`,
        )
        this.gebruiker = response.data
      } catch (error) {
        console.error(
          'Er is een fout opgetreden bij het ophalen van de gebruiker:',
          error,
        )
      }
    },
  },
})
</script>

<style scoped>
/* Voeg hier eventueel extra stijlen toe als dat nodig is */
</style>
