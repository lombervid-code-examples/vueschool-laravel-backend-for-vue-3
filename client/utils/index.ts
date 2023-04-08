import { FormKitNode } from '@formkit/core'
import { AxiosError } from 'axios'

export function handleInvalidForm(error: any, node?: FormKitNode) {
  if (error instanceof AxiosError && error.response?.status === 422) {
    node?.setErrors(error.response.data.errors)
  }
}
