<template>
  <div class="min-h-screen bg-[#ECF3EB] flex flex-col">
    <HeaderComponent />
    <div class="grid grid-cols-4 gap-4 pt-8 pb-2 px-14">
      <div class="col-span-3">
        <h1 class="text-[#104116] text-4xl font-extrabold pt-4">
          Taak Beheren
        </h1>
        <form @submit.prevent="addTechnischeCompetentie">
          <div class="mb-6">
            <label
              class="block text-[#456A50] text-xl font-bold mb-2 py-1"
              for="groepName"
            >
              Selecteer een groep:
            </label>
            <select
              v-model="selectedGroepID"
              @change="filterTaken(selectedGroepID)"
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
              for="taakName"
            >
              Selecteer een taak:
            </label>
            <select
              v-model="selectedTaakID"
              class="rounded-s-full rounded-r-full shadow border rounded-lg py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200 w-6/12"
              required
            >
              <option disabled selected value="">Selecteer een taak</option>
              <option
                v-for="taak in taken"
                :key="taak.taakID"
                :value="taak.taakID"
              >
                {{ taak.naam }}
              </option>
            </select>
            <label
              class="block text-[#456A50] text-xl font-bold mb-2 py-1"
              for="technischeCompetentieName"
            >
              Technische Competentie naam:
            </label>
            <input
              v-model="naam"
              type="text"
              id="naam"
              class="rounded-s-full rounded-r-full shadow appearance-none border rounded-lg py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200 w-6/12"
              placeholder="Vul hier de naam van de technische competentie in"
              required
            />
            <label
              class="block text-[#456A50] text-xl font-bold mb-2 py-1"
              for="technischeCompetentieName"
            >
              Technische Competentie Beschrijving:
            </label>
            <textarea
              v-model="beschrijving"
              class="shadow appearance-none border rounded-lg py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200 w-6/12"
              rows="4"
              placeholder="Typ hier de technische competentie beschrijving"
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
          src="../assets/taak-icoon.svg"
          alt="Image"
          class="h-32 w-auto mb-2 object-contain m-auto place-content-center"
        />
      </div>
    </div>
    <div class="flex-grow flex justify-center items-center mb-16 mt-8">
      <div class="w-full max-w-4xl p-8 bg-white shadow-lg rounded-lg">
        <h2 class="text-3xl font-bold mb-6 text-center text-[#456A50]">
          Technische Competenties
        </h2>

        <!-- Filter knop -->
        <div class="mb-4 flex items-center justify-between">
        <select
          v-model="selectedGroepFilter"
          class="w-1/3 p-2 border-2 border-gray-500 bg-gray-100 rounded"
        >
          <option value="">-- Filter op groep --</option>
          <option v-for="groep in groepen" :key="groep.groepID" :value="groep.groepID">
            {{ groep.naam }}
          </option>
        </select>
      </div>
      <div class="max-h-80 overflow-y-auto [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:rounded-full
  [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:rounded-full
  [&::-webkit-scrollbar-thumb]:bg-[#456A50]
  dark:[&::-webkit-scrollbar-track]:bg-neutral-700
  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 pr-4">
        <ul
          v-if="filteredTechnischeCompetenties.length"
          class="divide-y divide-gray-200"
        >
          <li
            v-for="technischeCompetentie in filteredTechnischeCompetenties"
            :key="technischeCompetentie.technischeCompetentieID"
            class="py-4 flex items-center justify-between"
          >
            <div>
              <div class="text-[#456A50] font-bold">
                {{ technischeCompetentie.naam }}
              </div>
              <div class="text-[#456A50]">
                Groep: {{ technischeCompetentie.taak?.groep?.naam
                }}<span class="mx-2">|</span> Taak:
                {{ technischeCompetentie.taak?.naam }}
              </div>
              <div class="text-[#456A50]">
                Beschrijving:
                <span class="italic">{{
                  technischeCompetentie.beschrijving
                }}</span>
              </div>
            </div>
            <div class="flex space-x-4">
              <img
                src="../assets/edit.svg"
                alt="edit"
                class="text-[#456A50] hover:text-[#104116] hover:scale-110 hover:ease-in-out hover:duration-500 w-8 h-8 cursor-pointer"
                @click="
                  openEditModal(
                    technischeCompetentie.technischeCompetentieID,
                    technischeCompetentie.naam,
                    technischeCompetentie.beschrijving,
                    technischeCompetentie.taak?.taakID,
                    technischeCompetentie.taak?.groep?.groepID,
                  )
                "
              />
              <img
                src="../assets/delete.svg"
                alt="delete"
                class="text-[#c9184a] hover:text-[#800f2f] hover:scale-110 hover:ease-in-out hover:duration-500 w-8 h-8 cursor-pointer"
                @click="
                  openDeleteModal(
                    technischeCompetentie.technischeCompetentieID,
                    technischeCompetentie.naam,
                  )
                "
              />
            </div>
          </li>
        </ul>
        <p v-else class="text-center text-gray-500">Geen taken gevonden</p>
      </div>
    </div>
    </div>

    <!-- Modal component for editing the taak -->
    <div
      v-if="isEditModalVisible"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div class="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h2 class="text-2xl font-bold mb-4 text-center">
          Technische Competentie Bewerken
        </h2>
        <div class="mb-4">
          <label class="block text-gray-700 font-bold mb-2" for="editGroepNaam">
            Selecteer een groep:
          </label>
          <select
            v-model="editedGroepID"
            @change="filterTaken(editedGroepID)"
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
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 font-bold mb-2" for="editGroepNaam">
            Selecteer een taak:
          </label>
          <select
            v-model="editedTaakID"
            class="rounded-s-full rounded-r-full shadow border rounded-lg py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200 w-6/12"
            required
          >
            <option disabled selected value="">Selecteer een taak</option>
            <option
              v-for="taak in taken"
              :key="taak.taakID"
              :value="taak.taakID"
            >
              {{ taak.naam }}
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
          <label
            class="block text-gray-700 font-bold mb-2"
            for="editedBeschrijving"
          >
            Technische Competentie Beschrijving:
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
              updateTechnischeCompetentie(
                selectedTechnischeCompetentieID,
                editedNaam,
                editedBeschrijving,
                editedTaakID,
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
          Weet je zeker dat je "{{ selectedTechnischeCompetentieNaam }}" wilt
          verwijderen?
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

interface Taak {
  taakID: number
  naam: string
  groep: Groep
}

interface TechnischeCompetentie {
  technischeCompetentieID: number
  naam: string
  beschrijving: string
  taak: Taak
  groepID: number
}

export default defineComponent({
  name: 'TechnischeCompetentie',
  components: {
    Icon,
    HeaderComponent,
  },
  data() {
    return {
      groepen: [] as Groep[],
      taken: [] as Taak[],
      technischeCompetenties: [] as TechnischeCompetentie[],
      selectedGroepen: {} as Record<number, number>,
      naam: '',
      beschrijving: '',
      isEditModalVisible: false,
      isDeleteModalVisible: false,
      selectedTechnischeCompetentieID: 0,
      selectedTaakID: 0,
      selectedGroepID: 0,
      selectedTechnischeCompetentieNaam: '',
      editedNaam: '',
      editedBeschrijving: '',
      editedTaakID: 0,
      editedGroepID: 0,
      selectedGroepFilter: '',
      searchQuery: '',
    }
  },
  async mounted() {
    this.filterTaken()
    this.fetchTaken()
    this.fetchGroepen()
    this.fetchTechnischeCompetenties()
  },
  watch: {
    selectedGroepID(newGroepID) {
      if (newGroepID) {
        this.filterTaken(newGroepID)
      } else {
        this.filterTaken()
      }
    },
    editedGroepID(newGroepID) {
      if (newGroepID) {
        this.filterTaken(newGroepID)
      } else {
        this.filterTaken()
      }
    },
  },

  computed: {
    filteredTechnischeCompetenties() {
    return this.technischeCompetenties.filter((technischeCompetentie) => {
      const fullName = `${technischeCompetentie.naam}`.toLowerCase();
      const nameMatches = fullName.includes(this.searchQuery.toLowerCase());

      const groepMatches =
        !this.selectedGroepFilter || technischeCompetentie.taak?.groep?.groepID == this.selectedGroepFilter;

      return nameMatches && groepMatches;
    });
  },
  },

  methods: {
    async filterTaken(groepID: number = 0) {
      try {
        let url = 'http://localhost:3000/taak'
        const token = localStorage.getItem('access_token')

        if (groepID) {
          url += `?groepID=${groepID}`
        }

        console.log('Fetching taken with URL:', url)

        const response = await axios.get(url, {
          headers: { Authorization: `Bearer ${token}` },
        })

        console.log('Response data:', response.data)

        if (groepID) {
          this.taken = response.data.filter(
            (taak: Taak) => taak.groep && taak.groep.groepID === groepID,
          )
        } else {
          this.taken = response.data
        }

        this.taken.sort((a: Taak, b: Taak) => a.naam.localeCompare(b.naam))
      } catch (error) {
        console.error('Error fetching taken:', error)
      }
    },

    openDeleteModal(technischeCompetentieID: number, naam: string) {
      this.selectedTechnischeCompetentieID = technischeCompetentieID
      this.selectedTechnischeCompetentieNaam = naam
      this.isDeleteModalVisible = true
    },

    closeDeleteModal() {
      this.isDeleteModalVisible = false
    },

    async fetchTechnischeCompetenties() {
      try {
        const token = localStorage.getItem('access_token')

        const response = await axios.get(
          'http://localhost:3000/technische-competentie',
          { headers: { Authorization: `Bearer ${token}` } },
        )
        this.technischeCompetenties = response.data.sort(
          (a: TechnischeCompetentie, b: TechnischeCompetentie) =>
            a.naam.localeCompare(b.naam),
        )
      } catch (error) {
        console.error(
          'Er is een fout opgetreden bij het ophalen van de technische competenties:',
          error,
        )
      }
    },
    async fetchTaken() {
      try {
        const token = localStorage.getItem('access_token')

        const response = await axios.get('http://localhost:3000/taak', {
          headers: { Authorization: `Bearer ${token}` },
        })
        this.taken = response.data.sort((a: Taak, b: Taak) =>
          a.naam.localeCompare(b.naam),
        )
      } catch (error) {
        console.error(
          'Er is een fout opgetreden bij het ophalen van de taken:',
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

    async addTechnischeCompetentie() {
      try {
        console.log(
          'Adding technische competentie with name:',
          this.naam,
          'and taak ID:',
          this.selectedTaakID,
          'and groep ID:',
          this.selectedGroepID,
        )
        const token = localStorage.getItem('access_token')
        const response = await axios.post(
          'http://localhost:3000/technische-competentie',
          {
            naam: this.naam,
            beschrijving: this.beschrijving,
            taak: { taakID: this.selectedTaakID },
            groep: { groepID: this.selectedGroepID },
          },
          { headers: { Authorization: `Bearer ${token}` } },
        )

        console.log('Response from addTechnischeTaak:', response.data)

        this.naam = ''
        this.beschrijving = ''
        this.selectedTaakID = 0
        this.selectedGroepID = 0

        await this.fetchTechnischeCompetenties()
      } catch (error) {
        console.error('Error adding taak:', error)
      }
    },

    async confirmDelete() {
      try {
        const token = localStorage.getItem('access_token')
        await this.deleteTechnischeCompetentie(
          this.selectedTechnischeCompetentieID,
        )
        this.isDeleteModalVisible = false
      } catch (error) {
        console.error('Error deleting technische competentie:', error)
      }
    },

    async deleteTechnischeCompetentie(technischeCompetentieID: number) {
      try {
        const token = localStorage.getItem('access_token')
        await axios.delete(
          `http://localhost:3000/technische-competentie/${technischeCompetentieID}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        )
        this.fetchTechnischeCompetenties()
      } catch (error) {
        console.error(
          'Er is een fout opgetreden bij het verwijderen van de technische competentie:',
          error,
        )
      }
    },

    openEditModal(
      technischeCompetentieID: number,
      naam: string,
      beschrijving: string,
      taakID: number,
      groepID: number,
    ) {
      this.selectedTechnischeCompetentieID = technischeCompetentieID
      this.editedNaam = naam
      this.editedBeschrijving = beschrijving
      this.editedTaakID = taakID
      this.editedGroepID = groepID
      this.isEditModalVisible = true
    },

    async updateTechnischeCompetentie(
      technischeCompetentieID: number,
      updatedNaam: string,
      updatedBeschrijving: string,
      updatedTaakID: number,
    ) {
      try {
        const token = localStorage.getItem('access_token')
        await axios.patch(
          `http://localhost:3000/technische-competentie/${technischeCompetentieID}`,
          {
            naam: updatedNaam,
            beschrijving: updatedBeschrijving,
            taak: { taakID: updatedTaakID },
          },
          { headers: { Authorization: `Bearer ${token}` } },
        )

        this.isEditModalVisible = false
        await this.fetchTechnischeCompetenties()
      } catch (error) {
        console.error('Error updating technische competentie:', error)
      }
    },

    closeModal() {
      this.isEditModalVisible = false
    },
  },
})
</script>
