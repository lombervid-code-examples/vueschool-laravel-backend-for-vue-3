<script setup lang="ts">
import { RegisterPayload } from '@/types'
import { FormKitNode } from '@formkit/core'

definePageMeta({
  middleware: ['guest'],
  layout: 'centered',
})

const { register } = useAuth()

csrfCookie()

async function handleRegister(payload: RegisterPayload, node?: FormKitNode) {
  try {
    await register(payload)
  } catch (error) {
    handleInvalidForm(error, node)
  }
}
</script>

<template>
  <div class="register">
    <h1>Register</h1>
    <FormKit type="form" submit-label="Register" @submit="handleRegister">
      <FormKit type="text" name="name" label="Name" validation="required" />
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
      <FormKit
        type="password"
        name="password_confirmation"
        label="Confirm Password"
        validation="required|confirm:password"
        validation-label="Password confirmation"
      />
    </FormKit>

    <p>
      Already have an account?
      <NuxtLink class="underline text-lime-600" to="/login">Login</NuxtLink>
    </p>
  </div>
</template>
