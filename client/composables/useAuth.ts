import axios from 'axios'

export const useAuth = () => {
  interface LoginPayload {
    email: string
    password: string
  }

  interface RegisterPayload {
    name: string
    email: string
    password: string
    password_confirmation: string
  }

  async function csrfCookie() {
    const config = useRuntimeConfig()
    await axios.get('/sanctum/csrf-cookie', {
      baseURL: config.public.appURL,
    })
  }

  async function login(payload: LoginPayload) {
    await csrfCookie()
    await axios.post('/login', payload)
    useRouter().push('/me')
  }

  async function logout() {
    await csrfCookie()
    await axios.post('logout')
    useRouter().replace('/login')
  }

  async function register(payload: RegisterPayload) {
    try {
      await csrfCookie()
      await axios.post('/register', payload)
      useRouter().push('/me')
    } catch (error) {
      console.error(error)
    }
  }

  return {
    login,
    logout,
    register,
  }
}
