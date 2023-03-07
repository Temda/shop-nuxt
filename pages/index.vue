<script lang="ts" setup>
import Product from '~~/interface/Products'
const axios = useAxios()

const { addCart } = useCart()

const page = ref(1)

const productRes = ref<{ products: Product[] }>({products:[]})

async function fetchProduct() {
    const { data } = await axios.get<{ products: Product[] }>('/api/products', {
        params: {
            page: page.value
        }
    })
    productRes.value.products = data.products
}
await fetchProduct()
watch(page, fetchProduct)

interface ProductWiteImages extends Omit<Product, 'images'> {
    images: string[]
}

const products = computed(() => {
    return productRes.value.products.map((product) => {
        const item: ProductWiteImages = {
            ...product,
            images: product.images.split(',')
        }
        return item
    })
})
</script>

<template>
    <div>
        
        <h1 class="text-xl">ราการสินค้าทั้งหมด</h1>
        <hr class="my-3">
        <div class="grid grid-cols-3 lg:grid-cols-5 gap-2"> 
            <div v-for="product of products" :key="product.id" class="flex flex-col relative">
                <div class="text-sm p-1 bg-black text-white rounded bg-opacity-80 absolute top-1 right-1">{{ product.price }}.-</div>
                <img :src="product.images[0]" alt="">
                <div class="border p-3 rounded-b grow flex flex-col">
                    <header class="grow mb-3">{{ product.title }}</header>
                    <footer class="flex flex-col md:flex-row gap-1">
                        <NuxtLink :to="`/products/${product.id}`" class="block text-center is-sm grow btn is-secondary">ดูรายละเอียด</NuxtLink>
                        <button 
                        type="button" class="btn is-primary text-center is-sm grow"
                        @click="addCart({id: product.id, title: product.title, price: product.price, amount: 1})">เพิ่มลงตะกร้า</button>
                    </footer>
                </div>
            </div>
        </div>
        <div class="text-center mt-3">
            <button v-if="page > 1" class="text-blue-600 underline btn" @click="page--">ย้อนกลับ</button>
            <button class="text-blue-600 underline btn" @click="page++">ถัดไป</button>
        </div>
    </div>
</template>