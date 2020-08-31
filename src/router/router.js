import Vue from "vue";
import vueRouter from "vue-router";

Vue.use(vueRouter);

import home from "@/components/tabbar/home.vue"
import mycar from "@/components/tabbar/mycar.vue"
import user from "@/components/tabbar/user.vue"
import goodsList from "@/components/list/goods/goodsList.vue"
import goodsDetails from "@/components/list/goods/goodsDetails.vue"
import newsList from "@/components/list/news/newsList.vue"
import newsData from "@/components/list/news/newsData.vue"

// 实例化路由对象，写路由匹配规则
let router = new vueRouter({
    routes:[
        {path:"/",redirect:"/home"},
        {path:"/home",component:home},
        {path:"/mycar",component:mycar},
        {path:"/user",component:user},
        {path:"/goodsList",component:goodsList},
        {path:"/newsList",component:newsList},
        {path:"/newsData/:newId",component:newsData,props:true},
        {path:"/goodsDetails/:goodsId",component:goodsDetails,props:true},
    ]
});
// 抛出
export default router;
