<template>
    <div v-if="$route.meta.showNavbar" class="navbar bg-primary navbar-end w-full">
        <router-link  class="text-white text-xl mx-4" to="/">Home</router-link>
        <div class="flex" v-if="isAuthenticated">
                  <div class="indicator">
  <span v-show="bucket.length>0" class="indicator-item badge badge-error text-white mr-3">{{bucket.length}}</span>
   <router-link  class="text-white text-xl mx-4 grid place-items-center" to="/bucket">Bucket</router-link>
</div>
      
       
            <button @click="signout()" class="text-white text-xl mx-4">Signout</button>
        </div>
        <div class="flex" v-else>
            <router-link class="text-white text-xl mx-4" to="/signup">Signup</router-link>
            <router-link  class="text-white text-xl mx-4" to="/signin">Signin</router-link>
        </div>
        
      
    </div>
</template>


<script setup>
   import { storeToRefs } from "pinia"
    import { useAuthStore } from "@/stores/auth"
import { computed } from "vue"
    const { user,token }=storeToRefs(useAuthStore())
    const { signout }=useAuthStore()
    import { useBucketStore } from "../stores/bucket";


  const {bucket}=storeToRefs(useBucketStore())
    const isAuthenticated=computed(()=>{
        
        return token.value!==''

    })
    
</script>