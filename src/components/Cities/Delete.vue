<script setup>
import {ref, onMounted, computed} from "vue"
import { useDelete } from "@/vuex/delete.js"
import SidebarSlot from "@/components/SidebarSlot.vue"
import {useDynamicStore} from "@/vuex/store.js";

const store = useDynamicStore()
const deleteStore = useDelete()
const selectedCities = ref("")

const city = computed(() => store.data.city?.data)

onMounted(async () => {
    await store.fetchData('city',"/cities")
});

const deleteCities = async () => {
    if (!selectedCities.value) {
        alert("Kategoriya tanlang!")
        return;
    }

    try {
        await deleteStore.Delete(`/cities/${selectedCities.value}`)
        alert("Cities  o‘chirildi!");

        await store.fetchData('city',"/cities")
    } catch (error) {
        console.error("Cities o‘chirishda xatolik:", error);
    }
};
</script>

<template>
    <sidebar-slot>
        <div class="container">
            <h1 class="title">Delete_Cities</h1>
            <div class="form">
                <label for="exampleFormControlInput1" class="form-label">Qaysini o'chirmoqchisiz:</label>
                <select v-model="selectedCities" class="form-select">
                    <option v-for="cities in city"
                            :key="cities.id"
                            :value="cities.id">
                        {{ cities.name }}
                    </option>
                </select>
                <button type="button" @click="deleteCities" class="btn btn-danger">O'chrish</button>
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
button:hover {
    background-color: crimson;
}
</style>
