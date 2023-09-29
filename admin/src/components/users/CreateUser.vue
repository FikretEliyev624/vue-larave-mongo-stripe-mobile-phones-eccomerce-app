<template>
    <dialog id="my_modal_1" :open="isCreateModalOpen" class="modal">
  <form @submit="createNewUser($event)" class="modal-box">
    <h3 class="font-bold text-lg">Create User!</h3>
    <div class="w-full flex flex-col justify-center items-center mt-2">
    <div class="form-control my-2 w-full max-w-xs">
  <label class="label">
    <span class="label-text">Email</span>
    
  </label>
  <input v-model="user.email" type="text" placeholder="Enter Email" class="input input-primary w-full max-w-xs" />
    </div>
    <div class="form-control my-2 w-full max-w-xs">
  <label class="label">
    <span class="label-text">Password</span>
    
  </label>
  <input v-model="user.password" type="password" placeholder="Enter Password" class="input input-primary w-full max-w-xs" />
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
import { useAuthStore } from "../../stores/auth";
import { useUsersStore } from "../../stores/users";
const {isCreateModalOpen}=storeToRefs(useUsersStore())

const {createNewUser}=useUsersStore()
const {user}=storeToRefs(useAuthStore())
</script>