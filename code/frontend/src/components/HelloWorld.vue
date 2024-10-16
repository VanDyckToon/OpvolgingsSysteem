<template>
  <div v-if="gebruiker">
    <h1>Details van gebruiker</h1>
    <div>
      <img
        v-if="gebruiker.foto"
        :src="gebruiker.foto"
        alt="Foto van gebruiker"
      />
      <h2>{{ gebruiker.voornaam }} {{ gebruiker.achternaam }}</h2>
      <p><strong>Rol:</strong> {{ gebruiker.rol?.naam }}</p>
      <!-- Vervang naam door de juiste eigenschap van Rol -->
      <p>
        <strong>Adres:</strong> {{ gebruiker.straat }}
        {{ gebruiker.huisNummer }}, {{ gebruiker.postcode }}
        {{ gebruiker.woonplaats }}
      </p>
      <p><strong>ICE Naam:</strong> {{ gebruiker.ICENaam }}</p>
      <p>
        <strong>ICE Telefoonnummer:</strong> {{ gebruiker.ICETelefoonnummer }}
      </p>
    </div>
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      gebruiker: null,
    };
  },
  async created() {
    await this.fetchGebruiker(4); // Fetch gebruiker with ID 4
  },
  methods: {
    async fetchGebruiker(id) {
      try {
        const response = await axios.get(
          `http://localhost:3000/gebruiker/${id}`
        );
        this.gebruiker = response.data;
      } catch (error) {
        console.error(
          "Er is een fout opgetreden bij het ophalen van gebruiker:",
          error
        );
      }
    },
  },
};
</script>

<style>
/* Voeg hier je stijl toe */
</style>
