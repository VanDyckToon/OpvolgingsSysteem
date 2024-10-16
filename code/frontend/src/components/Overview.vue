<template>
  <div class="min-h-screen bg-gray-100 p-6">
    <h2 class="text-2xl font-bold mb-4">Werknemers Overview</h2>
    <ul class="bg-white shadow-md rounded-lg p-6">
      <li
        v-for="werknemer in werknemers"
        :key="werknemer.gebruikerID"
        class="mb-2 p-2 border-b"
      >
        {{ werknemer.email }} - {{ werknemer.rol.naam }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import axios from 'axios'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'Overview',
  setup() {
    const werknemers = ref([])
    const route = useRoute()

    const fetchWerknemers = async () => {
      const begeleiderID = route.params.id
      try {
        const response = await axios.get(`/begeleider/${begeleiderID}`)
        werknemers.value = response.data
      } catch (error) {
        console.error('Error fetching werknemers', error)
      }
    }

    onMounted(fetchWerknemers)

    return {
      werknemers,
    }
  },
})
</script>
