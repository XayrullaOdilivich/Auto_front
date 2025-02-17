<script setup>
import {ref, onMounted, computed} from "vue"
import { useDelete } from "@/vuex/delete.js"
import SidebarSlot from "@/components/SidebarSlot.vue"
import {useDynamicStore} from "@/vuex/store.js";
import { useRouter } from 'vue-router';

const router = useRouter();

const goBack = () => {
    router.back();
};
const store = useDynamicStore()
const deleteStore = useDelete()
const selectedCategory = ref("")

const category = computed(() => store?.data?.category?.data)

onMounted(async () => {
    await store.fetchData('category',"/categories")
});

const deleteCategory = async () => {
    if (!selectedCategory.value) {
        alert("Kategoriya tanlang!")
        return;
    }

    try {
        await deleteStore.Delete(`/categories/${selectedCategory.value}`)
        alert("Kategoriya o‘chirildi!");

        await store.fetchData('category',"/categories")
    } catch (error) {
        console.error("Kategoriya o‘chirishda xatolik:", error);
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
            <h1 class="title">Delete Category</h1>
            <div class="form">
                <label class="form-label">Qaysi kategoriyani o‘chirmoqchisiz?</label>
                <select v-model="selectedCategory" class="form-select">
                    <option v-for="category in category"
                            :key="category.id"
                            :value="category.id">
                        {{ category.name_en }}
                    </option>
                </select>
                <button type="button" @click="deleteCategory" class="btn btn-danger">O‘chirish</button>
            </div>
        </div>
    </sidebar-slot>
</template>

<style scoped>
.form {
    text-align: center
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
select, label, button {
    outline: none;
    margin: 5px auto 20px auto;
    display: block;
    width: 40%;
}
</style>
