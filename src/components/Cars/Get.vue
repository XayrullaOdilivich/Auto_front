<script setup>
import { ref, onMounted } from "vue";
import SidebarSlot from "@/components/SidebarSlot.vue";
import {useDynamicStore} from "@/vuex/store.js";

const store = useDynamicStore()
const cars = ref([]);

onMounted(async () => {
    await store.fetchData('cars', '/cars')
    cars.value = store.data.cars?.data
});
</script>
<template>
    <sidebar-slot>
        <div class="container">
            <h1 class="title"> Mashinalar ro‘yxati</h1>
            <div v-if="cars.length">
                <div class="table-container">
                    <table class="table">
                        <thead>
                        <tr>
                            <th>No.</th>
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
                            <th>premium_protection</th>
                            <th>price_in_aed</th>
                            <th>price_in_aed_sale</th>
                            <th>price_in_usd</th>
                            <th>price_in_usd_sale</th>
                            <th>three_days_price</th>
                            <th>transmission</th>
                            <th>two_days_price</th>
                            <th>Yaratilgan vaqti</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(car, idx) in cars" :key="car.id">
                            <td>{{ idx + 1 }}</td>
                            <td>{{ car.id }}</td>
                            <td>{{ car.brand.title }}</td>
                            <td>{{ car.category.name_en }}</td>
                            <td>{{ car.city.name }}</td>
                            <td>{{ car.color }}</td>
                            <td>{{ car.year }}</td>
                            <td>{{ car.seconds }}</td>
                            <td>{{ car.deposit }}</td>
                            <td>{{ car.drive_side }}</td>
                            <td>{{ car.four_days_price }}</td>
                            <td>{{ car.inclusive }}</td>
                            <td>{{ car.limitperday }}</td>
                            <td>{{ car.location.name }}</td>
                            <td>{{ car.max_people }}</td>
                            <td>{{ car.max_speed }}</td>
                            <td>{{ car.model.name }}</td>
                            <td>{{ car.motor }}</td>
                            <td>{{ car.petrol }}</td>
                            <td>{{ car.premium_protection }}</td>
                            <td>{{ car.price_in_aed }}</td>
                            <td>{{ car.price_in_aed_sale }}</td>
                            <td>{{ car.price_in_usd }}</td>
                            <td>{{ car.price_in_usd_sale }}</td>
                            <td>{{ car.three_days_price }}</td>
                            <td>{{ car.transmission }}</td>
                            <td>{{ car.two_days_price}}</td>
                            <td>{{ car.created_at }}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div v-else>
                <p>🚫 Hali hech qanday mashinalar yo‘q.</p>
            </div>
        </div>
    </sidebar-slot>
</template>

<style scoped>
.container {
    text-align: center;
}

.table-container {
    max-width: 100%;
    overflow-x: auto; /* Jadval sig‘masa, scrolldown qo‘shadi */
    white-space: nowrap; /* Matnni buzmaydi */
    border: 1px solid #ddd; /* Chiroyli ko‘rinishi uchun */
    padding: 5px;
}

.table {
    width: 100%;
    border-collapse: collapse;
}

th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
}

</style>
