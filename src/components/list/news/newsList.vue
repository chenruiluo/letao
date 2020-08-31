<template>
    <div class="news-list">
<!-- <van-loading v-if="isShow" :vertical="true" type="spinner" color="#ccc" size="30px">加载中...</van-loading> -->

        <van-pull-refresh v-model="isLoading" @refresh="onRefresh" >
            <div class="list">
                <div class="item" v-for="item in news" :key="item.id" @click="$router.push(`/newsData/${item.id}`)">
                    <img v-lazy="item.img_url">
                    <div class="text">
                        <div class="title overflow_ellipsis">
                            {{ item.title }}
                        </div>
                        <div class="info">
                            <span>发布时间{{ item.add_time  | dateFormat }}</span>
                            <span>点击：{{ item.click }} 次</span>
                        </div>
                    </div>
                </div>
            <Button
            :loading="isMore"
            v-if="isShow"
            type="info"
            loading-text="加载中..."
            block
            @click="loading">
                点击加载更多
            </Button>
            </div>
        </van-pull-refresh>
    </div>
</template>

<script>

import { PullRefresh,Toast,Button,Loading  } from 'vant';
// 引入请求
import {getNewsList } from "@/api/index.js"
    export default {
        name:"newsList",
        data() {
            return {
                news:[],
                page:1,
                isMore:false,//按钮加载
                isLoading:false,//下拉刷新
                isShow:true,//刷新按钮隐藏
                isHas:false,//判断是否还有值
            }
        },
        methods:{
            // 获得新闻数据
            async getNews(){
                // 显示按钮
                this.isShow = true;
                // 没有数据就不执行下面代码
                if(this.isHas){
                    Toast("已经没数据了");
                    // 隐藏按钮的加载
                    this.isMore = false;
                    return
                }
                // 请求数据
                var res = await getNewsList(this.page);
                this.isMore = false;
                if(res.message.length == 0){
                    Toast("没有更多的内容了");
                    this.isHas = true;
                    return;
                }
                // 合并到数组里
                this.news = this.news.concat(res.message);

            },
            loading(){//加载更多
                this.page++
                this.isMore = true;
                this.getNews();
            },
            onRefresh(){//刷新数据
                this.news=[];
                this.page=1;
                this.isShow = false;
                this.isHas = false;
                setTimeout(() => {
                    this.getNews();
                    this.isLoading = false;
                    Toast("刷新成功");
                }, 1000)
            },

        },components:{
            Button,
           "van-pull-refresh":PullRefresh,
           "van-loading":Loading,
        },
        created(){
            this.getNews();
            this.$parent.title = "新闻列表";
            this.$parent.active = -1;
        }
    }
</script>

<style lang="scss" scoped>
@import "@/assets/scss/common.scss";
    .news-list{
        .list{
            padding: 4px;
            margin-bottom: 50px;
            background-color: #EEEEEE;
            .item{
                display:flex;
                border-bottom:1px solid #ccc;
                padding: 2px;
                margin-top: 4px;
                img{
                    width: 100px;
                    height: 100px;
                }
                .text{
                    display: flex;
                    flex-direction:column;
                    justify-content: space-around;
                    .title{
                        font-size: 14px;
                        font-weight: 700;
                    }
                    .info{
                        display: flex;
                        justify-content: space-between;
                        font-size: 12px;
                        color:#888;
                    }
                }
            }
        }
    }
</style>
