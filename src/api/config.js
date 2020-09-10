
import axios from "axios";
import {Toast} from "vant";
import router from "@/router/router.js"
import store from "@/store/carStore.js";
import {sleep} from "@/util/pending.js";
const instance = axios.create({
    baseURL: 'http://api.w0824.com/api/',
});

// 添加请求拦截器
instance.interceptors.request.use(async function (config) {
    // 在发送请求之前做些什么
    // console.log(config);

    var token = localStorage.getItem("token") || "";
    // 设置请求头
    token && ( config.headers.token = token );
    // 设置isPending为true 开始加载
    store.commit("changeIsPending",true)
    // 延迟1秒
    await sleep(1000)

    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {

    // 关闭加载
    store.commit("changeIsPending",false)
    // 对响应数据做点什么
    return response.data;
}, function (error) {
    // 关闭加载
    store.commit("changeIsPending",false)
    // 对响应错误做点什么
    var status  = error.response.status
    var message = error.response.data.message;
    switch(status){
        case 401:
            Toast(message)
            router.push("/login")
            break;
        default:
            this.$toast("网络延迟")
    }
    return Promise.reject(error);
});


export default instance
