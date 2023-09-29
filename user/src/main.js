import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { Icon } from '@iconify/vue';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from './router'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import { options } from './plugins/toast';
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(autoAnimatePlugin)
app.use(Toast, options);
app.component("Icon", Icon);
app.use(router)

app.mount('#app')
