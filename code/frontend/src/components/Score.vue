<template>
    <div class="min-h-screen bg-[#ECF3EB] flex flex-col">
      <HeaderComponent />
      <div class="grid grid-cols-4 gap-4 pt-8 pb-2 px-14">
        <div class="col-span-3">
          <h1 class="text-[#104116] text-4xl font-extrabold pt-4">Scores Beheren</h1>
          <form @submit.prevent="addScore">
            <div class="mb-6">
              <label class="block text-[#456A50] text-xl font-bold mb-2 py-1" for="scoreName">
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
              <label class="block text-[#456A50] text-xl font-bold my-2 py-1" for="scoreName">
                Score Waarde:
              </label>
              <input
                v-model="waarde"
                type="text"
                id="naam"
                class="rounded-s-full rounded-r-full shadow appearance-none border rounded-lg py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200 w-6/12"
                placeholder="Vul hier de waarde van de score in"
                required
              />
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
          <img src="../assets/score-board.svg" alt="Image" class="h-32 w-auto mb-2 object-contain m-auto place-content-center">
        </div>
      </div>
      <div class="flex-grow flex justify-center items-center mb-16 mt-8">
        <div class="w-full max-w-4xl p-8 bg-white shadow-lg rounded-lg">
          <h2 class="text-3xl font-bold mb-6 text-center text-[#456A50]">Scores</h2>
          <ul v-if="scores.length" class="divide-y divide-gray-200">
            <li
              v-for="score in scores"
              :key="score.scoreID"
              class="py-4 flex items-center justify-between"
            >
              <div>
                <div class="text-[#456A50] font-bold">{{ score.scoreNaam }}</div>
                <div class="text-[#456A50] font-bold">{{ score.waarde }}</div>
              </div>
              <div class="flex space-x-4">
                <Icon
                  icon="material-symbols:edit"
                  class="text-[#456A50] hover:text-[#104116] hover:scale-110 hover:ease-in-out hover:duration-500 w-8 h-8 cursor-pointer"
                  @click="openEditModal(score.scoreID, score.scoreNaam, score.waarde)"
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
  
      <!-- Modal component voor het aanpassen van de rolen -->
      <div v-if="isEditModalVisible" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
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
          <label class="block text-gray-700 font-bold mb-2" for="editNaam">
              Nieuwe Score Waarde:
            </label>
            <input
                v-model="editedWaarde"
                type="text"
                id="editWaarde"
                class="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:shadow-outline mb-3"
            />
          <div class="flex justify-end space-x-4">
            <button @click="closeModal" class="bg-gray-500 text-white px-4 py-2 rounded">Annuleer</button>
            <button @click="updateScore(selectedScoreID, editedNaam, editedWaarde); closeModal()" class="bg-[#456A50] hover:bg-[#104116] hover:ease-in-out hover:duration-500 text-white px-4 py-2 rounded">Bijwerken</button>          </div>
        </div>
      </div>

      <!-- Modal voor het verwijderen van een item -->
      <div v-if="isDeleteModalVisible" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div class="bg-white p-6 rounded-lg shadow-lg w-1/3">
      <h3 class="text-xl font-semibold mb-4">Weet je zeker dat je "{{ selectedScoreNaam }}" wilt verwijderen?</h3>
      <div class="flex justify-end space-x-4">
        <button @click="closeDeleteModal" class="bg-gray-500 text-white px-4 py-2 rounded">Annuleer</button>
        <button @click="confirmDelete" class="bg-[#c9184a] hover:bg-[#800f2f] hover:ease-in-out hover:duration-500 text-white px-4 py-2 rounded">Verwijder</button>
      </div>
    </div>
  </div>

    </div>
  </template>
  
  <script lang="ts">
  import axios from 'axios'
  import { defineComponent } from 'vue'
  import { Icon } from '@iconify/vue'
  import HeaderComponent from '../components/Header.vue'
  
  export default defineComponent({
    name: 'Score',
    components: {
      Icon,
      HeaderComponent,
    },
    data() {
      return {
        scores: [] as Score[], // Lijst van de rolen
        naam: '', // naam van de rol
        waarde: '',
        isEditModalVisible: false, 
        isDeleteModalVisible: false,
        selectedScoreID: 0, // ID van de rol dat wordt aangepast
        selectedScoreNaam: '',
        selectedScoreWaarde: '',
        editedNaam: '', // de nieuwe beschrijving van de aangepaste rol
        editedWaarde: '',
      }
    },
    async mounted() {
      this.fetchScores() // haalt rolen
    },
    methods: {
        openDeleteModal(scoreID: number, naam: string, waarde: number) {
      // Zet de geselecteerde rol en laat de delete modal zien
      this.selectedScoreID = scoreID;
      this.selectedScoreNaam = naam;
      this.selectedScoreWaarde = waarde;
      this.isDeleteModalVisible = true;
    },

    closeDeleteModal() {
      this.isDeleteModalVisible = false;
    },

  async fetchScores() {
    try {
        const token = localStorage.getItem('access_token')

      const response = await axios.get('http://localhost:3000/score', { headers: { Authorization: `Bearer ${token}` } })
      this.scores = response.data.sort((a: Score, b: Score) => 
    a.waarde - b.waarde
    );
    } catch (error) {
      console.error('Er is een fout opgetreden bij het ophalen van de scores:', error)
    }
  },
  async addScore() {
  try {
    const token = localStorage.getItem('access_token');
    await axios.post('http://localhost:3000/score', 
      { scoreNaam: this.naam, waarde: this.waarde }, 
      { headers: { Authorization: `Bearer ${token}` } }
    );
    this.naam = '';  // Clear the input field
    this.waarde = '';
    this.fetchScores();  // Refresh the list
  } catch (error) {
    console.error('Error adding score:', error);
  }
},

    async confirmDelete() {
      try {
        const token = localStorage.getItem('access_token');
        await this.deleteScore(this.selectedScoreID);
        this.isDeleteModalVisible = false; // Close the modal after confirmation
      } catch (error) {
        console.error('Error deleting score:', error);
      }
    },

    async deleteScore(scoreID: number) {
      try {
        const token = localStorage.getItem('access_token');
        await axios.delete(`http://localhost:3000/score/${scoreID}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        this.fetchScores(); // Refresh the list after deletion
      } catch (error) {
        console.error('Er is een fout opgetreden bij het verwijderen van de score:', error);
      }
    },
  
  openEditModal(scoreID: number, naam: string, waarde: number) {
    // Kiest de juiste rol voor het aan te passen
    this.selectedScoreID = scoreID
    this.editedNaam = naam
    this.editedWaarde = waarde
    this.isEditModalVisible = true // Laat de Modal zien
  },
  
  async updateScore(scoreID: number, updatedNaam: string, updatedWaarde: number) {
  try {
    const token = localStorage.getItem('access_token');
    await axios.patch(`http://localhost:3000/score/${scoreID}`, 
      { scoreNaam: updatedNaam, waarde: updatedWaarde }, 
      { headers: { Authorization: `Bearer ${token}` } }
    );
    this.isEditModalVisible = false;
    this.fetchScores();  // Laad de lijst opnieuw na het updaten
  } catch (error) {
    console.error('Error updating score:', error.response ? error.response.data : error);
  }
},
  
  closeModal() {
    this.isEditModalVisible = false // Sluit de modal zonder up te daten
  },
},

  })
  </script>