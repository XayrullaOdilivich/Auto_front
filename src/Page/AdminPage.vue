<script setup>
import SidebarSlot from "@/components/SidebarSlot.vue";

</script>

<template>
    <SidebarSlot>
        <div class="content">
            <h1>Admin saxifasiga xush kelibsiz!</h1>
            <h3>Bu yirda siz saytingiz ma'lumotlarini  o'zgartirishingiz mimkin</h3>
        </div>
    </SidebarSlot>
</template>
<style scoped>
.content {
    background-image: url("@/components/icons/bacground.png");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    position: relative;
    overflow: hidden;
}

.content::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: inherit;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    filter: blur(10px); /* Xiralik darajasi */
    opacity: 0.7; /* Orqa fonni biroz xiralashtirish */
    z-index: 1;
}

h1 {
    text-align: center;
    font-size: 4rem;
    font-weight: bold;
    color: blue;
    margin-top: 4rem;
    z-index: 2;
}

h3 {
    text-align: center;
    font-size: 2rem;
    font-weight: bold;
    color: blue;
    z-index: 2;
}
</style>