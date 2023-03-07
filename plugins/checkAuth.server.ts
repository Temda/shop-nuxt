export default defineNuxtPlugin(async () => {
    const { auth, checkAuth, checkAdmin } = useAuth()
    await Promise.all([
        checkAuth(),
        checkAdmin() 
    ])
})