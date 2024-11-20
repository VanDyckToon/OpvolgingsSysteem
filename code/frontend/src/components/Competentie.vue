<template>
  <div class="min-h-screen bg-[#ECF3EB] flex flex-col">
    <HeaderComponent />
    <div class="grid grid-cols-4 gap-4 pt-8 pb-2 px-14">
      <div class="col-span-3">
        <h1 class="text-[#104116] text-4xl font-extrabold pt-4">
          Competenties Beheren
        </h1>
        <form @submit.prevent="addCompetentie">
          <div class="mb-6">
            <label
              class="block text-[#456A50] text-xl font-bold mb-2 py-1"
              for="groepName"
            >
              Competentie Naam:
            </label>
            <input
              v-model="naam"
              type="text"
              id="naam"
              class="rounded-s-full rounded-r-full shadow appearance-none border rounded-lg py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200 w-6/12"
              placeholder="Vul hier de naam van de groep in"
              required
            />
            <label
              class="block text-[#456A50] text-xl font-bold mb-2 py-1"
              for="groepName"
            >
              Competentie Beschrijving:
            </label>
            <textarea
              v-model="beschrijving"
              class="shadow appearance-none border rounded-lg py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200 w-6/12"
              rows="4"
              placeholder="Typ hier de competentie beschrijving"
              required
            ></textarea>
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
          src="../assets/competentie-icoon.svg"
          alt="Image"
          class="h-32 w-auto mb-2 object-contain m-auto place-content-center"
        />
      </div>
    </div>
    <div class="flex-grow flex justify-center items-center mb-16 mt-8">
      <div class="w-full max-w-4xl p-8 bg-white shadow-lg rounded-lg">
        <h2 class="text-3xl font-bold mb-6 text-center text-[#456A50]">
          Competenties
        </h2>
        <div class="max-h-80 overflow-y-auto">
          <ul v-if="competenties.length" class="divide-y divide-gray-200">
            <li
              v-for="competentie in competenties"
              :key="competentie.competentieID"
              class="py-4 flex items-center justify-between"
            >
              <div>
                <div class="text-[#456A50] font-bold">
                  {{ competentie.naam }}
                </div>
                <div class="text-[#456A50]">{{ competentie.beschrijving }}</div>
              </div>
              <div class="flex space-x-4">
                <Icon
                  icon="material-symbols:edit"
                  class="text-[#456A50] hover:text-[#104116] hover:scale-110 hover:ease-in-out hover:duration-500 w-8 h-8 cursor-pointer"
                  @click="
                    openEditModal(
                      competentie.competentieID,
                      competentie.naam,
                      competentie.beschrijving,
                    )
                  "
                />
                <Icon
                  icon="mynaui:trash-solid"
                  class="text-[#c9184a] hover:text-[#800f2f] hover:scale-110 hover:ease-in-out hover:duration-500 w-8 h-8 cursor-pointer"
                  @click="
                    openDeleteModal(competentie.competentieID, competentie.naam)
                  "
                />
              </div>
            </li>
          </ul>
          <p v-else class="text-center text-gray-500">
            Geen competenties gevonden
          </p>
        </div>
      </div>
    </div>

    <!-- Modal component voor het aanpassen van de groepen -->
    <div
      v-if="isEditModalVisible"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div class="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h2 class="text-2xl font-bold mb-4 text-center">
          Competentie Bewerken
        </h2>
        <div class="mb-4">
          <label class="block text-gray-700 font-bold mb-2" for="editNaam">
            Nieuwe Competentie Naam:
          </label>
          <input
            v-model="editedNaam"
            type="text"
            id="editNaam"
            class="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:shadow-outline"
          />
          <label
            class="block text-gray-700 font-bold mb-2"
            for="editedBeschrijving"
          >
            Competentie Beschrijving:
          </label>
          <textarea
            v-model="editedBeschrijving"
            class="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:shadow-outline"
            rows="4"
            id="editBeschrijving"
            placeholder="Typ hier de competentie beschrijving"
          ></textarea>
        </div>
        <div class="flex justify-end space-x-4">
          <button
            @click="closeModal"
            class="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Annuleer
          </button>
          <button
            @click="
              updateCompetentie(
                selectedCompetentieID,
                editedNaam,
                editedBeschrijving,
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

    <!-- Modal voor het verwijderen van een item -->
    <div
      v-if="isDeleteModalVisible"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div class="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h3 class="text-xl font-semibold mb-4">
          Weet je zeker dat je "{{ selectedCompetentieNaam }}" wilt verwijderen?
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


interface Competentie {
  competentieID: number
  naam: string
  beschrijving: string
}


export default defineComponent({
  name: 'Competentie',
  components: {
    Icon,
    HeaderComponent,
  },

  data() {
    return {
      competenties: [] as Competentie[], // Lijst van de rolen
      naam: '',
      beschrijving: '',
      isEditModalVisible: false,
      isDeleteModalVisible: false,
      selectedCompetentieID: 0, // ID van de rol dat wordt aangepast
      selectedCompetentieNaam: '',
      SelectedBeschrijving: '',
      editedNaam: '',
      editedBeschrijving: '',
    }
  },
  async mounted() {
    this.fetchCompetenties() // haalt rolen
  },
  methods: {
    openDeleteModal(competentieID: number, naam: string) {
      // Zet de geselecteerde rol en laat de delete modal zien
      this.selectedCompetentieID = competentieID
      this.selectedCompetentieNaam = naam
      this.isDeleteModalVisible = true
    },

    closeDeleteModal() {
      this.isDeleteModalVisible = false
    },

    async fetchCompetenties() {
      try {
        const token = localStorage.getItem('access_token')

        const response = await axios.get('http://localhost:3000/competentie', {
          headers: { Authorization: `Bearer ${token}` },
        })
        this.competenties = response.data.sort(
          (a: Competentie, b: Competentie) => a.naam.localeCompare(b.naam),
        )
      } catch (error) {
        console.error(
          'Er is een fout opgetreden bij het ophalen van de competenties:',
          error,
        )
      }
    },

    async addCompetentie() {
      try {
        const token = localStorage.getItem('access_token')
        await axios.post(
          'http://localhost:3000/competentie',
          { naam: this.naam, beschrijving: this.beschrijving },
          { headers: { Authorization: `Bearer ${token}` } },
        )
        this.naam = ''
        this.beschrijving = ''
        this.fetchCompetenties() // Refresh the list
      } catch (error) {
        console.error('Error adding competentie:', error)
      }
    },

    async confirmDelete() {
      try {
        const token = localStorage.getItem('access_token')
        await this.deleteCompetentie(this.selectedCompetentieID)
        this.isDeleteModalVisible = false // Close the modal after confirmation
      } catch (error) {
        console.error('Error deleting competentie:', error)
      }
    },

    async deleteCompetentie(competentieID: number) {
      try {
        const token = localStorage.getItem('access_token')
        await axios.delete(
          `http://localhost:3000/competentie/${competentieID}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        )
        this.fetchCompetenties() // Refresh the list after deletion
      } catch (error) {
        console.error(
          'Er is een fout opgetreden bij het verwijderen van de competentie:',
          error,
        )
      }
    },

    openEditModal(competentieID: number, naam: string, beschrijving: string) {
      this.selectedCompetentieID = competentieID
      this.editedNaam = naam
      this.editedBeschrijving = beschrijving
      this.isEditModalVisible = true
    },

    async updateCompetentie(
      competentieID: number,
      updatedNaam: string,
      updatedBeschrijving: string,
    ) {
      try {
        if (!updatedNaam.trim() || !updatedBeschrijving.trim()) {
          alert('Competentie naam of beschrijving mogen niet leeg zijn.')
          return
        }
        const token = localStorage.getItem('access_token')
        await axios.patch(
          `http://localhost:3000/competentie/${competentieID}`,
          { naam: updatedNaam, beschrijving: updatedBeschrijving },
          { headers: { Authorization: `Bearer ${token}` } },
        )
        this.isEditModalVisible = false
        this.fetchCompetenties()
      } catch (error) {
        console.error(
          'Error updating competentie:',
          error.response ? error.response.data : error,
        )
      }
    },

      }
    },

    openEditModal(competentieID: number, naam: string, beschrijving: string) {
      this.selectedCompetentieID = competentieID
      this.editedNaam = naam
      this.editedBeschrijving = beschrijving
      this.isEditModalVisible = true
    },

    async updateCompetentie(
      competentieID: number,
      updatedNaam: string,
      updatedBeschrijving: string,
    ) {
      try {
        const token = localStorage.getItem('access_token')
        await axios.patch(
          `http://localhost:3000/competentie/${competentieID}`,
          { naam: updatedNaam, beschrijving: updatedBeschrijving },
          { headers: { Authorization: `Bearer ${token}` } },
        )
        this.isEditModalVisible = false
        this.fetchCompetenties()
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          console.error('Error updating competentie:', error.response?.data)
        } else {
          console.error('Error updating competentie:', error)
        }
      }
    },
    closeModal() {
      this.isEditModalVisible = false
    },
  },
})
</script>
