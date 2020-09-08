<template>
    <div class="news-content">
        <h3>{{news.title}}</h3>
        <div class="info">
            <span>发布时间 ：{{ news.add_time | dateFormat }}</span>
            <span>阅读{{news.click}}次</span>
        </div>
        <div v-html="news.content" class="content"></div>
        <van-field
            v-model="content"
            rows="2"
            autosize
            type="textarea"
            maxlength="50"
            placeholder="请输入留言"
            show-word-limit
        />
        <van-button type="info" color="#4D7CE6" block @click="submit()">评论</van-button>
        <div class="comment" v-for=" item in comment" :key="item.id">
            <div class="useranme">{{ item.user_name }}：{{ item.content }}</div>
            <div class="useranme">评论时间：{{ item.add_time | dateFormat }}</div>
        </div>
        <van-button
         color="#FF0000"
         :loading="isLoading"
         plain block
         loading-text="加载中..."
         @click="oncomment()">
         查看更多
         </van-button>
    </div>
</template>

<script>
import { Field,Button,Loading,Toast } from 'vant';

import {getNewsData,getCommentList,addCommentData} from "@/api/index.js"
    export default {
        name:"newsData",
        props: ['newId'],
        data() {
            return {
                news:"",
                id:this.newId,
                content:"",
                comment:[],
                page:1,
                isLoading:false,
                isHas:false,
            }
        },
        methods:{
            // 获取新闻详情
            async getNews(){
                console.log(this.id);

                var {message} = await getNewsData(this.id);
                this.news = message[0];
            },
            // 获取评论数据
            async getComment(){
                  // 判断是否已经全部加载完毕，不在执行后面的代码
                if(this.isHas){
                    Toast("没有更多数据了");
                    return
                }
                // 请求获取评论数据
                var {message} = await getCommentList(this.id,this.page);
                if(message.length == 0){
                    Toast("评论已经全部加载完毕");
                    this.isHas = true;
                    return;
                }
                this.comment = this.comment.concat(message);
                Toast("加载成功")
            },
            // 加载更多
            oncomment(){
                this.page++;
                this.isLoading = true;
                this.getComment();
                this.isLoading = false
            },
           async  submit(){
               if(this.content.trim()== ""){
                   Toast("评论不能为空")
                   return;
               }
                // 声明一个对象存放评论信息
                var obj = {
                    user_name : "匿名用户",
                    content:this.content,
                    add_time:new Date(),
                }
                // 添加数据
                var res = await addCommentData(this.id,obj)
                console.log(res.status);
                // 判断是否成功
                if(res.status == 0){
                    this.comment.unshift(obj)
                }
                // 提示
                Toast(res.message);
                // 清空输入框
                this.content="";
            }

        },
        created(){
            this.$parent.title = '新闻详情'
            // this.$parent.active = -1;
            this.getNews();
            this.getComment();
        },
        components:{
            "van-field":Field,
            "van-button":Button,
            "van-loading":Loading,
        }
    }
</script>

<style lang="scss" scope>
        .news-content{
            background-color: #FAF9F9;
            padding: 2px 10px;
            margin-bottom: 50px;
            margin-top: 16px;
            h3{
                font-size: 16px;
                color:#404040;
                text-align: center;
            }
            .info{
                display: flex;
                justify-content: space-between;
                border-bottom: 1px solid #888;
                padding-bottom: 5px;
                span{
                    color: #888;
                    font-size: 14px;
                }
            }
            .content{

                //    overflow: hidden;
                img {
                    width: 100%;

                }

            }
            .van-button{
                margin-top: 10px;
                margin-bottom: 10px;
            }
            .comment{
                padding:5px 0;
                div{
                background-color: #E8E8E8;
                font-size: 12px;
                }
            }
        }

</style>
