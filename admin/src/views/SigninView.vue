<template>
    <div class="flex justify-center items-center w-full h-full">
        <form @submit="signin($event)" class="w-full max-w-lg p-8 bg-gray-700 rounded-lg  shadow-lg">
            <label class="mb-2" for="email">
        Email
        <input v-model="user.email"
          class="block w-full bg-gray-500 px-4 py-2 my-3 mt-2 border rounded-lg border-primary focus:outline-none focus:border-primary"
          type="text"
          id="email" 
        >
      </label>
      <label class="mb-2" for="password">
        Password
        <input v-model="user.password"
          class="block w-full bg-gray-500 px-4 py-2 my-3 mt-2 border rounded-lg border-primary focus:outline-none focus:border-primary"
          type="password"
          id="password" 
        >
      </label>
      <button  type="submit" class="btn btn-primary w-full my-5">Signin</button>
        </form>
    </div>
</template>

<script setup>
   import { storeToRefs } from "pinia"
    import { useAuthStore } from "@/stores/auth"
    const { user }=storeToRefs(useAuthStore())
    const { signin }=useAuthStore()
</script>
