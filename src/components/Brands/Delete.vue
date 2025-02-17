<script setup>
import {ref, onMounted, computed} from "vue"
import { useDelete } from "@/vuex/delete.js"
import SidebarSlot from "@/components/SidebarSlot.vue"
import {useDynamicStore} from "@/vuex/store.js";
import { useRouter } from 'vue-router';

const router = useRouter();

const goBack = () => {
    router.back();
};

const brandStore = useDynamicStore()
const deleteStore = useDelete()
const selectedBrands = ref("")

const brands = computed(() => brandStore.data?.brands?.data || [])

onMounted(async () => {
    await brandStore.fetchData('brands',"/brands")
});

const deleteBrand = async () => {
    if (!selectedBrands.value) {
        alert("Kategoriya tanlang!")
        return;
    }

    try {
        await deleteStore.Delete(`/brands/${selectedBrands.value}`)
        alert("Brand o‘chirildi!");

        await brandStore.fetchData('brands','/brands')
    } catch (error) {
        console.error("Brandlarni o‘chirishda xatolik:", error);
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
            <h1 class="title">Delete_Brand</h1>
            <div class="form">
                <label class="form-label">Qaysi brandni o‘chirmoqchisiz?</label>
                <select v-model="selectedBrands" class="form-select">
                    <option v-for="brand in brands"
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
</style>
