<template>
    <div class="photoData_container">
        <div class="list">
            <div class="item" v-for="item in children" :key="item.id" @click="$router.push(`/newsData/${item.id}`)">
                <img v-lazy="item.img_url" @click.stop="imgClick(item.id)">
                <div class="text">
                    <div class="title overflow_ellipsis">
                        {{ item.text }}
                    </div>
                    <div class="info overflow_ellipsis">
                        {{ item.zhaiyao }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getThum } from "@/api/index.js"
import { ImagePreview } from 'vant';
    export default {
        name:"pahotoData",
        props:["children"],
        methods:{
            async imgClick(id){
                // 获取照片
                var {message} = await getThum(id);
                //判断有没有照片
                if(message.length==0){
                    this.$toast("目前还加添加照片");
                    return;
                }
                // 声明一个数组存放照片地址
                var src = [];
                message.forEach(v => src.push(v.src))
                ImagePreview(src);
            }
        },
        components: {
            [ImagePreview.Component.name]: ImagePreview.Component,
        },
    }
</script>

<style lang="scss" scoped>
@import "@/assets/scss/common.scss";
  .photoData_container{
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
                        // display: flex;
                        // justify-content: space-between;
                        font-size: 12px;
                        color:#888;
                    }
                }
            }
        }
    }
</style>
