<script lang="ts" setup>
const axios = useAxios()
const router = useRouter()

const input = reactive({
    email: '',
    password: ''
})

const confirmPassword = ref('')
const loading = ref(false)

async function onSignUp() {
    // alert('hello')
    loading.value = true
    try {
        if(input.password !== confirmPassword.value){
            alert('รหัสผ่านไม่ตรงกัน')
            return
        }
    
        const res = await axios.post<{ message: string }>('/api/sign-up', input)
        alert(res.data.message)
        router.push('/login')
    }catch(error){
        console.dir(error)
        alert(error.data.message)
    }
    loading.value = false
}

</script>

<template>
    <div class="w-96 mx-auto bg-white border border-gray-200 shadow-2xl p-4 rounded-lg">
        <h1 class="text-2xl font-bold">sign-up</h1>
        <hr class="my-4">
        <form class="space-y-3" @submit.prevent="onSignUp">
            <label class="block">
                <div class="mb-1">อีเมล:</div>
                <input type="email" class="input w-full" required v-model="input.email">
            </label>
            <label class="block">
                <div class="mb-1">รหัสผ่าน:</div>
                <input type="password" class="input w-full" required v-model="input.password">
            </label>
            <label class="block">
                <div class="mb-1">ยืนยันรหัสผ่าน:</div>
                <input type="password" class="input w-full" required v-model="confirmPassword">
            </label>
            <div>
                <button :disabled="loading" class="btn is-primary w-full mt-3">ยืนยันการสม้คร</button>
            </div>
        </form>
    </div>
</template>