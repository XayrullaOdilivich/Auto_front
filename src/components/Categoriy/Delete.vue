<script setup>
import { ref, onMounted } from "vue"
import { useDelete } from "@/vuex/delete.js"
import { useGetStore } from "@/vuex/categoryStore.js"
import SidebarSlot from "@/components/SidebarSlot.vue"

const categoryStore = useGetStore()
const deleteStore = useDelete()
const selectedCategory = ref("")

onMounted(async () => {
    await categoryStore.fetchData("/categories")
});

const deleteCategory = async () => {
    if (!selectedCategory.value) {
        alert("Kategoriya tanlang!")
        return;
    }

    try {
        await deleteStore.Delete(`/categories/${selectedCategory.value}`)
        alert("Kategoriya o‘chirildi!");

        await categoryStore.fetchData("/categories")
    } catch (error) {
        console.error("Kategoriya o‘chirishda xatolik:", error);
    }
};
</script>

<template>
    <sidebar-slot>
        <div class="container">
            <h1 class="title">Delete Category</h1>
            <div class="form">
                <label class="form-label">Qaysi kategoriyani o‘chirmoqchisiz?</label>
                <select v-model="selectedCategory" class="form-select">
                    <option v-for="category in categoryStore.data"
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

select, label, button {
    outline: none;
    margin: 5px auto 20px auto;
    display: block;
    width: 40%;
}
</style>
