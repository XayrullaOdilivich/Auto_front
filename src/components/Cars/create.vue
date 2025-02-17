<script setup>
import SidebarSlot from "@/components/SidebarSlot.vue";
import {computed, onMounted, ref} from "vue";
import {useDynamicStore} from "@/vuex/store.js";
import {useCreateStore} from "@/vuex/create.js";

const selectedCars = ref({
    brand_id: null,
    model_id: null,
    city_id: null,
    color: '',
    year: '',
    seconds: '',
    category_id: null,
    images: null,
    max_speed: '',
    max_people: '',
    transmission: '',
    motor: '',
    drive_side: '',
    petrol: '',
    limitperday: '',
    deposit: '',
    premium_protection: '',
    price_in_aed: '',
    price_in_usd: '',
    price_in_aed_sale: '',
    price_in_usd_sale: '',
    location_id: null,
    inclusive: null,
    cover: null
})
const store = useDynamicStore()
const createStore = useCreateStore()

const brands = computed(() => store.data.brands?.data)
const models = computed(() => store.data.models?.data)
const cities = computed(() => store.data.city?.data)
const categories = computed(() => store.data.category?.data)
const locations = computed(() => store.data.locations?.data)

onMounted(async () => {
    await store.fetchData('brands', '/brands')
    await store.fetchData('models', '/models')
    await store.fetchData('city', '/cities')
    await store.fetchData('category', '/categories')
    await store.fetchData('locations', '/locations')
})

const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
        selectedCars.value.images = file;
    }
}

const handleCoverChange = (event) => {
    const file = event.target.files[0];
    if (file) {
        selectedCars.value.cover = file;
    }
}

const createCar = async () => {
    try {
        const formData = new FormData();
        formData.append('brand_id', selectedCars.value.brand_id);
        formData.append('model_id', selectedCars.value.model_id);
        formData.append('city_id', selectedCars.value.city_id);
        formData.append('color', selectedCars.value.color);
        formData.append('year', selectedCars.value.year);
        formData.append('seconds', selectedCars.value.seconds);
        formData.append('category', selectedCars.value.category_id);
        formData.append('images', selectedCars.value.images);
        formData.append('max_speed', selectedCars.value.max_speed);
        formData.append('max_people', selectedCars.value.max_people);
        formData.append('transmission', selectedCars.value.transmission);
        formData.append('motor', selectedCars.value.motor);
        formData.append('drive_side', selectedCars.value.drive_side);
        formData.append('petrol', selectedCars.value.petrol);
        formData.append('limitperday', selectedCars.value.limitperday);
        formData.append('deposit', selectedCars.value.deposit);
        formData.append('premium_protection', selectedCars.value.premium_protection);
        formData.append('price_in_aed', selectedCars.value.price_in_aed);
        formData.append('price_in_usd', selectedCars.value.price_in_usd);
        formData.append('price_in_usd_sale', selectedCars.value.price_in_usd_sale);
        formData.append('location_id', selectedCars.value.location_id);
        formData.append('inclusive', selectedCars.value.inclusive);
        formData.append('cover', selectedCars.value.cover);

        await createStore.fetchPost('/cars', formData, {
            headers: {'Content-Type': 'multipart/form-data'}
        })
        alert("Cars created successfully.")

    }catch(error) {
        console.log("xatolik", error)
    }
}

</script>

<template>
<sidebar-slot>
    <div class="container">
        <h1 class="title">Create Cars</h1>
        <div class="form">
            <label for="exampleFormControlInput1" class="form-label">Brandini tanlang</label>
            <select v-model="selectedCars.brand_id" class="form-select">
                <option
                    v-for="brand in brands"
                    :key="brand.id"
                    :value="brand.id">
                    {{ brand.title }}
                </option>
            </select>
            <label for="exampleFormControlInput1" class="form-label">modelini tanlang</label>
            <select v-model="selectedCars.model_id" class="form-select">
                <option
                    v-for="model in models"
                    :key="model.id"
                    :value="model.id">
                    {{ model.name }}
                </option>
            </select>
            <label for="exampleFormControlInput1" class="form-label">Cityini tanlang</label>
            <select v-model="selectedCars.city_id" class="form-select">
                <option
                    v-for="city in cities"
                    :key="city.id"
                    :value="city.id">
                    {{ city.name }}
                </option>
            </select>
            <label class="form-label">Rangi</label>
            <input
                v-model="selectedCars.color"
                type="text"
                class="form-control"
                required
            >
            <label class="form-label">Yili</label>
            <input
                v-model="selectedCars.year"
                type="number"
                class="form-control"
                required
            >
            <label class="form-label">100 KM/S chiqish vaqti</label>
            <input
                v-model="selectedCars.seconds"
                type="number"
                class="form-control"
                required
            >
            <label for="exampleFormControlInput1" class="form-label">Kategoriyani tanlang</label>
            <select v-model="selectedCars.category_id" class="form-select">
                <option
                    v-for="category in categories"
                    :key="category.id"
                    :value="category.id">
                    {{ category.name_en }}
                </option>
            </select>
            <label for="formFileLg" class="form-label">Rasm yuklash</label>
            <input
                class="form-control form-control-lg"
                id="formFileLg"
                type="file"
                @change="handleFileChange"
            >
            <label class="form-label">Maksimal tezligi</label>
            <input
                v-model="selectedCars.max_speed"
                type="number"
                class="form-control"
                required
            >
            <label class="form-label">Odam soni</label>
            <input
                v-model="selectedCars.max_people"
                type="number"
                class="form-control"
                required
            >
            <label class="form-label">Uzatmalar quttisi</label>
            <input
                v-model="selectedCars.transmission"
                type="text"
                class="form-control"
                required
            >
            <label class="form-label">Divigitil Hajmi</label>
            <input
                v-model="selectedCars.motor"
                type="number"
                class="form-control"
                required
            >
            <label class="form-label">Drive_side</label>
            <input
                v-model="selectedCars.drive_side"
                type="text"
                class="form-control"
                required
            >
            <label class="form-label">Yoqilg'i turi</label>
            <input
                v-model="selectedCars.petrol"
                type="text"
                class="form-control"
                required
            >
            <label class="form-label">Limitperday</label>
            <input
                v-model="selectedCars.limitperday"
                type="text"
                class="form-control"
                required
            >
            <label class="form-label">Deposit</label>
            <input
                v-model="selectedCars.deposit"
                type="text"
                class="form-control"
                required
            >
            <label class="form-label">Premium_protection</label>
            <input
                v-model="selectedCars.premium_protection"
                type="text"
                class="form-control"
                required
            >
            <label class="form-label">Price_in_aed</label>
            <input
                v-model="selectedCars.price_in_aed"
                type="text"
                class="form-control"
                required
            >
            <label class="form-label">Price_in_usd</label>
            <input
                v-model="selectedCars.price_in_usd"
                type="text"
                class="form-control"
                required
            >
            <label class="form-label">price_in_aed_sale</label>
            <input
                v-model="selectedCars.price_in_aed_sale"
                type="text"
                class="form-control"
                required
            >
            <label class="form-label">price_in_usd_sale</label>
            <input
                v-model="selectedCars.price_in_usd_sale"
                type="text"
                class="form-control"
                required
            >
            <label for="exampleFormControlInput1" class="form-label">Lokatsiyani tanlang</label>
            <select v-model="selectedCars.location_id" class="form-select">
                <option
                    v-for="location in locations"
                    :key="location.id"
                    :value="location.id">
                    {{ location.name }}
                </option>
            </select>
            <label class="form-label">Inclusive</label>
            <select v-model="selectedCars.inclusive" class="form-select" required>
                <option value="" disabled selected>Tanlang...</option>
                <option :value="true">Yes</option>
                <option :value="false">No</option>
            </select>
            <label for="formFileLg" class="form-label">Cover</label>
            <input
                class="form-control form-control-lg"
                id="formFileLg"
                type="file"
                @change="handleCoverChange"
            >

            <button @click="createCar" type="button" class="btn btn-success">Yuborish</button>
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
</style>