<template>
  <div class="min-h-screen bg-[#ECF3EB] flex flex-col">
    <HeaderComponent :begeleiderID="begeleiderID" />
    <div class="flex-grow flex justify-center items-center">
      <div class="w-full max-w-4xl p-8 bg-white shadow-lg rounded-lg">
        <div class="flex justify-between mb-6">
          <h2 class="text-2xl font-bold mb-4 text-left text-black">
            Opmerkingen: {{ gebruiker?.voornaam }} {{ gebruiker?.achternaam }}
          </h2>
          <button
            @click="openModal"
            class="mt-2 px-4 py-2 bg-[#456A50] text-white rounded"
          >
            Alle opmerkingen bekijken
          </button>
        </div>

        <div class="flex">
          <!-- Left Side: List of Comments -->
          <div class="w-1/2 pr-4">
            <h3 class="text-xl font-semibold mb-2">Laatste 4 Opmerkingen</h3>
            <div v-if="limitedComments.length > 0" class="space-y-2">
              <div
                v-for="comment in limitedComments"
                :key="comment.opmerkingID"
                class="p-4 border rounded bg-gray-100"
              >
                <h4 class="font-bold">{{ comment.titel }}</h4>
                <p class="text-gray-500 text-sm">
                  {{ formatDate(comment.createdAt) }}
                </p>
                <p>{{ comment.beschrijving }}</p>
              </div>
            </div>
            <p v-else class="text-gray-500">Geen opmerkingen gevonden</p>
          </div>

          <!-- Right Side: Latest Comment and Input -->
          <div class="w-1/2 pl-4">
            <h3 class="text-xl font-semibold mb-2">Laatste Opmerking</h3>
            <div
              v-if="latestComment"
              class="p-4 border rounded bg-gray-100 mb-4"
            >
              <h4 class="font-bold">{{ latestComment.titel }}</h4>
              <p class="text-gray-500 text-sm">
                {{ formatDate(latestComment.createdAt) }}
              </p>
              <p>{{ latestComment.beschrijving }}</p>
            </div>
            <p v-else class="text-gray-500 mb-4">Geen opmerkingen gevonden</p>
            <hr />
            <h3 class="text-xl font-semibold my-2">Geef een Opmerking</h3>
            <input
              v-model="newTitle"
              type="text"
              class="w-full p-2 border rounded mb-2"
              placeholder="Titel van de opmerking"
            />
            <textarea
              v-model="newComment"
              class="w-full p-2 border rounded mb-2"
              rows="4"
              placeholder="Typ je opmerking hier..."
            ></textarea>
            <button
              @click="submitComment"
              class="mt-2 px-4 py-2 bg-[#456A50] text-white rounded"
            >
              Verzenden
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Popup Modal for All Comments -->
    <div
      v-if="showModal"
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div class="bg-white rounded-lg p-6 w-11/12 max-w-3xl">
        <h2 class="text-2xl font-bold mb-4">Alle Opmerkingen</h2>
        <div
          v-if="comments.length > 0"
          class="space-y-4 max-h-[600px] overflow-y-auto"
        >
          <div
            v-for="comment in comments"
            :key="comment.opmerkingID"
            class="border-b border-gray-200 py-2"
          >
            <h3 class="font-semibold text-lg">{{ comment.titel }}</h3>
            <p class="text-gray-500 text-sm">
              {{ formatDate(comment.createdAt) }}
            </p>
            <p>{{ comment.beschrijving }}</p>
          </div>
        </div>
        <p v-else class="text-center text-gray-500">
          Geen opmerkingen gevonden
        </p>
        <button
          @click="closeModal"
          class="mt-4 bg-[#456A50] text-white py-2 px-4 rounded"
        >
          Sluiten
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import axios from 'axios'
import { defineComponent } from 'vue'
import HeaderComponent from '../components/Header.vue'
import { jwtDecode } from 'jwt-decode'

interface Opmerking {
  opmerkingID: number
  titel: string
  beschrijving: string
  createdAt: string
}

interface Gebruiker {
  gebruikerID: number
  voornaam: string
  achternaam: string
}

export default defineComponent({
  name: 'OpmerkingenPage',
  components: {
    HeaderComponent,
  },
  data() {
    return {
      gebruiker: null as Gebruiker | null,
      comments: [] as Opmerking[],
      latestComment: null as Opmerking | null,
      newComment: '',
      newTitle: '',
      begeleiderID: null as number | null,
      showModal: false,
    }
  },
  computed: {
    limitedComments() {
      return this.comments.slice(0, 4)
    },
  },
  async mounted() {
    await this.fetchGebruikerDetails()
    await this.fetchOpmerkingen()
  },
  methods: {
    async fetchGebruikerDetails() {
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
    async fetchOpmerkingen() {
      try {
        const token = localStorage.getItem('access_token')
        const response = await axios.get(
          `${import.meta.env.VITE_APP_API_URL}/opmerking/werknemer/${this.$route.params.id}`,
          { headers: { Authorization: `Bearer ${token}` } },
        )
        this.comments = response.data
        this.latestComment = this.comments[0] || null
      } catch (error) {
        console.error('Fout bij het ophalen van opmerkingen:', error)
      }
    },
    async submitComment() {
      if (!this.newComment || !this.newTitle) return
      try {
        const token = localStorage.getItem('access_token')
        if (token) {
          const decodedToken = jwtDecode(token) as { gebruikerID: number }
          this.begeleiderID = decodedToken.gebruikerID
        }

        const commentData = {
          titel: this.newTitle,
          beschrijving: this.newComment,
          werknemer: { gebruikerID: this.gebruiker?.gebruikerID },
          begeleider: { gebruikerID: this.begeleiderID },
        }
        await axios.post(`${import.meta.env.VITE_APP_API_URL}/opmerking`, commentData, {
          headers: { Authorization: `Bearer ${token}` },
        })
        this.newComment = ''
        this.newTitle = ''
        await this.fetchOpmerkingen()
      } catch (error) {
        console.error('Fout bij het verzenden van opmerking:', error)
      }
    },
    formatDate(dateString: string) {
      return new Date(dateString).toLocaleDateString('nl-NL')
    },
    openModal() {
      this.showModal = true
    },
    closeModal() {
      this.showModal = false
    },
  },
})
</script>

<style scoped>
/* Add any additional styling here */
</style>
