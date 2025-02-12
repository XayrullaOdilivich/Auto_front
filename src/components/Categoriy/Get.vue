<script setup>
import { ref, onMounted } from "vue";
import { useGetStore } from "@/vuex/categoryStore.js"; 
import SidebarSlot from "@/components/SidebarSlot.vue";

const getStore = useGetStore();
const categories = ref([]);

const fetchCategories = async () => {
    try {
        categories.value = await getStore.fetchData("/categories");
    } catch (error) {
        console.error("Kategoriya yuklashda xatolik:", error);
    }
};

onMounted(fetchCategories); 
</script>

<template>
    <sidebar-slot>
        <div class="container">
            <h1 class="title">Category ro‘yxati</h1>

            <table v-if="categories.length" class="table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Nomi (UZ)</th>
                    <th>Nomi (RU)</th>
                    <th>Rasm</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="category in categories" :key="category.id">
                    <td>{{ category.id }}</td>
                    <td>{{ category.name_en }}</td>
                    <td>{{ category.name_ru }}</td>
                    <td>
                        <img v-if="category.image_src" :src="category.image_src" alt="Kategoriya rasmi" width="80">
                    </td>
                </tr>
                </tbody>
            </table>

            <div v-else>
                <p>🚫 Hali hech qanday kategoriya yo‘q.</p>
            </div>
        </div>
    </sidebar-slot>
</template>
