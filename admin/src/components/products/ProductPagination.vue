<template>
  <div class="w-full flex justify-center mt-10">
           <div  class="join">
            <button  @click="goBack()" class="join-item btn btn-primary btn-md"><Icon icon="iconamoon:arrow-left-2" /></button>
            <button v-auto-animate="{ duration: 300 }" :class="{'btn-info transition-all duration-300 ease-in':productsParams.page===i}" @click="goWithNumber(i)" v-for="i in productsParams.totalPage" :key="i" class="join-item btn btn-primary btn-md">{{i}}</button>
  
            <button  @click="goNext()" class="join-item btn btn-primary btn-md"><Icon icon="iconamoon:arrow-right-2" /></button>
          </div>
    </div>
</template>


<script setup>
import { storeToRefs } from "pinia";
import { computed, onMounted } from "vue";
import { useProductsStore } from "../../stores/products";
const {productsParams}=storeToRefs(useProductsStore())
const {goBack,goNext,goWithNumber}=useProductsStore()

</script>