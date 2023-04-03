import axios from 'axios'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()

  axios.defaults.baseURL = `${config.public.appURL}/api`
  axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
  axios.defaults.headers.common['Content-Type'] = 'application/json'
  axios.defaults.headers.common['Accept'] = 'application/json'
  axios.defaults.withCredentials = true

  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (
        [401, 419].includes(error.response.status) &&
        !error.request.responseURL.endsWith('/api/user')
      ) {
        useAuth().logout()
      } else {
        return Promise.reject(error)
      }
    }
  )
})
