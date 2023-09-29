import { defineStore, storeToRefs } from 'pinia';
import { computed, ref, reactive, watchEffect } from 'vue';
import {useToggle} from "@vueuse/core"
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from './auth';
import { useToast } from 'vue-toastification';
import axiosInstance from '../plugins/axios';

export const useProductsStore = defineStore('products', ()=>{
    //state
    const { user,token }=useAuthStore()
    const toast = useToast();
    const isEditModalOpen=ref(false)
    const isCreateModalOpen=ref(false)
   
    const product=reactive({
        model:"",
        category:"iPhone",
        price:"",
        batteryLife:"",
        ram:"",
        storage:"",
        stock:"",
        screenSize:"",
        operatingSystem:"iOS",
        image:null,
        active:'1'
    })
    const edit_product=reactive({
        model:"",
        category:"iPhone",
        price:"",
        batteryLife:"",
        ram:"",
        storage:"",
        stock:"",
        screenSize:"",
        operatingSystem:"iOS",
        image:null,
        newPrice:"",
        active:'1'
    })
    const productsParams=reactive({
        search:"",
        page:1,
        limit:6,
        totalPage:"",
        category:""
    })
    const productId=ref('')
    const products=ref([])
    const message=ref('')
    //computed



    //method
    const searchProduct=async()=>{
        
        
        productsParams.page=1
         await getProducts()
     }
    const createNewProduct=async(e)=>{
        e.preventDefault();
        try {
            const res=await axiosInstance.post('/products/create-product',product,{
                headers:{
                    'Authorization':`Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                }
            })
            //toast.success('User was created successfully')
            isCreateModalOpen.value=false
            //Object.entries(product).map(val => product[val[0]] = null);
            toast.success(res.data.message)
            await getProducts()
            console.log('res', res)
        } catch (error) {
            console.log('error', error)
            
            toast.error(error.response.data.message)
        }
    }
    const getProducts=async()=>{
        try {
            const res=await axiosInstance.get(`/products/get-products?model=${productsParams.search}&category=${productsParams.category}&page=${productsParams.page}&limit=${productsParams.limit}`)
            
            console.log('res', res.data.data.data)
            console.log('res', res)
            products.value=res.data.data.data
            productsParams.totalPage=res.data.data.last_page
           

        } catch (error) {
            console.log('error',error)
            message.value=error.response.data.error
            console.log('message.value', message.value)
           
            products.value=error.response.data.data
            
        }
    }
    const updateProduct=async(e)=>{
        e.preventDefault()
        try {
            const res=await axiosInstance.post(`/products/update-product/${productId.value}`,edit_product,{
                headers:{
                    'Authorization':`Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
        }})
            
        await getProducts()
        isEditModalOpen.value=false
            console.log('res', res)
            console.log('edit_product.active', edit_product.active)
            //usersParams.totalPage=res.data.last_page
            toast.success(res.data.message)
        } catch (error) {
            console.log('error',error)
            console.log('edit_product.active', typeof edit_product.active)
        }
    }
    const deleteProduct=async(id)=>{
       
        try {
            const res=await axiosInstance.delete(`/products/delete-product/${id}`,{
                headers:{
                    'Authorization':`Bearer ${token}`,
        }})
            
        await getProducts()
            console.log('res', res)
            toast.success(res.data.message)
            //usersParams.totalPage=res.data.last_page
        } catch (error) {
            console.log('error',error)
            
        }
    }



    const openEditModal=(id,product)=>{
        isEditModalOpen.value=true
        productId.value=id
        // handleEditImageUpload(event,edit_product)

        for (const key in product) {
            if (key in edit_product) {
              edit_product[key] = product[key];
            }
          }
        edit_product.image=null
        console.log('product.active',typeof product.active)
        edit_product.active=product.active==true?'1':'0'
       
    }

    const handleImageUpload = (event,product) => {
        const file = event.target.files[0]; // Access the selected file
        if (file) {
          product.image = file; // Assign the file to the image property
          console.log('Selected file:', file);
          toast.info("Image selected")
        } else {
            product.image = null;
          console.log('No file selected',edit_product.image);
        }
      };
      
    const handleOperatingSystem=(event,product)=>{
        product.operatingSystem=event.target.value
    }
    const handleCategory=(event,product)=>{
        product.category=event.target.value
        
        
    }
    const handleSelectCategory=async(event,product)=>{
        product.category=event.target.value
        productsParams.page=1
        await getProducts()
      
        
    }
    const handleStatus=(event,product)=>{
        product.active=event.target.value
        console.log('typeof event.target.value', typeof +event.target.value)
        
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
    return{isCreateModalOpen,isEditModalOpen,createNewProduct,product,handleImageUpload,handleOperatingSystem,
        handleCategory,getProducts,handleStatus,updateProduct,products,edit_product,
        openEditModal,goBack,goNext,goWithNumber,productsParams,searchProduct,message,deleteProduct,handleSelectCategory}
},{persist:{
    storage: sessionStorage,
    paths: ['productsParams.page'],
}})