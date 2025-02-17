<script setup>
import {ref, onMounted, computed} from "vue";
import SidebarSlot from "@/components/SidebarSlot.vue";
import {useDynamicStore} from "@/vuex/store.js";

const store = useDynamicStore()
const models = ref([]);
const selectedModel = ref("");
const modelInfo = ref(null);

onMounted(async () => {
    await store.fetchData('models', '/models')
    models.value = store.data.models?.data
})

const fetchModelById = async () => {
    if (!selectedModel.value) return;
    try {
        await store.fetchData('models',`/models/${selectedModel.value}`);
        modelInfo.value = store.data.models?.data
    } catch (error) {
        console.error("Tanlangan modelni yuklashda xatolik:", error);
    }
};


</script>

<template>
    <sidebar-slot>
        <div class="container">
            <h1 class="title">Model ma’lumotlari</h1>

            <label class="form-label">Model tanlang:</label>
            <select v-model="selectedModel" class="form-select">
                <option v-for="model in models" :key="model.id" :value="model.id">
                    {{ model.name }}
                </option>
            </select>

            <button @click="fetchModelById" type="button"  class="btn btn-success">Olish</button>

            <table v-if="modelInfo" class="table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Model nomi</th>
                    <th>Brendi</th>
                    <th>Yaratilgan vaqti</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>{{ modelInfo.id }}</td>
                    <td>{{ modelInfo.name }}</td>
                    <td>{{ modelInfo.brand_title }}</td>
                    <td>{{ modelInfo.created_at }}</td>
                </tr>
                </tbody>
            </table>

            <div v-else>
                <p>🚫 Hali hech qanday model tanlanmagan.</p>
            </div>
        </div>
    </sidebar-slot>
</template>

<style scoped>
.container {
    text-align: center;
}

.form-label {
    display: block;
    margin-top: 20px;
}

.form-select {
    width: 50%;
    margin: 10px auto;
    padding: 5px;
}

.btn {
    margin-top: 10px;
}

.table {
    margin-top: 20px;
    width: 80%;
    margin-left: auto;
    margin-right: auto;
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
}
input, select, button {
    outline: none;
    margin: 5px auto 20px auto;
    display: block;
    width: 40% !important;
}

button:hover {
    background-color: #0056b3;
}

</style>
