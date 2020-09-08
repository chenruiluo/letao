
import axios from "axios";
import {Toast} from "vant";
import router from "@/router/router.js"
const instance = axios.create({
    baseURL: 'http://api.w0824.com/api/',
});

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    // console.log(config);

    var token = localStorage.getItem("token") || "";
    // 设置请求头
    token && ( config.headers.token = token );

    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {


    // 对响应数据做点什么
    return response.data;
}, function (error) {
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
