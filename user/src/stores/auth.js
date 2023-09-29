import { defineStore } from 'pinia';
import { computed, ref, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axiosInstance from '../plugins/axios';
import { useToast } from "vue-toastification";


export const useAuthStore = defineStore('auth', ()=>{
    //state
   
    const router=useRouter()
    const toast = useToast();
    const user=reactive(
        {
            email: '',
            password: '',
        }
    )
    const token=ref('')
    //computed


    //method
   
    const signout=()=>{
        
        token.value=''
        router.push('/signin')
    }
    const signin=async(e)=>{
        e.preventDefault();
        try {
            const res=await axiosInstance.post('/users/signin',{
                email:user.email,
                password:user.password
            })
            token.value=res.data[0].token
            console.log('res.data.token', res.data[0].token)
            console.log('res', res)
            router.push('/')
            toast.success(res.data.message)
        } catch (error) {
            console.log('error', error)
            toast.error(error.response.data.error)
        }
    }
    const signup=async(e)=>{
        e.preventDefault();
        try {
            const res=await axiosInstance.post('/users/signup',{
                email:user.email,
                password:user.password
            })
        
            
            console.log('res', res)
            router.push('/signin')
            toast.success(res.data.message)
        } catch (error) {
            console.log('error', error)
            toast.error(error.response.data.message)
        }
    }
    //exports
    return {signout,signin,user,token,signup}
},{persist:{
    storage: localStorage,
    paths: ['token'],
}})