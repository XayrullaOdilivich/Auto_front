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
const store =useDynamicStore()
const deleteStore = useDelete()
const selectedCars = ref("")

const cars = computed(() => store.data.cars?.data)

onMounted(async () => {
    await store.fetchData('cars', '/cars')
});

const deleteCar = async () => {
    if (!selectedCars.value) {
        alert("Carni tanlang!")
        return;
    }

    try {
        await deleteStore.Delete(`/cars/${selectedCars.value}`)
        alert("Car   o‘chirildi!");

        await store.fetchData('cars', '/cars')
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
            <h1 class="title">Delete_Car</h1>
            <div class="form">
                <label for="exampleFormControlInput1" class="form-label">Qaysini o'chirmoqchisiz:</label>
                <select v-model="selectedCars" class="form-select form-select-lg mb-3" aria-label="Large select example">
                    <option
                        v-for="car in cars"
                        :key="car.id"
                        :value="car.id">
                        {{ car.brand.title }} - {{ car.model.name }}
                    </option>
                </select>

                <button type="button" @click="deleteCar" class="btn btn-danger">O'chrish</button>
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
