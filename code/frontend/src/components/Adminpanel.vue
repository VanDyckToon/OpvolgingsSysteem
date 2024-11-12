<template>
    <div class="min-h-screen bg-[#ECF3EB] flex flex-col">
      <HeaderComponent />
      <div>
        <h1 class="text-[#104116] text-4xl font-extrabold text-center pt-4">Admin Paneel</h1>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 pt-8 pb-2 px-16">
        <router-link :to="`/`">
        <button class="w-full h-48 flex flex-col items-center justify-center font-bold text-[#104116] text-2xl bg-white shadow-xl rounded overflow-hidden transition-transform duration-500 hover:scale-110">
            <img src="../assets/gebruiker-icoon.svg" alt="Image" class="h-16 w-auto mb-2 object-contain">
            <span class="text-center px-1">Gebruikers Beheren</span>
        </button>
        </router-link>
        <router-link :to="`/materiaal`">
        <button class="w-full h-48 flex flex-col items-center justify-center font-bold text-[#104116] text-2xl bg-white shadow-xl rounded overflow-hidden transition-transform duration-500 hover:scale-110">
            <img src="../assets/kruiwagen.svg" alt="Image" class="h-16 w-auto mb-2 object-contain">
            <span class="text-center">Materiaal Beheren</span>
        </button>
        </router-link>
        <router-link :to="`/groep`">
        <button class="w-full h-48 flex flex-col items-center justify-center font-bold text-[#104116] text-2xl bg-white shadow-xl rounded overflow-hidden transition-transform duration-500 hover:scale-110">
            <img src="../assets/groep-icoon.svg" alt="Image" class="h-16 w-auto mb-2 object-contain">
            <span class="text-center">Groepen Beheren</span>
        </button>
        </router-link>
        <router-link :to="`/taak`">
        <button class="w-full h-48 flex flex-col items-center justify-center font-bold text-[#104116] text-2xl bg-white shadow-xl rounded overflow-hidden transition-transform duration-500 hover:scale-110">
            <img src="../assets/taak-icoon.svg" alt="Image" class="h-16 w-auto mb-2 object-contain">
            <span class="text-center">Taken Beheren</span>
        </button>
        </router-link>
        <router-link :to="`/rol`">
        <button class="w-full h-48 flex flex-col items-center justify-center font-bold text-[#104116] text-2xl bg-white shadow-xl rounded overflow-hidden transition-transform duration-500 hover:scale-110">
            <img src="../assets/medal.svg" alt="Image" class="h-16 w-auto mb-2 object-contain">
            <span class="text-center">Rollen Beheren</span>
        </button>
        </router-link>
        <router-link :to="`/competentie`">
        <button class="w-full h-48 flex flex-col items-center justify-center font-bold text-[#104116] text-2xl bg-white shadow-xl rounded overflow-hidden transition-transform duration-500 hover:scale-110">
            <img src="../assets/competentie-icoon.svg" alt="Image" class="h-16 w-auto mb-2 object-contain color-[#101234]">
            <span class="text-center">Competenties Beheren</span>
        </button>
        </router-link>
        <router-link :to="`/opleiding`">
        <button class="w-full h-48 flex flex-col items-center justify-center font-bold text-[#104116] text-2xl bg-white shadow-xl rounded overflow-hidden transition-transform duration-500 hover:scale-110">
            <img src="../assets/opleiding-icoon.svg" alt="Image" class="h-16 w-auto mb-2 object-contain">
            <span class="text-center">Opleidingen Beheren</span>
        </button>
    </router-link>
    <router-link :to="`/subgroep`">
        <button class="w-full h-48 flex flex-col items-center justify-center font-bold text-[#104116] text-2xl bg-white shadow-xl rounded overflow-hidden transition-transform duration-500 hover:scale-110">
            <img src="../assets/subgroep-icoon.svg" alt="Image" class="h-16 w-auto mb-2 object-contain">
            <span class="text-center">Subgroepen Beheren</span>
        </button>
    </router-link>
    <router-link :to="`/technischeCompetentie`">
        <button class="w-full h-48 flex flex-col items-center justify-center font-bold text-[#104116] text-2xl bg-white shadow-xl rounded overflow-hidden transition-transform duration-500 hover:scale-110">
            <img src="../assets/taakonderdeel-icoon.svg" alt="Image" class="h-16 w-auto mb-2 object-contain">
            <span class="text-center p-2">Taakonderdelen Beheren</span>
        </button>
    </router-link>
    <router-link :to="`/score`">
        <button class="w-full h-48 flex flex-col items-center justify-center font-bold text-[#104116] text-2xl bg-white shadow-xl rounded overflow-hidden transition-transform duration-500 hover:scale-110">
            <img src="../assets/score-board.svg" alt="Image" class="h-16 w-auto mb-2 object-contain">
            <span class="text-center p-2">Score Beheren</span>
        </button>
    </router-link>
    </div>
    </div>
  </template>

<script lang="ts">
import axios from 'axios'
import { defineComponent } from 'vue'
import { Icon } from '@iconify/vue'
import HeaderComponent from '../components/Header.vue'


export default defineComponent({
  name: 'AdminPanel',
  components: {
    Icon,
    HeaderComponent,
  },
},
)
</script>