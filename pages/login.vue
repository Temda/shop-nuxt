<script lang="ts" setup>
const axios = useAxios()
const { checkAuth } = useAuth()
const router = useRouter()

const input = reactive({
    email: '',
    password: ''
})

const loading = ref(false)

async function onLogin() {
    // alert('hello')
    loading.value = true
    try {
    
        const res = await axios.post<{ message: string }>('/api/login', input)
        alert(res.data.message)
        router.push('/')
        await checkAuth()
    }catch(error){
        console.dir(error)
        alert(error.data.message)
    }
    loading.value = false
}

</script>

<template>
    <div class="w-96 mx-auto bg-white border border-gray-200 shadow-2xl p-4 rounded-lg">
        <h1 class="text-2xl font-bold">login</h1>
        <hr class="my-4">
        <form class="space-y-3" @submit.prevent="onLogin">
            <label class="block">
                <div class="mb-1">อีเมล:</div>
                <input type="email" class="input w-full" required v-model="input.email">
            </label>
            <label class="block">
                <div class="mb-1">รหัสผ่าน:</div>
                <input type="password" class="input w-full" required v-model="input.password">
            </label>
            <div>
                <button :disabled="loading" class="btn is-primary w-full mt-3">ยืนยัน</button>
            </div>
        </form>
    </div>
</template>