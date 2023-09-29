<template>
    <dialog id="my_modal_1" :open="isEditModalOpen" class="modal">
  <form @submit="updateRole($event)" class="modal-box">
    <h3 class="font-bold text-lg">Update Role!</h3>
    <div class="w-full flex justify-center mt-2">
        <div class="form-control mx-5">
  <label class="label cursor-pointer">
    <span class="label-text mx-2">Admin</span> 
    <input v-model="userRole.isAdmin"  :value="true" type="radio" name="radio-10" class="radio checked:bg-red-500" :checked="userRole.selectedRole==true"  />
  </label>
</div>
<div class="form-control mx-5">
  <label class="label cursor-pointer">
    <span class="label-text mx-2">User</span> 
    <input v-model="userRole.isAdmin"  :value="false" type="radio" name="radio-10" class="radio checked:bg-blue-500" :checked="userRole.selectedRole==false"  />
  </label>
</div>
    </div>
    <div class="modal-action">
       <button type="submit" :disabled="disabledSaveBtn"  class="btn btn-success">Save</button>
      <button type="button" @click="closeEditModal()" class="btn btn-error">Close</button>
    </div>
  </form>
</dialog>
</template>


<script setup>
import { storeToRefs } from "pinia";
import { computed, onMounted, onUpdated } from "vue";
import { useUsersStore } from "../../stores/users";
const {isEditModalOpen,userRole,disabledSaveBtn}=storeToRefs(useUsersStore())
const {closeEditModal,updateRole}=useUsersStore()

</script>