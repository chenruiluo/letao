<template>
    <div class="app_content">
        <!-- 头部（导航栏） -->
        <van-sticky>
            <div class="nav_bar">
                <div v-show="active == 0" class="nav">
                    <!-- logo图标 -->
                    <img src="./assets/images/logo.png" alt="">
                    <van-search placeholder="请输入搜索关键词" />
                </div>
                <div v-show="active != 0">
                    <van-nav-bar
                        :title="title"
                        left-arrow
                        @click-left="onClickLeft"
                        />
                </div>

            </div>
        </van-sticky>
        <!-- 中间(内容不能写死，这里放路由匹配的动态内容) 使用通信-->
        <router-view></router-view>

        <!-- 底部 -->
        <van-tabbar v-show="isBottom" v-model="state" route>
            <van-tabbar-item to="/home" icon="wap-home-o" >首页</van-tabbar-item>
            <van-tabbar-item to="/mycar" icon="cart-o" :badge="count">购物车</van-tabbar-item>
            <van-tabbar-item to="/user" icon="user-o" >我的乐淘</van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
// 获取本地存储的购物车数据
var shopping = JSON.parse(localStorage.getItem("shopping")|| '[]');
// 按需引入vant组件
import { Search,Tabbar,Toast ,NavBar , TabbarItem ,Sticky } from 'vant';

    export default {
        data(){
            return {
                state:0,
                active:0,
                count:0,
                title:"",
                isBottom:true,
                shopping:shopping,
            }
        },
        methods:{
            // 点击导航栏的<跳转回首页
            onClickLeft(){
                // 显示底部
                this.isBottom = true;
                // 回退
                this.$router.go(-1);
            }
        },created(){
             var count = 0;
                shopping.forEach(v => {
                    count += v.number;
                });
                // 统计购物车的数量
              this.count = count;
        },
        // 挂载组件
        components:{
            "van-search":Search,
            "van-tabbar":Tabbar,
            "van-tabbar-item":TabbarItem,
            "van-sticky":Sticky,
            "van-nav-bar":NavBar,
        },
    }
</script>

<style lang="scss" scoped>

        .app_content{
            background-color: #F1F1F1;
            min-width: 320px;
            max-width: 750px;
            margin: 0 auto;
            .nav_bar{
                .nav{
                    min-width: 320px;
                    max-width: 750px;
                    margin: 0 auto;
                    display: flex;
                }
                div{
                justify-content: space-between;
                align-items: center;
                background-color: #fff;
                    img{
                        width:44px;
                        height: 44px;
                        margin-left:4px;
                    }
                    .van-search{
                        flex: 1;
                    }
                }
            }
        }
</style>
