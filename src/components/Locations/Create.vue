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
    name: '',
    images: null,
    text: '',
})

const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
        createData.value.images = file;
    }
}
const location = async () => {
    try {
        const formData = new FormData();
        formData.append("name", createData.value.name);
        formData.append("text", createData.value.text);
        formData.append("images", createData.value.images);

        await createStore.fetchPost("/locations", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        alert("Locations successfully created successfully.!");

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
            <h1 class="title">Create_Location</h1>
            <div class="form">
                <label for="exampleFormControlInput1" class="form-label">Nomi</label>
                <input
                    v-model="createData.name"
                    type="text"
                    class="form-control"
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-sm"
                    required
                >
                <label for="description" class="form-label">Text</label>
                <textarea
                    v-model="createData.text"
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
                <button type="button" @click="location" class="btn btn-success">Yuborish</button>
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
input,textarea, button {
    outline: none;
    margin: 5px auto 20px auto;
    display: block;
    width: 40%;
}

</style>
