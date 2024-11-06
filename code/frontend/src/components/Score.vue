<template>
  <div class="min-h-screen bg-[#ECF3EB] flex flex-col">
    <HeaderComponent />
    <div class="grid grid-cols-4 gap-4 pt-8 pb-2 px-14">
      <div class="col-span-3">
        <h1 class="text-[#104116] text-4xl font-extrabold pt-4">
          Scores Beheren
        </h1>
        <form @submit.prevent="addScore">
          <div class="mb-6">
            <label
              class="block text-[#456A50] text-xl font-bold mb-2 py-1"
              for="scoreName"
            >
              Score Naam:
            </label>
            <input
              v-model="naam"
              type="text"
              id="naam"
              class="rounded-s-full rounded-r-full shadow appearance-none border rounded-lg py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200 w-6/12"
              placeholder="Vul hier de naam van de score in"
              required
            />
            <label
              class="block text-[#456A50] text-xl font-bold my-2 py-1"
              for="scoreValue"
            >
              Score Waarde:
            </label>
            <input
              v-model="waarde"
              type="text"
              id="waarde"
              class="rounded-s-full rounded-r-full shadow appearance-none border rounded-lg py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200 w-6/12"
              placeholder="Vul hier de waarde van de score in"
              required
            />
            <label
              class="block text-[#456A50] text-xl font-bold my-2 py-1"
              for="scoreColor"
            >
              Score Kleur:
            </label>
            <!-- PrimeVue Color Picker Component -->
            <ColorPicker v-model="color" inline></ColorPicker>
          </div>
          <button
            type="submit"
            class="bg-[#456A50] rounded-s-full rounded-r-full shadow-xl hover:bg-[#104116] hover:ease-in-out hover:duration-500 text-white text-center font-bold py-2 px-12 rounded focus:outline-none focus:shadow-outline"
          >
            Toevoegen
          </button>
        </form>
      </div>
      <div class="col-span-1">
        <img
          src="../assets/score-board.svg"
          alt="Image"
          class="h-32 w-auto mb-2 object-contain m-auto place-content-center"
        />
      </div>
    </div>
    <div class="flex-grow flex justify-center items-center mb-16 mt-8">
      <div class="w-full max-w-4xl p-8 bg-white shadow-lg rounded-lg">
        <h2 class="text-3xl font-bold mb-6 text-center text-[#456A50]">
          Scores
        </h2>
        <ul v-if="scores.length" class="divide-y divide-gray-200">
          <li
            v-for="score in scores"
            :key="score.scoreID"
            class="py-4 flex items-center justify-between"
            :style="{
              color: score.kleurcode,
            }"
          >
            <div>
              <div class="font-bold">{{ score.scoreNaam }}</div>
              <div class="font-bold">Waarde: {{ score.waarde }}</div>
            </div>
            <div class="flex space-x-4">
              <Icon
                icon="material-symbols:edit"
                class="text-[#456A50] hover:text-[#104116] hover:scale-110 hover:ease-in-out hover:duration-500 w-8 h-8 cursor-pointer"
                @click="
                  openEditModal(
                    score.scoreID,
                    score.scoreNaam,
                    score.waarde,
                    score.kleurcode,
                  )
                "
              />
              <Icon
                icon="mynaui:trash-solid"
                class="text-[#c9184a] hover:text-[#800f2f] hover:scale-110 hover:ease-in-out hover:duration-500 w-8 h-8 cursor-pointer"
                @click="openDeleteModal(score.scoreID, score.scoreNaam)"
              />
            </div>
          </li>
        </ul>
        <p v-else class="text-center text-gray-500">Geen scores gevonden</p>
      </div>
    </div>

    <!-- Modal component for editing scores -->
    <div
      v-if="isEditModalVisible"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div class="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h2 class="text-2xl font-bold mb-4 text-center">Score Bewerken</h2>
        <div class="mb-4">
          <label class="block text-gray-700 font-bold mb-2" for="editNaam">
            Nieuwe Score Naam:
          </label>
          <input
            v-model="editedNaam"
            type="text"
            id="editNaam"
            class="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:shadow-outline"
          />
        </div>
        <label class="block text-gray-700 font-bold mb-2" for="editValue">
          Nieuwe Score Waarde:
        </label>
        <input
          v-model="editedWaarde"
          type="text"
          id="editWaarde"
          class="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:shadow-outline mb-3"
        />
        <label class="block text-gray-700 font-bold mb-2" for="editColor">
          Nieuwe Kleur:
        </label>
        <ColorPicker v-model="editedColor" inline format="hex"></ColorPicker>
        <div class="flex justify-end space-x-4 mt-4 rounded-sm">
          <button
            @click="closeModal"
            class="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Annuleer
          </button>
          <button
            @click="
              updateScore(
                selectedScoreID,
                editedNaam,
                editedWaarde,
                editedColor,
              ),
                closeModal()
            "
            class="bg-[#456A50] hover:bg-[#104116] hover:ease-in-out hover:duration-500 text-white px-4 py-2 rounded"
          >
            Bijwerken
          </button>
        </div>
      </div>
    </div>

    <!-- Modal component for deleting scores -->
    <div
      v-if="isDeleteModalVisible"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div class="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h2 class="text-2xl font-bold mb-4 text-center">
          Bevestig Verwijderen
        </h2>
        <p class="text-gray-700">
          Weet je zeker dat je de score "{{ selectedScoreNaam }}" wilt
          verwijderen?
        </p>
        <div class="flex justify-end space-x-4 mt-4 rounded-sm">
          <button
            @click="closeDeleteModal"
            class="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Annuleer
          </button>
          <button
            @click="confirmDelete"
            class="bg-[#c9184a] hover:bg-[#800f2f] hover:ease-in-out hover:duration-500 text-white px-4 py-2 rounded"
          >
            Verwijderen
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import axios from 'axios'
import { defineComponent } from 'vue'
import ColorPicker from 'primevue/colorpicker'
import { Icon } from '@iconify/vue'
import HeaderComponent from '../components/Header.vue'

export default defineComponent({
  name: 'Score',
  components: {
    Icon,
    HeaderComponent,
    ColorPicker,
  },
  data() {
    return {
      scores: [] as Score[],
      naam: '',
      waarde: '',
      color: '#000000',
      isEditModalVisible: false,
      isDeleteModalVisible: false,
      selectedScoreID: 0,
      selectedScoreNaam: '',
      editedNaam: '',
      editedWaarde: '',
      editedColor: '#000000',
    }
  },
  async mounted() {
    this.fetchScores()
  },
  methods: {
    async addScore() {
      try {
        const token = localStorage.getItem('access_token')
        await axios.post(
          'http://localhost:3000/score',
          {
            scoreNaam: this.naam,
            waarde: this.waarde,
            kleurcode: '#' + this.color,
          },
          { headers: { Authorization: `Bearer ${token}` } },
        )
        this.naam = ''
        this.waarde = ''
        this.color = '#000000'
        this.fetchScores()
      } catch (error) {
        console.error('Error adding score:', error)
      }
    },
    async fetchScores() {
      try {
        const token = localStorage.getItem('access_token')
        const response = await axios.get(`http://localhost:3000/score`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        this.scores = response.data
      } catch (error) {
        console.error('Error fetching scores:', error)
      }
    },
    openEditModal(
      scoreID: number,
      naam: string,
      waarde: string,
      kleur: string,
    ) {
      this.selectedScoreID = scoreID
      this.editedNaam = naam
      this.editedWaarde = waarde
      this.editedColor = kleur
      this.isEditModalVisible = true
    },
    closeModal() {
      this.isEditModalVisible = false
    },
    async updateScore(
      scoreID: number,
      naam: string,
      waarde: string,
      kleur: string,
    ) {
      try {
        console.log(this.editedColor)
        const token = localStorage.getItem('access_token')
        await axios.patch(
          `http://localhost:3000/score/${scoreID}`,
          {
            scoreNaam: naam,
            waarde: waarde,
            kleurcode: '#' + kleur,
          },
          { headers: { Authorization: `Bearer ${token}` } },
        )
        this.fetchScores() // Refresh the scores list
      } catch (error) {
        console.error('Error updating score:', error)
      }
    },
    openDeleteModal(scoreID: number, naam: string) {
      this.selectedScoreID = scoreID
      this.selectedScoreNaam = naam
      this.isDeleteModalVisible = true
    },
    closeDeleteModal() {
      this.isDeleteModalVisible = false
    },
    async confirmDelete() {
      try {
        await this.deleteScore(this.selectedScoreID)
        this.closeDeleteModal()
      } catch (error) {
        console.error('Error deleting score:', error)
      }
    },
    async deleteScore(scoreID: number) {
      try {
        const token = localStorage.getItem('access_token')
        await axios.delete(`http://localhost:3000/score/${scoreID}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        this.fetchScores() // Refresh the scores list
      } catch (error) {
        console.error('Error during deletion:', error)
      }
    },
  },
})
</script>

<style scoped>
/* Add any additional styles here */
</style>
