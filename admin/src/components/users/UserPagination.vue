<template>
    <div class="w-full flex justify-center mt-10">

          <!-- <div  class="join">
            <button @click="goBack()" class="join-item btn btn-primary btn-md"><Icon icon="iconamoon:arrow-left-2" /></button>
            <button  v-auto-animate="{ duration: 300 }" :class="{'btn-info transition-all duration-300 ease-in':userParams.page===i}" @click="goWithNumber(i)" v-for="i in userParams.totalPages" :key="i" class="join-item btn btn-primary btn-md">{{i}}</button>
           
            <button @click="goNext()" class="join-item btn btn-primary btn-md"><Icon icon="iconamoon:arrow-right-2" /></button>
          </div> -->
           <div  class="join">
            <button  @click="goBack()" class="join-item btn btn-primary btn-md"><Icon icon="iconamoon:arrow-left-2" /></button>
            <button v-auto-animate="{ duration: 300 }" :class="{'btn-info transition-all duration-300 ease-in':usersParams.page===i}" @click="goWithNumber(i)" v-for="i in usersParams.totalPage" :key="i" class="join-item btn btn-primary btn-md">{{i}}</button>
  
            <button  @click="goNext()" class="join-item btn btn-primary btn-md"><Icon icon="iconamoon:arrow-right-2" /></button>
          </div>
    </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { computed, onMounted } from "vue";
import { useUsersStore } from "../../stores/users";
const {usersParams}=storeToRefs(useUsersStore())
const {goBack,goNext,goWithNumber}=useUsersStore()

</script>