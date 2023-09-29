<template>
    <dialog id="my_modal_1" :open="isEditModalOpen" class="modal">
  <form @submit="updateCart($event,updateCartParams.id)" class="modal-box">
    <h3 class="font-bold text-lg">Update Cart</h3>
    <div class="w-full flex flex-col justify-center items-center mt-2">
    <div class="form-control my-2 w-full max-w-xs">
  <label class="label">
    <span class="label-text">New quantity</span>
    
  </label>
  <input v-model="updateCartParams.quantity" type="number" placeholder="Enter New quantity" class="input input-primary w-full max-w-xs" />
    </div>
    
    </div>
    <div class="modal-action">
       <button  type="submit" class="btn btn-success">Save</button>
      <button type="button" @click="isEditModalOpen=false" class="btn btn-error">Close</button>
    </div>
  </form>
</dialog>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { computed, onMounted, onUpdated } from "vue";
import { useProductsStore } from "../../stores/products";
import { useBucketStore } from "../../stores/bucket";


 const {updateCart}=useBucketStore()
  const {isEditModalOpen,updateCartParams}=storeToRefs(useBucketStore())
//  onMounted(()=>{
//     getBucket()

//   })
</script>