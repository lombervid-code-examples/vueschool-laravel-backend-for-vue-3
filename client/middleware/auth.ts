export default defineNuxtRouteMiddleware(async (to, from) => {
  if (!(await useAuth().isAuthenticated())) {
    return navigateTo('/login')
  }

  to.meta.requiresAuth = true
})
