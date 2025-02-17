<script setup>
import { ref, onMounted } from "vue";
import SidebarSlot from "@/components/SidebarSlot.vue";
import {useDynamicStore} from "@/vuex/store.js";

const store = useDynamicStore()
const cities = ref([]);

onMounted(async () => {
    await store.fetchData('city','/cities')
    cities.value = store.data.city?.data
});
</script>
<template>
    <sidebar-slot>
        <div class="container">
            <h1 class="title">Shaharlar ro‘yxati</h1>

            <div v-if="cities.length">
                <div class="table-container">
                    <table class="table">
                        <thead>
                        <tr>
                            <th>No.</th>
                            <th>ID</th>
                            <th>Nomi</th>
                            <th>Text</th>
                            <th>Rasm</th>
                            <th>Yaratilgan vaqti</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(city, idx) in cities" :key="city.id">
                            <td>{{ idx + 1 }}</td> <!-- No. ustuni qo‘shildi -->
                            <td>{{ city.id }}</td>
                            <td>{{ city.name }}</td>
                            <td>{{ city.text }}</td>
                            <td>
                                <img v-if="city.image_src" :src="city.image_src" alt="Shahar rasmi" width="80">
                            </td>
                            <td>{{ city.created_at }}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div v-else>
                <p>🚫 Hali hech qanday shahar yo‘q.</p>
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

th {
    background-color: #f4f4f4;
    position: sticky;
    top: 0;
}
</style>

