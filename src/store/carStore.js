import Vue from "vue";
import Vuex from "vuex";
// 把vuex安装到vue上
Vue.use(Vuex);

// 获取本地存储的购物车数据
var shopping = JSON.parse(localStorage.getItem("shopping")|| '[]');

var store = new Vuex.Store({
    // 存放组件共享的数据
    state:{
        shopping:shopping,
    },
    // mutations 这是修改共享数据唯一的途径
    // 组件中通过 this.$store.commit('setName'，'参数') 进行调用
    mutations:{
        addCar(state,goods){
             // 查找商品是否存在
             var index = state.shopping.findIndex(v =>v.id == goods.id);
             if(index !== -1){
                //  数据存在加数量
                state.shopping[index].number += goods.number
             }else{
                //  不存在就添加到数组里
                state.shopping.push(goods);
             }
              // 存入本地
              localStorage.setItem("shopping",JSON.stringify(state.shopping));
        },
        // 删除购物车数据
        delCar(state,id){
            var index = state.shopping.findIndex(v => v.id == id);

            if(index != -1){
                state.shopping.splice(index,1);
            }
             // 存入本地
             localStorage.setItem("shopping",JSON.stringify(state.shopping));
        },
        // 切换商品状态
        switchoverCar(state,obj){
            var index = state.shopping.findIndex(v => v.id == obj.id);
            state.shopping[index].selected = obj.selected
             // 存入本地
             localStorage.setItem("shopping",JSON.stringify(state.shopping));
        },
        carNumber(state,obj){
            var index = state.shopping.findIndex(v => v.id == obj.id);

            state.shopping[index].number = obj.number
             // 存入本地
             localStorage.setItem("shopping",JSON.stringify(state.shopping));
        }
    },
    // getter就是对数据状态进行处理筛选，我们可以通过getter处理过后再返回给组件使用
    // 组件中通过 this.$store.getters.getNameAge 获取
    getters:{
        // 统计个数
        totalCar(state){
            var count = 0;
            // 遍历统计购物车个数
            state.shopping.forEach(v => count += v.number)
            return count;
        },
        //查找出商品id
        carIds(state){
            // 用来存储id
            var arr = [];
            // 查找出所有的id
            state.shopping.forEach( v => arr.push(v.id) )
            return arr.join(",")
        },
        //返回商品的个数和总价
        buyCountAndTotal(state){
            // 个数
            var count = 0;
            // 价钱
            var total = 0;
            // 遍历统计购物车个数
            state.shopping.forEach(v =>{
                if(v.selected === true){
                    count += v.number
                    total += v.number * v.price
                }
            })
            total = total * 100;
            return {count,total};
        },
        // 获取商品的状态
        getSelected(state){
            var obj = {}
            state.shopping.forEach(v =>{
                obj[v.id] = v.selected
            })
            return obj;
        },
        // 获取商品的状态
        getNumber(state){
            var obj = {}
            state.shopping.forEach(v =>{
                obj[v.id] = v.number
            })
            return obj;
        }

    },

})

export default store


