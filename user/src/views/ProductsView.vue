<template>
    <div class="w-full h-full flex flex-col">
        <ProductHeader/>
          <div v-if="products.length > 0">
             <ProductCard/>
            <ProductPagination/>
        </div>
        <div v-else class="w-full text-center text-xl font-medium mt-20">
           <p>{{message}}</p>
        </div>
    </div>
</template>


<script setup>
    import {ProductCard,ProductHeader,ProductPagination} from "../components/products"
    import { storeToRefs } from "pinia";
    import { computed, onMounted, onUpdated } from "vue";
    import { useProductsStore } from "../stores/products";
    const { products,message }=storeToRefs(useProductsStore())
    const { getProducts }=useProductsStore()
      onMounted(async()=>{
        await getProducts()
        
        })
</script>