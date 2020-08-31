
import Vue from "vue";

import moment from "moment";
// 定义全局的过滤器转换时间
Vue.filter("dateFormat",function(date,format="YY-MM-DD"){
    return moment(date).format(format)
})
