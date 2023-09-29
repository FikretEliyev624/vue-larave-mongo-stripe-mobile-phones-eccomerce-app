<template>
  <Navbar/>
  <div class="flex justify-center items-center h-full w-full">
       <router-view></router-view>
  </div>
</template>


<script setup>
  import  Navbar  from "./components/Navbar.vue"
</script>