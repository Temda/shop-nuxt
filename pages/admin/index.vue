<script lang="ts" setup>

definePageMeta({
    layout: false,
    middleware: (to, from) => {
        const { admin } = useAuth()
        if(admin.value) {
            return navigateTo('/admin/dashboard', {
                redirectCode: 302
            }) 
        }
    }
})
const axios = useAxios()
const { checkAdmin } = useAuth()
const router = useRouter()

const input = reactive({
    username: '',
    password: ''
})

const loading = ref(false)

async function onLoginAsAdmin() {
    loading.value = true
    try {
        const res = await axios.post<{ message: string }>('/api/admin/login', input)
        await checkAdmin()
        alert(res.data.message)
        router.push('/admin/dashboard')
    } catch (error) {
        alert(error.data.message)
    }

    loading.value = false

}
</script>

<template>
    <div class="flex min-h-screen justify-center items-center">
        <form @submit.prevent="onLoginAsAdmin" class="w-64 shadow-lg p-3 rounded space-y-3">
            <div>
                <h1 class="text-xl font-bold mb-3">Admin Control</h1>
            </div>
            <label class="block">
                <div class="mb-1">ชื่อผู้ใช้งาน</div>
                <input type="text" class="input w-full" v-model="input.username">
            </label>
            <label class="block">
                <div class="mb-1">password</div>
                <input type="password" class="input w-full" v-model="input.password">
            </label>
            <div>
                <button :disabled="loading" type="submit" class="btn is-primary w-full mt-2">เข้าสู่ระบบ</button>
            </div>
        </form>
    </div>
</template>