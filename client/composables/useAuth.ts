import axios from 'axios'
import { User, LoginPayload, RegisterPayload } from '@/types'

const user = ref<User | null>(null)

export const useAuth = () => {
  async function initUser() {
    user.value = await getUser()
  }

  async function getUser(): Promise<User | null> {
    if (user.value) {
      return user.value
    }

    try {
      const response = await axios.get('/user')
      const data = response.data

      return {
        ...data,
        created_at: new Date(data.created_at),
        updated_at: new Date(data.updated_at),
        email_verified_at: data.email_verified_at
          ? new Date(data.email_verified_at)
          : null,
        two_factor_confirmed_at: data.two_factor_confirmed_at
          ? new Date(data.two_factor_confirmed_at)
          : null,
      }
    } catch (error) {
      return null
    }
  }

  async function csrfCookie() {
    const config = useRuntimeConfig()
    await axios.get('/sanctum/csrf-cookie', {
      baseURL: config.public.appURL,
    })
  }

  async function login(payload: LoginPayload) {
    await axios.post('/login', payload)
    useRouter().push('/me')
  }

  async function logout() {
    user.value = null
    await csrfCookie()
    await axios.post('logout')
    useRouter().replace('/login')
  }

  async function register(payload: RegisterPayload) {
    await axios.post('/register', payload)
    useRouter().push('/me')
  }

  async function isAuthenticated(): Promise<boolean> {
    await initUser()

    return user.value !== null
  }

  return {
    csrfCookie,
    login,
    logout,
    register,
    isAuthenticated,
    user,
  }
}
