<template>
  <div class="min-h-screen bg-[#ECF3EB] flex justify-center items-center">
    <div class="absolute top-0 left-0 m-4">
      <!-- Replace with actual logo -->
      <!-- <img src="@/assets/logo.png" alt="Logo" class="w-12 h-12" /> -->
    </div>
    <div class="w-full max-w-sm p-8 bg-white shadow-lg rounded-lg">
      <h2 class="text-2xl font-bold mb-6 text-center">Login</h2>
      <form @submit.prevent="login">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
            Email
          </label>
          <input
            v-model="email"
            type="email"
            id="email"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter your email"
            required
          />
        </div>
        <div class="mb-6">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="password"
          >
            Password
          </label>
          <input
            v-model="password"
            type="password"
            id="password"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter your password"
            required
          />
        </div>
        <div class="flex items-center justify-between">
          <button
            type="submit"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Sign In
          </button>
        </div>
        <p v-if="errorMessage" class="mt-4 text-red-500 text-center">
          {{ errorMessage }}
        </p>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

export default defineComponent({
  name: 'Login',
  setup() {
    const email = ref('');
    const password = ref('');
    const errorMessage = ref('');
    const router = useRouter();

    const login = async () => {
      try {
        const response = await axios.post('http://localhost:3000/auth/loginBegeleider', {
          email: email.value,
          wachtwoord: password.value,
        });

        const { access_token } = response.data;
        localStorage.setItem('access_token', access_token); // Store token

        // Redirect to the begeleider's workers overview
        const decodedToken: any = JSON.parse(atob(access_token.split('.')[1])); // Decode JWT token
        router.push(`/begeleider/${decodedToken.gebruikerID}`);
      } catch (error) {
        errorMessage.value = 'Invalid email or password';
      }
    };

    return {
      email,
      password,
      login,
      errorMessage,
    };
  },
});
</script>

<style scoped>
/* Add any additional styling here */
</style>
