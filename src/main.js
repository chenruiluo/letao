import Vue from 'vue'
import App from './App.vue'
import router from './router/router.js'
// 引入axios
// import axios from "axios";
// Vue.config.productionTip = false
// 将axios对象挂载在vue原型上 ，所有子件都可以使用
// 加$防止与变量名冲突
// Vue.prototype.$axios = axios;
// 图片懒加载
import { Lazyload } from 'vant';
Vue.use(Lazyload);

import "@/util/filter.js"

import store from "@/store/carStore.js"

// 注册时可以配置额外的选项
Vue.use(Lazyload, {
  lazyComponent: true,
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
