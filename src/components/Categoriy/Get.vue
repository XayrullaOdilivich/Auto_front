<script setup>
import { ref, onMounted } from "vue";
import SidebarSlot from "@/components/SidebarSlot.vue";
import {useDynamicStore} from "@/vuex/store.js";
import { useRouter } from 'vue-router';

const router = useRouter();

const goBack = () => {
    router.back();
};
const store = useDynamicStore()
const categories = ref([]);

onMounted(async () => {
    await store.fetchData('category', '/categories')
    categories.value = store.data.category?.data
});
</script>

<template>
    <sidebar-slot>
        <div>
            <button @click="goBack" class="back-btn">⬅️ Ortga</button>
            <slot></slot> <!-- Sahifaning asosiy mazmuni -->
        </div>
        <div class="container">
            <h1 class="title">Category ro‘yxati</h1>

            <div v-if="categories.length">
                <div class="table-container">
                    <table class="table">
                        <thead>
                        <tr>
                            <th>No.</th>
                            <th>ID</th>
                            <th>Nomi (UZ)</th>
                            <th>Nomi (RU)</th>
                            <th>Rasm</th>
                            <th>Yaratilgan vaqti</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(category, idx) in categories" :key="category.id">
                            <td>{{ idx + 1 }}</td> <!-- No. ustuni -->
                            <td>{{ category.id }}</td>
                            <td>{{ category.name_en }}</td>
                            <td>{{ category.name_ru }}</td>
                            <td>
                                <img v-if="category.image_src" :src="category.image_src" alt="Kategoriya rasmi" width="80">
                            </td>
                            <td>{{ category.created_at }}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div v-else>
                <p>🚫 Hali hech qanday kategoriya yo‘q.</p>
            </div>
        </div>
    </sidebar-slot>
</template>

<style scoped>
.container {
    text-align: center;
}

.table-container {
    max-height: 400px;
    overflow-y: auto;
    border: 1px solid #ddd;
    padding: 10px;
    margin-top: 20px;
}

.table {
    width: 100%;
    border-collapse: collapse;
    table-layout: auto;
    white-space: nowrap;
}

th, td {
    padding: 10px;
    border: 1px solid #ddd;
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

/* Sarlavha harakat qilmasligi uchun */
th {
    background-color: #f4f4f4;
    position: sticky;
    top: 0;
}
</style>

