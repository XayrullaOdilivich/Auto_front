<script setup>
import {ref, onMounted, computed} from "vue"
import { useDelete } from "@/vuex/delete.js"
import SidebarSlot from "@/components/SidebarSlot.vue"
import {useDynamicStore} from "@/vuex/store.js";
import { useRouter } from 'vue-router';

const router = useRouter();

const goBack = () => {
    router.back();
};
const store = useDynamicStore()
const deleteStore = useDelete()
const selectedModels = ref("")

const models = computed(() => store.data.models?.data)

onMounted(async () => {
    await store.fetchData('models','/models')
});

const deleteModels = async () => {
    if (!selectedModels.value) {
        alert("Modelni tanlang!")
        return;
    }

    try {
        await deleteStore.Delete(`/models/${selectedModels.value}`)
        alert("Model   o‘chirildi!");

        await store.fetchData('models','/models')
    } catch (error) {
        console.error("Models o‘chirishda xatolik:", error);
    }
};
</script>

<template>
    <sidebar-slot>
        <div>
            <button @click="goBack" class="back-btn">⬅️ Ortga</button>
            <slot></slot> <!-- Sahifaning asosiy mazmuni -->
        </div>
        <div class="container">
            <h1 class="title">Delete_Models</h1>
            <div class="form">
                <label for="exampleFormControlInput1" class="form-label">Qaysini o'chirmoqchisiz:</label>
                <select v-model="selectedModels" class="form-select">
                    <option v-for="model in models"
                            :key="model.id"
                            :value="model.id">
                        {{ model.name }}
                    </option>
                </select>

                <button type="button" @click="deleteModels" class="btn btn-danger">O'chrish</button>
            </div>
        </div>
    </sidebar-slot>
</template>

<style scoped>
.form {
    text-align: center;
}

h1 {
    margin: 30px;
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
input, select, button {
    outline: none;
    margin: 5px auto 20px auto;
    display: block;
    width: 40%;
}
button:hover {
    background-color: crimson;
}
</style>
