<script setup>
import { ref, onMounted } from "vue"
import { useDelete } from "@/vuex/delete.js"
import { useGetStore } from "@/vuex/categoryStore.js"
import SidebarSlot from "@/components/SidebarSlot.vue"

const citiesStore = useGetStore()
const deleteStore = useDelete()
const selectedCities = ref("")

onMounted(async () => {
    await citiesStore.fetchData("/cities")
});

const deleteCities = async () => {
    if (!selectedCities.value) {
        alert("Kategoriya tanlang!")
        return;
    }

    try {
        await deleteStore.Delete(`/cities/${selectedCities.value}`)
        alert("Cities  o‘chirildi!");

        await citiesStore.fetchData("/cities")
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
                    <option v-for="cities in citiesStore.data"
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
