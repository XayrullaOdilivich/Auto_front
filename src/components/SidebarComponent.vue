<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    sessionStorage.clear();

    document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    router.push('/login');
};
</script>

<template>
    <div class="sidebar">
        <div class="list-group">
            <router-link to="/admin" class="menu-link">Asosiy</router-link>
            <router-link to="/admin/categoriy" class="menu-link active-menu">Categories</router-link>
            <router-link to="/admin/brand" class="menu-link active-menu">Brands</router-link>
            <router-link to="/admin/cities" class="menu-link active-menu">Cities</router-link>
            <router-link to="/admin/location" class="menu-link active-menu">Locations</router-link>
            <router-link to="/admin/car" class="menu-link active-menu">Cars</router-link>
            <router-link to="/admin/model" class="menu-link active-menu">Models</router-link>
            <a role="button" @click="logout" class="menu-logout">
                <div class="menu">
                    <svg class="icon" width="22" height="22" viewBox="0 0 24 24" fill="none">
                        <path d="M17 8L21 12M21 12L17 16M21 12H9" stroke="#667085" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9" stroke="#667085" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    Chiqish
                </div>
            </a>
        </div>
    </div>
</template>


<style scoped>
.sidebar {
    display: flex;
    flex-direction: column;
    top: 57px;
    bottom: 0;
    left: 0;
    align-items: center;
    background-color: #ffffff;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
    z-index: 10;
}

.list-group {
    width: 100%;
    padding: 0 15px;
}

.menu {
    display: flex;
    align-items: center;
    padding: 10px;
    border-radius: 5px;
    font-weight: bold;
    font-size: 20px;
    transition: background-color 0.3s ease;
}

.menu-link {
    text-decoration: none;
    text-transform: uppercase;
    text-align: center;
    font-size: 18px;
    color: #0056b3;
    margin: auto;
    padding: 3% 40%;
}

.menu-logout {
    color: red;
}

.menu:hover {
    background-color: #f5f7fa;
    border-radius: 8px;
}

.menu-link, .menu-link:visited, .menu-link:hover {
    text-decoration: none;
    text-transform: uppercase;
    text-align: center;
    font-size: 18px;
    color: #0056b3;
    margin: auto;
    display: block;
}

.menu:hover, .menu-link:hover {
    background-color: #f5f7fa;
    border-radius: 8px;
}


a {
    color: #101828;
    font-weight: bold;
    text-decoration: none;
}

.icon {
    color: #667085;
    margin-right: 10px;
    width: 18px;
}

@media (min-width: 992px) {
    .sidebar {
        height: 100%;
        transform: none;
        position: relative;
        left: 0;
        top: 0;
    }
}
</style>

