<script setup>
import {computed, onMounted, ref} from 'vue'
import SidebarSlot from "@/components/SidebarSlot.vue"
import {useUpdateStore} from "@/vuex/update.js"
import {useDynamicStore} from "@/vuex/store.js";
import { useRouter } from 'vue-router';

const router = useRouter();

const goBack = () => {
    router.back();
};
const selectedCategory = ref("")
const store = useDynamicStore()
const updateStore = useUpdateStore()
const updateData = ref({
    name_en: '',
    name_ru: '',
    images: null
})

const category = computed(() => store.data?.category?.data)

onMounted(async () => {
    await store.fetchData('category','/categories')

})

const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (file) {
        updateData.value.images = file
        console.log("Yuklangan fayl:", file)
    }
}
const updateCategories = async () => {
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
        await store.fetchData('category','/categories')
        alert('Category successfully updated successfully.!')
        console.log("O'zgartirildi");
    } catch (error) {
        console.error("Xatolik:", error);
    }
};
</script>

<template>
    <sidebar-slot>
        <div>
            <button @click="goBack" class="back-btn">⬅️ Ortga</button>
            <slot></slot> <!-- Sahifaning asosiy mazmuni -->
        </div>
        <div class="container">
            <h1 class="title">Update_Categoriy</h1>
            <div class="form">
                <label for="exampleFormControlInput1" class="form-label">Qasyi birini o'zgartirasiz:</label>
                <select v-model="selectedCategory" class="form-select">
                    <option v-for="category in category"
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

                <button @click="updateCategories" type="button" class="btn btn-success">O'zgartirsh</button>
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
input, select, button {
    outline: none;
    margin: 5px auto 20px auto;
    display: block;
    width: 40%;
}

</style>
