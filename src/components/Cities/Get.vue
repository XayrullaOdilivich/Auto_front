<script setup>
import { ref, onMounted } from "vue";
import { useGetStore } from "@/vuex/categoryStore.js"; 
import SidebarSlot from "@/components/SidebarSlot.vue";

const getStore = useGetStore();
const cities = ref([]);

const fetchCities = async () => {
    try {
        cities.value = await getStore.fetchData("/cities");
    } catch (error) {
        console.error("Cities yuklashda xatolik:", error);
    }
};

onMounted(fetchCities);
</script>

<template>
    <sidebar-slot>
        <div class="container">
            <h1 class="title">Cities ro‘yxati</h1>

            <table v-if="cities.length" class="table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Nomi </th>
                    <th>Text</th>
                    <th>Rasm</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="cities in cities" :key="cities.id">
                    <td>{{ cities.id }}</td>
                    <td>{{ cities.name }}</td>
                    <td>{{ cities.text }}</td>
                    <td>
                        <img v-if="cities.image_src" :src="cities.image_src" alt="Kategoriya rasmi" width="80">
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
