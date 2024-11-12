<template>
  <div class="min-h-screen bg-[#ECF3EB] flex flex-col">
    <HeaderComponent />
    <div class="grid grid-cols-4 gap-4 pt-8 pb-2 px-14">
      <div class="col-span-3">
        <h1 class="text-[#104116] text-4xl font-extrabold pt-4">
          Subgroepen Beheren
        </h1>
        <form @submit.prevent="addSubgroep">
          <div class="mb-6">
            <label
              class="block text-[#456A50] text-xl font-bold mb-2 py-1"
              for="groepName"
            >
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
            <label
              class="block text-[#456A50] text-xl font-bold mb-2 py-1"
              for="subgroepName"
            >
              Subgroep Naam:
            </label>
            <input
              v-model="naam"
              type="text"
              id="naam"
              class="rounded-s-full rounded-r-full shadow appearance-none border rounded-lg py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200 w-6/12"
              placeholder="Vul hier de naam van de subgroep in"
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
          src="../assets/subgroep-icoon.svg"
          alt="Image"
          class="h-32 w-auto mb-2 object-contain m-auto place-content-center"
        />
      </div>
    </div>
    <div class="flex-grow flex justify-center items-center mb-16 mt-8">
      <div class="w-full max-w-4xl p-8 bg-white shadow-lg rounded-lg">
        <h2 class="text-3xl font-bold mb-6 text-center text-[#456A50]">
          Subgroepen
        </h2>
        <ul v-if="subgroepen.length" class="divide-y divide-gray-200">
          <li
            v-for="subgroep in subgroepen"
            :key="subgroep.subgroepID"
            class="py-4 flex items-center justify-between"
          >
            <div>
              <div class="text-[#456A50] font-bold">
                {{ subgroep.subgroepNaam }}
              </div>
              <div class="text-[#456A50]">{{ subgroep.groep?.naam }}</div>
            </div>
            <div class="flex space-x-4">
              <img
                src="../assets/groep-icoon.svg"
                alt="Image"
                class="hover:scale-110 hover:ease-in-out hover:duration-500 h-8 w-auto cursor-pointer"
                @click="openSubgroepOverviewModel(subgroep.subgroepID)"
              />
              <Icon
                icon="material-symbols:edit"
                class="text-[#456A50] hover:text-[#104116] hover:scale-110 hover:ease-in-out hover:duration-500 w-8 h-8 cursor-pointer"
                @click="
                  openEditModal(
                    subgroep.subgroepID,
                    subgroep.subgroepNaam,
                    subgroep.groep?.groepID,
                  )
                "
              />
              <Icon
                icon="mynaui:trash-solid"
                class="text-[#c9184a] hover:text-[#800f2f] hover:scale-110 hover:ease-in-out hover:duration-500 w-8 h-8 cursor-pointer"
                @click="
                  openDeleteModal(subgroep.subgroepID, subgroep.subgroepNaam)
                "
              />
            </div>
          </li>
        </ul>
        <p v-else class="text-center text-gray-500">Geen subgroepen gevonden</p>
      </div>
    </div>

    <!-- Modal component voor het aanpassen van de rolen -->
    <!-- Modal component for editing the subgroup -->
    <div
      v-if="isEditModalVisible"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div class="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h2 class="text-2xl font-bold mb-4 text-center">Subgroep Bewerken</h2>
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
            Nieuwe Subgroep Naam:
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
            @click="
              updateSubgroep(selectedSubgroepID, editedNaam, editedGroepnaam),
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
          Weet je zeker dat je "{{ selectedSubgroepNaam }}" wilt verwijderen?
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

    <!-- Modal for displaying users of a Subgroep -->
    <div
      v-if="isUserOverviewModalVisible"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div class="bg-white p-6 rounded-lg shadow-lg w-3/6">
        <h2 class="text-2xl font-bold mb-4 text-center">
          {{
            subgroepen.find(
              subgroep => subgroep.subgroepID === selectedSubgroepID,
            )?.subgroepNaam
          }}
        </h2>

        <!-- Begeleider section -->
        <div class="mb-4">
          <label
            class="block text-gray-700 font-bold mb-2"
            for="selectGebruiker"
          >
            Selecteer een begeleider die je aan de groep wilt toevoegen:
          </label>
          <div class="flex items-center">
            <select
              v-model="selectedGebruikerID"
              id="selectGebruiker"
              class="rounded-s-full rounded-r-full shadow border rounded-lg py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200 w-6/12"
            >
              <option value="" disabled>Selecteer een werknemer</option>
              <option
                v-for="begeleider in begeleiders"
                :key="begeleider.gebruikerID"
                :value="begeleider.gebruikerID"
              >
                {{ begeleider.voornaam }} {{ begeleider.achternaam }}
              </option>
            </select>
            <Icon
              icon="gridicons:add"
              width="30"
              class="ml-4 text-[#104116]"
              @click="addGebruikerToSubgroep"
            />
          </div>
        </div>
        <ul
          v-if="
            Array.isArray(gebruikers) &&
            gebruikers.some(
              gebruiker => gebruiker.rol && gebruiker.rol.rolID === 2,
            )
          "
        >
          <li
            v-for="gebruiker in gebruikers.filter(
              gebruiker => gebruiker.rol && gebruiker.rol.rolID === 2,
            )"
            :key="gebruiker.gebruikerID"
            class="py-3 px-4 bg-[#ECF3EB] rounded-md shadow-sm mb-2"
          >
            <div class="flex items-center space-x-4">
              <!-- User profile picture -->
              <img
                v-if="gebruiker.foto"
                :src="`/src/assets/${gebruiker.foto}.jpg`"
                alt="Profile picture"
                class="w-10 h-10 object-cover rounded-full"
              />
              <img
                v-else
                :src="`/src/assets/no_image_available.jpg`"
                alt="No picture available"
                class="w-10 h-10 object-cover rounded-full"
              />

              <!-- User information -->
              <div class="flex-1 flex items-center space-x-4">
                <p class="font-bold text-[#456A50]">
                  {{ gebruiker.voornaam }} {{ gebruiker.achternaam }}
                </p>
                <p class="text-sm text-gray-600">{{ gebruiker.email }}</p>
                <p
                  v-if="gebruiker.telefoonnummer"
                  class="text-sm text-gray-600"
                >
                  Telefoon: {{ gebruiker.telefoonnummer }}
                </p>
              </div>

              <!-- Remove Icon -->
              <button
                @click="removeUserFromSubgroep(gebruiker.gebruikerID)"
                class="text-red-600 hover:text-red-800"
                aria-label="Remove user from subgroep"
              >
                <Icon icon="clarity:remove-solid" width="24" height="24" />
              </button>
            </div>
          </li>
        </ul>
        <p v-else class="text-center text-gray-500">
          Geen begeleiders gevonden
        </p>

        <hr class="my-4" />

        <!-- Werknemer section -->
        <div class="flex items-center mb-4">
          <h3 class="text-xl font-semibold mb-2 text-[#104116]">Werknemers</h3>
        </div>
        <!-- Dropdown to select werknemer -->
        <div class="mb-4">
          <label
            class="block text-gray-700 font-bold mb-2"
            for="selectGebruiker"
          >
            Selecteer een werknemer die je aan de groep wilt toevoegen:
          </label>
          <div class="flex items-center">
            <select
              v-model="selectedGebruikerID"
              id="selectGebruiker"
              class="rounded-s-full rounded-r-full shadow border rounded-lg py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200 w-6/12"
            >
              <option value="" disabled>Selecteer een werknemer</option>
              <option
                v-for="werknemer in werknemers"
                :key="werknemer.gebruikerID"
                :value="werknemer.gebruikerID"
              >
                {{ werknemer.voornaam }} {{ werknemer.achternaam }}
              </option>
            </select>
            <Icon
              icon="gridicons:add"
              width="30"
              class="ml-4 text-[#104116]"
              @click="addGebruikerToSubgroep"
            />
          </div>
        </div>
        <ul
          v-if="
            Array.isArray(gebruikers) &&
            gebruikers.some(
              gebruiker => gebruiker.rol && gebruiker.rol.rolID === 3,
            )
          "
        >
          <li
            v-for="gebruiker in gebruikers.filter(
              gebruiker => gebruiker.rol && gebruiker.rol.rolID === 3,
            )"
            :key="gebruiker.gebruikerID"
            class="py-3 px-4 bg-[#ECF3EB] rounded-md shadow-sm mb-2"
          >
            <div class="flex items-center space-x-4">
              <!-- User profile picture -->
              <img
                v-if="gebruiker.foto"
                :src="`/src/assets/${gebruiker.foto}.jpg`"
                alt="Profile picture"
                class="w-10 h-10 object-cover rounded-full"
              />
              <img
                v-else
                :src="`/src/assets/no_image_available.jpg`"
                alt="No picture available"
                class="w-10 h-10 object-cover rounded-full"
              />

              <!-- User information -->
              <div class="flex-1 flex items-center space-x-4">
                <p class="font-bold text-[#456A50]">
                  {{ gebruiker.voornaam }} {{ gebruiker.achternaam }}
                </p>
                <p class="text-sm text-gray-600">{{ gebruiker.email }}</p>
                <p
                  v-if="gebruiker.telefoonnummer"
                  class="text-sm text-gray-600"
                >
                  Telefoon: {{ gebruiker.telefoonnummer }}
                </p>
              </div>

              <!-- Remove Icon -->
              <button
                @click="removeUserFromSubgroep(gebruiker.gebruikerID)"
                class="text-red-600 hover:text-red-800"
                aria-label="Remove user from subgroep"
              >
                <Icon icon="clarity:remove-solid" width="24" height="24" />
              </button>
            </div>
          </li>
        </ul>
        <p v-else class="text-center text-gray-500">Geen werknemers gevonden</p>

        <div class="flex justify-end mt-4">
          <button
            @click="isUserOverviewModalVisible = false"
            class="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Sluiten
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
  groepNaam: string
}

export default defineComponent({
  name: 'Subgroep',
  components: {
    Icon,
    HeaderComponent,
  },
  data() {
    return {
      groepen: [] as Groep[],
      subgroepen: [] as Subgroep[],
      selectedGroepen: {} as Record<number, number>,
      naam: '', // naam van de rol
      isEditModalVisible: false,
      isDeleteModalVisible: false,
      selectedSubgroepID: 0, // ID van de rol dat wordt aangepast
      selectedGroepID: 0,
      selectedSubgroepNaam: '',
      editedNaam: '',
      editedGroepnaam: 0,
      gebruikers: [] as Gebruiker[],
      werknemers: [] as Gebruiker[],
      begeleiders: [] as Gebruiker[],

      isUserOverviewModalVisible: false,
    }
  },
  computed: {
    filteredWerknemers() {
      return this.werknemers.filter(werknemer => {
        // Add filtering logic, for example, searching by name:
        return (
          werknemer.voornaam
            .toLowerCase()
            .includes(this.searchQuery.toLowerCase()) ||
          werknemer.achternaam
            .toLowerCase()
            .includes(this.searchQuery.toLowerCase())
        )
      })
    },
  },
  async mounted() {
    this.fetchSubgroepen() // haalt subgroepen
    this.fetchGroepen()
    this.fetchAllWerknemers(3)
    this.fetchAllBegeleders(2)
  },
  methods: {
    openDeleteModal(subgroepID: number, naam: string) {
      // Zet de geselecteerde rol en laat de delete modal zien
      this.selectedSubgroepID = subgroepID
      this.selectedSubgroepNaam = naam
      this.isDeleteModalVisible = true
    },

    closeDeleteModal() {
      this.isDeleteModalVisible = false
    },
    async removeUserFromSubgroep(gebruikerID: number) {
      try {
        const token = localStorage.getItem('access_token')
        await axios.patch(
          `http://localhost:3000/gebruiker/${gebruikerID}/removeFromSubgroep`,

          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        this.gebruikers = this.gebruikers.filter(
          gebruiker => gebruiker.gebruikerID !== gebruikerID,
        )
      } catch (error) {
        console.error(
          'Er is een fout opgetreden bij het verwijderen van de gebruiker:',
          error,
        )
      }
    },
    async fetchSubgroepen() {
      try {
        const token = localStorage.getItem('access_token')

        const response = await axios.get('http://localhost:3000/subgroep', {
          headers: { Authorization: `Bearer ${token}` },
        })
        this.subgroepen = response.data.sort((a: Subgroep, b: Subgroep) =>
          a.subgroepNaam.localeCompare(b.subgroepNaam),
        )
      } catch (error) {
        console.error(
          'Er is een fout opgetreden bij het ophalen van de subgroepen:',
          error,
        )
      }
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
    async fetchGebruikers(subgroepID: number) {
      try {
        const token = localStorage.getItem('access_token')
        const response = await axios.get(
          `http://localhost:3000/subgroep/${subgroepID}/gebruikers`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        )
        this.gebruikers = Array.isArray(response.data) ? response.data : []
      } catch (error) {
        console.error('Error fetching gebruikers:', error)
        this.gebruikers = []
      }
    },

    async fetchAllWerknemers(rolID: number) {
      try {
        const token = localStorage.getItem('access_token')
        const response = await axios.get(
          `http://localhost:3000/gebruiker/rol/${rolID}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        )
        console.log('API Response:', response)
        this.werknemers = response.data
      } catch (error) {
        console.error('Error fetching gebruikers:', error)
        this.gebruikers = []
      }
    },

    async fetchAllBegeleders(rolID: number) {
      try {
        const token = localStorage.getItem('access_token')
        const response = await axios.get(
          `http://localhost:3000/gebruiker/rol/${rolID}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        )
        this.begeleiders = response.data
      } catch (error) {
        console.error('Error fetching gebruikers:', error)
        this.gebruikers = []
      }
    },

    async addSubgroep() {
      try {
        console.log(
          'Adding subgroep with name:',
          this.naam,
          'and group ID:',
          this.selectedGroepID,
        )
        const token = localStorage.getItem('access_token')
        const response = await axios.post(
          'http://localhost:3000/subgroep',
          { subgroepNaam: this.naam, groep: { groepID: this.selectedGroepID } },
          { headers: { Authorization: `Bearer ${token}` } },
        )

        // Optional: Check the response for success
        console.log('Response from addSubgroep:', response.data)

        // Clear the input fields
        this.naam = ''
        this.selectedGroepID = '' // Reset selected group

        // Refresh the list of subgroepen
        await this.fetchSubgroepen()
      } catch (error) {
        console.error('Error adding subgroep:', error)
      }
    },
    async addGebruikerToSubgroep() {
      if (this.selectedGebruikerID && this.selectedSubgroepID) {
        try {
          const token = localStorage.getItem('access_token')
          // Call the API to add werknemer to subgroep
          const response = await axios.patch(
            `http://localhost:3000/gebruiker/${this.selectedGebruikerID}/addToSubgroep/${this.selectedSubgroepID}`,
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          )
          console.log(
            'Response from adding werknemer to subgroep:',
            response.data,
          )

          // Optionally, refresh the list of users after adding
          await this.fetchGebruikers(this.selectedSubgroepID)

          // Clear the selected werknemer ID
          this.selectedGebruikerID = ''
        } catch (error) {
          console.error('Error adding werknemer to subgroep:', error)
        }
      } else {
        console.error('Werknemer and Subgroep must be selected')
      }
    },
    async confirmDelete() {
      try {
        const token = localStorage.getItem('access_token')
        await this.deleteSubgroep(this.selectedSubgroepID)
        this.isDeleteModalVisible = false // Close the modal after confirmation
      } catch (error) {
        console.error('Error deleting subgroep:', error)
      }
    },

    async deleteSubgroep(subgroepID: number) {
      try {
        const token = localStorage.getItem('access_token')
        await axios.delete(`http://localhost:3000/subgroep/${subgroepID}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        this.fetchSubgroepen() // Refresh the list after deletion
      } catch (error) {
        console.error(
          'Er is een fout opgetreden bij het verwijderen van de subgroep:',
          error,
        )
      }
    },

    openEditModal(subgroepID: number, naam: string, groepID: number) {
      this.selectedSubgroepID = subgroepID // Set the ID of the selected subgroep
      this.editedNaam = naam // Set the current subgroep name
      this.editedGroepnaam = groepID // Set the current group ID (assuming you want to show the group ID in the dropdown)
      this.isEditModalVisible = true // Show the modal
    },

    async openSubgroepOverviewModel(subgroepID: number) {
      this.selectedSubgroepID = subgroepID
      await this.fetchGebruikers(subgroepID)
      this.isUserOverviewModalVisible = true
    },
    async updateSubgroep(
      subgroepID: number,
      updatedNaam: string,
      updatedGroepID: number,
    ) {
      try {
        const token = localStorage.getItem('access_token')
        await axios.patch(
          `http://localhost:3000/subgroep/${subgroepID}`,
          {
            subgroepNaam: updatedNaam, // Assuming your API expects 'subgroepNaam' as the key
            groep: { groepID: updatedGroepID }, // Update the group ID as well
          },
          { headers: { Authorization: `Bearer ${token}` } },
        )

        this.isEditModalVisible = false // Close the modal
        await this.fetchSubgroepen() // Refresh the list after updating
      } catch (error) {
        console.error(
          'Error updating subgroep:',
          error.response ? error.response.data : error,
        )
      }
    },

    closeModal() {
      this.isEditModalVisible = false // Sluit de modal zonder up te daten
    },
  },
})
</script>
