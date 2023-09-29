import { createRouter, createWebHistory } from 'vue-router'
import { BucketView,ProductsView,SigninView,SignupView,SuccessView,CancelView,PageNotFoundView } from "../views"
import { useAuthStore } from '../stores/auth';
import { storeToRefs } from 'pinia';
import { useProductsStore } from '../stores/products';


const routes = [
    {
        path: '/',
        name: 'products',
        component: ProductsView,
        meta: {
          showNavbar:true
      },

    },

  {
    path: '/signin',
    name: 'signin',
    component: SigninView,
    meta: {
      requiresAuth: false,
      showNavbar:true
  },
  
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignupView,
    meta: {
      requiresAuth: false,
      showNavbar:true
  },
  
  },
  {
    path: '/bucket',
    name: 'bucket',
    component: BucketView,
    meta: {
      requiresAuth: true,
      showNavbar:true
  },
  },
  {
    path: '/success',
    name: 'success',
    component: SuccessView,
    meta: {
      requiresAuth: true,
      showNavbar:false
  },
  },
  {
    path: '/cancel',
    name: 'cancel',
    component: CancelView,
    meta: {
      requiresAuth: true,
      showNavbar:false
  },
  },
  {
    path:"/:pathMatch(.*)*",
    name: "pagenotfound",
    component: PageNotFoundView,
    meta: {
      showNavbar:false
    },
},
];
const router = createRouter({
  history: createWebHistory(),
  routes
})
router.beforeEach(async (to, from, next) => {
  const { token } = storeToRefs(useAuthStore());
  const { productsParams } = storeToRefs(useProductsStore());
  if(to.path!=="/"){
    productsParams.value.page=1
}

  
  const isAuthenticated = JSON.parse(localStorage.getItem("auth"))?.token;

  if (to.meta.requiresAuth===true && !isAuthenticated) {
    next('/signin');
  }else if (to.meta.requiresAuth===false && isAuthenticated) {
    next('/');
  }
   else {
    next();
  }


  
});
export default router
