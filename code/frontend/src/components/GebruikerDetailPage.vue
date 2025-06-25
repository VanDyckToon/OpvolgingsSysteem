<template>
  <div class="min-h-screen bg-[#ECF3EB] flex flex-col">
    <HeaderComponent :begeleiderID="begeleiderID" />
    <div class="flex-grow flex justify-center items-center">
      <div class="w-full max-w-4xl p-8 bg-white shadow-lg rounded-lg">
        <div v-if="gebruiker" class="space-y-4">
          <div class="flex items-start">
            <div class="w-1/2 pr-4">
              <h2 class="text-2xl font-bold mb-2 text-left text-black">
                Persoonsgegevens 
              </h2>
              <div class="flex flex-col text-[#104116] rounded-md">
                <p class="font-bold">
                  {{ gebruiker.voornaam }} {{ gebruiker.achternaam }}
                </p>
                <p class="font-bold">
                  {{ gebruiker.straat }} {{ gebruiker.nummer }},
                  {{ gebruiker.postcode }} {{ gebruiker.woonplaats }}
                </p>
              </div>
              <div class="pt-6">
                <h2 class="text-2xl font-bold mb-2 text-left text-black">
                  Contactgegevens
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
              <div class="py-6">
                <h2 class="text-2xl font-bold mb-2 text-left text-black">
                  Extra opmerkingen
                </h2>
                <div class="flex flex-col text-[#104116] rounded-md">
                  <textarea
                    v-model="gebruiker.extraOpmerking"
                    class="border p-2 rounded"
                    placeholder="Voer extra opmerkingen in"
                  ></textarea>
                  <button
                    @click="updateExtraOpmerking"
                    class="mt-2 bg-[#104116] text-white px-4 py-2 rounded text-lg w-32"
                  >
                    Opslaan
                  </button>
                </div>
              </div>
            </div>
            <div class="w-1/2">
              <input
                type="file"
                id="media"
                ref="fileInput"
                accept="image/*"
                @change="handleFileUpload"
                style="display: none;"
              />
              <img
                v-if="profielFotoUrl"
                :src="profielFotoUrl"
                alt="Profiel Foto"
                class="w-72 h-72 object-cover rounded-full mb-4 float-rigth m-8"
                @click="triggerFileInput"
              />
              <img
                v-else
                :src="`/assets/no_image_available.jpg`"
                class="w-72 h-72 object-cover rounded-full mb-4 float-right m-8"
                @click="triggerFileInput"
                alt="No picture available"
              />
            </div>
          </div>
        </div>
        <p v-else class="text-center text-gray-500">Geen gegevens gevonden</p>
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
}

export default defineComponent({
  name: 'GebruikerDetailPage',
  components: {
    HeaderComponent,
  },
  
  data() {
    return {
      gebruiker: null as Gebruiker | null,
      begeleiderID: this.$route.params.id as string,
      //uploadError: null as string | null,
    }
  },
  async mounted() {
    this.fetchGebruikerDetails()
  },
  methods: {
    async fetchGebruikerDetails() {
      try {
        const token = localStorage.getItem('access_token')
        const response = await axios.get(
          `${import.meta.env.VITE_APP_API_URL}/gebruiker/${this.$route.params.id}`,
          { headers: { Authorization: `Bearer ${token}` } },
        )
        this.gebruiker = response.data
      } catch (error) {
        console.error('Fout bij het ophalen van gebruiker details:', error)
      }
    },
    async updateExtraOpmerking() {
      if (this.gebruiker) {
        try {
          const token = localStorage.getItem('access_token')
          await axios.patch(
            `${import.meta.env.VITE_APP_API_URL}/gebruiker/${this.$route.params.id}`,
            { extraOpmerking: this.gebruiker.extraOpmerking },
            { headers: { Authorization: `Bearer ${token}` } },
          )
          alert('Extra opmerking bijgewerkt!')
        } catch (error) {
          console.error('Fout bij het bijwerken van de extra opmerking:', error)
          alert('Er is een fout opgetreden bij het bijwerken.')
        }
      }
    },
    /*async updateFoto(filename: string) {
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
      // Allowed image MIME types
      const allowedTypes = [
        'image/jpeg',
        'image/png',
        'image/gif',
        'image/webp',
        'image/svg+xml'
      ];
      
      // Check file type
      if (!allowedTypes.includes(file.type)) {
        this.uploadError = 'Alleen JPG, PNG, GIF, WEBP of SVG bestanden zijn toegestaan.';
        return false;
      }
      
      // Check file size (e.g., 5MB limit)
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        this.uploadError = 'Bestand is te groot. Maximale grootte is 5MB.';
        return false;
      }
      
      return true;
    },
    async handleFileUpload(event: Event) {
      const target = event.target as HTMLInputElement;
      const file = target.files?.[0];
      
      // Reset previous errors
      this.uploadError = null;
      
      if (!file) return;
      
      // Validate the file before upload
      if (!this.validateImageFile(file)) {
        target.value = ''; // Clear the file input
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
      } catch(error) {
        console.error('Fout bij het uploaden:', error)
        this.uploadError = 'Uploaden mislukt. Probeer het later opnieuw.';
      } finally {
        target.value = ''; // Clear the file input after upload attempt
      }
    },
    triggerFileInput() {
      const input = this.$refs.fileInput as HTMLInputElement | undefined;
      input?.click();
    },
  },
  computed: {
    profielFotoUrl(): string | null {
      if (this.gebruiker?.foto) {
        return `${import.meta.env.VITE_APP_API_URL}/uploads/${this.gebruiker.foto}`;
      }
      return null;
    }*/
  },
})
</script>

<style scoped>
/* Add any additional styling here */
</style>
