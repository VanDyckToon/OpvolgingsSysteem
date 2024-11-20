<template>
  <div class="min-h-screen bg-[#ECF3EB] flex flex-col">
    <HeaderComponent />
    <div class="grid grid-cols-4 gap-4 pt-8 pb-2 px-14">
      <div class="col-span-3">
        <h1 class="text-[#104116] text-4xl font-extrabold pt-4">
          Groepen Beheren
        </h1>
        <form @submit.prevent="addGroep">
          <div class="mb-6">
            <label
              class="block text-[#456A50] text-xl font-bold mb-2 py-1"
              for="groepName"
            >
              Groep Naam:
            </label>
            <input
              v-model="naam"
              type="text"
              id="naam"
              class="rounded-s-full rounded-r-full shadow appearance-none border rounded-lg py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200 w-6/12"
              placeholder="Vul hier de naam van de groep in"
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
          src="../assets/groep-icoon.svg"
          alt="Image"
          class="h-32 w-auto mb-2 object-contain m-auto place-content-center"
        />
      </div>
    </div>
    <div class="flex-grow flex justify-center items-center mb-16 mt-8">
      <div class="w-full max-w-4xl p-8 bg-white shadow-lg rounded-lg">
        <h2 class="text-3xl font-bold mb-6 text-center text-[#456A50]">
          Groepen
        </h2>
        <ul v-if="groepen.length" class="divide-y divide-gray-200">
          <li
            v-for="groep in groepen"
            :key="groep.groepID"
            class="py-4 flex items-center justify-between"
          >
            <div>
              <div class="text-[#456A50] font-bold">{{ groep.naam }}</div>
            </div>
            <div class="flex space-x-4">
              <Icon
                icon="material-symbols:edit"
                class="text-[#456A50] hover:text-[#104116] hover:scale-110 hover:ease-in-out hover:duration-500 w-8 h-8 cursor-pointer"
                @click="openEditModal(groep.groepID, groep.naam)"
              />
              <Icon
                icon="mynaui:trash-solid"
                class="text-[#c9184a] hover:text-[#800f2f] hover:scale-110 hover:ease-in-out hover:duration-500 w-8 h-8 cursor-pointer"
                @click="openDeleteModal(groep.groepID, groep.naam)"
              />
            </div>
          </li>
        </ul>
        <p v-else class="text-center text-gray-500">Geen groepen gevonden</p>
      </div>
    </div>

    <!-- Modal component voor het aanpassen van de groepen -->
    <div
      v-if="isEditModalVisible"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div class="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h2 class="text-2xl font-bold mb-4 text-center">Groep Bewerken</h2>
        <div class="mb-4">
          <label class="block text-gray-700 font-bold mb-2" for="editNaam">
            Nieuwe Groep Naam:
          </label>
          <input
            v-model="editedNaam"
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
            @click="updateGroep(selectedGroepID, editedNaam), closeModal()"
            class="bg-[#456A50] hover:bg-[#104116] hover:ease-in-out hover:duration-500 text-white px-4 py-2 rounded"
          >
            Bijwerken
          </button>
        </div>
      </div>
    </div>

    <!-- Modal voor het verwijderen van een item -->
    <div
      v-if="isDeleteModalVisible"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div class="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h3 class="text-xl font-semibold mb-4">
          Weet je zeker dat je "{{ selectedGroepNaam }}" wilt verwijderen?
        </h3>
        <div class="flex justify-end space-x-4">
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
            Verwijder
          </button>
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
  naam: string
}

export default defineComponent({
  name: 'Groep',
  components: {
    Icon,
    HeaderComponent,
  },
  data() {
    return {
      groepen: [] as Groep[], // Lijst van de rolen
      naam: '', // naam van de rol
      isEditModalVisible: false,
      isDeleteModalVisible: false,
      selectedGroepID: 0, // ID van de rol dat wordt aangepast
      selectedGroepNaam: '',
      editedNaam: '', // de nieuwe beschrijving van de aangepaste rol
    }
  },
  async mounted() {
    this.fetchGroepen() // haalt rolen
  },
  methods: {
    openDeleteModal(groepID: number, naam: string) {
      // Zet de geselecteerde rol en laat de delete modal zien
      this.selectedGroepID = groepID
      this.selectedGroepNaam = naam
      this.isDeleteModalVisible = true
    },

    closeDeleteModal() {
      this.isDeleteModalVisible = false
    },

    async fetchGroepen() {
      try {
        const token = localStorage.getItem('access_token')

        const response = await axios.get('http://localhost:3000/groep', {
          headers: { Authorization: `Bearer ${token}` },
        })
        this.groepen = response.data.sort((a: Groep, b: Groep) =>
          a.naam.localeCompare(b.naam),
        )
      } catch (error) {
        console.error(
          'Er is een fout opgetreden bij het ophalen van de groepen:',
          error,
        )
      }
    },

    async addGroep() {
      try {
        const token = localStorage.getItem('access_token')
        await axios.post(
          'http://localhost:3000/groep',
          { naam: this.naam },
          { headers: { Authorization: `Bearer ${token}` } },
        )
        this.naam = '' // Clear the input field
        this.fetchGroepen() // Refresh the list
      } catch (error) {
        console.error('Error adding groep:', error)
      }
    },

    async confirmDelete() {
      try {
        const token = localStorage.getItem('access_token')
        await this.deleteGroep(this.selectedGroepID)
        this.isDeleteModalVisible = false // Close the modal after confirmation
      } catch (error) {
        console.error('Error deleting groep:', error)
      }
    },

    async deleteGroep(groepID: number) {
      try {
        const token = localStorage.getItem('access_token')
        await axios.delete(`http://localhost:3000/groep/${groepID}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        this.fetchGroepen() // Refresh the list after deletion
      } catch (error) {
        console.error(
          'Er is een fout opgetreden bij het verwijderen van de groep:',
          error,
        )
      }
    },

    openEditModal(groepID: number, naam: string) {
      // Kiest de juiste rol voor het aan te passen
      this.selectedGroepID = groepID
      this.editedNaam = naam
      this.isEditModalVisible = true // Laat de Modal zien
    },

    async updateGroep(groepID: number, updatedNaam: string) {
      try {
        const token = localStorage.getItem('access_token')
        await axios.patch(
          `http://localhost:3000/groep/${groepID}`,
          { naam: updatedNaam },
          { headers: { Authorization: `Bearer ${token}` } },
        )
        this.isEditModalVisible = false
        this.fetchGroepen() // Laad de lijst opnieuw na het updaten
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          console.error('Error updating groep:', error.response?.data)
        } else {
          console.error('Error updating groep:', error)
        }
      }
    },
    closeModal() {
      this.isEditModalVisible = false // Sluit de modal zonder up te daten
    },
  },
})
</script>
