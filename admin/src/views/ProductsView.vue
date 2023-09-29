<template>
     <div class="flex flex-col">
        <ProductsHeader/>
        <CreateProduct/>
        <div v-if="products.length > 0">
            <ProductsTable/>
            <ProductPagination/>
        </div>
        <div v-else class="w-full text-center text-xl font-medium mt-20">
           <p>{{message}}</p>
        </div>
        <EditProduct/>
        
    </div>
</template>

<script setup>
    import {CreateProduct,EditProduct,ProductPagination,ProductsTable,ProductsHeader} from "../components/products"
    import { storeToRefs } from "pinia";
    import { computed, onMounted, onUpdated } from "vue";
    import { useProductsStore } from "../stores/products";
    const { products,message }=storeToRefs(useProductsStore())
    const { getProducts }=useProductsStore()
      onMounted(async()=>{
        await getProducts()
        
        })
</script>