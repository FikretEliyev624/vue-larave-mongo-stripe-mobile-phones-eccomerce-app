<template>
    <div class="overflow-x-auto">
  <table class="table">
    <!-- head -->
    <thead>
      <tr>
        <th>
         #
        </th>
        <th>Image</th>
        <th>Model</th>
        <th>Category</th>
        <th>Price</th>
        <th>New Price</th>
        <th>Ram</th>
        <th>Storage</th>
        <th>Operating System</th>
        <th>Stock</th>
        <th>Screen Size</th>
        <th>Battery Life</th>
         <th>Created At</th>
        <th>Updated At</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody v-auto-animate="{ duration: 300 }" >
      <!-- row 1 -->
      <tr v-for="(product,index) in products" :key="product._id">
        <th>
          {{index+1}}
        </th>
        <td>
          <div class="flex items-center space-x-3">
            <div class="avatar">
              <div class="mask mask-squircle w-12 h-12">
                <img :src="`http://localhost:8000/images/${product.image}`" alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
          </div>
        </td>
        <td>
          {{product.model}}
        </td>
        <td>{{product.category}}</td>
        <td :class="{'line-through':product.newPrice}">
          {{product.price}} $
        </td>
        <td>
          {{product.newPrice}} $
        </td>
        <td>
          {{product.ram}}
        </td>
        <td>
          {{product.storage}}
        </td>
        <td>
          {{product.operatingSystem}}
        </td>
         <td>
          {{product.stock}}
        </td>
        <td>
          {{product.screenSize}}
        </td>
        <td>
          {{product.batteryLife}}
        </td>
         <td>{{moment(product.created_at).format("DD:MM:YYYY HH:mm")}}</td>
        <td>{{moment(product.updated_at).format("DD:MM:YYYY HH:mm")}}</td>
        <td>
            <button @click="openEditModal(product._id,product)"  class="text-lg mx-1 text-success">
                <Icon icon="material-symbols:edit" />
            </button>
            <button @click="deleteProduct(product._id)"  class="text-lg mx-1">
                
                <Icon class="text-error"  icon="iconamoon:trash-fill" />
            </button>
        </td>
      </tr>
      <!-- row 2 -->
      
    </tbody>
    <!-- foot -->
   
    
  </table>
</div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { computed, onMounted, onUpdated } from "vue";
import { useProductsStore } from "../../stores/products";
import moment from "moment";
const {isCreateModalOpen,isEditModalOpen,products}=storeToRefs(useProductsStore())
 const {getProducts,openEditModal,deleteProduct}=useProductsStore()
 onMounted(()=>{
    getProducts()

  })
</script>
