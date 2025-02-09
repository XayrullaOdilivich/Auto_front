<script setup>
import SidebarSlot from "@/components/SidebarSlot.vue";
</script>

<template>
    <sidebar-slot>
        <router-link class="link" to="/admin/categories">Categoriy </router-link>
        <h1>Categoriylar nazorati</h1>
        <router-link to="/admin/categoriy" class="menu-link">
            <div class="menu">
                Yaratish
            </div>
        </router-link>
        <router-link to="/admin/categoriy" class="menu-link">
            <div class="menu">
                O'zgertirish
            </div>
        </router-link>
        <router-link to="/admin/categoriy" class="menu-link">
            <div class="menu">
                Barchasini Ko'rish
            </div>
        </router-link>
        <router-link to="/admin/categoriy" class="menu-link">
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
    display: flex;
    align-items: center;
    padding: 10px;
    border-radius: 5px;
    font-weight: bold;
    font-size: 20px;
    transition: background-color 0.3s ease;
    margin: 30px;

}

.link {
    color: slategrey;
    margin: 30px;
}

a {
    color: teal;
    font-weight: bold;
    text-decoration: none;
}
</style>