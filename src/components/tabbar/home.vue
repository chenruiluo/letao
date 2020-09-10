<template>
  <div class="home_content">
      <!-- 轮播图 -->
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
            <van-swipe-item v-for="item in swipe" :key="item.img">
                <img :src="item.img">
            </van-swipe-item>
        </van-swipe>
        <!-- 分类功能 -->
        <van-grid :column-num="4" :border="false" class="classify">
            <van-grid-item @click="$router.push('/goodsList')" icon="photo-o" text="文字"  >
                <img src="@/assets/images/menu10.png" alt="">
                <span>数码电器</span>
            </van-grid-item>
            <van-grid-item @click="$router.push('/newsList')" icon="photo-o" text="文字">
                <img src="@/assets/images/menu19.png" alt="">
                <span>乐淘头条</span>
            </van-grid-item>
            <van-grid-item @click="$router.push('/photo')" icon="photo-o" text="文字">
                <img src="@/assets/images/menu18.png" alt="">
                <span>美图欣赏</span>
            </van-grid-item>
            <van-grid-item icon="photo-o" text="文字">
                <img src="@/assets/images/menu15.png" alt="">
                <span>乐淘服饰</span>
            </van-grid-item>
            <van-grid-item icon="photo-o" text="文字">
                <img src="@/assets/images/menu12.png" alt="">
                <span>9.9元拼单</span>
            </van-grid-item>
            <van-grid-item icon="photo-o" text="文字">
                <img src="@/assets/images/menu15.png" alt="">
                <span>乐淘服饰</span>
            </van-grid-item>
            <van-grid-item icon="photo-o" text="文字">
                <img src="@/assets/images/menu16.png" alt="">
                <span>物流查询</span>
            </van-grid-item>
            <van-grid-item icon="photo-o" text="文字">
                <img src="@/assets/images/menu17.png" alt="">
                <span>全部</span>
            </van-grid-item>
        </van-grid>
        <!-- 分割线 -->
        <div class="divider">
            <van-divider>
                为你推荐
            </van-divider>
        </div>
        <!-- 推荐商品 -->
        <div class="home-main">
            <div class="goodsList">
                <router-link :to="`/goodsDetails/${item.id}`" class="item" v-for=" item in goods" :key="item.id" >
                    <img v-lazy="item.img_url">
                    <div class="title overflow_ellipsis">
                        {{item.title}}
                    </div>
                    <div class="price">
                        ￥{{item.sell_price}}
                        <span class="buy">{{item.buy}}人已购买</span>
                    </div>
                </router-link>
            </div>
        </div>
  </div>
</template>

<script>
// 引入vant的组件
import {Swipe, SwipeItem,Grid, GridItem,Divider} from "vant";
// axios请求 按需引入
import {getSwipeData,getGoodsData} from "@/api/index.js";

    export default {
        name:"home",
        data() {
            return {
                swipe:[],
                goods:[],
            }
        },
        // 挂载组件
        components:{
            "van-swipe":Swipe,
           "van-swipe-item": SwipeItem,
           "van-grid":Grid,
           "van-grid-item":GridItem,
           "van-divider":Divider,
        },
        methods:{
            // 获取轮播图数据
           async getSwipe(){
                //this.$axios就是在mian.js上去的axios对象
                // var res = await this.$axios.get("http://api.w0824.com/api/getlunbo");
                // this.swipe = res.data.message;
                //调用axios方法获取数据
               var res = await getSwipeData();
               this.swipe = res.message;
            },
            // 获取推荐商品的数据
            async getGoods(){
               var res = await getGoodsData();
               this.goods = res.message;
            },
        },
        created(){
            this.getSwipe();
            this.getGoods();
            this.$parent.isBottom = true;
        },
        activated(){
            this.$parent.isBottom = true;
        }

    }
</script>
<style lang="scss" scoped>
@import "@/assets/scss/common.scss";
.home_content{

    // 轮播
    .my-swipe{
        height: 200px;
        .van-swipe-item{
            img{
                width: 100%;
                height: 100%;
            }

        }
    }
    // 分类功能
    .classify{

        .van-grid-item{
            img{
                width: 50%;
            }
            span{
                color: #524949;
                margin-top:3px
            }
        }
    }
    // 分割线
    .divider{
        background-color: #eee;
        overflow: hidden;
        .van-divider{
            color: #333;
            border-color: #333;
            padding: 0px 16px;
            font-size: 16PX;
        }
    }
    //推荐商品
    .home-main{
        padding: 0px 16px;
        background-color: #eee;
        margin-bottom:50px ;
        .goodsList{
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;

            .item{
                width: 48%;
                margin: 4px 0;
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
                    font-size: 14px;
                    color:#f50;
                    padding: 10px 0;
                    span{
                        margin-left: 10px;
                        font-size: 12px;
                        color:#999
                    }
                }

            }
        }
    }
}

</style>
