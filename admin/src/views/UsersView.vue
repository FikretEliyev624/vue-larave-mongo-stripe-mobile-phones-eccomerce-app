<template>
    <div class="flex flex-col">
        <UsersHeader/>
        <CreateUser/>
        <div  v-if="users.length > 0">
            <UsersTable/>
            <UserPagination/>
        </div>
        <div class="w-full text-center text-xl font-medium mt-20" v-else>
           <p>{{message}}</p>
        </div>
        <EditRole/>
        
    </div>
</template>


<script setup>
    import {UsersHeader,UsersTable,EditRole,CreateUser,UserPagination} from "../components/users"
    import { storeToRefs } from "pinia";
    import { computed, onMounted, onUpdated } from "vue";
    import { useUsersStore } from "../stores/users";
    const { users,message }=storeToRefs(useUsersStore())
    const { getUsers }=useUsersStore()
      onMounted(async()=>{
        await getUsers()
        console.log('users.value', users.value)
        })
</script>