import { defineStore, storeToRefs } from 'pinia';
import { computed, ref, reactive, watchEffect } from 'vue';
import {useToggle} from "@vueuse/core"
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from './auth';
import { useToast } from 'vue-toastification';
import axiosInstance from '../plugins/axios';

export const useProductsStore = defineStore('products', ()=>{
    //state
    // const { user,token }=useAuthStore()
    const toast = useToast();
    
    
    
    const productsParams=reactive({
        search:"",
        page:1,
        limit:6,
        totalPage:"",
        category:""
    })
    const message=ref('')
    const products=ref([])
    //computed



    //method
    const searchProduct=async()=>{
        
        
        productsParams.page=1
         await getProducts()
     }
    const getProducts=async()=>{
        try {
            const res=await axiosInstance.get(`/products/get-products?model=${productsParams.search}&category=${productsParams.category}&page=${productsParams.page}&limit=${productsParams.limit}`)
            
            console.log('res', res.data.data.data)
            console.log('res', res)
            products.value=res.data.data.data.filter(product => product.active===true);
           const test=res.data.data.data.filter(product => product.active===false);
           console.log('test', test)
            productsParams.totalPage=res.data.data.last_page
        } catch (error) {
            console.log('error',error)
            message.value=error.response.data.error
            console.log('message.value', message.value)
           
            products.value=error.response.data.data
            
        }
    }
    const handleSelectCategory=async(event,product)=>{
        product.category=event.target.value
        productsParams.page=1
        await getProducts()
        
    }
    const goBack=async()=>{
        if(productsParams.page===1){
            return
        }else{
            productsParams.page--
        }
        await getProducts()
    }
    const goNext=async()=>{
        if(productsParams.page===productsParams.totalPage){
            return
        }else{
            productsParams.page++
        }
        await getProducts()
    }
    const goWithNumber=async(num)=>{
        productsParams.page=num
        await getProducts()
    }




   

  
    

    //exports
    return{getProducts,products,productsParams,handleSelectCategory,
        searchProduct,goBack,goNext,goWithNumber,message}
},{persist:{
    storage: sessionStorage,
    paths: ['productsParams.page'],
}})