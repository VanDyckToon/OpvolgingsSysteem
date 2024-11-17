<template>
  <div class="min-h-screen bg-[#ECF3EB] flex flex-col">
    <HeaderComponent />
    <div class="grid grid-cols-4 gap-4 pt-8 pb-2 px-14">
      <div class="col-span-3">
        <h1 class="text-[#104116] text-4xl font-extrabold pt-4">
          Opleidingen Beheren
        </h1>
        <form @submit.prevent="addOpleiding">
          <div class="mb-6">
            <label
              class="block text-[#456A50] text-xl font-bold mb-2 py-1"
              for="opleidingNaam"
            >
              Opleiding Naam:
            </label>
            <input
              v-model="naam"
              type="text"
              id="opleidingNaam"
              class="rounded-s-full rounded-r-full shadow appearance-none border rounded-lg py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200 w-6/12"
              placeholder="Vul hier de naam van de opleiding in"
              required
            />

            <label
              class="block text-[#456A50] text-xl font-bold mb-2 py-1"
              for="internSwitch"
            >
              Intern?
            </label>
            <div class="flex items-center mb-2">
              <label class="inline-flex items-center cursor-pointer">
                <input type="checkbox" v-model="intern" class="sr-only peer" />
                <div
                  class="shadow relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#A4C2A8] dark:peer-focus:ring-[#456A50] rounded-full peer dark:bg-[#456A50] peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#456A50]"
                ></div>
                <span
                  class="ms-3 text-md font-medium text-gray-900 dark:text-gray-300"
                  >Ja</span
                >
              </label>
            </div>

            <label
              class="block text-[#456A50] text-xl font-bold my-2 py-1"
              for="beginDatum"
            >
              Begin datum:
            </label>
            <input
              v-model="datumStart"
              type="datetime-local"
              id="datumStart"
              class="rounded-s-full rounded-r-full shadow appearance-none border rounded-lg py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200 w-6/12"
              required
            />

            <label
              class="block text-[#456A50] text-xl font-bold my-2 py-1"
              for="eindDatum"
            >
              Eind datum:
            </label>
            <input
              v-model="datumEind"
              type="datetime-local"
              id="datumEind"
              class="rounded-s-full rounded-r-full shadow appearance-none border rounded-lg py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200 w-6/12"
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
          src="../assets/opleiding-icoon.svg"
          alt="Image"
          class="h-32 w-auto mb-2 object-contain m-auto place-content-center"
        />
      </div>
    </div>

    <!-- Opleidingen list -->
    <div class="flex-grow flex justify-center items-center mb-16 mt-8">
      <div class="w-full max-w-4xl p-8 bg-white shadow-lg rounded-lg">
        <h2 class="text-3xl font-bold mb-6 text-center text-[#456A50]">
          Opleidingen
        </h2>
        <ul v-if="opleidingen.length" class="divide-y divide-gray-200">
          <li
            v-for="opleiding in opleidingen"
            :key="opleiding.opleidingID"
            class="py-4 flex items-center justify-between"
          >
            <div>
              <div class="text-[#456A50] font-bold">{{ opleiding.naam }}</div>
              <div class="text-[#456A50]">
                Begin Datum: {{ formatDatum(opleiding.datumStart) }}
                <span class="mx-2">|</span> Uur:
                {{ formatUur(opleiding.datumStart) }}
              </div>
              <div class="text-[#456A50]">
                Eind Datum: {{ formatDatum(opleiding.datumEind) }}
                <span class="mx-2">|</span> Uur:
                {{ formatUur(opleiding.datumEind) }}
              </div>
            </div>
            <div class="flex space-x-4">
              <img
                src="../assets/groep-icoon.svg"
                alt="User list"
                class="cursor-pointer w-8 h-8"
                @click="openUserModal(opleiding.opleidingID, opleiding.naam)"
              />
              <button>
                <Icon
                  icon="mdi:file-export"
                  class="text-[#104116] hover:text-[#104116] hover:scale-110 hover:ease-in-out hover:duration-500 w-8 h-8 cursor-pointer"
                  @click="exportOpleidingData(opleiding.opleidingID)"
                />
              </button>

              <Icon
                icon="material-symbols:edit"
                class="text-[#456A50] hover:text-[#104116] hover:scale-110 hover:ease-in-out hover:duration-500 w-8 h-8 cursor-pointer"
                @click="
                  openEditModal(
                    opleiding.opleidingID,
                    opleiding.naam,
                    opleiding.intern,
                    opleiding.datumStart,
                    opleiding.datumEind,
                  )
                "
              />
              <Icon
                icon="mynaui:trash-solid"
                class="text-[#c9184a] hover:text-[#800f2f] hover:scale-110 hover:ease-in-out hover:duration-500 w-8 h-8 cursor-pointer"
                @click="openDeleteModal(opleiding.opleidingID, opleiding.naam)"
              />
            </div>
          </li>
        </ul>
        <p v-else class="text-center text-gray-500">
          Geen opleidingen gevonden
        </p>
      </div>
    </div>

    <!-- Modal for User Overview -->
    <div
      v-if="isUserOverviewModalVisible"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div class="bg-white p-6 rounded-lg shadow-lg w-3/6">
        <h2 class="text-2xl font-bold mb-4 text-center">
          {{ selectedOpleidingNaam }}
        </h2>
        <!-- Add User -->
        <div class="mb-4">
          <label
            class="block text-gray-700 font-bold mb-2"
            for="selectGebruiker"
          >
            Selecteer een gebruiker om toe te voegen aan een de opleiding:
          </label>
          <div class="flex items-center">
            <select
              v-model="selectedGebruikerID"
              id="selectGebruiker"
              class="rounded-s-full rounded-r-full shadow border rounded-lg py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200 w-6/12"
            >
              <option value="" disabled>Selecteer een gebruiker</option>
              <option
                v-for="gebruiker in gebruikers"
                :key="gebruiker.gebruikerID"
                :value="gebruiker.gebruikerID"
              >
                {{ gebruiker.voornaam }} {{ gebruiker.achternaam }}
              </option>
            </select>
            <Icon
              icon="gridicons:add"
              width="30"
              class="ml-4 text-[#104116]"
              @click="addGebruikerToOpleiding"
            />
          </div>
        </div>
        <!-- User List -->
        <ul>
          <li
            v-for="gebruiker in selectedOpleidingGebruikers"
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
              <div class="flex-1 flex items-center space-x-4">
                <p class="font-bold text-[#456A50]">
                  {{ gebruiker.voornaam }} {{ gebruiker.achternaam }}
                </p>
                <p class="text-md text-gray-600">{{ gebruiker.email }}</p>
              </div>
              <button>
                <Icon
                  icon="mynaui:trash-solid"
                  class="text-[#c9184a] hover:text-[#800f2f] hover:scale-110 hover:ease-in-out hover:duration-500 w-8 h-8 cursor-pointer"
                  @click="
                    removeGebruikerFromOpleiding(
                      selectedOpleidingID,
                      gebruiker.gebruikerID,
                    )
                  "
                />
              </button>
            </div>
          </li>
        </ul>

        <div class="flex justify-end mt-4">
          <button
            @click="closeUserModal"
            class="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Sluiten
          </button>
        </div>
      </div>
    </div>

    <!-- Modal component voor het aanpassen van de groepen -->
    <div
      v-if="isEditModalVisible"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div class="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h2 class="text-2xl font-bold mb-4 text-center">Opleiding Bewerken</h2>
        <div class="mb-6">
          <label
            class="block text-[#456A50] text-xl font-bold mb-2 py-1"
            for="opleidingNaam"
          >
            Nieuwe Opleiding Naam:
          </label>
          <input
            v-model="editedNaam"
            type="text"
            id="editNaam"
            class="rounded-s-full rounded-r-full shadow appearance-none border rounded-lg py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200 w-6/12"
            placeholder="Vul hier de naam van de opleiding in"
            required
          />

          <label
            class="block text-[#456A50] text-xl font-bold mb-2 py-1"
            for="internSwitch"
          >
            Intern?
          </label>
          <div class="flex items-center mb-2">
            <label class="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                v-model="editedIntern"
                id="editIntern"
                class="sr-only peer"
              />
              <div
                class="shadow relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#A4C2A8] dark:peer-focus:ring-[#456A50] rounded-full peer dark:bg-[#456A50] peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#456A50]"
              ></div>
              <span
                class="ms-3 text-md font-medium text-gray-900 dark:text-gray-300"
                >Ja</span
              >
            </label>
          </div>

          <label
            class="block text-[#456A50] text-xl font-bold my-2 py-1"
            for="beginDatum"
          >
            Nieuwe Begin datum:
          </label>
          <input
            v-model="editedDatumStart"
            type="datetime-local"
            id="editDatumStart"
            class="rounded-s-full rounded-r-full shadow appearance-none border rounded-lg py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200 w-6/12"
            required
          />

          <label
            class="block text-[#456A50] text-xl font-bold my-2 py-1"
            for="eindDatum"
          >
            Nieuwe Eind datum:
          </label>
          <input
            v-model="editedDatumEind"
            type="datetime-local"
            id="editDatumEind"
            class="rounded-s-full rounded-r-full shadow appearance-none border rounded-lg py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200 w-6/12"
            required
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
              updateOpleiding(
                selectedOpleidingID,
                editedNaam,
                editedIntern,
                editedDatumStart,
                editedDatumEind,
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
          Weet je zeker dat je "{{ selectedOpleidingNaam }}" wilt verwijderen?
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
import { jsPDF } from 'jspdf'
import 'jspdf-autotable'

export default defineComponent({
  name: 'Opleiding',
  components: {
    Icon,
    HeaderComponent,
  },
  data() {
    return {
      opleidingen: [] as Opleiding[],
      naam: '',
      intern: false,
      datumStart: '',
      datumEind: '',
      isEditModalVisible: false,
      isDeleteModalVisible: false,
      selectedOpleidingID: 0,
      selectedOpleidingNaam: '',
      selectedIntern: '',
      SelectedDatumStart: '',
      SelectedDatumEind: '',
      editedNaam: '',
      editedIntern: '',
      editedDatumStart: '',
      EditedDatumEind: '',
      gebruikers: [] as Gebruiker[],
      selectedOpleidingGebruikers: [] as Gebruiker[],
      isUserOverviewModalVisible: false,
      selectedGebruikerID: null as number | null,
    }
  },
  async mounted() {
    this.fetchOpleidingen()
    this.fetchGebruikers()
  },
  methods: {
    openDeleteModal(opleidingID: number, naam: string) {
      this.selectedOpleidingID = opleidingID
      this.selectedOpleidingNaam = naam
      this.isDeleteModalVisible = true
    },
    async exportOpleidingData(opleidingID: number) {
      try {
        const token = localStorage.getItem('access_token')

        // Haal de gebruikers voor de geselecteerde opleiding op
        const response = await axios.get(
          `http://localhost:3000/opleiding-gebruiker/opleiding/${opleidingID}`,
          { headers: { Authorization: `Bearer ${token}` } },
        )

        const gebruikers = response.data

        if (gebruikers.length === 0) {
          alert('Er zijn geen deelnemers voor deze opleiding.')
          return
        }

        // Haal de details van de opleiding op
        const opleidingResponse = await axios.get(
          `http://localhost:3000/opleiding/${opleidingID}`,
          { headers: { Authorization: `Bearer ${token}` } },
        )
        const opleidingNaam = opleidingResponse.data.naam
        const datumStart = new Date(opleidingResponse.data.datumStart)
        const datumEind = new Date(opleidingResponse.data.datumEind)

        // Bereken het aantal dagen dat de opleiding duurt
        const aantalDagen =
          datumStart <= datumEind
            ? Math.floor(
                (datumEind.getTime() - datumStart.getTime()) /
                  (1000 * 60 * 60 * 24),
              ) + 1
            : 1

        // Genereer kolomnamen voor elke dag
        const tableColumn = ['Deelnemers']
        for (let i = 0; i < aantalDagen; i++) {
          const dagDatum = new Date(datumStart)
          dagDatum.setDate(dagDatum.getDate() + i)
          tableColumn.push(`Handtekening (${this.formatDatum(dagDatum)})`)
        }

        // Genereer rijen voor deelnemers
        const tableData = gebruikers.map((gebruiker: any) => {
          const row = [`${gebruiker.voornaam} ${gebruiker.achternaam}`]
          for (let i = 0; i < aantalDagen; i++) {
            row.push('') // Lege kolom voor handtekening
          }
          return row
        })

        // Maak een nieuwe PDF aan in liggend formaat
        const doc = new jsPDF('landscape')

        // Voeg de titel (naam van de opleiding) toe
        doc.setFontSize(18)
        doc.text('Opleiding: ' + opleidingNaam, 20, 20)
        doc.text('Aanwezigheidslijst', 20, 30)

        // Voeg de start- en einddatum toe onder de titel
        const datumStartFormatted = this.formatDatum(datumStart)
        const datumEindFormatted = this.formatDatum(datumEind)
        doc.setFontSize(12)
        doc.text(
          `Startdatum: ${datumStartFormatted} - Einddatum: ${datumEindFormatted}`,
          20,
          40,
        )

        let startY = 50

        // Splits de tabel in meerdere pagina's, 3 dagen per pagina
        const daysPerPage = 3
        let currentPage = 1

        for (let i = 0; i < aantalDagen; i += daysPerPage) {
          const daysSubset = tableColumn
            .slice(0, 1)
            .concat(
              tableColumn.slice(
                i + 1,
                Math.min(i + daysPerPage + 1, tableColumn.length),
              ),
            )

          const dataSubset = tableData.map(row =>
            row
              .slice(0, 1)
              .concat(
                row.slice(i + 1, Math.min(i + daysPerPage + 1, row.length)),
              ),
          )

          // Voeg de tabel toe met ondersteuning voor meerdere pagina's
          doc.autoTable({
            startY: startY,
            head: [daysSubset],
            body: dataSubset,
            theme: 'grid',
            styles: {
              fontSize: 12,
            },
            columnStyles: {
              0: { cellWidth: 'auto' },
              ...Array(daysSubset.length - 1)
                .fill(null)
                .reduce((acc, _, index) => {
                  acc[index + 1] = { cellWidth: 60 } // Stel kolombreedte in voor handtekeningenkolommen
                  return acc
                }, {}),
            },
            margin: { top: 10 },
            pageBreak: 'auto', // Voeg automatisch een nieuwe pagina toe bij overflow
          })

          // Als er meer dagen zijn, maak een nieuwe pagina aan
          if (i + daysPerPage < aantalDagen) {
            doc.addPage('landscape')
            startY = 20 // Reset startY voor de volgende pagina
            currentPage++
          }
        }

        // Genereer de PDF en bied het aan voor download
        doc.save(`${opleidingNaam}_aanwezigheidslijst.pdf`)
      } catch (error) {
        console.error(
          'Er is een fout opgetreden bij het exporteren van de PDF:',
          error,
        )
      }
    },
    closeDeleteModal() {
      this.isDeleteModalVisible = false
    },

    async fetchOpleidingen() {
      try {
        const token = localStorage.getItem('access_token')

        const response = await axios.get('http://localhost:3000/opleiding', {
          headers: { Authorization: `Bearer ${token}` },
        })
        this.opleidingen = response.data.sort((a: Opleiding, b: Opleiding) =>
          a.naam.localeCompare(b.naam),
        )
      } catch (error) {
        console.error(
          'Er is een fout opgetreden bij het ophalen van de opleidingen:',
          error,
        )
      }
    },

    async addOpleiding() {
      try {
        const token = localStorage.getItem('access_token')
        await axios.post(
          'http://localhost:3000/opleiding',
          {
            naam: this.naam,
            intern: this.intern,
            datumStart: this.datumStart,
            datumEind: this.datumEind,
          },
          { headers: { Authorization: `Bearer ${token}` } },
        )
        this.naam = ''
        this.intern = ''
        this.datumStart = ''
        this.datumEind = ''
        this.fetchOpleidingen()
      } catch (error) {
        console.error('Error adding opleiding:', error)
      }
    },

    async confirmDelete() {
      try {
        const token = localStorage.getItem('access_token')
        await this.deleteOpleiding(this.selectedOpleidingID)
        this.isDeleteModalVisible = false
      } catch (error) {
        console.error('Error deleting opleiding:', error)
      }
    },

    async deleteOpleiding(opleidingID: number) {
      try {
        const token = localStorage.getItem('access_token')
        await axios.delete(`http://localhost:3000/opleiding/${opleidingID}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        this.fetchOpleidingen()
      } catch (error) {
        console.error(
          'Er is een fout opgetreden bij het verwijderen van de opleiding:',
          error,
        )
      }
    },

    openEditModal(
      opleidingID: number,
      naam: string,
      intern: boolean,
      datumStart: Date,
      datumEind: Date,
    ) {
      this.selectedOpleidingID = opleidingID
      this.editedNaam = naam
      this.editedIntern = intern
      this.editedDatumStart = this.formatForDateTimeLocal(datumStart)
      this.editedDatumEind = this.formatForDateTimeLocal(datumEind)
      this.isEditModalVisible = true
    },

    formatForDateTimeLocal(date) {
      const d = new Date(date)
      const year = d.getFullYear()
      const month = String(d.getMonth() + 1).padStart(2, '0')
      const day = String(d.getDate()).padStart(2, '0')
      const hours = String(d.getHours()).padStart(2, '0')
      const minutes = String(d.getMinutes()).padStart(2, '0')
      return `${year}-${month}-${day}T${hours}:${minutes}`
    },

    formatDate(date) {
      const d = new Date(date)
      const year = d.getFullYear()
      const month = String(d.getMonth() + 1).padStart(2, '0')
      const day = String(d.getDate()).padStart(2, '0')
      return `${year}-${month}-${day}`
    },

    formatDatum(date) {
      const d = new Date(date)
      const year = d.getFullYear()
      const month = String(d.getMonth() + 1).padStart(2, '0')
      const day = String(d.getDate()).padStart(2, '0')
      return `${day}/${month}/${year}`
    },

    formatUur(date) {
      const d = new Date(date)
      const hours = String(d.getHours()).padStart(2, '0')
      const minutes = String(d.getMinutes()).padStart(2, '0')
      return `${hours}u${minutes}`
    },

    async updateOpleiding(
      opleidingID: number,
      updatedNaam: string,
      updatedIntern: boolean,
      updatedDatumStart: Date,
      updatedDatumEind: Date,
    ) {
      try {
        if (!updatedNaam.trim()) {
          alert('Opleidingnaam mag niet leeg zijn.')
          return
        }
        const token = localStorage.getItem('access_token')
        await axios.patch(
          `http://localhost:3000/opleiding/${opleidingID}`,
          {
            naam: updatedNaam,
            intern: updatedIntern,
            datumStart: updatedDatumStart,
            datumEind: updatedDatumEind,
          },
          { headers: { Authorization: `Bearer ${token}` } },
        )
        this.isEditModalVisible = false
        this.fetchOpleidingen()
      } catch (error) {
        console.error(
          'Error updating opleiding:',
          error.response ? error.response.data : error,
        )
      }
    },

    closeModal() {
      this.isEditModalVisible = false
    },

    openUserModal(opleidingID: number, opleidingNaam: string) {
      this.selectedOpleidingID = opleidingID
      this.selectedOpleidingNaam = opleidingNaam
      this.fetchUsersForOpleiding(opleidingID)
      this.isUserOverviewModalVisible = true
    },
    closeUserModal() {
      this.isUserOverviewModalVisible = false
    },
    async fetchUsersForOpleiding(opleidingID: number) {
      try {
        const token = localStorage.getItem('access_token')

        const response = await axios.get(
          `http://localhost:3000/opleiding-gebruiker/opleiding/${opleidingID}`,
          { headers: { Authorization: `Bearer ${token}` } },
        )
        this.selectedOpleidingGebruikers = response.data
      } catch (error) {
        console.error('Er is een fout opgetreden', error)
      }
    },
    async addGebruikerToOpleiding() {
      try {
        const token = localStorage.getItem('access_token')
        if (this.selectedGebruikerID && this.selectedOpleidingID) {
          const data = {
            opleiding: {
              opleidingID: this.selectedOpleidingID,
            },
            gebruiker: {
              gebruikerID: this.selectedGebruikerID,
            },
          }

          const response = await axios.get(
            `http://localhost:3000/opleiding-gebruiker/check/${this.selectedOpleidingID}/${this.selectedGebruikerID}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            },
          )

          if (response.data.exists) {
            alert('De gebruiker maakt al deel uit van deze opleiding.')
            return
          }

          await axios.post('http://localhost:3000/opleiding-gebruiker', data, {
            headers: { Authorization: `Bearer ${token}` },
          })

          this.fetchUsersForOpleiding(this.selectedOpleidingID)
        } else {
          console.log('Geen gebruiker of opleiding geselecteerd')
        }
      } catch (error) {
        console.error('Error adding user to opleiding:', error)
      }
    },
    async fetchGebruikers() {
      try {
        const token = localStorage.getItem('access_token')
        const response = await axios.get(
          'http://localhost:3000/gebruiker/gebruikersZonderAdmin',
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        )
        console.log(response.data)
        this.gebruikers = response.data
      } catch (error) {
        console.log('Error fetching gebruikers', error)
      }
    },
    async removeGebruikerFromOpleiding(
      opleidingID: number,
      gebruikerID: number,
    ) {
      try {
        const token = localStorage.getItem('access_token')
        if (!token) {
          console.error('No access token found')
          return // exit if no token
        }

        if (gebruikerID && opleidingID) {
          // Perform the delete request
          const response = await axios.delete(
            `http://localhost:3000/opleiding-gebruiker/opleiding/${opleidingID}/gebruiker/${gebruikerID}`,
            { headers: { Authorization: `Bearer ${token}` } },
          )

          if (response.status === 200) {
            // Successfully removed the user from the opleiding
            console.log('User removed successfully')
            // Optionally, refresh the user list for the current opleiding
            this.fetchUsersForOpleiding(opleidingID)
          } else {
            console.error('Failed to remove user', response)
          }
        } else {
          console.log('Geen gebruiker of opleiding geselecteerd')
        }
      } catch (error) {
        console.error('Error removing user from opleiding:', error)
      }
    },
  },
})
</script>
