<template>
    <div class="flex p-10 justify-around">
        <div class="join">
            <input v-model="productsParams.search" class="input w-48 md:w-96 input-primary join-item"/>
            <button @click="searchProduct()" class="btn btn-primary text-xl join-item"><Icon icon="material-symbols:search" /></button>
        </div>
        <select @change="handleSelectCategory($event,productsParams)" class="select select-primary w-full max-w-xs">
            <option value="iPhone">iPhone</option>
            <option value="Samsung">Samsung</option>
            <option value="Xiaomi">Xiaomi</option>
        </select>
    </div>
</template>


<script setup>
import { storeToRefs } from "pinia";
import { computed, onMounted, onUpdated } from "vue";
import { useProductsStore } from "../../stores/products";
const {isCreateModalOpen}=storeToRefs(useProductsStore())
 const {searchProduct,productsParams,handleSelectCategory,getProducts}=useProductsStore()
onMounted(async()=>{
    await getProducts()

  })
</script>