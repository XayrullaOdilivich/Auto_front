<script setup>
import {onMounted, ref} from 'vue'
import SidebarSlot from "@/components/SidebarSlot.vue"
import { useGetStore } from "@/vuex/categoryStore.js"
import {useUpdateStore} from "@/vuex/update.js"

const selectedLocations = ref("")
const locationsStore = useGetStore()
const updateStore = useUpdateStore()
const updateData = ref({
    name: '',
    text: '',
    images: null,
})
onMounted(async () => {
    await locationsStore.fetchData('/locations')
})

const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (file) {
        updateData.value.images = file
        console.log("Yuklangan fayl:", file)
    }
}
const locations = async () => {
    try {
        const formData = new FormData();
        formData.append("name", updateData.value.name);
        formData.append("text", updateData.value.text);
        formData.append("images", updateData.value.images);

        await updateStore.fetchPut(`/locations/${selectedLocations.value}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        await locationsStore.fetchData("/locations")
        alert('Locations successfully updated successfully.!')
        console.log("Yaratildi");
    } catch (error) {
        console.error("Xatolik:", error);
    }
};
</script>

<template>
    <sidebar-slot>
        <div class="container">
            <h1 class="title">Update_Locations</h1>
            <div class="form">
                <label for="exampleFormControlInput1" class="form-label">Tanlang</label>
                <select v-model="selectedLocations" class="form-select form-select-lg mb-3" aria-label="Large select example">
                    <option
                        v-for="locations in locationsStore.data"
                        :key="locations.id"
                        :value="locations.id">
                        {{ locations.name }}
                    </option>

                </select>
                <label for="exampleFormControlInput1" class="form-label">Nomi</label>
                <input
                    v-model="selectedLocations.name"
                    type="text"
                    class="form-control"
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-sm"
                    required
                >
                <label for="description" class="form-label">Text</label>
                <textarea
                    v-model="selectedLocations.text"
                    id="description"
                    class="form-control"
                    rows="4"
                    placeholder="Tavsif kiriting..."
                ></textarea>

                <div>
                    <label for="formFileLg" class="form-label">Rasimini Kiriting</label>
                    <input
                        class="form-control form-control-lg"
                        id="formFileLg"
                        type="file"
                        @change="handleFileChange"
                    >
                </div>
                <button type="button" @click="locations" class="btn btn-success">O'zgartirsh</button>
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

input,textarea, select, button {
    outline: none;
    margin: 5px auto 20px auto;
    display: block;
    width: 40%;
}

</style>
