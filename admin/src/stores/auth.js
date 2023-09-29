import { defineStore } from 'pinia';
import { computed, ref, reactive } from 'vue';
import {useToggle} from "@vueuse/core"
import { useRoute, useRouter } from 'vue-router';
import axiosInstance from '../plugins/axios';
import { useToast } from "vue-toastification";


export const useAuthStore = defineStore('auth', ()=>{
    //state
    const isSideBtn=ref(false)
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
    const sideToggle=useToggle(isSideBtn)
    const signout=()=>{
        isSideBtn.value=false
        token.value=''
        router.push('/signin')
    }
    const signin=async(e)=>{
        e.preventDefault();
        try {
            const res=await axiosInstance.post('/users/signin-with-admin',{
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
    //exports
    return {isSideBtn,sideToggle,signout,signin,user,token}
},{persist:{
    storage: localStorage,
    paths: ['token'],
}})