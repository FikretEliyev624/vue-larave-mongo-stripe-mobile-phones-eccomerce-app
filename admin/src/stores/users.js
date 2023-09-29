import { defineStore, storeToRefs } from 'pinia';
import { computed, ref, reactive, watchEffect } from 'vue';
import {useToggle} from "@vueuse/core"
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from './auth';
import { useToast } from 'vue-toastification';
import axiosInstance from '../plugins/axios';

export const useUsersStore = defineStore('users', ()=>{
    //state
    const { user,token }=useAuthStore()
    const toast = useToast();
    const isEditModalOpen=ref(false)
    const isCreateModalOpen=ref(false)
    const usersParams=reactive({
        search:"",
        page:1,
        limit:6,
        totalPage:""
    })
    const message=ref('')
    const users=ref([])
    const userId=ref('')
    const userRole=reactive({
        isAdmin:null,
        selectedRole:null     
    })
    const isActive=ref(true)
    const disabledSaveBtn=ref(null)
    //computed


    //method
    const searchUser=async()=>{
        
        
       usersParams.page=1
        await getUsers()
    }
    const createNewUser=async(e)=>{
        
        console.log('user.email', user.email)
        e.preventDefault();
        try {
            const res=await axiosInstance.post('/users/signup',{
                email:user.email,
                password:user.password
            })
          
           
            
            toast.success('User was created successfully')
            isCreateModalOpen.value=false
            Object.entries(user).map(val => user[val[0]] = null);
            await getUsers()
        } catch (error) {
            console.log('error', error)
            console.log('user.email', user.email)
            toast.error(error.response.data.message)
        }
    }
    const getUsers=async()=>{
        try {
            const res=await axiosInstance.get(`/users/get-user-list?query=${usersParams.search}&page=${usersParams.page}&limit=${usersParams.limit}`, {
                headers:{
                    'Authorization':`Bearer ${token}`,
                }
            })
            users.value=res.data.data
            console.log('res', res.data.data)
            console.log('res', res)
            usersParams.totalPage=res.data.last_page
        } catch (error) {
            console.log('error',error)
            message.value=error.response.data.error
            console.log('message.value', message.value)
            console.log('users.value', users.value)
            users.value=error.response.data.users
        }
    }
    const updateRole=async(e)=>{
        e.preventDefault()
        try {
            const res =await axiosInstance.put(`/users/update-role/${userId.value}`,{isAdmin:userRole.isAdmin},{
                headers:{
                    'Authorization':`Bearer ${token}`,
                }
            })
            console.log('res', res)
            await getUsers()
            isEditModalOpen.value=false
            toast.success(res.data.message)
        } catch (error) {
            console.log('error', error)
        }

    }
    const updateStatus=async(id,status)=>{

        try {
            const res =await axiosInstance.put(`/users/update-status/${id}`,{isActive:status},{
                headers:{
                    'Authorization':`Bearer ${token}`,
                }
            })
            console.log('res', res)
            await getUsers()
            
            toast.success(res.data.message)
        } catch (error) {
            console.log('error', error)
        }

    }
    const openEditModal=(id,role)=>{
        isEditModalOpen.value=true
        userId.value=id
        userRole.selectedRole=role
        userRole.isAdmin=role
       
    }
    const closeEditModal=()=>{
        isEditModalOpen.value=false
        userRole.selectedRole=userRole.isAdmin
    }
    const goBack=async()=>{
        if(usersParams.page===1){
            return
        }else{
            usersParams.page--
        }
        await getUsers()
    }
    const goNext=async()=>{
        if(usersParams.page===usersParams.totalPage){
            return
        }else{
            usersParams.page++
        }
        await getUsers()
    }
    const goWithNumber=async(num)=>{
        usersParams.page=num
        await getUsers()
    }
    watchEffect(()=>{
      
        disabledSaveBtn.value=userRole.selectedRole===userRole.isAdmin
    })
    //exports
    return {isEditModalOpen,isCreateModalOpen,createNewUser,getUsers,users,usersParams,goBack,
        goNext,goWithNumber,searchUser,message,updateRole,openEditModal,closeEditModal,
        disabledSaveBtn,userRole,updateStatus,isActive}
},{persist:{
    storage: sessionStorage,
    paths: ['usersParams.page'],
}})