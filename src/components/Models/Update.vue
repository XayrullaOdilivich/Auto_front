<script setup>
import {computed, onMounted, ref} from 'vue'
import SidebarSlot from "@/components/SidebarSlot.vue"
import {useUpdateStore} from "@/vuex/update.js"
import {useDynamicStore} from "@/vuex/store.js";
import { useRouter } from 'vue-router';

const router = useRouter();

const goBack = () => {
    router.back();
};
const store = useDynamicStore()
const selectedModels = ref("")
const updateStore = useUpdateStore()
const updateData = ref({
    name: '',
    brand_id: ''
})

const models = computed(() => store.data.models?.data)
const brands = computed(() => store.data.brands?.data)

onMounted(async () => {
    await store.fetchData('brands','/brands')
    await store.fetchData('models','/models')
})

const updateModels = async () => {
    try {
        const formData = new FormData();
        formData.append("name", updateData.value.name);
        formData.append("brand_id", updateData.value.brand_id);

        for (let pair of formData.entries()) {
            console.log(pair[0] + ': ' + pair[1]);
        }

        await updateStore.fetchPut(`/models/${selectedModels.value}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        alert("Model successfully updated!");
        await store.fetchData('brands','/brands')
        await store.fetchData('models','/models')
    } catch (error) {
        console.error("Xatolik:", error);
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
            <h1 class="title">Update Models</h1>
            <div class="form">
                <label class="form-label">Qaysi Modelni o'zgaritramiz</label>
                <select v-model="selectedModels" class="form-select">
                    <option v-for="model in models"
                            :key="model.id"
                            :value="model.id">
                        {{ model.name }}
                    </option>
                </select>

                <label class="form-label">Model nomi</label>
                <input
                    v-model="updateData.name"
                    type="text"
                    class="form-control"
                    required
                >

                <label class="form-label">Brandini tanlang</label>
                <select v-model="updateData.brand_id" class="form-select">
                    <option v-for="brand in brands"
                            :key="brand.id"
                            :value="brand.id">
                        {{ brand.title }}
                    </option>
                </select>

                <button type="button" @click="updateModels" class="btn btn-success">Yuborish</button>
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

input, select, button {
    outline: none;
    margin: 5px auto 20px auto;
    display: block;
    width: 40%;
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

</style>
