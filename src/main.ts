import '@/assets/css/reset.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
//全局注册Swipeper Element 
// import function to register Swiper custom elements
import { register } from 'swiper/element/bundle';
// register Swiper custom elements
register();
const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
