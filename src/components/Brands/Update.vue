<script setup>
import {onMounted, ref} from 'vue'
import SidebarSlot from "@/components/SidebarSlot.vue"
import { useGetStore } from "@/vuex/categoryStore.js"
import {useUpdateStore} from "@/vuex/update.js"

const selectedBrands = ref("")
const brandStore = useGetStore()
const updateStore = useUpdateStore()
const updateData = ref({
    title: '',
    images: null
})

onMounted(async () => {
    await brandStore.fetchData('/brands')
})

const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (file) {
        updateData.value.images = file
        console.log("Yuklangan fayl:", file)
    }
}
const brands = async () => {
    try {
        const formData = new FormData();
        formData.append("title", updateData.value.title);
        formData.append("images", updateData.value.images);

        await updateStore.fetchPut(`/brands/${selectedBrands.value}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        alert("Brand successfully updated successfully.!");

        await brandStore.fetchData("/brands")

        console.log("Yaratildi");
    } catch (error) {
        console.error("Xatolik:", error);
    }
};

</script>

<template>
    <sidebar-slot>
        <div class="container">
            <h1 class="title">Update_Brand</h1>
            <div class="form">
                <label for="exampleFormControlInput1" class="form-label">Qasyi birini o'zgartirasiz:</label>
                <select v-model="selectedBrands" class="form-select">
                    <option v-for="category in brandStore.data"
                            :key="category.id"
                            :value="category.id">
                        {{ category.title }}
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
                <button type="button" @click="brands" class="btn btn-success">O'zgartirish</button>
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

</style>
