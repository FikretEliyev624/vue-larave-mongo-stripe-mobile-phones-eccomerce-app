<template>
    <div class="overflow-x-auto mt-10">
  <table class="table">
    <!-- head -->
    <thead>
      <tr>
        <th>#</th>
        <th>Email</th>
        <th>Role</th>
         <th>Created At</th>
        <th>Updated At</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody  v-auto-animate="{ duration: 300 }">
      <!-- row 1 -->
      <tr v-for="(user,index) in users" :key="user._id">
        <th>{{index+1}}</th>
        <td>{{user.email}}</td>
        <td>{{checkRole(user.isAdmin)}}</td>
        <td>{{moment(user.created_at).format("DD:MM:YYYY HH:mm")}}</td>
        <td>{{moment(user.updated_at).format("DD:MM:YYYY HH:mm")}}</td>
        <td>
            <button @click="openEditModal(user._id,user.isAdmin)" class="text-lg mx-1 text-success">
                <Icon icon="material-symbols:edit" />
            </button>
            <button @click="updateStatus(user._id,!user.isActive)" class="text-lg mx-1">
                <Icon class="text-success" v-if="user.isActive===false" icon="mdi:check-circle" />
                <Icon class="text-error" v-else icon="ic:sharp-dangerous" />
            </button>
        </td>
      </tr>
      <!-- row 2 -->
 
    </tbody>
  </table>
</div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { computed, onMounted } from "vue";
import { useUsersStore } from "../../stores/users";
import moment from "moment";
const {isEditModalOpen,users,isActive}=storeToRefs(useUsersStore())
const checkRole = (role) => (role === true ? "Admin" : "User");
const {getUsers,openEditModal,updateStatus}=useUsersStore()
  onMounted(()=>{
    getUsers()

  })
</script>