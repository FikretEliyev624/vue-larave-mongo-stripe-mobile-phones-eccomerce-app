<template>
    <aside v-if="isSideBtn" class="min-h-screen w-40 md:w-[400px] flex justify-center bg-primary">
        <ul class="flex flex-col justify-center h-[65%]">
            <li class="my-3">
                <router-link class="text-2xl text-white font-normal" to="/">Users</router-link>
                
            </li>
            <li class="my-3">
                
                <router-link class="text-2xl text-white font-normal" to="/products">Products</router-link>
            </li>

        </ul>
    </aside>
</template>



<script setup>
     import { useAuthStore } from "@/stores/auth";
     import { storeToRefs } from "pinia";
     const { isSideBtn } = storeToRefs(useAuthStore());
</script>

