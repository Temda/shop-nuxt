<script setup lang="ts">
definePageMeta({
    middleware: ['only-auth']
})
const { carts, clearCarts } = useCart()
const axios = useAxios()

const input = reactive({
    receiver: '',
    telphone: '',
    address: ''
})

const totalPrice = computed(() => {
    return carts.value.reduce((prev, cur) => {
        return prev + (cur.amount * cur.price)
    }, 0)
})

async function onCheckout() {
    const { data } = await axios.post('/api/checkout', {
        carts: carts.value
    })
    alert(data.message)
    clearCarts()
}
</script>

<template>
    <div class="w-96 mx-auto border p-3 rounded">
        <form @submit.prevent="onCheckout" class="space-y-2">
            <label class="block">
                <div class="mb-1">ชื่อผู้รับ:</div>
                <input type="text" class="input w-full" v-model="input.receiver">
            </label>
            <label class="block">
                <div class="mb-1">เบอร์โทร:</div>
                <input type="tel" class="input w-full" v-model="input.telphone">
            </label>
            <label class="block">
                <div class="mb-1">ที่อยู่:</div>
                <textarea class="input w-full" rows="4" v-model="input.address"></textarea>
            </label>
            <div class="bg-blue-100 text-blue-800 p-3 rounded">
                รายการสินค้า
                <ul class="list-disc pl-5 mt-3">
                    <li v-for="(cart, index) of carts" :key="index">
                        <div>
                            {{ cart.title }} (จำนวน: {{ cart.amount }})
                        </div>
                        <div>
                            <strong>ราคา: {{ (cart.amount * cart.price).toLocaleString() }} บาท</strong>
                        </div>
                    </li>
                </ul>
                <div class="mt-3">
                    <strong>สรุปราคาทั้งหมด: </strong><u> {{ totalPrice.toLocaleString() }} บาท</u>
                </div>
            </div>
            <div>
                <button class="btn is-primary">ยืนยันจัดส่ง / ชำระเงิน</button>
            </div>
        </form>
    </div>
</template>