<template>
    <div class="flex p-10 justify-between">
        <p class="text-3xl text-white">Users</p>
        <div class="join">
            <input v-model="usersParams.search" class="input w-48 md:w-96 input-primary join-item"/>
            <button @click="searchUser()" class="btn btn-primary text-xl join-item"><Icon icon="material-symbols:search" /></button>
        </div>
        <button @click="isCreateModalOpen=true" class="btn btn-primary">Create User</button>
    </div>
</template>


<script setup>
import { storeToRefs } from "pinia";
import { computed, onMounted, onUpdated } from "vue";
import { useUsersStore } from "../../stores/users";
const {isCreateModalOpen,usersParams}=storeToRefs(useUsersStore())
const {searchUser,getUsers}=useUsersStore()
onMounted(async()=>{
        await getUsers()
})
</script>