<template>
  <div class="min-h-screen bg-[#ECF3EB] flex flex-col">
    <HeaderComponent />
    <div class="grid grid-cols-4 gap-4 pt-8 pb-2 px-14">
      <div class="col-span-3">
        <h1 class="text-[#104116] text-4xl font-extrabold pt-4">
          Rollen Beheren
        </h1>
        <form @submit.prevent="addRol">
          <div class="mb-6">
            <label
              class="block text-[#456A50] text-xl font-bold mb-2 py-1"
              for="rolName"
            >
              Rol Naam:
            </label>
            <input
              v-model="naam"
              type="text"
              id="naam"
              class="rounded-s-full rounded-r-full shadow appearance-none border rounded-lg py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200 w-6/12"
              placeholder="Vul hier de naam van de rol in"
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
          src="../assets/medal.svg"
          alt="Image"
          class="h-32 w-auto mb-2 object-contain m-auto place-content-center"
        />
      </div>
    </div>
    <div class="flex-grow flex justify-center items-center mb-16 mt-8">
      <div class="w-full max-w-4xl p-8 bg-white shadow-lg rounded-lg">
        <h2 class="text-3xl font-bold mb-6 text-center text-[#456A50]">
          Rollen
        </h2>
        <div
          class="max-h-80 overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#456A50] dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 pr-4"
        >
          <ul v-if="rolen.length" class="divide-y divide-gray-200">
            <li
              v-for="rol in rolen"
              :key="rol.rolID"
              class="py-4 flex items-center justify-between"
            >
              <div>
                <div class="text-[#456A50] font-bold">{{ rol.naam }}</div>
              </div>
              <div class="flex space-x-4">
                <img
                  src="../assets/edit.svg"
                  alt="edit"
                  class="text-[#456A50] hover:text-[#104116] hover:scale-110 hover:ease-in-out hover:duration-500 w-8 h-8 cursor-pointer"
                  @click="openEditModal(rol.rolID, rol.naam)"
                />
                <img
                  src="../assets/delete.svg"
                  alt="delete"
                  class="text-[#c9184a] hover:text-[#800f2f] hover:scale-110 hover:ease-in-out hover:duration-500 w-8 h-8 cursor-pointer"
                  @click="openDeleteModal(rol.rolID, rol.naam)"
                />
              </div>
            </li>
          </ul>
          <p v-else class="text-center text-gray-500">Geen rollen gevonden</p>
        </div>
      </div>
    </div>

    <!-- Modal component voor het aanpassen van de rolen -->
    <div
      v-if="isEditModalVisible"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div class="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h2 class="text-2xl font-bold mb-4 text-center">Rol Bewerken</h2>
        <div class="mb-4">
          <label class="block text-gray-700 font-bold mb-2" for="editNaam">
            Nieuwe rol naam:
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
            @click="updateRol(selectedRolID, editedNaam), closeModal()"
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
          Weet je zeker dat je "{{ selectedRolNaam }}" wilt verwijderen?
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
import HeaderComponent from '../components/Header.vue'

interface Rol {
  rolID: number
  naam: string
}

export default defineComponent({
  name: 'Rol',
  components: {
    HeaderComponent,
  },
  data() {
    return {
      rolen: [] as Rol[], // Lijst van de rolen
      naam: '', // naam van de rol
      isEditModalVisible: false,
      isDeleteModalVisible: false,
      selectedRolID: 0, // ID van de rol dat wordt aangepast
      selectedRolNaam: '',
      editedNaam: '', // de nieuwe beschrijving van de aangepaste rol
    }
  },
  async mounted() {
    this.fetchRolen() // haalt rolen
  },
  methods: {
    openDeleteModal(rolID: number, naam: string) {
      // Zet de geselecteerde rol en laat de delete modal zien
      this.selectedRolID = rolID
      this.selectedRolNaam = naam
      this.isDeleteModalVisible = true
    },

    closeDeleteModal() {
      this.isDeleteModalVisible = false
    },

    async fetchRolen() {
      try {
        const token = localStorage.getItem('access_token')

        const response = await axios.get('http://localhost:3000/rol', {
          headers: { Authorization: `Bearer ${token}` },
        })
        this.rolen = response.data.sort((a: Rol, b: Rol) =>
          a.naam.localeCompare(b.naam),
        )
      } catch (error) {
        console.error(
          'Er is een fout opgetreden bij het ophalen van de rolen:',
          error,
        )
      }
    },

    async addRol() {
      try {
        const token = localStorage.getItem('access_token')
        await axios.post(
          'http://localhost:3000/rol',
          { naam: this.naam },
          { headers: { Authorization: `Bearer ${token}` } },
        )
        this.naam = '' // Clear the input field
        this.fetchRolen() // Refresh the list
      } catch (error) {
        console.error('Error adding rol:', error)
      }
    },

    async confirmDelete() {
      try {
        const token = localStorage.getItem('access_token')
        await this.deleteRol(this.selectedRolID)
        this.isDeleteModalVisible = false // Close the modal after confirmation
      } catch (error) {
        console.error('Error deleting rol:', error)
      }
    },

    async deleteRol(rolID: number) {
      try {
        const token = localStorage.getItem('access_token')
        await axios.delete(`http://localhost:3000/rol/${rolID}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        this.fetchRolen() // Refresh the list after deletion
      } catch (error) {
        console.error(
          'Er is een fout opgetreden bij het verwijderen van de rol:',
          error,
        )
      }
    },

    openEditModal(rolID: number, naam: string) {
      // Kiest de juiste rol voor het aan te passen
      this.selectedRolID = rolID
      this.editedNaam = naam
      this.isEditModalVisible = true // Laat de Modal zien
    },

    async updateRol(rolID: number, updatedNaam: string) {
      try {
        const token = localStorage.getItem('access_token')
        await axios.patch(
          `http://localhost:3000/rol/${rolID}`,
          { naam: updatedNaam },
          { headers: { Authorization: `Bearer ${token}` } },
        )
        this.isEditModalVisible = false
        this.fetchRolen() // Laad de lijst opnieuw na het updaten
      } catch (error) {
        console.error('Error updating rol:', error)
      }
    },

    closeModal() {
      this.isEditModalVisible = false // Sluit de modal zonder up te daten
    },
  },
})
</script>
