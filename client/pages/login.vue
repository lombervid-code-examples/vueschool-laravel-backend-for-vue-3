<script setup lang="ts">
import { LoginPayload } from '@/types'
import { FormKitNode } from '@formkit/core'

definePageMeta({
  middleware: ['guest'],
  layout: 'centered',
})

const { login, csrfCookie } = useAuth()

csrfCookie()

async function handleLogin(credentials: LoginPayload, node?: FormKitNode) {
  try {
    await login(credentials)
  } catch (error) {
    handleInvalidForm(error, node)
  }
}
</script>

<template>
  <div class="login">
    <h1>Login</h1>
    <FormKit type="form" submit-label="Login" @submit="handleLogin">
      <FormKit
        type="email"
        name="email"
        label="Email"
        validation="required|email"
      />
      <FormKit
        type="password"
        name="password"
        label="Password"
        validation="required"
      />
    </FormKit>

    <p>
      Don't have an account?
      <NuxtLink class="underline text-lime-600" to="/register"
        >Register now!</NuxtLink
      >
    </p>
  </div>
</template>
