<template>
    <div class="navbar bg-primary">
    <div class="navbar-start w-full">
            <button v-if="$route.meta.requiresAuth" @click="sideToggle()" class="text-3xl text-white"><Icon icon="material-symbols:menu" /></button>
       </div>
       <div class="navbar-end w-full">
            <button @click="signout()" v-if="$route.meta.requiresAuth" class="text-3xl text-white"><Icon icon="material-symbols:logout" /></button>
       </div>
    </div>
</template>


<script setup>
     import { useAuthStore } from "@/stores/auth";
     import { storeToRefs } from "pinia";
     
     const { sideToggle,signout } = useAuthStore();
</script>