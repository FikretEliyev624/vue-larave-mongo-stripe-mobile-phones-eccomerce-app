<template>
    <div v-if="bucket.length>0" class="flex flex-col h-full w-full justify-center items-center">
        <bucketTable/>
        <UpdateCart/>
        <BucketTotal/>
    </div>
    <div v-else class="flex flex-col h-full w-full justify-center items-center">
        <p class="text-3xl text-warning font-bold">Your basket is empty</p>
    </div>
</template>

<script setup>
    import {BucketTable,UpdateCart,BucketTotal} from "../components/bucket"
    import { storeToRefs } from "pinia";
    import { computed, onMounted, onUpdated } from "vue";

    import { useBucketStore } from "../stores/bucket";
    const {getBucket}=useBucketStore()
    const {bucket}=storeToRefs(useBucketStore())
onMounted(async()=>{
    await getBucket()
    

  })
</script>