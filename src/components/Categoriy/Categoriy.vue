<script setup>
import SidebarSlot from "@/components/SidebarSlot.vue";
import { useRouter } from 'vue-router';

const router = useRouter();

const goBack = () => {
    router.back();
};
</script>

<template>
    <sidebar-slot>
        <div>
            <button @click="goBack" class="back-btn">⬅️ Ortga</button>
            <slot></slot> <!-- Sahifaning asosiy mazmuni -->
        </div>
        <h1>Categories</h1>
        <router-link to="/admin/categoriy/create" class="menu-link">
            <div class="menu">
                Yaratish
            </div>
        </router-link>
        <router-link to="/admin/categoriy/update" class="menu-link">
            <div class="menu">
                O'zgartirish
            </div>
        </router-link>
        <router-link to="/admin/categoriy/get" class="menu-link">
            <div class="menu">
                Barchasini Ko'rish
            </div>
        </router-link>
        <router-link to="/admin/categoriy/delete" class="menu-link">
            <div class="menu">
                O'chirish
            </div>
        </router-link>
    </sidebar-slot>
</template>

<style scoped>
h1 {
    font-weight: bold;
    color:teal;
    margin: 30px;
}

.menu {
    border: 2px solid white;
    box-shadow: 9px 0 20px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    padding: 10px;
    border-radius: 5px;
    font-weight: bold;
    font-size: 20px;
    transition: background-color 0.3s ease;
    margin: 30px;
    text-align: center;
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
.link {
    color: #667085;
    margin: 30px;
}

a {
    color: blue;
    font-weight: bold;
    text-decoration: none;
}
</style>