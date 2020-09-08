<template>
    <div class="list">
        <div class="goodsList">
            <router-link class="item" :to="`/goodsDetails/${item.id}`" tag="div" v-for=" item in goodslist" :key="item.id">
                <img v-lazy="item.img_url">
                <div class="title overflow_ellipsis">
                    {{item.title}}
                </div>
                <div class="price">
                    <span class="market">¥{{ item.sell_price }}</span>
                    <span class="sell">¥{{ item.market_price }}</span>
                </div>
                <div class="info">
                    <span>热卖中</span>
                    <span>剩{{ item.stock_quantity }}件</span>
                </div>
            </router-link>
            <van-button type="danger" block @click="getGoods()" >加载更多</van-button>
        </div>
    </div>
</template>

<script>
import { Button,Toast } from 'vant';
// 按需引入请求
import {getGoodsList} from "@/api/index.js"
    export default {
        name:"goodsList",
        data(){
            return {
                // 存储商品的数组
                goodslist:[],
                page:0,
            }
        },
        methods:{
            // 获取商品
            async getGoods(){
                // 页数加一
                this.page += 1;
                // 请求数据
                var { message } = await getGoodsList(this.page);
                // 判断是否有数据
                if(message.length == 0){
                    Toast("已获取所有商品");
                    return;
                }
                // res.message.forEach(item => {
                    //     this.goodslist.push(item)
                // });
                // 添加到数组
                this.goodslist = this.goodslist.concat(message);
                Toast("加载完毕");
            },

        },components:{
            "van-button":Button,
        },
        created(){
            this.getGoods();
            this.$parent.title = "商品列表"
            // this.$parent.active = -1;

        }
    }
</script>

<style lang="scss" scoped>
@import "@/assets/scss/common.scss";
     .list{
        padding:5px 5px;
        background-color: #eee;
        margin-bottom:50px;
        .goodsList{
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;

            .item{
                width: 46%;
                margin: 4px 0;
                padding: 4px;
                background-color: #fff;
                border-radius: 6px;
                overflow: hidden;
                img{
                    width: 100%;
                    height: 70%;
                }
                .title{
                    font-size: 12px;
                    color:#333;
                }
                .price{
                    padding: 0px 5px;
                    .market{
                        font-size: 16px;
                        color:#f00;
                        padding: 10px 0;
                    }
                    .sell{
                        margin-left: 10px;
                        font-size: 12px;
                        color:#565252;
                        text-decoration:line-through;
                    }
                }
                .info{
                    display: flex;
                    justify-content: space-between;
                    font-size: 14px;
                    color: #565252;
                }
            }
        }
        .van-button{
            margin-top: 4px;
            height: 50px;
            font-size: 16px;
        }
    }
</style>
