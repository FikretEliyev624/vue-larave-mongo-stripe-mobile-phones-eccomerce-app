<template>
  <div class="flex h-full w-full items-center justify-center">
    <div v-auto-animate="{ duration: 300 }" class="flex h-full items-center justify-center w-full flex-wrap">
    <div  v-for="product in products" :key="product._id" class="card w-96 bg-base-100 shadow-xl mx-10 my-10">
      <figure class="px-10 pt-10">
        <img
          :src="`http://localhost:8000/images/${product.image}`"
          alt="Shoes"
          class="rounded-xl w-48 h-48 object-cover"
        />
      </figure>
      <div class="card-body items-center text-center">
        <h2 class="card-title">{{product.category}}</h2>
        <p>{{product.model}}</p>
        <p :class="{'line-through':product.newPrice}">{{product.price}} $</p>
        <p v-show="product.newPrice>0">{{product.newPrice}} $</p>
        <p>Ram {{product.ram}} Gb</p>
        <p>{{product.storage}} Gb</p>
        <p>{{product.screenSize}} Inc</p>
        <p>OS  {{product.operatingSystem}}</p>
        <p>Battery Life {{product.batteryLife}} hours</p>
        <div class="card-actions">
          <button @click="AddToCart(product._id)" class="btn btn-primary text-2xl"><Icon icon="icon-park-outline:shopping" /></button>
        </div>
      </div>
    </div>
   
    
    
  </div>

  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { computed, onMounted, onUpdated } from "vue";
import { useProductsStore } from "../../stores/products";
import { useBucketStore } from "../../stores/bucket";

const {products}=storeToRefs(useProductsStore())
  const {getProducts}=useProductsStore()
 const {AddToCart}=useBucketStore()
 onMounted(()=>{
    getProducts()

  })
</script>


