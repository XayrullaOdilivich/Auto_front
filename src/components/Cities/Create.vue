<script setup>
import { ref } from 'vue'
import SidebarSlot from "@/components/SidebarSlot.vue"
import { useCreateStore } from "@/vuex/create.js"

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
const cities = async () => {
    try {
        const formData = new FormData();
        formData.append("name", createData.value.name);
        formData.append("text", createData.value.text);
        formData.append("images", createData.value.images);

        await createStore.fetchPost("/cities", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        alert("Cities successfully created successfully.!");

    } catch (error) {
        console.error("Xatolik:", error);
    }
};

</script>

<template>
    <sidebar-slot>
        <div class="container">
            <h1 class="title">Create_Cities</h1>
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
                <button type="button" @click="cities" class="btn btn-success">Yuborish</button>
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

input,textarea, button {
    outline: none;
    margin: 5px auto 20px auto;
    display: block;
    width: 40%;
}

</style>
