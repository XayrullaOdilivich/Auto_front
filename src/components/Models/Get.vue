<script setup>
import { ref, onMounted } from "vue";
import SidebarSlot from "@/components/SidebarSlot.vue";
import {useDynamicStore} from "@/vuex/store.js";

const store = useDynamicStore()
const models = ref([]);

onMounted(async () => {
    await store.fetchData('models',"/models");
    models.value = store.data?.models?.data
});
</script>

<template>
    <sidebar-slot>
        <div class="container">
            <h1 class="title">Modellar ro‘yxati</h1>

            <div v-if="models.length">
                <div class="table-container">
                    <table class="table">
                        <thead>
                        <tr>
                            <th>No.</th>
                            <th>ID</th>
                            <th>Nomi</th>
                            <th>Brandi</th>
                            <th>Yaratilgan vaqti</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(model, idx) in models" :key="model.id">
                            <td>{{ idx + 1 }}</td> <!-- No. ustuni qo‘shildi -->
                            <td>{{ model.id }}</td>
                            <td>{{ model.name }}</td>
                            <td>{{ model.brand_title }}</td>
                            <td>{{ model.created_at }}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div v-else>
                <p>🚫 Hali hech qanday Modellar yo‘q.</p>
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
