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
const selectedLocations = ref("")

const locations = computed(() => store.data.locations?.data)

onMounted(async () => {
    await store.fetchData('locations','/locations')
});

const deleteLocations = async () => {
    if (!selectedLocations.value) {
        alert("Kategoriya tanlang!")
        return;
    }

    try {
        await deleteStore.Delete(`/locations/${selectedLocations.value}`)
        alert("Locations  o‘chirildi!");

        await store.fetchData('locations','/locations')
    } catch (error) {
        console.error("Locations o‘chirishda xatolik:", error);
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
            <h1 class="title">Delete_Location</h1>
            <div class="form">
                <label for="exampleFormControlInput1" class="form-label">Qaysini o'chirmoqchisiz:</label>
                <select v-model="selectedLocations" class="form-select">
                    <option v-for="Locations in locations"
                            :key="Locations.id"
                            :value="Locations.id">
                        {{ Locations.name }}
                    </option>
                </select>
                <button type="button" @click="deleteLocations" class="btn btn-danger">O'chrish</button>
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
button:hover {
    background-color: crimson;
}
</style>
