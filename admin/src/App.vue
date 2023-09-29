<template>
  <div class="flex w-full h-full flex-col">
        <Navigationbar/>
      <component :is="$route.meta.Layout">
        <router-view/>
    </component>
  </div>

</template>


<script setup>
  import Navigationbar from "./components/Navigationbar.vue"
  import Sidebar from "./components/Sidebar.vue"
</script>