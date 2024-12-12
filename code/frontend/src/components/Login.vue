<template>
  <div class="min-h-screen bg-[#ECF3EB] flex justify-center items-center">
    <div class="absolute top-0 left-0 m-8">
      <img src="../assets/logo-de-sprong.svg" alt="Logo" class="w-44 h-44" />
    </div>
    <div class="w-full max-w-xl p-8 bg-white shadow-lg rounded-lg">
      <h2 class="text-4xl font-bold mb-6 text-center text-[#456A50]">Login</h2>
      <form @submit.prevent="login">
        <div class="mb-4">
          <label
            class="block text-[#456A50] text-xl font-bold mb-2"
            for="email"
          >
            E-mailadres
          </label>
          <input
            v-model="email"
            type="email"
            id="email"
            class="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200"
            placeholder="Vul hier in e-mailadres  in"
            required
          />
        </div>
        <div class="mb-6">
          <label
            class="block text-[#456A50] text-xl font-bold mb-2"
            for="password"
          >
            Wachtwoord
          </label>
          <input
            v-model="password"
            type="password"
            id="password"
            class="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200"
            placeholder="Vul hier je wachtwoord in"
            required
          />
        </div>
        <div class="flex items-center justify-center">
          <button
            type="submit"
            class="bg-[#456A50] hover:bg-[#385A45] text-white text-lg font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
          >
            Aanmelden
          </button>
        </div>
      </form>
    </div>

    <div
      v-if="errorMessage"
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div class="bg-white rounded-lg p-6 max-w-sm w-full">
        <h3 class="text-lg font-semibold text-[#456A50]">Error</h3>
        <p class="mt-2 text-center text-red-500">{{ errorMessage }}</p>
        <div class="mt-4 flex justify-center">
          <button
            @click="closeModal"
            class="bg-[#456A50] hover:bg-[#385A45] text-white font-bold py-2 px-4 rounded-lg"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

export default defineComponent({
  name: 'LoginPage',
  setup() {
    const email = ref('')
    const password = ref('')
    const errorMessage = ref('')
    const router = useRouter()

    console.log(import.meta.env.VITE_APP_API_URL)
    const login = async () => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_APP_API_URL}/auth/loginBegeleider`,
          {
            email: email.value,
            wachtwoord: password.value,
          },
        )

        // Log response to check if access_token exists
        console.log('Response from backend:', response)

        // Ensure response contains access_token
        const { access_token } = response.data
        if (!access_token) {
          throw new Error('No access token found in the response')
        }

        // Store the access token in localStorage
        localStorage.setItem('access_token', access_token)

        // Decode the JWT token and handle the redirect
        const decodedToken = JSON.parse(atob(access_token.split('.')[1])) // Decode JWT token
        console.log('Decoded token:', decodedToken)

        // Redirect to the worker's overview page
        router.push(`/begeleider/${decodedToken.gebruikerID}`)
      } catch (error) {
        console.error(error)

        // Handle error messages
        errorMessage.value = 'Verkeerde email en/of wachtwoord'
      }
    }

    const closeModal = () => {
      errorMessage.value = '' // Clear the error message
    }

    return {
      email,
      password,
      login,
      errorMessage,
      closeModal,
    }
  },
})
</script>
