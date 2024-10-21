<template>
  <div class="min-h-screen bg-[#ECF3EB] flex flex-col">
    <HeaderComponent />
    <div class="grid grid-cols-4 gap-4 pt-8 pb-2 px-14">
      <div class="col-span-3">
        <h1 class="text-[#104116] text-4xl font-extrabold pt-4">
          Materiaal Beheren
        </h1>
        <form @submit.prevent="addMateriaal">
          <div class="mb-6">
            <label
              class="block text-[#456A50] text-xl font-bold mb-2 py-1"
              for="materialName"
            >
              Toevoegen
            </button>
          </form>
        </div>
        <div class="col-span-1">
          <img src="../assets/kruiwagen.svg" alt="Image" class="h-32 w-auto mb-2 object-contain m-auto place-content-center">
        </div>
      </div>
      <div class="flex-grow flex justify-center items-center mb-16 mt-8">
        <div class="w-full max-w-4xl p-8 bg-white shadow-lg rounded-lg">
          <h2 class="text-3xl font-bold mb-6 text-center text-[#456A50]">Materialen</h2>
          <ul v-if="materialen.length" class="divide-y divide-gray-200">
            <li
              v-for="materiaal in materialen"
              :key="materiaal.materiaalID"
              class="py-4 flex items-center justify-between"
            >
              <div>
                <div class="text-[#456A50] font-bold">{{ materiaal.beschrijving }}</div>
              </div>
              <div class="flex space-x-4">
                <Icon
                  icon="material-symbols:edit"
                  class="text-[#456A50] hover:text-[#104116] hover:scale-110 hover:ease-in-out hover:duration-500 w-8 h-8 cursor-pointer"
                  @click="openEditModal(materiaal.materiaalID, materiaal.beschrijving)"
                />
                <Icon
                  icon="mynaui:trash-solid"
                  class="text-[#c9184a] hover:text-[#800f2f] hover:scale-110 hover:ease-in-out hover:duration-500 w-8 h-8 cursor-pointer"
                  @click="openDeleteModal(materiaal.materiaalID, materiaal.beschrijving)"
                />
              </div>
            </li>
          </ul>
          <p v-else class="text-center text-gray-500">Geen materialen gevonden</p>
        </div>
      </div>
  
      <!-- Modal component voor het aanpassen van materialen -->
      <div v-if="isEditModalVisible" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div class="bg-white p-6 rounded-lg shadow-lg w-1/3">
          <h2 class="text-2xl font-bold mb-4 text-center">Materiaal Bewerken</h2>
          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2" for="editNaam">
              Nieuwe Materiaal Beschrijving:
              Materiaal Naam:
            </label>
            <input
              v-model="beschrijving"
              type="text"
              id="beschrijving"
              class="rounded-s-full rounded-r-full shadow appearance-none border rounded-lg py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200 w-6/12"
              placeholder="Vul hier het naam van het type materiaal in"
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
        <img
          src="../assets/kruiwagen.svg"
          alt="Image"
          class="h-32 w-auto mb-2 object-contain m-auto place-content-center"
        />
      </div>
    </div>
    <div class="flex-grow flex justify-center items-center mb-16 mt-8">
      <div class="w-full max-w-4xl p-8 bg-white shadow-lg rounded-lg">
        <h2 class="text-3xl font-bold mb-6 text-center text-[#456A50]">
          Materialen
        </h2>
        <ul v-if="materialen.length" class="divide-y divide-gray-200">
          <li
            v-for="materiaal in materialen"
            :key="materiaal.materiaalID"
            class="py-4 flex items-center justify-between"
          >
            <div>
              <div class="text-[#456A50] font-bold">
                {{ materiaal.beschrijving }}
              </div>
            </div>
            <div class="flex space-x-4">
              <Icon
                icon="material-symbols:edit"
                class="text-[#456A50] hover:text-[#104116] hover:scale-110 hover:ease-in-out hover:duration-500 w-8 h-8"
                @click="
                  openEditModal(materiaal.materiaalID, materiaal.beschrijving)
                "
              />
              <Icon
                icon="mynaui:trash-solid"
                class="text-[#456A50] hover:text-[#104116] hover:scale-110 hover:ease-in-out hover:duration-500 w-8 h-8"
                @click="deleteMateriaal(materiaal.materiaalID)"
              />
            </div>
          </li>
        </ul>
        <p v-else class="text-center text-gray-500">Geen materialen gevonden</p>
      </div>
    </div>

    <!-- Modal component voor het aanpassen van materialen -->
    <div
      v-if="isEditModalVisible"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div class="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h2 class="text-2xl font-bold mb-4 text-center">Materiaal Bewerken</h2>
        <div class="mb-4">
          <label class="block text-gray-700 font-bold mb-2" for="editNaam">
            Nieuwe Materiaal Beschrijving:
          </label>
          <input
            v-model="editedBeschrijving"
            type="text"
            id="editNaam"
            class="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:shadow-outline"
          />
        </div>
        <div class="flex justify-end space-x-4">
          <button
            @click="closeModal"
            class="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Annuleer
          </button>
          <button
            @click="handleUpdateMateriaal"
            class="bg-[#456A50] hover:bg-[#104116] hover:ease-in-out hover:duration-500 text-white px-4 py-2 rounded"
          >
            Bijwerken
          </button>
        </div>
      </div>

      <!-- Modal voor het verwijderen van een item -->
      <div v-if="isDeleteModalVisible" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div class="bg-white p-6 rounded-lg shadow-lg w-1/3">
      <h3 class="text-xl font-semibold mb-4">Weet je zeker dat je "{{ selectedMateriaalBeschrijving }}" wilt verwijderen?</h3>
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
    name: 'Materiaal',
    components: {
      Icon,
      HeaderComponent,
    },
    data() {
      return {
        materialen: [] as Materiaal[], // Lijst van materialen
        beschrijving: '', // naam van materiaal
        isEditModalVisible: false, 
        isDeleteModalVisible: false,
        selectedMateriaalID: 0, // ID van het materiaal dat wordt aangepast
        selectedMateriaalBeschrijving: '',
        editedBeschrijving: '', // de nieuwe beschrijving van het aangepaste materiaal
      }
    },
    async mounted() {
      this.fetchMaterialen() // haalt materialen
    },
    methods: {
        openDeleteModal(materiaalID: number, beschrijving: string) {
      // Set the selected material and show the delete modal
      this.selectedMateriaalID = materiaalID;
      this.selectedMateriaalBeschrijving = beschrijving;
      this.isDeleteModalVisible = true;
    },

    closeDeleteModal() {
      this.isDeleteModalVisible = false;
    },

  async fetchMaterialen() {
    try {
        const token = localStorage.getItem('access_token')

      const response = await axios.get('http://localhost:3000/materiaal', { headers: { Authorization: `Bearer ${token}` } })
      this.materialen = response.data.sort((a: Materiaal, b: Materiaal) => 
      a.beschrijving.localeCompare(b.beschrijving)
    );
    } catch (error) {
      console.error('Er is een fout opgetreden bij het ophalen van de materialen:', error)
    }
  },
  
  async addMateriaal() {
  try {
    const token = localStorage.getItem('access_token');
    await axios.post('http://localhost:3000/materiaal', 
      { beschrijving: this.beschrijving }, 
      { headers: { Authorization: `Bearer ${token}` } }
    );
    this.beschrijving = '';  // Clear the input field
    this.fetchMaterialen();  // Refresh the list
  } catch (error) {
    console.error('Error adding materiaal:', error);
  }
},

    async confirmDelete() {
      try {
        const token = localStorage.getItem('access_token');
        await this.deleteMateriaal(this.selectedMateriaalID);
        this.isDeleteModalVisible = false; // Close the modal after confirmation
      } catch (error) {
        console.error('Error deleting materiaal:', error);
      }
    },

    async deleteMateriaal(materiaalID: number) {
      try {
        const token = localStorage.getItem('access_token');
        await axios.delete(`http://localhost:3000/materiaal/${materiaalID}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        this.fetchMaterialen(); // Refresh the list after deletion
      } catch (error) {
        console.error('Er is een fout opgetreden bij het verwijderen van het materiaal:', error);
      }
    },
  
  openEditModal(materiaalID: number, beschrijving: string) {
    // Kiest het juiste materiaal voor het aan te passen
    this.selectedMateriaalID = materiaalID
    this.editedBeschrijving = beschrijving
    this.isEditModalVisible = true // Laat de Modal zien
  },
  
  async updateMateriaal(materiaalID: number, updatedBeschrijving: string) {
  try {
    const token = localStorage.getItem('access_token');
    await axios.patch(`http://localhost:3000/materiaal/${materiaalID}`, 
      { beschrijving: updatedBeschrijving }, 
      { headers: { Authorization: `Bearer ${token}` } }
    );
    this.isEditModalVisible = false;
    this.fetchMaterialen();  // Laad de lijst opnieuw na het updaten
  } catch (error) {
    console.error('Error updating materiaal:', error.response ? error.response.data : error);
  }
},
  
  closeModal() {
    this.isEditModalVisible = false // Sluit de modal zonder up te daten
=======
  </div>
</template>

<script lang="ts">
import axios from 'axios'
import { defineComponent } from 'vue'
import { Icon } from '@iconify/vue'
import HeaderComponent from '../components/Header.vue'

export default defineComponent({
  name: 'Materiaal',
  components: {
    Icon,
    HeaderComponent,
  },
  data() {
    return {
      materialen: [] as Materiaal[], // Lijst van materialen
      beschrijving: '', // naam van materiaal
      isEditModalVisible: false,
      selectedMateriaalID: 0, // ID van het materiaal dat wordt aangepast
      editedBeschrijving: '', // de nieuwe beschrijving van het aangepaste materiaal
    }
  },
  async mounted() {
    this.fetchMaterialen() // haalt materialen
  },
  methods: {
    async fetchMaterialen() {
      try {
        const token = localStorage.getItem('access_token')

        const response = await axios.get('http://localhost:3000/materiaal', {
          headers: { Authorization: `Bearer ${token}` },
        })
        this.materialen = response.data.sort((a: Materiaal, b: Materiaal) =>
          a.beschrijving.localeCompare(b.beschrijving),
        )
      } catch (error) {
        console.error(
          'Er is een fout opgetreden bij het ophalen van de materialen:',
          error,
        )
      }
    },

    async addMateriaal() {
      try {
        const token = localStorage.getItem('access_token')
        await axios.post(
          'http://localhost:3000/materiaal',
          { beschrijving: this.beschrijving },
          { headers: { Authorization: `Bearer ${token}` } },
        )
        this.beschrijving = '' // Clear the input field
        this.fetchMaterialen() // Refresh the list
      } catch (error) {
        console.error('Error adding materiaal:', error)
      }
    },

    async deleteMateriaal(materiaalID: number) {
      try {
        const token = localStorage.getItem('access_token')
        await axios.delete(`http://localhost:3000/materiaal/${materiaalID}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        this.fetchMaterialen() // Refresh the list after deletion
      } catch (error) {
        console.error('Error deleting materiaal:', error)
      }
    },

    openEditModal(materiaalID: number, beschrijving: string) {
      // Kiest het juiste materiaal voor het aan te passen
      this.selectedMateriaalID = materiaalID
      this.editedBeschrijving = beschrijving
      this.isEditModalVisible = true // Laat de Modal zien
    },

    async updateMateriaal(materiaalID: number, updatedBeschrijving: string) {
      try {
        const token = localStorage.getItem('access_token')
        await axios.patch(
          `http://localhost:3000/materiaal/${materiaalID}`,
          { beschrijving: updatedBeschrijving },
          { headers: { Authorization: `Bearer ${token}` } },
        )
        this.fetchMaterialen() // Refresh the list after the update
      } catch (error) {
        console.error(
          'Error updating materiaal:',
          error.response ? error.response.data : error,
        )
      }
    },

    handleUpdateMateriaal() {
      this.updateMateriaal(this.selectedMateriaalID, this.editedBeschrijving)
      this.closeModal() // Close the modal after updating the material
    },

    closeModal() {
      this.isEditModalVisible = false // Sluit de modal zonder up te daten
    },
  },
})
</script>
