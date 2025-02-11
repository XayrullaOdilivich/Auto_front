<script setup>

import SidebarSlot from "@/components/SidebarSlot.vue";
</script>

<template>
    <sidebar-slot>
        <div class="container">
            <h1 class="title">Update_Location</h1>
            <div class="form">
                <label for="exampleFormControlInput1" class="form-label">Tanlang</label>
                <select class="form-select form-select-lg mb-3" aria-label="Large select example">
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                </select>
                <label for="exampleFormControlInput1" class="form-label">Nomi</label>
                <input
                    type="text"
                    class="form-control"
                    aria-label="Sizing example input"
                       aria-describedby="inputGroup-sizing-sm"
                       required
                >
                <label for="description" class="form-label">Text</label>
                <textarea
                    id="description"
                    class="form-control"
                    rows="4"
                    placeholder="Tavsif kiriting..."
                ></textarea>

                <div>
                    <label for="formFileLg" class="form-label">Rasimini Kiriting</label>
                    <input class="form-control form-control-lg" id="formFileLg" type="file">
                </div>
                <button type="button" class="btn btn-success">O'zgartirsh</button>
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
