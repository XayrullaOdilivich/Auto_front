<script setup>
import {computed, onMounted, ref, watch} from 'vue'
import SidebarSlot from "@/components/SidebarSlot.vue"
import { useUpdateStore } from "@/vuex/update.js"
import {useDynamicStore} from "@/vuex/store.js";

const selectedCityId = ref("")
const store = useDynamicStore()
const updateStore = useUpdateStore()

const updateData = ref({
    name: '',
    text: '',
    images: null
})

const city = computed(() => store.data?.city?.data)

onMounted(async () => {
    await store.fetchData('city','/cities')
})

watch(selectedCityId, (newId) => {
    const city = store.data.find(city => city.id === newId)
    if (city) {
        updateData.value.name = city.name
        updateData.value.text = city.text
    } else {
        updateData.value.name = ''
        updateData.value.text = ''
    }
})

const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (file) {
        updateData.value.images = file
        console.log("Yuklangan fayl:", file)
    }
}

const updateCity = async () => {
    try {
        const formData = new FormData();
        formData.append("name", updateData.value.name);
        formData.append("text", updateData.value.text);
        if (updateData.value.images) {
            formData.append("images", updateData.value.images);
        }

        await updateStore.fetchPut(`/cities/${selectedCityId.value}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        await store.fetchData('city','/cities')
        alert('City updated successfully!')
        console.log("Yaratildi");
    } catch (error) {
        console.error("Xatolik:", error);
    }
};
</script>

<template>
    <sidebar-slot>
        <div class="container">
            <h1 class="title">Update Cities</h1>
            <div class="form">
                <label class="form-label">Tanlang</label>
                <select v-model="selectedCityId" class="form-select form-select-lg mb-3">
                    <option
                        v-for="city in city"
                        :key="city.id"
                        :value="city.id">
                        {{ city.name }}
                    </option>
                </select>

                <label class="form-label">Nomi</label>
                <input
                    v-model="updateData.name"
                    type="text"
                    class="form-control"
                    required
                >

                <label class="form-label">Text</label>
                <textarea
                    v-model="updateData.text"
                    class="form-control"
                    rows="4"
                    placeholder="Tavsif kiriting..."
                ></textarea>

                <div>
                    <label class="form-label">Rasm yuklash</label>
                    <input
                        class="form-control"
                        type="file"
                        @change="handleFileChange"
                    >
                </div>

                <button type="button" @click="updateCity" class="btn btn-success">O'zgartirish</button>
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

