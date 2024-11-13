<template>
  <div class="min-h-screen bg-[#ECF3EB] flex flex-col">
    <HeaderComponent :begeleiderID="begeleiderID" />
    <div class="flex-grow flex justify-center items-center">
      <div class="w-full max-w-4xl p-8 bg-white shadow-lg rounded-lg">
        <h2 class="text-2xl font-bold mb-6 text-center text-[#456A50]">
          Opleiding(en) - {{ gebruiker?.voornaam }} {{ gebruiker?.achternaam }}
        </h2>

        <h3 class="text-xl font-semibold mb-2 text-[#456A50]">
          Toekomstige/Huidige Opleidingen
        </h3>
        <ul
          v-if="toekomstigeOpleidingen.length"
          class="divide-y divide-gray-200 mb-6"
        >
          <li
            v-for="opleiding in toekomstigeOpleidingen"
            :key="opleiding.opleidingID"
            class="py-4"
          >
            <div class="text-[#456A50] font-bold">{{ opleiding.naam }}</div>
            <div class="flex">
              <div class="text-gray-600">
                Startdatum:
                {{ new Date(opleiding.datumStart).toLocaleDateString() }}
              </div>
              <div class="text-gray-600">
                - Einddatum:
                {{ new Date(opleiding.datumEind).toLocaleDateString() }}
              </div>
            </div>
          </li>
        </ul>
        <p v-else class="text-center text-gray-500">
          Geen toekomstige opleidingen gevonden
        </p>

        <h3 class="text-xl font-semibold mt-6 mb-2 text-[#456A50]">
          Voltooide Opleidingen
        </h3>
        <ul v-if="voltooideOpleidingen.length" class="divide-y divide-gray-200">
          <li
            v-for="opleiding in voltooideOpleidingen"
            :key="opleiding.opleidingID"
            class="py-4"
          >
            <div class="text-[#456A50] font-bold">{{ opleiding.naam }}</div>
            <div class="flex">
              <div class="text-gray-600">
                Startdatum:
                {{ new Date(opleiding.datumStart).toLocaleDateString() }}
              </div>
              <div class="text-gray-600">
                - Einddatum:
                {{ new Date(opleiding.datumEind).toLocaleDateString() }}
              </div>
            </div>
          </li>
        </ul>
        <p v-else class="text-center text-gray-500">
          Geen voltooide opleidingen gevonden
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import axios from 'axios'
import HeaderComponent from '../components/Header.vue'

interface Gebruiker {
  gebruikerID: number
  voornaam: string
  achternaam: string
}

interface Opleiding {
  opleidingID: number
  naam: string
  datumStart: Date
  datumEind: Date
}

export default defineComponent({
  name: 'GebruikerPage',
  components: {
    HeaderComponent,
  },
  data() {
    return {
      begeleiderID: this.$route.params.id as string,
      gebruiker: null as Gebruiker | null,
      opleidingen: [] as Opleiding[],
      toekomstigeOpleidingen: [] as Opleiding[],
      voltooideOpleidingen: [] as Opleiding[],
    }
  },
  async mounted() {
    await this.fetchWerknemer()
    await this.fetchOpleidingen()
  },
  methods: {
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
    async fetchOpleidingen() {
      try {
        const token = localStorage.getItem('access_token')
        const response = await axios.get(
          `http://localhost:3000/opleiding-gebruiker/gebruiker/${this.$route.params.id}`,
          { headers: { Authorization: `Bearer ${token}` } },
        )
        this.opleidingen = response.data
        console.log(this.opleidingen)
        this.splitOpleidingen()
      } catch (error) {
        console.error('Fout bij het ophalen van de opleidingen:', error)
      }
    },
    splitOpleidingen() {
      const currentDate = new Date()
      currentDate.setHours(0, 0, 0, 0) // Alleen de datum vergelijken, geen tijd

      this.toekomstigeOpleidingen = this.opleidingen.filter(opleiding => {
        const endDate = new Date(opleiding.datumEind)
        endDate.setHours(0, 0, 0, 0)
        return endDate >= currentDate
      })

      this.voltooideOpleidingen = this.opleidingen.filter(opleiding => {
        const endDate = new Date(opleiding.datumEind)
        endDate.setHours(0, 0, 0, 0)
        return endDate < currentDate
      })
    },
  },
})
</script>
