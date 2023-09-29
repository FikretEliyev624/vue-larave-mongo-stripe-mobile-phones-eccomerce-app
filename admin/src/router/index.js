import { createRouter, createWebHistory } from 'vue-router'
import { UsersView,ProductsView,SigninView } from "../views"
import MainLayout from "../layouts/MainLayout.vue"
import DefaultLayout from "../layouts/DefaultLayout.vue"
import { useAuthStore } from '../stores/auth';
import { storeToRefs } from 'pinia';
import { useUsersStore } from '../stores/users';
import { useProductsStore } from '../stores/products';

const routes = [
  {
    path: '/',
    name: 'users',
    component: UsersView,
    meta: {
      Layout: MainLayout,
      requiresAuth: true,
  },
  },
  {
    path: '/products',
    name: 'products',
    component: ProductsView,
    meta: {
      Layout: MainLayout,
      requiresAuth: true,
  },
  },
  {
    path: '/signin',
    name: 'signin',
    component: SigninView,
    meta: {
      Layout:DefaultLayout,
      requiresAuth: false,
  },
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes
})
router.beforeEach(async (to, from, next) => {
  const { token } = storeToRefs(useAuthStore());
  const { usersParams } = storeToRefs(useUsersStore());
  const { productsParams } = storeToRefs(useProductsStore());
  if(to.path!=="/"){
    usersParams.value.page=1
}
if(to.path!=="/products"){
  productsParams.value.page=1
}
  if (to.meta.requiresAuth==true && !JSON.parse(localStorage.getItem("auth"))?.token) {
    next('/signin');
} else if (JSON.parse(localStorage.getItem("auth"))?.token && to.meta.requiresAuth==false){
  next("/");
}else{
  next();
}


  
});
export default router
