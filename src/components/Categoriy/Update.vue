<script setup>
import {onMounted, ref} from 'vue'
import SidebarSlot from "@/components/SidebarSlot.vue"
import { useGetStore } from "@/vuex/categoryStore.js"
import {useUpdateStore} from "@/vuex/update.js"

const selectedCategory = ref("")
const categoryStore = useGetStore()
const updateStore = useUpdateStore()
const updateData = ref({
    name_en: '',
    name_ru: '',
    images: null
})

onMounted(async () => {
    await categoryStore.fetchData('/categories')
})

const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (file) {
        updateData.value.images = file
        console.log("Yuklangan fayl:", file)
    }
}
const categories = async () => {
    try {
        const formData = new FormData();
        formData.append("name_en", updateData.value.name_en);
        formData.append("name_ru", updateData.value.name_ru);
        formData.append("images", updateData.value.images);

        await updateStore.fetchPut(`/categories/${selectedCategory.value}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        await categoryStore.fetchData("/categories")
        alert('Category successfully updated successfully.!')
        console.log("Yaratildi");
    } catch (error) {
        console.error("Xatolik:", error);
    }
};
</script>

<template>
    <sidebar-slot>
        <div class="container">
            <h1 class="title">Update_Categoriy</h1>
            <div class="form">
                <label for="exampleFormControlInput1" class="form-label">Qasyi birini o'zgartirasiz:</label>
                <select v-model="selectedCategory" class="form-select">
                    <option v-for="category in categoryStore.data"
                            :key="category.id"
                            :value="category.id">
                        {{ category.name_en }}
                    </option>
                </select>
                <label class="form-label">Name_uz</label>
                <input v-model="updateData.name_en" type="text" class="form-control" required>

                <label class="form-label">Name_ru</label>
                <input v-model="updateData.name_ru" type="text" class="form-control" required>

                <div>
                    <label for="formFileLg" class="form-label">Rasm yuklash</label>
                    <input
                        class="form-control form-control-lg"
                        id="formFileLg"
                        type="file"
                        @change="handleFileChange"
                    >
                </div>

                <button @click="categories" type="button" class="btn btn-success">O'zgartirsh</button>
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
