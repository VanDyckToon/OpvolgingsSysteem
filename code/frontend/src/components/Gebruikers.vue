<template>
  <div>
    <h1>Gebruikers voor Begeleider {{ begeleiderID }}</h1>
    <ul v-if="gebruikers.length">
      <li v-for="gebruiker in gebruikers" :key="gebruiker.gebruikerID">
        {{ gebruiker.voornaam }} {{ gebruiker.achternaam }}
      </li>
    </ul>
    <p v-else>Geen gebruikers gevonden</p>
  </div>
</template>

<script lang="ts">
import axios from 'axios'
import { defineComponent } from 'vue'

// Definieer een interface voor Gebruiker
interface Gebruiker {
  gebruikerID: number
  voornaam: string
  achternaam: string
}

export default defineComponent({
  name: 'GebruikersPage',
  data() {
    return {
      gebruikers: [] as Gebruiker[], // Lijst van gebruikers
      begeleiderID: this.$route.params.id as string, // Haal het begeleiderID uit de URL
    }
  },
  async mounted() {
    this.fetchGebruikers()
  },
  methods: {
    async fetchGebruikers() {
      try {
        const response = await axios.get(
          `http://localhost:3000/gebruiker/begeleider/${this.begeleiderID}`,
        )
        this.gebruikers = response.data
      } catch (error) {
        console.error(
          'Er is een fout opgetreden bij het ophalen van de gebruikers:',
          error,
        )
      }
    },
  },
})
</script>
