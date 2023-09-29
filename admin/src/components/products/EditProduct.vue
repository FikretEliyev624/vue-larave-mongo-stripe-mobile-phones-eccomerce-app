<template>
        <dialog id="my_modal_1" :open="isEditModalOpen" class="modal">
  <form @submit="updateProduct($event)" class="modal-box" enctype="multipart/form-data">
    <h3 class="font-bold text-lg">Update Product!</h3>
    <div class="w-full flex flex-col justify-center items-center mt-2">
    <div class="flex">
      <div class="form-control my-2 mx-1 w-full max-w-xs">
  <label class="label">
    <span class="label-text">Model</span>
    
  </label>
  <input v-model="edit_product.model"  type="text" placeholder="Enter Model" class="input input-primary w-full max-w-xs" />
    </div>
    <div class="form-control my-2 mx-1 w-full max-w-xs">
  <label class="label">
    <span class="label-text">Price</span>
    
  </label>
  <input v-model="edit_product.price"  type="number" placeholder="Enter Price" class="input input-primary w-full max-w-xs" />
    </div>
    </div>
    <div class="flex">
       <div class="form-control my-2 mx-1 w-full max-w-xs">
  <label class="label">
    <span class="label-text">Battery Life</span>
    
  </label>
  <input v-model="edit_product.batteryLife"  type="number" placeholder="Enter Battery Life" class="input input-primary w-full max-w-xs" />
    </div>
    <div class="form-control my-2 mx-1 w-full max-w-xs">
  <label class="label">
    <span class="label-text">Ram</span>
    
  </label>
  <input  type="number" v-model="edit_product.ram" placeholder="Enter Ram" class="input input-primary w-full max-w-xs" />
    </div>
    </div>
   <div class="flex">
     <div class="form-control my-2 w-full mx-1 max-w-xs">
  <label class="label">
    <span class="label-text">Stock</span>
    
  </label>
  <input v-model="edit_product.stock" type="number" placeholder="Enter Stock" class="input input-primary w-full max-w-xs" />
    </div>
    <div class="form-control my-2 w-full mx-1 max-w-xs">
  <label class="label">
    <span class="label-text">Screen Size</span>
    
  </label>
  <input v-model="edit_product.screenSize" type="text" placeholder="Enter Screen Size" class="input input-primary w-full max-w-xs" />
    </div>
   </div>
   <div class="flex w-full">
     <select v-model="edit_product.category" @change="handleCategory($event,edit_product)" class="select select-primary w-full max-w-xs mt-5 mx-1">
  
  <option value="iPhone">iPhone</option>
  <option value="Samsung">Samsung</option>
  <option value="Xiaomi">Xiaomi</option>
</select>
<select v-model="edit_product.operatingSystem" @change="handleOperatingSystem($event,edit_product)" class="select select-primary w-full max-w-xs mt-5 mx-1">
 
  <option value="iOS">iOS</option>
  <option value="Android">Android</option>

</select>

   </div>
  <div class="flex w-full">
    <div class="form-control mt-6 mx-2 w-full max-w-xs">
  
    <select v-model="edit_product.active" @change="handleStatus($event,edit_product)" class="select select-primary w-full max-w-xs my-5 mx-1">
 
  <option value="1">Active</option>
  <option value="0">Inactive</option>

</select>
    </div>
     
    <div class="form-control my-2 mx-1 w-full max-w-xs">
  <label class="label">
    <span class="label-text">Storage</span>
    
  </label>
  <input  type="number" v-model="edit_product.storage" placeholder="Enter Storage" class="input input-primary w-full max-w-xs" />
    </div>
  </div>
   <div class="flex w-full">
     <div class="form-control  w-full mx-1 max-w-xs">
  <label class="label">
    <span class="label-text">New Price</span>
    
  </label>
  <input v-model="edit_product.newPrice" type="number" placeholder="Enter New Price" class="input input-primary w-full max-w-xs" />
    </div>
    <div class="form-control  w-full mx-1 max-w-xs">
  <label class="label">
    <span class="label-text">Image</span>
    
  </label>
  <input  type="file"  @change="handleImageUpload($event,edit_product)"  class="file-input file-input-bordered file-input-primary w-full max-w-xs" />
    </div>
    

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
const {isEditModalOpen,edit_product}=storeToRefs(useProductsStore())
const {updateProduct,handleImageUpload,handleOperatingSystem,createNewProduct,handleStatus,handleCategory}=useProductsStore()

</script>