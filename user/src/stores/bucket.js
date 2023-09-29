import { defineStore, storeToRefs } from 'pinia';
import { computed, ref, reactive, watchEffect } from 'vue';
import {useToggle} from "@vueuse/core"
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from './auth';
import { useToast } from 'vue-toastification';
import axiosInstance from '../plugins/axios';

export const useBucketStore = defineStore('bucket', ()=>{
    //state
    const { user,token }=useAuthStore()
    const toast = useToast();
    const router=useRouter()
    const bucket=ref([])
    const isEditModalOpen=ref(false)
    
    const updateCartParams=reactive({
        id:'',
        quantity:''
    })
    
    
    //computed



    //method
    function calculateSubtotal(bucket) {
        let subtotal = 0;
    
        for (const product of bucket) {
            subtotal += product.quantity * (product.newPrice > 0 ? product.newPrice : product.price);
        }
    
        return subtotal;
    }
    
    const AddToCart=async(id)=>{
        try {
            const res=await axiosInstance.post(`buckets/add-to-cart/${id}`,null,{
                headers:{
                    'Authorization':`Bearer ${token}`,
        }})
            
        await getBucket()
            console.log('res', res)
            toast.success(res.data.message)
        
        } catch (error) {
            console.log('error',error)
            if(error.response.status==401){
                router.push('/signin')
                toast.error(error.response.data.message)
            }

            toast.error(error.response.data.message)
        }
    }
    const getBucket=async()=>{
        try {
            const res=await axiosInstance.get(`buckets/get-bucket`,{
                headers:{
                    'Authorization':`Bearer ${token}`,
        }})
        
            if(res.data.products.length){
                bucket.value=res.data.products
                console.log('res.data.products1', res.data.products)
                
            }else{
                bucket.value=Object.values(res.data.products)
                console.log('res.data.products2', Object.values(res.data.products))
            }
            
      
        // calculateSubtotal(res.data.products)
         
           
        
        } catch (error) {
            console.log('error',error)
            
        }
    }
    const removeFromCart=async(id)=>{
        try {
            const res=await axiosInstance.delete(`buckets/remove-from-cart/${id}`,{
                headers:{
                    'Authorization':`Bearer ${token}`,
        }})
            console.log('res', res)
            await getBucket()
            toast.success(res.data.message)
        } catch (error) {
            console.log('error',error)
            
        }
    }
    const emptyCart=async()=>{
        try {
            const res=await axiosInstance.delete(`buckets/empty-cart`,{
                headers:{
                    'Authorization':`Bearer ${token}`,
        }})
            console.log('res', res)
            await getBucket()
            toast.success(res.data.message)
        
        } catch (error) {
            console.log('error',error)
            
        }
    }
    const updateCart=async(e,id)=>{
        e.preventDefault();
        try {
            const res=await axiosInstance.put(`buckets/update-cart/${id}`,{"newQuantity":updateCartParams.quantity},{
                headers:{
                    'Authorization':`Bearer ${token}`,
        }})
            console.log('res', res)
            isEditModalOpen.value=false
            toast.success(res.data.message)
            await getBucket()
        
        } catch (error) {
            console.log('error',error)
            toast.error(error.response.data.message)
            
        }
    }
    const openEditModal=(id,quantity)=>{
        isEditModalOpen.value=true
        updateCartParams.id=id
        updateCartParams.quantity=quantity
       
    }
    const createPaymentCheckout=async()=>{
        try {
            const res=await axiosInstance.post(`buckets/create-checkout-session`,null,{
                headers:{
                    'Authorization':`Bearer ${token}`,
        }})
            console.log('res', res.data.url)
            //router.go(res.data.url)
            window.location.href=res.data.url
            //toast.success(res.data.message)
        
        } catch (error) {
            console.log('error',error)
            
        }
    }
    



   

  
    

    //exports
    return{AddToCart,getBucket,bucket,removeFromCart,
        updateCartParams,openEditModal,isEditModalOpen,updateCart,calculateSubtotal,emptyCart,createPaymentCheckout}
})