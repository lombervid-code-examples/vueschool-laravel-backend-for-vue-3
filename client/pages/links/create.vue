<script setup lang="ts">
import { FormKitNode } from '@formkit/core'
import axios from 'axios'
import { nanoid } from 'nanoid'

definePageMeta({
  middleware: ['auth'],
})

csrfCookie()

async function createLink(payload: any, node?: FormKitNode) {
  try {
    await axios.post('/links', {
      ...payload,
      short_link: nanoid(8),
    })
    useRouter().push('/links')
  } catch (error) {
    handleInvalidForm(error, node)
  }
}
</script>

<template>
  <h1>Create New Link</h1>
  <GoBack>or go back to links</GoBack>

  <FormKit type="form" submit-label="Create Link" @submit="createLink">
    <FormKit
      type="url"
      name="full_link"
      label="Link"
      validation="required|url"
    />
  </FormKit>
</template>
