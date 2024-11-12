<template>
    <div class="min-h-screen bg-[#ECF3EB] flex flex-col">
      <HeaderComponent />
      <div class="grid grid-cols-4 gap-4 pt-8 pb-2 px-14">
        <div class="col-span-3">
          <h1 class="text-[#104116] text-4xl font-extrabold pt-4">Gebruiker Beheren</h1>
          <form @submit.prevent="addGebruiker">
            <div class="mb-6">
                <div class="grid grid-cols-2 gap-4 mb-6">
                    <div>
                        <label class="block text-[#456A50] text-xl font-bold mb-2 py-1" for="gebruikerVoorname">
                        Voornaam:
                        </label>
                        <input
                            v-model="voornaam"
                            type="text"
                            id="voornaam"
                            class="rounded-s-full rounded-r-full shadow appearance-none border rounded-lg py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200 w-11/12"
                            placeholder="Vul hier de naam van de taak in"
                            required
                        /> 
                        <label class="block text-[#456A50] text-xl font-bold mb-2 py-1 mt-2" for="taakName">
                            Telefoonnummer:
                        </label>
                        <input
                            v-model="telefoonnummer"
                            type="text"
                            id="telefoonnummer"
                            pattern="\+[0-9]{11}"
                            class="rounded-s-full rounded-r-full shadow appearance-none border rounded-lg py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200 w-11/12"
                            placeholder="Vul hier de naam van de taak in"
                            required
                        />
                        <label class="block text-[#456A50] text-xl font-bold mb-2 py-1 mt-2" for="taakName">
                            Wachtwoord:
                        </label>
                        <input
                            v-model="wachtwoord"
                            type="password"
                            id="wachtwoord"
                            class="rounded-s-full rounded-r-full shadow appearance-none border rounded-lg py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200 w-11/12"
                            placeholder="Vul hier de naam van de taak in"
                            required
                        />
                        <label class="block text-[#456A50] text-xl font-bold mb-2 py-1 mt-2" for="subgroepName">
                            Selecteer een groep:
                        </label>
                        <select 
                        v-model="selectedSubgroepID"
                        class="rounded-s-full rounded-r-full shadow border rounded-lg py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200 w-11/12"
                        required
                        >
                        <option disabled selected value="">Selecteer een groep</option>
                        <option
                            v-for="subgroep in subgroepen"
                            :key="subgroep.subgroepID"
                            :value="subgroep.subgroepID"
                        >
                            {{ subgroep.subgroepNaam }}
                        </option>
                        </select>
                        <label class="block text-[#456A50] text-xl font-bold mb-2 py-1 mt-2" for="taakName">
                            Straat:
                        </label>
                        <input
                            v-model="straat"
                            type="text"
                            id="straat"
                            class="rounded-s-full rounded-r-full shadow appearance-none border rounded-lg py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200 w-11/12"
                            placeholder="Vul hier de naam van de taak in"
                            required
                        />
                        <label class="block text-[#456A50] text-xl font-bold mb-2 py-1 mt-2" for="taakName">
                            Postcode:
                        </label>
                        <input
                            v-model="postcode"
                            type="text"
                            id="postcode"
                            class="rounded-s-full rounded-r-full shadow appearance-none border rounded-lg py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200 w-11/12"
                            placeholder="Vul hier de naam van de taak in"
                            required
                        />
                        <label class="block text-[#456A50] text-xl font-bold mb-2 py-1 mt-2" for="taakName">
                            ICE Naam:
                        </label>
                        <input
                            v-model="ICENaam"
                            type="text"
                            id="ICENaam"
                            class="rounded-s-full rounded-r-full shadow appearance-none border rounded-lg py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200 w-11/12"
                            placeholder="Vul hier de naam van de taak in"
                            required
                        />
                    </div>
                    <div>
                        <label class="block text-[#456A50] text-xl font-bold mb-2 py-1" for="GebruikerAchtername">
                            Achternaam:
                        </label>
                        <input
                            v-model="achternaam"
                            type="text"
                            id="achternaam"
                            class="rounded-s-full rounded-r-full shadow appearance-none border rounded-lg py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200 w-11/12"
                            placeholder="Vul hier de naam van de taak in"
                            required
                        />
                        <label class="block text-[#456A50] text-xl font-bold mb-2 py-1 mt-2" for="taakName">
                            E-mail:
                        </label>
                        <input
                            v-model="email"
                            type="email"
                            id="email"
                            class="rounded-s-full rounded-r-full shadow appearance-none border rounded-lg py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200 w-11/12"
                            placeholder="Vul hier de naam van de taak in"
                            required
                        />
                        <label class="block text-[#456A50] text-xl font-bold mb-2 py-1 mt-2" for="subgroepName">
                        Selecteer een roll:
                        </label>
                        <select 
                        v-model="selectedRolID"
                        class="rounded-s-full rounded-r-full shadow border rounded-lg py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200 w-11/12"
                        required
                        >
                        <option disabled selected value="">Selecteer een roll</option>
                        <option
                            v-for="rol in rolen"
                            :key="rol.rolID"
                            :value="rol.rolID"
                        >
                            {{ rol.naam }}
                        </option>
                        </select>
                        <label v-if="selectedRolID && isWerknemer(selectedRolID)" class="block text-[#456A50] text-xl font-bold mb-2 py-1 mt-2" for="begeleiderName">
                        Selecteer een begeleider:
                        </label>
                        <select 
                            v-if="selectedRolID && isWerknemer(selectedRolID)"
                            v-model="selectedBegeleiderID"
                            class="rounded-s-full rounded-r-full shadow border rounded-lg py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200 w-11/12"
                            required
                            >
                            <option disabled selected value="">Selecteer een begeleider</option>
                            <option
                                v-for="begeleider in filteredBegeleiders"
                                :key="begeleider.gebruikerID"
                                :value="begeleider.gebruikerID"
                            >
                                {{ begeleider.voornaam }} {{ begeleider.achternaam }}
                            </option>
                        </select>
                        <label class="block text-[#456A50] text-xl font-bold mb-2 py-1 mt-2" for="taakName">
                            Huisnummer:
                        </label>
                        <input
                            v-model="huisNummer"
                            type="text"
                            id="huisNummer"
                            class="rounded-s-full rounded-r-full shadow appearance-none border rounded-lg py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200 w-11/12"
                            placeholder="Vul hier de naam van de taak in"
                            required
                        />
                        <label class="block text-[#456A50] text-xl font-bold mb-2 py-1 mt-2" for="taakName">
                            Woonplaats:
                        </label>
                        <input
                            v-model="woonplaats"
                            type="text"
                            id="woonplaats"
                            class="rounded-s-full rounded-r-full shadow appearance-none border rounded-lg py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200 w-11/12"
                            placeholder="Vul hier de naam van de taak in"
                            required
                        />
                        <label class="block text-[#456A50] text-xl font-bold mb-2 py-1 mt-2" for="taakName">
                            ICE Telefoonnummer:
                        </label>
                        <input
                            v-model="ICETelefoonnummer"
                            type="text"
                            id="ICETelefoonnummer"
                            pattern="\+[0-9]{11}"
                            class="rounded-s-full rounded-r-full shadow appearance-none border rounded-lg py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200 w-11/12"
                            placeholder="Vul hier de naam van de taak in"
                            required
                        />   
                    </div>
                </div>
              <div class="grid grid-cols-1 gap-4 mb-6">
                <label class="block text-[#456A50] text-xl font-bold mb-2 py-1" for="technischeCompetentieName">
                    Extra Opmerking:
                </label>
                <textarea
                v-model="extraOpmerking"
                class="shadow appearance-none border rounded-lg py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200 w-11/12"
                rows="4"
                placeholder="Typ hier de technische competentie beschrijving"
                ></textarea>
              </div> 
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
          <h2 class="text-3xl font-bold mb-6 text-center text-[#456A50]">Gebruikers</h2>
          <ul v-if="gebruikers.length" class="divide-y divide-gray-200">
            <li
              v-for="gebruiker in gebruikers"
              :key="gebruiker.gebruikerID"
              class="py-4 flex items-center justify-between"
            >
              <div>
                <div class="text-[#456A50] font-bold">{{ gebruiker.achternaam }} {{ gebruiker.voornaam }}</div>
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
                  @click="openDeleteModal(gebruiker.gebruikerID, gebruiker.voornaam, gebruiker.achternaam)"
                />
              </div>
            </li>
          </ul>
          <p v-else class="text-center text-gray-500">Geen gebruikers gevonden</p>
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
      <h3 class="text-xl font-semibold mb-4">Weet je zeker dat je "{{ selectedGebruikerVoornaam }} {{ selectedGebruikerAchternaam }}" wilt verwijderen?</h3>
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
  
  interface Subgroep {
    subgroepID: number
    subgroepNaam: string
  }

  interface Rol {
    rolID: number
    naam: string
  }

  interface Gebruiker {
    gebruikerID: number;
    naam: string;
    achternaam: string;
    rolID: number;
  }

  export default defineComponent({
    name: 'Gebruiker',
    components: {
      Icon,
      HeaderComponent,
    },
    data() {
      return {
        subgroepen: [] as Subgroep[],
        rolen: [] as Rol[],
        gebruikers: [] as Gebruiker[],
        selectedGroepen: {} as Record<number, number>,
        voornaam: '',
        achternaam: '',
        telefoonnummer: '',
        email: '',
        wachtwoord: '',
        straat: '',
        huisNummer: '',
        postcode: '',
        woonplaats: '',
        ICENaam: '',
        ICETelefoonnummer: '',
        extraOpmerking: '', 
        isEditModalVisible: false, 
        isDeleteModalVisible: false,
        selectedGebruikerID: 0,
        selectedRolID: 0,
        selectedBegeleiderID: 0,
        selectedSubgroepID: 0,
        selectedVoornaam: '',
        editedNaam: '',
        editedGroepnaam: 0,
      }
    },
    async mounted() {
      this.fetchGebruikers();
      this.fetchSubgroepen();
      this.fetchRolen();
      this.fetchBegeleiders();
    },
    computed: {
        filteredBegeleiders() {
    return this.gebruikers.filter(gebruiker => gebruiker.rol.rolID === 2);
  }
    },
    methods: {
        openDeleteModal(gebruikerID: number, voornaam: string, achternaam: string) {
      // Zet de geselecteerde rol en laat de delete modal zien
      this.selectedGebruikerID = gebruikerID;
      this.selectedGebruikerVoornaam = voornaam;
      this.selectedGebruikerAchternaam = achternaam;
      this.isDeleteModalVisible = true;
    },

    isWerknemer(selectedRolID) {
    const rol = this.rolen.find(rol => rol.rolID === selectedRolID);
    return rol && rol.naam === 'Werknemer';
  },

    closeDeleteModal() {
      this.isDeleteModalVisible = false;
    },

  async fetchGebruikers() {
    try {
        const token = localStorage.getItem('access_token')

      const response = await axios.get('http://localhost:3000/gebruiker', { headers: { Authorization: `Bearer ${token}` } })
      this.gebruikers = response.data.sort((a: Gebruiker, b: Gebruiker) => a.achternaam.localeCompare(b.achternaam))
    } catch (error) {
      console.error('Er is een fout opgetreden bij het ophalen van de gebruikers:', error)
    }
  },
  async fetchSubgroepen() {
    try {
        const token = localStorage.getItem('access_token')
        const response = await axios.get('http://localhost:3000/subgroep', {
        headers: { Authorization: `Bearer ${token}` }
        });
        this.subgroepen = response.data.sort((a: Subgroep, b: Subgroep) => a.subgroepNaam.localeCompare(b.subgroepNaam));
    } catch (error) {
        console.error('Er is een fout opgetreden bij het ophalen van de subgroepen:', error);
    }
    },
async fetchRolen() {
    try {
        const token = localStorage.getItem('access_token')
        const response = await axios.get('http://localhost:3000/rol', {
        headers: { Authorization: `Bearer ${token}` }
        });
        this.rolen = response.data.sort((a: Rol, b: Rol) => a.naam.localeCompare(b.naam));
    } catch (error) {
        console.error('Er is een fout opgetreden bij het ophalen van de rolen:', error);
    }
    },
    async fetchBegeleiders() {
  try {
    const token = localStorage.getItem('access_token');
    const response = await axios.get('http://localhost:3000/gebruiker', { // Use the correct endpoint
      headers: { Authorization: `Bearer ${token}` }
    });
    this.gebruikers = response.data;  // Get all users

    // Ensure rolen is populated after fetching users
    const rolesResponse = await axios.get('http://localhost:3000/rol', {
      headers: { Authorization: `Bearer ${token}` },
    });
    this.rolen = rolesResponse.data;
    
    console.log('Fetched users:', this.gebruikers);
    console.log('Fetched roles:', this.rolen);
  } catch (error) {
    console.error('Error fetching begeleiders:', error);
  }
},
  
async addGebruiker() {
  try {
    console.log('Adding gebruiker with name:', this.voornaam, this.achternaam, 'and rol ID:', this.selectedRolID);

    // Get the token from local storage
    const token = localStorage.getItem('access_token');

    // Prepare the request data
    const requestData: any = {
      voornaam: this.voornaam,
      achternaam: this.achternaam,
      telefoonnummer: this.telefoonnummer,
      email: this.email,
      wachtwoord: this.wachtwoord,
      straat: this.straat,
      huisNummer: this.huisNummer,
      postcode: this.postcode,
      woonplaats: this.woonplaats,
      ICENaam: this.ICENaam,
      ICETelefoonnummer: this.ICETelefoonnummer,
      extraOpmerking: this.extraOpmerking,
      rol: { rolID: this.selectedRolID },
      subgroep: { subgroepID: this.selectedSubgroepID },
    };

    // If the role is 'Werknemer' (Employee), include the begeleider (supervisor)
    if (this.isWerknemer(this.selectedRolID)) {
      if (this.selectedBegeleiderID) {
        requestData.begeleider = { gebruikerID: this.selectedBegeleiderID };
      } else {
        console.error('Begeleider is required for Werknemer');
        return;
      }
    }
    // Make the API request to add the gebruiker
    const response = await axios.post('http://localhost:3000/gebruiker', requestData, {
      headers: { Authorization: `Bearer ${token}` }
    });

    console.log('Response from addGebruiker:', response.data);

    // Optionally, reset the form
    this.voornaam = '';
    this.achternaam = '';
    this.telefoonnummer = '';
    this.email = '';
    this.wachtwoord = '';
    this.straat = '';
    this.huisNummer = '';
    this.postcode = '';
    this.woonplaats = '';
    this.ICENaam = '';
    this.ICETelefoonnummer = '';
    this.extraOpmerking = '';
    this.selectedRolID = 0;
    this.selectedSubgroepID = 0;
    this.selectedBegeleiderID = 0;

    // Refresh the users list
    await this.fetchGebruikers();
  } catch (error) {
    console.error('Error adding gebruiker:', error);
  }
},


    async confirmDelete() {
      try {
        const token = localStorage.getItem('access_token');
        await this.deleteGebruiker(this.selectedGebruikerID);
        this.isDeleteModalVisible = false; // Close the modal after confirmation
      } catch (error) {
        console.error('Error deleting taak:', error);
      }
    },

    async deleteGebruiker(gebruikerID: number) {
      try {
        const token = localStorage.getItem('access_token');
        await axios.delete(`http://localhost:3000/gebruiker/${gebruikerID}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        this.fetchGebruikers(); // Refresh the list after deletion
      } catch (error) {
        console.error('Er is een fout opgetreden bij het verwijderen van de gebruiker:', error);
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
    await axios.patch(`http://localhost:3000/gebruiker/${gebruikerID}`, 
      { 
        naam: updatedNaam, 
        groep: { groepID: updatedGroepID } // Update the group ID as well
      }, 
      { headers: { Authorization: `Bearer ${token}` } }
    );
    
    this.isEditModalVisible = false; // Close the modal
    await this.fetchGebruikers(); // Refresh the list after updating
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