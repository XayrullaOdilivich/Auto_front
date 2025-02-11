<script setup>
import SidebarSlot from "@/components/SidebarSlot.vue";
</script>

<template>
    <sidebar-slot>
        <router-link class="link" to="/admin/categories">Locations </router-link>
        <h1>Locations</h1>
        <router-link to="/admin/location/create" class="menu-link">
            <div class="menu">
                Yaratish
            </div>
        </router-link>
        <router-link to="/admin/location/update" class="menu-link">
            <div class="menu">
                O'zgertirish
            </div>
        </router-link>
        <router-link to="/admin/categoriy" class="menu-link">
            <div class="menu">
                Barchasini Ko'rish
            </div>
        </router-link>
        <router-link to="/admin/location/delete" class="menu-link">
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