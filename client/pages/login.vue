<script setup lang="ts">
import { AxiosError } from 'axios'

definePageMeta({
  middleware: ['guest'],
  layout: 'centered',
})

const { login, csrfCookie } = useAuth()

const form = reactive({
  email: '',
  password: '',
})

const errors = reactive({
  email: [],
  password: [],
})

csrfCookie()

async function handleLogin() {
  try {
    await login(form)
  } catch (error) {
    if (error instanceof AxiosError && error.response?.status === 422) {
      errors.email = error.response.data.errors.email || []
      errors.password = error.response.data.errors.password || []
    }
  }
}
</script>

<template>
  <div class="login">
    <h1>Login</h1>
    <form @submit.prevent="handleLogin()">
      <label>
        <div>Email</div>
        <input type="text" v-model="form.email" />
        <div v-for="error in errors.email" class="text-red-600 text-xs pt-1">
          * {{ error }}
        </div>
      </label>

      <label>
        <div>Password</div>
        <input type="password" v-model="form.password" />
        <div v-for="error in errors.password" class="text-red-600 text-xs pt-1">
          * {{ error }}
        </div>
      </label>
      <button class="btn">Login</button>
    </form>

    <p>
      Don't have an account?
      <NuxtLink class="underline text-lime-600" to="/register"
        >Register now!</NuxtLink
      >
    </p>
  </div>
</template>
