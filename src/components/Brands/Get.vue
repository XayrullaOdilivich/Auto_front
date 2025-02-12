<script setup>
import { ref, onMounted } from "vue";
import { useGetStore } from "@/vuex/categoryStore.js"; 
import SidebarSlot from "@/components/SidebarSlot.vue";

const getStore = useGetStore();
const categories = ref([]);

const fetchBrands = async () => {
    try {
        categories.value = await getStore.fetchData("/brands");
    } catch (error) {
        console.error("Kategoriya yuklashda xatolik:", error);
    }
};

onMounted(fetchBrands);
</script>

<template>
    <sidebar-slot>
        <div class="container">
            <h1 class="title">Brands ro‘yxati</h1>

            <table v-if="categories.length" class="table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Nomi</th>
                    <th>Rasm</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="brands in categories" :key="brands.id">
                    <td>{{ brands.id }}</td>
                    <td>{{ brands.title }}</td>
                    <td>
                        <img v-if="brands.image_src" :src="brands.image_src" alt="Kategoriya rasmi" width="80">
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
