<template>
    <div class="min-h-screen bg-[#ECF3EB] flex flex-col">
      <HeaderComponent />
      <div>
        <h1 class="text-[#104116] text-4xl font-extrabold text-center pt-4">Admin Paneel</h1>
      </div>
      <div class="grid grid-cols-5 gap-4 pt-8 pb-2 px-16">
        <router-link :to="`/`">
        <button class="w-full h-48 flex flex-col items-center justify-center font-bold text-[#104116] text-2xl bg-white shadow-xl rounded overflow-hidden transition-transform duration-500 hover:scale-110">
            <img src="../assets/gebruiker.svg" alt="Image" class="h-16 w-auto mb-2 object-contain">
            <span class="text-center px-1">Gebruikers Beheren</span>
        </button>
        </router-link>
        <router-link :to="`/materiaal`">
        <button class="w-full h-48 flex flex-col items-center justify-center font-bold text-[#104116] text-2xl bg-white shadow-xl rounded overflow-hidden transition-transform duration-500 hover:scale-110">
            <img src="../assets/materiaal.svg" alt="Image" class="h-16 w-auto mb-2 object-contain">
            <span class="text-center">Materiaal Beheren</span>
        </button>
        </router-link>
        <router-link :to="`/groep`">
        <button class="w-full h-48 flex flex-col items-center justify-center font-bold text-[#104116] text-2xl bg-white shadow-xl rounded overflow-hidden transition-transform duration-500 hover:scale-110">
            <img src="../assets/groep.svg" alt="Image" class="h-16 w-auto mb-2 object-contain">
            <span class="text-center">Groepen Beheren</span>
        </button>
        </router-link>
        <router-link :to="`/`">
        <button class="w-full h-48 flex flex-col items-center justify-center font-bold text-[#104116] text-2xl bg-white shadow-xl rounded overflow-hidden transition-transform duration-500 hover:scale-110">
            <img src="../assets/taak.svg" alt="Image" class="h-16 w-auto mb-2 object-contain">
            <span class="text-center">Taken Beheren</span>
        </button>
        </router-link>
        <router-link :to="`/rol`">
        <button class="w-full h-48 flex flex-col items-center justify-center font-bold text-[#104116] text-2xl bg-white shadow-xl rounded overflow-hidden transition-transform duration-500 hover:scale-110">
            <img src="../assets/rol.svg" alt="Image" class="h-16 w-auto mb-2 object-contain">
            <span class="text-center">Rolen Beheren</span>
        </button>
        </router-link>
    </div>
    <div class="grid grid-cols-5 gap-4 py-4 px-16">
        <router-link :to="`/`">
        <button class="w-full h-48 flex flex-col items-center justify-center font-bold text-[#104116] text-2xl bg-white shadow-xl rounded overflow-hidden transition-transform duration-500 hover:scale-110">
            <img src="../assets/competentie.svg" alt="Image" class="h-16 w-auto mb-2 object-contain color-[#101234]">
            <span class="text-center">Competenties Beheren</span>
        </button>
        </router-link>
        <router-link :to="`/`">
        <button class="w-full h-48 flex flex-col items-center justify-center font-bold text-[#104116] text-2xl bg-white shadow-xl rounded overflow-hidden transition-transform duration-500 hover:scale-110">
            <img src="../assets/opleiding.svg" alt="Image" class="h-16 w-auto mb-2 object-contain">
            <span class="text-center">Opleidingen Beheren</span>
        </button>
    </router-link>
    <router-link :to="`/`">
        <button class="w-full h-48 flex flex-col items-center justify-center font-bold text-[#104116] text-2xl bg-white shadow-xl rounded overflow-hidden transition-transform duration-500 hover:scale-110">
            <img src="../assets/subgroep.svg" alt="Image" class="h-16 w-auto mb-2 object-contain">
            <span class="text-center">Subgroepen Beheren</span>
        </button>
    </router-link>
    <router-link :to="`/`">
        <button class="w-full h-48 flex flex-col items-center justify-center font-bold text-[#104116] text-2xl bg-white shadow-xl rounded overflow-hidden transition-transform duration-500 hover:scale-110">
            <img src="../assets/taakonderdeel.svg" alt="Image" class="h-16 w-auto mb-2 object-contain">
            <span class="text-center p-2">Taakonderdelen Beheren</span>
        </button>
    </router-link>
    <router-link :to="`/score`">
        <button class="w-full h-48 flex flex-col items-center justify-center font-bold text-[#104116] text-2xl bg-white shadow-xl rounded overflow-hidden transition-transform duration-500 hover:scale-110">
            <img src="../assets/score.svg" alt="Image" class="h-16 w-auto mb-2 object-contain">
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