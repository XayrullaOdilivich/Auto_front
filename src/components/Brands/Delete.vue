<script setup>
import { ref, onMounted } from "vue"
import { useDelete } from "@/vuex/delete.js"
import { useGetStore } from "@/vuex/categoryStore.js"
import SidebarSlot from "@/components/SidebarSlot.vue"

const brandStore = useGetStore()
const deleteStore = useDelete()
const selectedBrands = ref("")

onMounted(async () => {
    await brandStore.fetchData("/brands")
});

const deleteBrand = async () => {
    if (!selectedBrands.value) {
        alert("Kategoriya tanlang!")
        return;
    }

    try {
        await deleteStore.Delete(`/brands/${selectedBrands.value}`)
        alert("Brand o‘chirildi!");

        await brandStore.fetchData("/brands")
    } catch (error) {
        console.error("Brandlarni o‘chirishda xatolik:", error);
    }
};
</script>

<template>
    <sidebar-slot>
        <div class="container">
            <h1 class="title">Delete_Brand</h1>
            <div class="form">
                <label class="form-label">Qaysi brandni o‘chirmoqchisiz?</label>
                <select v-model="selectedBrands" class="form-select">
                    <option v-for="brand in brandStore.data"
                            :key="brand.id"
                            :value="brand.id">
                        {{ brand.title }}
                    </option>
                </select>

                <button type="button" @click="deleteBrand" class="btn btn-danger">O'chrish</button>
            </div>
        </div>
    </sidebar-slot>
</template>
<style scoped>
.form {
    text-align: center
}

h1 {
    margin: 30px;
}

select, label, button {
    outline: none;
    margin: 5px auto 20px auto;
    display: block;
    width: 40%;
}
</style>
