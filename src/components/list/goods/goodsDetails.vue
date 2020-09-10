<template>
    <div class="goods_container">
        <div class="swipe">
            <van-swipe class="my-swipe" :autoplay="3000" indicator-color="#ccc">
                <van-swipe-item v-for="item in swipe" :key="item.src">
                    <img v-lazy="item.src" alt="">
                </van-swipe-item>
            </van-swipe>
        </div>
        <div class="goodsInfo">
            <div class="name">
                <span>
                    {{goodsData.title}}
                </span>
            </div>
            <van-divider />
            <div class="price">
                <span class="marketPrice">市场价:{{ goodsData.market_price }}</span>
                <span class="shopPrice">本店价：<span class="value">¥ {{ goodsData.sell_price}}</span></span>
            </div>
            <div class="number">
                <span>购买数量：</span>
                <van-stepper v-model="value" min="1" max="10" />
            </div>
        </div>
        <div class="goodsItem">
            <van-divider>其他信息</van-divider>
            <div class="goodsOtherInfo">
                <div>商品货号：{{goodsData.goods_no}}</div>
                <div>库存情况：{{goodsData.stock_quantity}}件</div>
                <div>上架时间：{{goodsData.add_time | dateFormat}}</div>
            </div>
        </div>
        <div class="item" v-html="goodsData.content">
            <van-divider>介绍</van-divider>
        </div>
        <van-goods-action>
            <van-goods-action-icon icon="chat-o" text="客服" />
            <van-goods-action-icon icon="cart-o" to="/mycar" :badge="$store.getters.totalCar" text="购物车" />
            <van-goods-action-button type="warning" @click="addShop()" text="加入购物车" />
            <van-goods-action-button type="danger" text="立即购买" />
        </van-goods-action>
    </div>
</template>

<script>
// 获取本地存储的购物车数据
// var shopping = JSON.parse(localStorage.getItem("shopping")|| '[]');

// vant
import { Swipe, SwipeItem,Divider,Stepper,GoodsAction, GoodsActionIcon, GoodsActionButton  } from 'vant';
// 请求
import {getThumbimages,getGoodsInfo} from "@/api/index.js"
import {isToken} from '@/api/index.js'
    export default {
        name:"goodsDetails",
        props:['goodsId'],
        data(){
            return {
                swipe:[],
                goodsData:"",
                value:1,
            }
        },
        methods:{
            async getData(){
                // 轮播请求
                var {message} = await getThumbimages(this.goodsId);

                // 判断数据是否为空
                if(message.length==0){
                    var obj = {
                        src : "http://test.w0824.com/empty-image-error.png"
                    }
                    message.push(obj);
                }
                this.swipe = message
                // 获取商品详情
                var res = await getGoodsInfo(this.goodsId);
                this.goodsData = res.message;
                // console.log(this.goodsData);
            },
            addShop(){
                // 判断是否登录
                isToken();
                var obj = {
                    id:this.goodsId,
                    number:this.value,
                    price:this.goodsData.sell_price,
                    selected:true,
                }
                this.$store.commit("addCar",obj)
            }
        },
        components:{
            "van-swipe":Swipe,
            "van-swipe-item":SwipeItem,
            "van-divider":Divider,
            "van-stepper":Stepper,
            "van-goods-action":GoodsAction,
            "van-goods-action-icon":GoodsActionIcon,
            "van-goods-action-button":GoodsActionButton,

        },
        created(){
            this.$parent.title = "商品详情";
            // this.$parent.active = -1;
            this.$parent.isBottom = false;
            this.getData();
        },
    }
</script>

<style lang="scss" >

    .goods_container{
        background-color: #eee;
        padding: 5px 5px 100px 5px;
        img{
            width: 100%;
        }
        .swipe{
            margin: 5px 0px 10px;
            .my-swipe{
                width: 100%;
                height: 240px;
                background-color: #fff;
                text-align: center;
                .van-swipe-item{
                    img{
                        width: 245px;
                        height: 100%;
                    }
                }
            }
        }
        .goodsInfo{
            background-color: #fff;
            padding: 8px;
            overflow: hidden;
            .name{
                color: #333;
            }
            .price{
                color: #333;
                font-size: 16px;
                margin-bottom: 10px;
                .marketPrice{
                    text-decoration:line-through;
                    margin-right: 20px;
                }
                .shopPrice{
                    .value{
                        color:#f00;
                        font-weight: 700;
                    }
                }
            }
            .number{
                color: #333;
                font-size: 16px;
                display: flex;
            }
        }
        .goodsItem{
            background-color: #fff;
            margin: 10px 0;
            padding: 8px;
            overflow: hidden;
            .goodsOtherInfo{
                font-size: 16px;
                color: #333;
            }
        }
        .item{
            background-color: #fff;
           table{
               width: 100%;
            //    img{
            //        width: 100%;
            //    }
           }
        }
    }
</style>
