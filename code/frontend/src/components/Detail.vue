<template>
    <div class="min-h-screen bg-[#ECF3EB] flex flex-col">
      <HeaderComponent :gebruikerID="gebruikerID" />
      <div class="flex-grow flex justify-center items-center">
        <div class="w-full max-w-4xl p-8 bg-white shadow-lg rounded-lg">
          <div v-if="gebruiker" class="space-y-4">
            <div class="flex items-start">
                <div class="w-1/2 pr-4">
              <h2 class="text-2xl font-bold mb-2 text-left text-black">
                Persoon gegevens
              </h2>
              <div class="flex flex-col text-[#104116] rounded-md">
                <p class="font-bold">Naam:
                  <span class="font-medium">{{ gebruiker.voornaam }} {{ gebruiker.achternaam }}</span>
                </p>
                <p class="font-bold">Adres:
                  <span class="font-medium">{{ gebruiker.straat }} {{ gebruiker.nummer }},
                  {{ gebruiker.postcode }} {{ gebruiker.woonplaats }}</span>
                </p>
              </div>
              <div class="pt-6">
                <h2 class="text-2xl font-bold mb-2 text-left text-black">
                  Contact gegevens
                </h2>
                <div class="flex flex-col text-[#104116] rounded-md">
                  <p class="font-bold">GSM: <a href="tel:{{ gebruiker.telefoonnummer }}" class="text-[#62825D] underline">{{ gebruiker.telefoonnummer }}</a></p>
                  <p class="font-bold">E-mailadres: <a href="mailto:{{ gebruiker.email }}" class="text-[#62825D] underline">{{ gebruiker.email }}</a></p>
                  <p class="font-bold text-[#C72C41]">
                    ICE: {{ gebruiker.ICENaam }} -
                    <a href="tel:{{ gebruiker.ICETelefoonnummer }}" class="underline">{{ gebruiker.ICETelefoonnummer }}</a>
                  </p>
                </div>
              </div>
            </div>
            <div class="w-1/2">
              <input
                type="file"
                id="media"
                ref="fileInput"
                accept="image/*"
                multiple
                @change="handleFileUpload"
                style="display: none;"
              />
              <img 
                v-if="profielFotoUrl"
                :src="profielFotoUrl"
                alt="Profile picture"
                class="w-52 h-52 object-cover rounded-full mb-4 float-right m-8"
                @click="triggerFileInput"
              />
              <img
                v-else
                :src="`/assets/no_image_available.jpg`"
                alt="No picture available"
                class="w-52 h-52 object-cover rounded-full mb-4 float-right m-8"
                @click="triggerFileInput"
              />
            </div>
            </div>
            <div class="flex justify-center space-x-4 mt-8">
            <div>
                <button
            @click="openWachtwoordModal(gebruiker.gebruikerID, gebruiker.wachtwoord)"
            class="bg-[#456A50] rounded-s-full rounded-r-full shadow-xl hover:bg-[#104116] hover:ease-in-out hover:duration-500 text-white text-center font-bold py-2 px-12 rounded focus:outline-none focus:shadow-outline"
          >
            Wachtwoord aanpassen
          </button>
            </div>
            <div class="right-0">
                <button
            @click="openEmailModal(gebruiker.gebruikerID, gebruiker.wachtwoord)
            "
            class="bg-[#456A50] rounded-s-full rounded-r-full shadow-xl hover:bg-[#104116] hover:ease-in-out hover:duration-500 text-white text-center font-bold py-2 px-12 rounded focus:outline-none focus:shadow-outline"
          >
            E-mail aanpassen
          </button>
            </div>
        </div>
          </div>
          <p v-else class="text-center text-gray-500">Geen gegevens gevonden</p>
        </div>
      </div>
    </div>

    <!-- Wachtwoord edit modal -->
    <div v-if="isWachtwoordModalVisible" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div class="bg-white p-6 rounded-lg shadow-lg w-1/4 h-3/5 flex flex-col justify-center">
        <h2 class="text-2xl font-bold mb-4 text-center">Wachtwoord Aanpassen</h2>

        <div class="flex-grow flex flex-col justify-center items-center">
              <label
                class="block text-[#456A50] text-xl font-bold mb-2 py-1 mt-2"
                for="gebruikerName"
              >
                Huidige wachtwoord:
              </label>
              <input
                v-model="editedWachtwoord"
                type="password"
                id="wachtwoord"
                class="rounded-s-full rounded-r-full shadow appearance-none border rounded-lg py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200 w-11/12"
                placeholder="Vul hier het huidig wachtwoord in"
                required
              />
        </div>
        <div class="flex justify-center space-x-4 mt-8">
          <button
            @click="closeWachtwoordModal"
            class="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Annuleer
          </button>
          <button
            @click="openWachtwoordAanpassenModal()"
            class="bg-[#456A50] hover:bg-[#104116] hover:ease-in-out hover:duration-500 text-white px-4 py-2 rounded"
          >
            Bevestigen
          </button>
        </div>
        </div>
    </div>

    <!-- Wachtwoord Aanpassen Modal -->
    <div v-if="isWachtwoordAanpassenModalVisible" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div class="bg-white p-6 rounded-lg shadow-lg w-1/4 h-3/5 flex flex-col justify-center">
        <h2 class="text-2xl font-bold mb-4 text-center">Wachtwoord Aanpassen</h2>

        <div class="flex-grow flex flex-col justify-center items-center">
              <label
                class="block text-[#456A50] text-xl font-bold mb-2 py-1 mt-2"
                for="gebruikerName"
              >
                Nieuw wachtwoord:
              </label>
              <input
                v-model="nieuwWachtwoord"
                type="password"
                id="wachtwoord"
                class="rounded-s-full rounded-r-full shadow appearance-none border rounded-lg py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200 w-11/12"
                placeholder="Vul hier het nieuwe wachtwoord in"
                required
              />
              <label
                class="block text-[#456A50] text-xl font-bold mb-2 py-1 mt-2"
                for="gebruikerName"
              >
                Nieuw wachtwoord:
              </label>
              <input
                v-model="bevestigWachtwoord"
                type="password"
                id="wachtwoord"
                class="rounded-s-full rounded-r-full shadow appearance-none border rounded-lg py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200 w-11/12"
                placeholder="Bevestig hier het nieuwe wachtwoord in"
                required
              />
        </div>
        <div class="flex justify-center space-x-4 mt-8">
                <button
                    @click="closeWachtwoordAanpassenModal"
                    class="bg-gray-500 text-white px-4 py-2 rounded"
                >
                    Annuleer
                </button>
                <button
                    @click="updateWachtwoord"
                    class="bg-[#456A50] hover:bg-[#104116] hover:ease-in-out hover:duration-500 text-white px-4 py-2 rounded"
                >
                    Bevestigen
                </button>
            </div>
        </div>
    </div>

    <!-- Email edit modal -->
    <div v-if="isEmailModalVisible" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div class="bg-white p-6 rounded-lg shadow-lg w-1/4 h-3/5 flex flex-col justify-center">
        <h2 class="text-2xl font-bold mb-4 text-center">E-mail Aanpassen</h2>
        
        <div class="flex-grow flex flex-col justify-center items-center">
              <label
                class="block text-[#456A50] text-xl font-bold mb-2 py-1 mt-2"
                for="gebruikerName"
              >
                Huidige wachtwoord:
              </label>
              <input
                v-model="editedWachtwoord"
                type="password"
                id="wachtwoord"
                class="rounded-s-full rounded-r-full shadow appearance-none border rounded-lg py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200 w-11/12"
                placeholder="Vul hier het huidig wachtwoord in"
                required
              />
            </div>

            <div class="flex justify-center space-x-4 mt-8">
                <button
                    @click="closeEmailModal"
                    class="bg-gray-500 text-white px-4 py-2 rounded"
                >
                    Annuleer
                </button>
                <button
                    @click="openEmailAanpassenModal()"
                    class="bg-[#456A50] hover:bg-[#104116] hover:ease-in-out hover:duration-500 text-white px-4 py-2 rounded"
                >
                    Bevestigen
                </button>
            </div>
        </div>
    </div>

    <!-- Email Aanpassen Modal -->
    <div v-if="isEmailAanpassenModalVisible" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div class="bg-white p-6 rounded-lg shadow-lg w-1/4 h-3/5 flex flex-col justify-center">
        <h2 class="text-2xl font-bold mb-4 text-center">E-mail Aanpassen</h2>
        
        <div class="flex-grow flex flex-col justify-center items-center">
                <label
                class="block text-[#456A50] text-xl font-bold mb-2 py-1 mt-2"
                for="gebruikerName"
              >
                Nieuw e-mail adres:
              </label>
              <input
                v-model="nieuwEmail"
                type="email"
                id="email"
                class="rounded-s-full rounded-r-full shadow appearance-none border rounded-lg py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200 w-11/12"
                placeholder="Vul hier het nieuwe e-mail adres in"
                required
              />
              <label
                class="block text-[#456A50] text-xl font-bold mb-2 py-1 mt-2"
                for="gebruikerName"
              >
                Bevestig nieuw e-mail adres:
              </label>
              <input
                v-model="bevestigEmail"
                type="email"
                id="email"
                class="rounded-s-full rounded-r-full shadow appearance-none border rounded-lg py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200 w-11/12"
                placeholder="Bevestig hier het nieuwe e-mail adres in"
                required
              />
            </div>

            <div class="flex justify-center space-x-4 mt-8">
                <button
                    @click="closeEmailAanpassenModal"
                    class="bg-gray-500 text-white px-4 py-2 rounded"
                >
                    Annuleer
                </button>
                <button
                    @click="updateEmail"
                    class="bg-[#456A50] hover:bg-[#104116] hover:ease-in-out hover:duration-500 text-white px-4 py-2 rounded"
                >
                    Bevestigen
                </button>
            </div>
        </div>
    </div>
  </template>
  
  <script lang="ts">
  import axios from 'axios'
  import { defineComponent } from 'vue'
  import HeaderComponent from '../components/Header.vue'

  interface Gebruiker {
    gebruikerID: number
    voornaam: string
    achternaam: string
    straat: string
    nummer: string
    postcode: string
    woonplaats: string
    email: string
    ICENaam: string
    ICETelefoonnummer: string
    foto: string
    telefoonnummer: string
    extraOpmerking: string
    wachtwoord: string
  }
  
  export default defineComponent({
    name: 'GebruikerInfo',
    components: {
      HeaderComponent,
    },
    data() {
      return {
        gebruikerID: 0,
        gebruiker: null as Gebruiker | null,
        isWachtwoordModalVisible: false,
        isWachtwoordAanpassenModalVisible: false,
        isEmailModalVisible: false,
        isEmailAanpassenModalVisible: false,
        selectedGebruikerID: 0,
        selectedWachtwoord: '',
        editedWachtwoord: '',
        nieuwWachtwoord: '',
        bevestigWachtwoord: '',
        nieuwEmail: '',
        bevestigEmail: '',
        uploadError: undefined as string | undefined,
      }
    },
    async mounted() {
        this.gebruikerID = Number(this.$route.params.id) || 0
  console.log('gebruikerID:', this.gebruikerID)
  this.fetchGebruikerDetails()
    },
    watch: {
    '$route.params.id'(newID: string) {
      // Whenever the route changes, update the gebruikerID and fetch data again
      this.gebruikerID = Number(newID);
      this.fetchGebruikerDetails();
    }
  },
    methods: {
        async fetchGebruikerDetails() {
  try {
    const token = localStorage.getItem('access_token')
    console.log('Access Token:', token) // Debugging line
    const response = await axios.get(
      `${import.meta.env.VITE_APP_API_URL}/gebruiker/${this.gebruikerID}`,
      { headers: { Authorization: `Bearer ${token}` } }
    )
    console.log('API Response:', response) // Debugging line
    this.gebruiker = response.data
  } catch (error) {
    console.error('Fout bij het ophalen van gebruiker details:', error)
  }
},
openWachtwoordModal(gebruikerID: number, wachtwoord: string) {
      this.selectedGebruikerID = gebruikerID
      this.selectedWachtwoord = wachtwoord
      this.isWachtwoordModalVisible = true
    },
    openEmailModal(gebruikerID: number, wachtwoord: string) {
      this.selectedGebruikerID = gebruikerID
      this.selectedWachtwoord = wachtwoord
      this.isEmailModalVisible = true
    },
    closeWachtwoordModal() {
      this.isWachtwoordModalVisible = false
    },
    closeEmailModal() {
      this.isEmailModalVisible = false
    },
    closeEmailAanpassenModal() {
      this.isEmailAanpassenModalVisible = false
      this.nieuwEmail = '';        // Clear input fields when closing
      this.bevestigEmail = ''; 
    },
    async openWachtwoordAanpassenModal() {
    try {
        // Retrieve the gebruikerID from the data property
        const gebruikerID = this.gebruikerID;  // This is directly available from your component

        console.log('Retrieved gebruikerID:', gebruikerID);  // Log the ID for debugging

        if (!gebruikerID) {
            alert('GebruikerID not found! Please log in again.');
            return;  // Exit if no gebruikerID found
        }

        const token = localStorage.getItem('access_token');
        console.log('Sending token in headers:', token);

        const response = await axios.post(
            `${import.meta.env.VITE_APP_API_URL}/gebruiker/wachtwoord`,
            { wachtwoord: this.editedWachtwoord, gebruikerID: gebruikerID },  // Send the gebruikerID to the backend
            { headers: { Authorization: `Bearer ${token}` } }
        );

        if (response.data.valid) {
            this.isWachtwoordModalVisible = false;
            this.isWachtwoordAanpassenModalVisible = true;
            this.editedWachtwoord = '';
        } else {
            alert('Wachtwoord is onjuist');
        }
    } catch (error) {
        console.error('Fout bij het controleren van het wachtwoord:', error);
        alert('Wachtwoord is onjuist');
    }
},

async updateWachtwoord() {
      // Check if passwords match
      if (this.nieuwWachtwoord !== this.bevestigWachtwoord) {
        alert('De wachtwoorden komen niet overeen!'); // User feedback
        return; // Stop the process if passwords are different
      }

      try {
        const token = localStorage.getItem('access_token'); // Get token

        // Ensure `gebruikerID` is available (from localStorage or your component state)
        const gebruikerID = this.gebruikerID || localStorage.getItem('gebruikerID');

        await axios.patch(
          `${import.meta.env.VITE_APP_API_URL}/gebruiker/${gebruikerID}/wachtwoord`,
          { wachtwoord: this.nieuwWachtwoord }, // Send only one password
          { headers: { Authorization: `Bearer ${token}` } }
        );

        alert('Wachtwoord succesvol gewijzigd!');
        this.isWachtwoordAanpassenModalVisible = false; // Close the modal

        // Clear fields after successful update
        this.nieuwWachtwoord = '';
        this.bevestigWachtwoord = '';
      } catch (error) {
        console.error('Fout bij het bijwerken van het wachtwoord:', error);
        alert('Er is iets misgegaan bij het bijwerken van het wachtwoord.');
      }
    },
    closeWachtwoordAanpassenModal() {
      this.isWachtwoordAanpassenModalVisible = false;
      this.nieuwWachtwoord = '';        // Clear input fields when closing
      this.bevestigWachtwoord = '';
    },

async openEmailAanpassenModal() {
    try {
        // Retrieve the gebruikerID from the data property
        const gebruikerID = this.gebruikerID;  // This is directly available from your component

        console.log('Retrieved gebruikerID:', gebruikerID);  // Log the ID for debugging

        if (!gebruikerID) {
            alert('GebruikerID not found! Please log in again.');
            return;  // Exit if no gebruikerID found
        }

        const token = localStorage.getItem('access_token');
        console.log('Sending token in headers:', token);

        const response = await axios.post(
            `${import.meta.env.VITE_APP_API_URL}/gebruiker/wachtwoord`,
            { wachtwoord: this.editedWachtwoord, gebruikerID: gebruikerID },  // Send the gebruikerID to the backend
            { headers: { Authorization: `Bearer ${token}` } }
        );

        if (response.data.valid) {
            this.isEmailModalVisible = false;
            this.isEmailAanpassenModalVisible = true;
            this.editedWachtwoord = '';
        } else {
            alert('Wachtwoord is onjuist');
        }
    } catch (error) {
        console.error('Fout bij het controleren van het wachtwoord:', error);
        alert('Wachtwoord is onjuist');
    }
},

async updateEmail() {
      if (this.nieuwEmail !== this.bevestigEmail) {
        alert('De e-mail adressen komen niet overeen!');
        return; // Stop the process if passwords are different
      }

      try {
        const token = localStorage.getItem('access_token'); // Get token

        // Ensure `gebruikerID` is available (from localStorage or your component state)
        const gebruikerID = this.gebruikerID || localStorage.getItem('gebruikerID');

        await axios.patch(
          `${import.meta.env.VITE_APP_API_URL}/gebruiker/${gebruikerID}`,
          { email: this.nieuwEmail }, // Send only one password
          { headers: { Authorization: `Bearer ${token}` } }
        );

        alert('E-mail adres succesvol gewijzigd!');
        this.isEmailAanpassenModalVisible = false; // Close the modal
        this.fetchGebruikerDetails();

        // Clear fields after successful update
        this.nieuwEmail = '';
        this.bevestigEmail = '';
      } catch (error) {
        console.error('Fout bij het bijwerken van het e-mail adres:', error);
        alert('Er is iets misgegaan bij het bijwerken van het e-mail adres.');
      }
    },
     async updateFoto(filename: string) {
      if (this.gebruiker) {
        try {
          const token = localStorage.getItem('access_token');
          await axios.patch(
            `${import.meta.env.VITE_APP_API_URL}/gebruiker/${this.$route.params.id}`,
            { foto: filename },
            { headers: { Authorization: `Bearer ${token}` } }
          );
          alert('Foto is bijgewerkt!');
        } catch (error) {
          console.error('Fout bij het bijwerken van de foto:', error);
          alert('Er is een fout opgetreden bij het bijwerken.');
        }
      }
    },
    validateImageFile(file: File): boolean {
      const allowedTypes = [
        'image/jpeg',
        'image/png',
        'image/gif',
        'image/webp',
        'image/svg+xml'
      ];

      if(!allowedTypes.includes(file.type)) {
        this.uploadError = 'Alleen JPG, PNG, GIF, WEBP of SVG bestanden zijn toegestaan.';
        return false;
      }

      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        this.uploadError = 'Bestand is te groot. Maximale grootte is 5MB.';
        return false;
      }
      return true;
    },
    async handleFileUpload(event: Event) {
      const target = event.target as HTMLInputElement
      const file = target.files?.[0];

      this.uploadError = undefined;

      if (!file) return;

      if (!this.validateImageFile(file)) {
        target.value = '';
        return;
      }

      const formData = new FormData()
      formData.append('file', file);

      try {
        const token = localStorage.getItem('access_token');

        const uploadResponse = await axios.post(
            `${import.meta.env.VITE_APP_API_URL}/upload`,
            formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`,
              },
            }
        );

        const savedFilename = uploadResponse.data.filename;
        await this.updateFoto(savedFilename);

        if(this.gebruiker) {
          this.gebruiker.foto = savedFilename;
        }
        alert('Foto succesvol geüpload en opgeslagen!');
      }catch(error) {
        console.error('Fout bij het uploaden:', error)
        this.uploadError = 'Upload mislukt. Probeer het later opnieuw.';
      } finally {
        target.value = '';
      }
    },
    triggerFileInput() {
      const input = this.$refs.fileInput as HTMLInputElement | undefined;
      input?.click();
    },
    },
    computed: {
    profielFotoUrl(): string | undefined {
        if (this.gebruiker?.foto) {
          return `${import.meta.env.VITE_APP_API_URL}/uploads/${this.gebruiker.foto}`;
        }
        return undefined; // Return undefined instead of null
      }
    }
  })
  </script>