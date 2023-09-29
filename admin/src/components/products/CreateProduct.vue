<template>
        <dialog id="my_modal_1" :open="isCreateModalOpen" class="modal">
  <form @submit="createNewProduct($event)" class="modal-box">
    <h3 class="font-bold text-lg">Create Product!</h3>
    <div class="w-full flex flex-col justify-center items-center mt-2">
    <div class="flex">
      <div class="form-control my-2 mx-1 w-full max-w-xs">
  <label class="label">
    <span class="label-text">Model</span>
    
  </label>
  <input v-model="product.model"  type="text" placeholder="Enter Model" class="input input-primary w-full max-w-xs" />
    </div>
    <div class="form-control my-2 mx-1 w-full max-w-xs">
  <label class="label">
    <span class="label-text">Price</span>
    
  </label>
  <input v-model="product.price"  type="number" placeholder="Enter Price" class="input input-primary w-full max-w-xs" />
    </div>
    </div>
    <div class="flex">
       <div class="form-control my-2 mx-1 w-full max-w-xs">
  <label class="label">
    <span class="label-text">Battery Life</span>
    
  </label>
  <input v-model="product.batteryLife"  type="number" placeholder="Enter Battery Life" class="input input-primary w-full max-w-xs" />
    </div>
    <div class="form-control my-2 mx-1 w-full max-w-xs">
  <label class="label">
    <span class="label-text">Ram</span>
    
  </label>
  <input  type="number" v-model="product.ram" placeholder="Enter Ram" class="input input-primary w-full max-w-xs" />
    </div>
    </div>
   <div class="flex">
     <div class="form-control my-2 w-full mx-1 max-w-xs">
  <label class="label">
    <span class="label-text">Stock</span>
    
  </label>
  <input v-model="product.stock" type="number" placeholder="Enter Stock" class="input input-primary w-full max-w-xs" />
    </div>
    <div class="form-control my-2 w-full mx-1 max-w-xs">
  <label class="label">
    <span class="label-text">Screen Size</span>
    
  </label>
  <input v-model="product.screenSize" type="text" placeholder="Enter Screen Size" class="input input-primary w-full max-w-xs" />
    </div>
   </div>
   <div class="flex w-full">
     <select v-model="product.category" @change="handleCategory($event,product)" class="select select-primary w-full max-w-xs mt-5 mb-3 mx-1">
  
  <option value="iPhone">iPhone</option>
  <option value="Samsung">Samsung</option>
  <option value="Xiaomi">Xiaomi</option>
</select>
<select v-model="product.operatingSystem" @change="handleOperatingSystem($event,product)" class="select select-primary w-full max-w-xs mt-5 mb-3 mx-1">
 
  <option value="iOS">iOS</option>
  <option value="Android">Android</option>

</select>
  </div>
    <div class="flex w-full">
     
    <div class="form-control mx-1  w-full max-w-xs">
  <label class="label">
    <span class="label-text">Storage</span>
    
  </label>
 <div>
   <input  type="number" v-model="product.storage" placeholder="Enter Storage" class="input input-primary w-full max-w-xs" />
 </div>
    </div>
    <div class="form-control mx-1  w-full max-w-xs">
      <label class="label">
    <span class="label-text">Image</span>
    
  </label>
     <div>
       <input type="file" @change="handleImageUpload($event,product)"  class="file-input file-input-bordered file-input-primary w-full max-w-xs" />
     </div>
    </div>
    </div>
    </div>
    <div class="modal-action">
       <button  type="submit" class="btn btn-success">Save</button>
      <button type="button" @click="isCreateModalOpen=false" class="btn btn-error">Close</button>
    </div>
  </form>
</dialog>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { computed, onMounted, onUpdated } from "vue";
import { useProductsStore } from "../../stores/products";
const {isCreateModalOpen,product}=storeToRefs(useProductsStore())
const {handleImageUpload,handleOperatingSystem,createNewProduct,handleCategory}=useProductsStore()

</script>