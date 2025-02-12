
<script setup>
import { ref, onMounted } from "vue";
import { useGetStore } from "@/vuex/categoryStore.js"; 
import SidebarSlot from "@/components/SidebarSlot.vue";

const getStore = useGetStore();
const locations = ref([]);

const fetchCities = async () => {
    try {
        locations.value = await getStore.fetchData("/locations");
    } catch (error) {
        console.error("Locations yuklashda xatolik:", error);
    }
};

onMounted(fetchCities);
</script>

<template>
    <sidebar-slot>
        <div class="container">
            <h1 class="title">Locations ro‘yxati</h1>

            <table v-if="locations.length" class="table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Nomi </th>
                    <th>Text</th>
                    <th>Rasm</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="locations in locations" :key="locations.id">
                    <td>{{ locations.id }}</td>
                    <td>{{ locations.name }}</td>
                    <td>{{ locations.text }}</td>
                    <td>
                        <img v-if="locations.image_src" :src="locations.image_src" alt="Kategoriya rasmi" width="80">
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
