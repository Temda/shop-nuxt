<script lang="ts" setup>
import Editor from '@tinymce/tinymce-vue'
import Products from '~~/interface/Products'
const route = useRoute()
const router = useRouter()
const axios = useAxios()

definePageMeta({
    layout: 'admin',
    middleware: ['only-admin']
})

interface Input {
    title: string,
    description: string,
    images: string[],
    price: number
}

const input = reactive<Input>({
    title: '',
    description: '',
    images: [],
    price: 0
})

const id = ref(-1)


const isCreate = route.params.id === 'create'
let  refreshCache: () => Promise<void> | null = null

if(!isCreate) {
    const { data, refresh } = await useAsyncData<{ product: Products }>(
        `admin-products-${route.params.id}`,
        async () => {
            const res = await axios.get(`/api/products/${route.params.id}`)
            return res.data
        }
    )
    refreshCache = refresh
    const product = data.value.product

    id.value = product.id
    input.title = product.title
    input.description = product.description
    input.images = product.images.split(',')
    input.price = product.price


}


const loading = ref(false)

async function onUpsertProduct() {
    loading.value = true
    try {
        const res = await axios.post<{ message: string }>('/api/products', 
            {
                title: input.title,
                description: input.description,
                images: input.images.join(','),
                price: input.price,
            },
            {
                params: {
                    id: id.value
                },
            }
        )
        if(refreshCache) {
            refreshCache()
        }
        alert(res.data.message)
        router.push('/admin/products')
    } catch (error) {
        alert(error.data.message)
    }
    loading.value = false
}
</script>

<template>
    <div>
        <h2 class="font-xl font-bold">{{ isCreate ? 'เพิ่มสินค้า[id]' : `แก้ไขสินค้า[id] ${ id }` }}</h2>
        <hr class="my-2">
        <form @submit.prevent="onUpsertProduct" class="space-y-2">
            <label class="block">
                <div class="mb-1">ชื่อสินค้า</div>
                <input type="text" class="input w-full" v-model="input.title">
            </label>
            <label class="block">
                <div class="mb-1">ราคา</div>
                <input type="number" class="input w-full" v-model="input.price">
            </label>
            <div>
                <div class="mb-1">รูปภาพ</div>
                <div v-for="(image, index) of input.images" :key="index" class="flex mb-2 gap-1">
                    <input v-model="input.images[index]" type="url" class="input w-full" placeholder="URL">
                    <button type="button" class="btn is-danger" @click="input.images.splice(index, 1)">{{ index }}ลบ</button>
                </div>
                <button type="button" class="btn is-secondary" @click="input.images.push('')">เพิ่มรูปภาพ</button>
            </div>
            <label class="block">
                <div class="mb-1">รายละเอียด</div>
                <Editor v-model="input.description"></Editor>
            </label>
            <div>
                <button type="submit" class="btn is-primary">บันทึกข้อมูล</button>
            </div>
        </form>
    </div>
</template>