<script lang="ts" setup>
const axios = useAxios()
const route = useRoute()

const { addCart } = useCart()

const amount = ref(1)

const { data: { product } } = await axios.get<{product: Product}>(`/api/products/${route.params.id}`)

</script>
<template>
    <div class="flex gap-3">
        <div class="grow space-y-4">
            <header>
                <h2 class="text-xl font-bold">{{ product.title }}</h2>
            </header>
            <main>
                <div v-html="product.description"></div>
            </main>
            <footer class="flex gap-1">
                <input type="number" class="input w-24 text-right" min="1" v-model="amount">
                <button 
                type="button" class="btn is-primary" 
                @click="addCart({id: product.id, title: product.title, price: product.price, amount: amount })">เพิ่มสินค้าลงตะกร้า</button>
            </footer>
        </div>
        <div>
            <img v-for="(image, i) of product.images.split(',')" :key="i" :src="image" class="max-w-[450px]">
        </div>
    </div>
</template>