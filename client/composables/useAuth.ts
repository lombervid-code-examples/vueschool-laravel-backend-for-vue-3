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
      const user = response.data

      return {
        ...user,
        created_at: new Date(user.created_at),
        updated_at: new Date(user.updated_at),
        email_verified_at: user.email_verified_at
          ? new Date(user.email_verified_at)
          : null,
        two_factor_confirmed_at: user.two_factor_confirmed_at
          ? new Date(user.two_factor_confirmed_at)
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
    await csrfCookie()
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
    try {
      await csrfCookie()
      await axios.post('/register', payload)
      useRouter().push('/me')
    } catch (error) {
      console.error(error)
    }
  }

  async function isAuthenticated(): Promise<boolean> {
    await initUser()

    return user.value !== null
  }

  return {
    login,
    logout,
    register,
    isAuthenticated,
    user,
  }
}
