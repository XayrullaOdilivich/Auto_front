<script setup>
import { ref } from 'vue'
import SidebarSlot from "@/components/SidebarSlot.vue"
import { useCreateStore } from "@/vuex/create.js"
import { useRouter } from 'vue-router';

const router = useRouter();

const goBack = () => {
    router.back();
};

const createStore = useCreateStore()
const createData = ref({
    title: '',
    images: null
})

const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
        createData.value.images = file;
        console.log("Yuklangan fayl:", file);
    }
}
const brands = async () => {
    try {
        const formData = new FormData();
        formData.append("title", createData.value.title);
        formData.append("images", createData.value.images);

        await createStore.fetchPost("/brands", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        alert("Brand successfully created successfully.!");



    } catch (error) {
        console.error("Xatolik:", error);
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
            <h1 class="title">Create_Brand</h1>
            <div class="form">
                <label for="exampleFormControlInput1" class="form-label">Nomi</label>
                <input
                    v-model="createData.title"
                    type="text"
                    class="form-control"
                    aria-label="Sizing example input"
                   aria-describedby="inputGroup-sizing-sm"
                   required
                >
                <div>
                    <label for="formFileLg" class="form-label">Brand rsmini tanlang</label>
                    <input
                        class="form-control form-control-lg"
                        id="formFileLg"
                        type="file"
                        @change="handleFileChange"
                    >
                </div>
                <button type="button" @click="brands" class="btn btn-success">Yuborish</button>
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
input, button {
    outline: none;
    margin: 5px auto 20px auto;
    display: block;
    width: 40%;
}

</style>
