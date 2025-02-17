<script setup>
import { computed, onMounted, ref } from 'vue'
import SidebarSlot from "@/components/SidebarSlot.vue"
import { useUpdateStore } from "@/vuex/update.js"
import { useDynamicStore } from "@/vuex/store.js"
import { useRouter } from 'vue-router';

const router = useRouter();

const goBack = () => {
    router.back();
};
const selectedBrands = ref("")
const brandStore = useDynamicStore()
const updateStore = useUpdateStore()
const updateData = ref({
    title: '',
    images: null
})

const brands = computed(() => brandStore?.data?.brands?.data || [])

onMounted(async () => {
    await brandStore.fetchData('brands', '/brands')
})

const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (file) {
        updateData.value.images = file
        console.log("Yuklangan fayl:", file)
    }
}

const updateBrand = async () => {
    try {
        const formData = new FormData();
        formData.append("title", updateData.value.title);
        formData.append("images", updateData.value.images);

        await updateStore.fetchPut(`/brands/${selectedBrands.value}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        alert("Brand successfully updated!");

        await brandStore.fetchData('brands', "/brands");

        console.log("Yaratildi");
    } catch (error) {
        console.error("Xatolik:", error);
    }
}
</script>

<template>
    <sidebar-slot>
        <div>
            <button @click="goBack" class="back-btn">⬅️ Ortga</button>
            <slot></slot> <!-- Sahifaning asosiy mazmuni -->
        </div>
        <div class="container">
            <h1 class="title">Update_Brand</h1>
            <div class="form">
                <label for="exampleFormControlInput1" class="form-label">Qasyi birini o'zgartirasiz:</label>
                <select v-model="selectedBrands" class="form-select">
                    <option
                        v-for="brand in brands"
                        :key="brand.id"
                        :value="brand.id">
                        {{ brand.title }}
                    </option>
                </select>

                <label for="exampleFormControlInput1" class="form-label">Nomi</label>
                <input
                    v-model="updateData.title"
                    type="text"
                    class="form-control"
                    aria-label="Sizing example input"
                       aria-describedby="inputGroup-sizing-sm"
                       required
                >
                <div>
                    <label for="formFileLg" class="form-label">Brand rsmini tanlang</label>
                    <input
                        class="form-control form-control-lg"
                        id="formFileLg"
                        type="file"
                        @change="handleFileChange"
                    >
                </div>
                <button type="button" @click="updateBrand" class="btn btn-success">O'zgartirish</button>
            </div>
        </div>
    </sidebar-slot>
</template>

<style scoped>
.form {
    text-align: center;
}

h1 {
    margin: 30px;
}

input, select, button {
    outline: none;
    margin: 5px auto 20px auto;
    display: block;
    width: 40%;
}

.back-btn {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px 20px;
    font-size: 16px;
    border-radius: 5px;
    cursor: pointer;
    margin-bottom: 15px;
}

.back-btn:hover {
    background-color: #0056b3;
}

</style>
