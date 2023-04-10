import { FormKitNode } from '@formkit/core'
import axios, { AxiosError } from 'axios'

export async function csrfCookie() {
  const config = useRuntimeConfig()
  await axios.get('/sanctum/csrf-cookie', {
    baseURL: config.public.appURL,
  })
}

export function handleInvalidForm(error: any, node?: FormKitNode) {
  if (error instanceof AxiosError && error.response?.status === 422) {
    node?.setErrors(error.response.data.errors)
  }
}
