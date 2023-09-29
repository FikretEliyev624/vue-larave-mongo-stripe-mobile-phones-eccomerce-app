<template>
    <div class="flex h-full w-full items-center justify-center">
        <button @click="createPaymentCheckout()" class="btn btn-success mx-5">Buy All</button>
        <button @click="emptyCart()" class="btn btn-error mx-5">Remove All</button>
        <p class="text-2xl mx-5 text-green-600">{{calculateSubtotal(bucket)}} $</p>
    </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { computed, onMounted, onUpdated } from "vue";
import { useProductsStore } from "../../stores/products";
import { useBucketStore } from "../../stores/bucket";


 const {calculateSubtotal,emptyCart,createPaymentCheckout}=useBucketStore()
  const {bucket}=storeToRefs(useBucketStore())
//  onMounted(()=>{
//     getBucket()

//   })
</script>