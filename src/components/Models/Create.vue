<script setup>
import { onMounted, ref } from 'vue'
import SidebarSlot from "@/components/SidebarSlot.vue"
import { useGetStore } from "@/vuex/categoryStore.js"
import { useCreateStore } from "@/vuex/create.js"

const brandStore = useGetStore()
const updateStore = useCreateStore()

const updateData = ref({
    name: '',
    brand_id: ''
})

onMounted(async () => {
    await brandStore.fetchData('/brands')
})

const models = async () => {
    try {
        const formData = new FormData();
        formData.append("name", updateData.value.name);
        formData.append("brand_id", updateData.value.brand_id);

        for (let pair of formData.entries()) {
            console.log(pair[0] + ': ' + pair[1]);
        }

        await updateStore.fetchPost(`/models`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        alert("Model successfully created!");

        await brandStore.fetchData("/brands")
    } catch (error) {
        console.error("Xatolik:", error);
    }
};
</script>

<template>
    <sidebar-slot>
        <div class="container">
            <h1 class="title">Create Models</h1>
            <div class="form">
                <label class="form-label">Model nomi</label>
                <input
                    v-model="updateData.name"
                    type="text"
                    class="form-control"
                    required
                >

                <label class="form-label">Qaysi brandga tegishli</label>
                <select v-model="updateData.brand_id" class="form-select">
                    <option v-for="brand in brandStore.data"
                            :key="brand.id"
                            :value="brand.id">
                        {{ brand.title }}
                    </option>
                </select>

                <button type="button" @click="models" class="btn btn-success">Yuborish</button>
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
