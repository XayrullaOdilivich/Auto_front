<script setup>
import { ref, onMounted } from "vue";
import SidebarSlot from "@/components/SidebarSlot.vue";
import {useDynamicStore} from "@/vuex/store.js";
import { useRouter } from 'vue-router';

const router = useRouter();

const goBack = () => {
    router.back();
};
const store = useDynamicStore()
const cars = ref([]);
const selectedCarId = ref("");
const carDetails = ref(null);

const fetchCarDetails = async () => {
    if (!selectedCarId.value) return;
    try {
        await store.fetchData('cars',`/cars/${selectedCarId.value}`);
        carDetails.value = store.data.cars?.data
    } catch (error) {
        console.error("Mashina ma'lumotlarini yuklashda xatolik:", error);
    }
};

onMounted(async () => {
    await store.fetchData('cars','/cars');
    cars.value = store.data.cars?.data
});
</script>

<template>
    <sidebar-slot>
        <div>
            <button @click="goBack" class="back-btn">⬅️ Ortga</button>
            <slot></slot> <!-- Sahifaning asosiy mazmuni -->
        </div>
        <div class="container">
            <h1 class="title">Mashina ma’lumotlari</h1>

            <div class="select-container">
                <label for="carSelect">Mashina tanlang:</label>
                <select v-model="selectedCarId" id="carSelect" class="form-select">
                    <option v-for="car in cars" :key="car.id" :value="car.id">
                        {{ car.brand.title }} - {{ car.model.name }}
                    </option>
                </select>
                <button  type="button"  class="btn btn-success" @click="fetchCarDetails">Olish</button>
            </div>

            <div class="table-wrapper" v-if="carDetails">
                <table class="table">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Brandi</th>
                        <th>Kategoriyasi</th>
                        <th>Shahri</th>
                        <th>Rangi</th>
                        <th>Yili</th>
                        <th>100 KM/S chiqish vaqti</th>
                        <th>Depozit</th>
                        <th>Haydovchi tarafi</th>
                        <th>4 kunlik narxi</th>
                        <th>Inclusive</th>
                        <th>Limit per day</th>
                        <th>Location</th>
                        <th>Odam soni</th>
                        <th>Max. tezlik</th>
                        <th>Model</th>
                        <th>Divigitel hajmi</th>
                        <th>Yoqilg'i turi</th>
                        <th>Premium Protection</th>
                        <th>Price in AED</th>
                        <th>Price in AED Sale</th>
                        <th>Price in USD</th>
                        <th>Price in USD Sale</th>
                        <th>3 kunlik narx</th>
                        <th>Transmission</th>
                        <th>2 kunlik narx</th>
                        <th>Yaratilgan vaqti</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>{{ carDetails.id }}</td>
                        <td>{{ carDetails.brand.title }}</td>
                        <td>{{ carDetails.category.name_en }}</td>
                        <td>{{ carDetails.city.name }}</td>
                        <td>{{ carDetails.color }}</td>
                        <td>{{ carDetails.year }}</td>
                        <td>{{ carDetails.seconds }}</td>
                        <td>{{ carDetails.deposit }}</td>
                        <td>{{ carDetails.drive_side }}</td>
                        <td>{{ carDetails.four_days_price }}</td>
                        <td>{{ carDetails.inclusive }}</td>
                        <td>{{ carDetails.limitperday }}</td>
                        <td>{{ carDetails.location.name }}</td>
                        <td>{{ carDetails.max_people }}</td>
                        <td>{{ carDetails.max_speed }}</td>
                        <td>{{ carDetails.model.name }}</td>
                        <td>{{ carDetails.motor }}</td>
                        <td>{{ carDetails.petrol }}</td>
                        <td>{{ carDetails.premium_protection }}</td>
                        <td>{{ carDetails.price_in_aed }}</td>
                        <td>{{ carDetails.price_in_aed_sale }}</td>
                        <td>{{ carDetails.price_in_usd }}</td>
                        <td>{{ carDetails.price_in_usd_sale }}</td>
                        <td>{{ carDetails.three_days_price }}</td>
                        <td>{{ carDetails.transmission }}</td>
                        <td>{{ carDetails.two_days_price }}</td>
                        <td>{{ carDetails.created_at }}</td>
                    </tr>
                    </tbody>
                </table>
            </div>

            <div v-else>
                <p>🚫 Mashina haqida ma’lumot yo‘q.</p>
            </div>
        </div>
    </sidebar-slot>
</template>

<style scoped>
.container {
    text-align: center;
}

.select-container {
    margin-bottom: 20px;
}

input, select, button {
    outline: none;
    margin: 5px auto 20px auto;
    display: block;
    width: 40%;
}

button:hover {
    background-color: #0056b3;
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

.table-wrapper {
    max-height: 450px;
    overflow-y: auto;
    overflow-x: auto;
    border: 1px solid #ddd;
    margin-top: 20px;
}

.table {
    width: 100%;
    border-collapse: collapse;
    table-layout: auto;
    white-space: nowrap;
}

th, td {
    padding: 12px;
    border: 1px solid #ddd;
    text-align: left;
}

th {
    background-color: #f4f4f4;
    position: sticky;
    top: 0;
    z-index: 2;
}

td {
    min-width: 120px;
}

@media (max-width: 768px) {
    .table-wrapper {
        max-height: 300px;
    }
    td {
        min-width: 100px;
    }
}
</style>
