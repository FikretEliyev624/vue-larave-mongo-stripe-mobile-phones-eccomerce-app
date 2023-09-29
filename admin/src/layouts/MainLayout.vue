<template>
    <div class="flex w-full h-full">
        <Sidebar/>
        <div class="w-full h-full">
        <slot/>
        </div>
    </div>
</template>

<script setup>

  import Sidebar from "../components/Sidebar.vue"
</script>