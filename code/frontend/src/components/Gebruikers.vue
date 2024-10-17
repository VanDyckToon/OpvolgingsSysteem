<template>
  <div class="min-h-screen bg-[#ECF3EB] flex flex-col">
    <HeaderComponent />
    <div class="flex-grow flex justify-center items-center">
      <div class="w-full max-w-4xl p-8 bg-white shadow-lg rounded-lg">
        <h2 class="text-2xl font-bold mb-6 text-center text-[#456A50]">
          Werknemer(s)
        </h2>
        <ul v-if="gebruikers.length" class="divide-y divide-gray-200">
          <li
            v-for="gebruiker in gebruikers"
            :key="gebruiker.gebruikerID"
            class="py-4 flex items-center justify-between"
          >
            <div>
              <div class="text-[#456A50] font-bold">
                {{ gebruiker.voornaam }} {{ gebruiker.achternaam }}
              </div>
              <div class="text-gray-400 text-sm">
                {{ gebruiker.ICENaam }}
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
              />
              <Icon icon="mdi:comments" class="text-[#456A50] w-8 h-8" />
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

interface Gebruiker {
  gebruikerID: number
  voornaam: string
  achternaam: string
  ICENaam: string
}

export default defineComponent({
  name: 'GebruikersPage',
  components: {
    Icon,
    HeaderComponent, // Headercomponent registreren
  },
  data() {
    return {
      gebruikers: [] as Gebruiker[],
      begeleiderID: this.$route.params.id as string,
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

<style scoped>
/* Voeg hier eventueel extra stijlen toe als dat nodig is */
</style>
