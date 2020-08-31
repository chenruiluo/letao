<template>
    <div class="car_container">
            <div class="vacancy" v-show="blank">
                <h3>亲，您的购物车为空，去 <router-link to="/home">首页</router-link>逛逛吧!</h3>
                <van-divider />
                <div class="car_img">
                    <img src="../../assets/images/car.png" alt="">
                </div>
                <div class="login">
                    <router-link to="/home">登录</router-link>后可以同步电脑与手机购物车中的商品
                </div>
            </div>
    </div>
</template>

<script>
import { Divider } from 'vant';
    export default {
        data() {
            return {
                blank:true,
            }
        },
        created(){
            this.$parent.title = "我的购物车";
            this.$parent.active = -1;
            this.$parent.isBottom = true;
        },components:{
            "van-divider":Divider,
        }
    }
</script>

<style lang="scss" scoped>
    .car_container{

        .vacancy{
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            margin-top: 40px;
            overflow: hidden;
            background-color: #eee;
            h3{
                text-align: center;
            }
            .van-divider{
                border-color: #333;
                width: 100%;
            }
            .login{
                align-items: center;
            }
        }
    }
</style>
