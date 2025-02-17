<script setup>
import { ref, onMounted } from "vue";
import SidebarSlot from "@/components/SidebarSlot.vue";
import {useDynamicStore} from "@/vuex/store.js";

const store = useDynamicStore()
const brands = ref([]);

onMounted( async () => {
    await store.fetchData('brands', '/brands')
    brands.value = store.data.brands?.data
});
</script>
<template>
    <sidebar-slot>
        <div class="container">
            <h1 class="title">Brands ro‘yxati</h1>

            <div v-if="brands.length">
                <div class="table-container">
                    <table class="table">
                        <thead>
                        <tr>
                            <th>No.</th>
                            <th>ID</th>
                            <th>Nomi</th>
                            <th>Rasm</th>
                            <th>Yaratilgan vaqti</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(brand, idx) in brands" :key="brand.id">
                            <td>{{ idx + 1 }}</td> <!-- No. ustuni -->
                            <td>{{ brand.id }}</td>
                            <td>{{ brand.title }}</td>
                            <td>
                                <img v-if="brand.image_src" :src="brand.image_src" alt="Brand rasmi" width="80">
                            </td>
                            <td>{{ brand.created_at }}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div v-else>
                <p>🚫 Hali hech qanday brand yo‘q.</p>
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

/* Sarlavha harakat qilmasligi uchun */
th {
    background-color: #f4f4f4;
    position: sticky;
    top: 0;
}
</style>
