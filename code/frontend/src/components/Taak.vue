<template>
    <div class="min-h-screen bg-[#ECF3EB] flex flex-col">
      <HeaderComponent />
      <div class="grid grid-cols-4 gap-4 pt-8 pb-2 px-14">
        <div class="col-span-3">
          <h1 class="text-[#104116] text-4xl font-extrabold pt-4">Taak Beheren</h1>
          <form @submit.prevent="addTaak">
            <div class="mb-6">
                <label class="block text-[#456A50] text-xl font-bold mb-2 py-1" for="groepName">
                Selecteer een groep:
              </label>
              <select 
              v-model="selectedGroepID"
              class="rounded-s-full rounded-r-full shadow border rounded-lg py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200 w-6/12"
              required
            >
              <option disabled selected value="">Selecteer een groep</option>
              <option
                v-for="groep in groepen"
                :key="groep.groepID"
                :value="groep.groepID"
              >
                {{ groep.naam }}
              </option>
            </select>
                <label class="block text-[#456A50] text-xl font-bold mb-2 py-1" for="taakName">
                Taak naam:
              </label>
              <input
                v-model="naam"
                type="text"
                id="naam"
                class="rounded-s-full rounded-r-full shadow appearance-none border rounded-lg py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200 w-6/12"
                placeholder="Vul hier de naam van de taak in"
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
          <img src="../assets/taak-icoon.svg" alt="Image" class="h-32 w-auto mb-2 object-contain m-auto place-content-center">
        </div>
      </div>
      <div class="flex-grow flex justify-center items-center mb-16 mt-8">
        <div class="w-full max-w-4xl p-8 bg-white shadow-lg rounded-lg">
          <h2 class="text-3xl font-bold mb-6 text-center text-[#456A50]">Taken</h2>
          <ul v-if="taken.length" class="divide-y divide-gray-200">
            <li
              v-for="taak in taken"
              :key="taak.taakID"
              class="py-4 flex items-center justify-between"
            >
              <div>
                <div class="text-[#456A50] font-bold">{{ taak.naam }}</div>
                <div class="text-[#456A50]">{{ taak.groep?.naam }}</div>
              </div>
              <div class="flex space-x-4">
                <Icon
                  icon="material-symbols:edit"
                  class="text-[#456A50] hover:text-[#104116] hover:scale-110 hover:ease-in-out hover:duration-500 w-8 h-8 cursor-pointer"
                  @click="openEditModal(taak.taakID, taak.naam, taak.groep?.groepID)"
                />
                <Icon
                  icon="mynaui:trash-solid"
                  class="text-[#c9184a] hover:text-[#800f2f] hover:scale-110 hover:ease-in-out hover:duration-500 w-8 h-8 cursor-pointer"
                  @click="openDeleteModal(taak.taakID, taak.naam)"
                />
              </div>
            </li>
          </ul>
          <p v-else class="text-center text-gray-500">Geen taken gevonden</p>
        </div>
      </div>

      <!-- Modal component for editing the taak -->
<div v-if="isEditModalVisible" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
  <div class="bg-white p-6 rounded-lg shadow-lg w-1/3">
    <h2 class="text-2xl font-bold mb-4 text-center">Taak Bewerken</h2>
    <div class="mb-4">
      <label class="block text-gray-700 font-bold mb-2" for="editGroepNaam">
        Selecteer een groep:
      </label>
      <select 
        v-model="editedGroepnaam"
        class="rounded-s-full rounded-r-full shadow border rounded-lg py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200 w-6/12"
        required
      >
        <option value="" disabled>Selecteer een groep</option>
        <option
          v-for="groep in groepen"
          :key="groep.groepID"
          :value="groep.groepID"
        >
          {{ groep.naam }}
        </option>
      </select>
    </div>
    <div class="mb-4">
      <label class="block text-gray-700 font-bold mb-2" for="editNaam">
        Nieuwe taak naam:
      </label>
      <input
        v-model="editedNaam" 
        type="text"
        id="editNaam"
        class="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:shadow-outline"
      />
    </div>
    <div class="flex justify-end space-x-4">
      <button @click="closeModal" class="bg-gray-500 text-white px-4 py-2 rounded">Annuleer</button>
      <button @click="updateTaak(selectedTaakID, editedNaam, editedGroepnaam); closeModal()" class="bg-[#456A50] hover:bg-[#104116] hover:ease-in-out hover:duration-500 text-white px-4 py-2 rounded">Bijwerken</button>
    </div>
  </div>
</div>


      <!-- Modal voor het verwijderen van een item -->
      <div v-if="isDeleteModalVisible" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div class="bg-white p-6 rounded-lg shadow-lg w-1/3">
      <h3 class="text-xl font-semibold mb-4">Weet je zeker dat je "{{ selectedTaakNaam }}" wilt verwijderen?</h3>
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
  
  interface Groep {
    groepID: number
    groepNaam: string
  }

  export default defineComponent({
    name: 'Taak',
    components: {
      Icon,
      HeaderComponent,
    },
    data() {
      return {
        groepen: [] as Groep[],
        taken: [] as Taak[],
        selectedGroepen: {} as Record<number, number>,
        naam: '', 
        isEditModalVisible: false, 
        isDeleteModalVisible: false,
        selectedTaakID: 0, 
        selectedGroepID: 0,
        selectedTaakNaam: '',
        editedNaam: '',
        editedGroepnaam: 0,
      }
    },
    async mounted() {
      this.fetchTaken();
      this.fetchGroepen();
    },
    methods: {
        openDeleteModal(taakID: number, naam: string) {
      // Zet de geselecteerde rol en laat de delete modal zien
      this.selectedTaakID = taakID;
      this.selectedTaakNaam = naam;
      this.isDeleteModalVisible = true;
    },

    closeDeleteModal() {
      this.isDeleteModalVisible = false;
    },

  async fetchTaken() {
    try {
        const token = localStorage.getItem('access_token')

      const response = await axios.get('http://localhost:3000/taak', { headers: { Authorization: `Bearer ${token}` } })
      this.taken = response.data.sort((a: Taak, b: Taak) => a.naam.localeCompare(b.naam))
    } catch (error) {
      console.error('Er is een fout opgetreden bij het ophalen van de taken:', error)
    }
  },
  async fetchGroepen() {
  try {
    const token = localStorage.getItem('access_token')
    const response = await axios.get('http://localhost:3000/groep', {
      headers: { Authorization: `Bearer ${token}` }
    });
    this.groepen = response.data.sort((a: Groep, b: Groep) => a.naam.localeCompare(b.naam));
  } catch (error) {
    console.error('Er is een fout opgetreden bij het ophalen van de groepen:', error);
  }
},
  
async addTaak() {
  try {
    console.log('Adding taak with name:', this.naam, 'and group ID:', this.selectedGroepID);
    const token = localStorage.getItem('access_token');
    const response = await axios.post('http://localhost:3000/taak', 
      { naam: this.naam, groep: { groepID: this.selectedGroepID }}, 
      { headers: { Authorization: `Bearer ${token}` } }
    );

    // Optional: Check the response for success
    console.log('Response from addTaak:', response.data);

    // Clear the input fields
    this.naam = '';
    this.selectedGroepID = ''; // Reset selected group
    
    
    await this.fetchTaken();  
  } catch (error) {
    console.error('Error adding taak:', error);
  }
},


    async confirmDelete() {
      try {
        const token = localStorage.getItem('access_token');
        await this.deleteTaak(this.selectedTaakID);
        this.isDeleteModalVisible = false; // Close the modal after confirmation
      } catch (error) {
        console.error('Error deleting taak:', error);
      }
    },

    async deleteTaak(taakID: number) {
      try {
        const token = localStorage.getItem('access_token');
        await axios.delete(`http://localhost:3000/taak/${taakID}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        this.fetchTaken(); // Refresh the list after deletion
      } catch (error) {
        console.error('Er is een fout opgetreden bij het verwijderen van de taak:', error);
      }
    },
  
    openEditModal(taakID: number, naam: string, groepID: number) {
  this.selectedTaakID = taakID; 
  this.editedNaam = naam; 
  this.editedGroepnaam = groepID; // Set the current group ID (assuming you want to show the group ID in the dropdown)
  this.isEditModalVisible = true; // Show the modal
},
  
async updateTaak(taakID: number, updatedNaam: string, updatedGroepID: number) {
  try {
    const token = localStorage.getItem('access_token');
    await axios.patch(`http://localhost:3000/taak/${taakID}`, 
      { 
        naam: updatedNaam, 
        groep: { groepID: updatedGroepID } // Update the group ID as well
      }, 
      { headers: { Authorization: `Bearer ${token}` } }
    );
    
    this.isEditModalVisible = false; // Close the modal
    await this.fetchTaken(); // Refresh the list after updating
  } catch (error) {
    console.error('Error updating taak:', error.response ? error.response.data : error);
  }
},

  
  closeModal() {
    this.isEditModalVisible = false // Sluit de modal zonder up te daten
  },
},

  })
  </script>