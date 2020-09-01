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
            <div class="shop_car" v-show="!blank">
                <van-divider>收货地址</van-divider>
                <van-address-list
                    v-model="chosenAddressId"
                    :list="list"
                    default-tag-text="默认"
                    @edit="onEdit"
                />
                  <van-divider>购买的商品</van-divider>
                  
            </div>
    </div>
</template>

<script>

import { Divider,AddressList } from 'vant';
    export default {
        data() {
            return {
                blank:true,
                chosenAddressId: '1',
                 list: [ {
                    id: '1',
                    name: '陈洛',
                    tel: '13000000000',
                    address: '浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室',
                    isDefault: true,
                }],
            }
        },
        methods:{
            onEdit(){
                this.$toast("编辑")
            }
        },
        created(){
            this.$parent.title = "我的购物车";
            this.$parent.active = -1;
            this.$parent.isBottom = true;
            // 判断购物车里是否有数据
            if(this.$parent.shopping.length != 0){
                this.blank = false;
            }
        },components:{
            "van-divider":Divider,
            "van-address-list":AddressList,
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
        .shop_car{
            .van-divider{
                font-size:16px;
                color:#6f7370;
                border-color:#545e6c;
                margin:2px;
            }
            .van-address-list{
                padding-bottom: 20px;
                .van-address-list__bottom{
                    display: none;
                }
            }
        }
    }
</style>
