<template>
    <div class="user-container">
        <div class="basic">
            <div class="logo">
                <img @click="clickImg" src="../../assets/images/logo.png">
                <span class="name">用户名: {{$store.state.userinfo.username}}</span>
            </div>
            <van-cell-group>
                <van-cell title="修改密码" is-link />
            </van-cell-group>
            <van-cell-group>
                <van-cell to="/order" title="我的订单" is-link />
            </van-cell-group>
            <van-cell-group>
                <van-cell to="/siteList" title="地址管理" class="site" is-link />
            </van-cell-group>
             <van-cell-group>
                <van-cell title="提交反馈" is-link />
            </van-cell-group>
            <van-cell-group>
                <van-cell title="关于乐淘" value="v1.0.0 " />
            </van-cell-group>
            <van-cell-group>
                <van-cell title="weixin h5 pay"  />
            </van-cell-group>
        </div>
        <!-- 退出登录 -->
        <van-button class="logout" @click="logout" type="default" block>退出登录</van-button>
    </div>
</template>

<script>
import { Button,Dialog,Cell, CellGroup,ImagePreview  } from 'vant';
import {isToken} from '@/api/index.js'
    export default {
        name:"user-container",
        data() {
            return {
                // name,
            }
        },
        methods:{
            // 退出登录
            logout(){
                Dialog.confirm({
                // title: '标题',
                message: '你确定要退出吗',
                confirmButtonColor:"#409DFB"
                }).then(() => {//确定
                    localStorage.setItem("token","");
                    localStorage.setItem("userInfo","{}");
                    this.$store.commit("logoutCar")
                    this.$router.push("/login");
                }).catch(() => {//取消
                    this.$toast("取消");
                });

            },
            clickImg(){
                ImagePreview(['http://localhost:8080/img/logo.c0057232.png']);
            }
        },
        components:{
            "van-button":Button,
            [Dialog.Component.name]: Dialog.Component,
            "van-cell-group":CellGroup,
            "van-cell":Cell,
            [ImagePreview.Component.name]: ImagePreview.Component,
        },
       async created(){
            // 判断是否登录
            await isToken();
            // var user = this.$store.state.userinfo;
            // this.name = user.username;
            this.$parent.title = "个人中心";
            this.$parent.isBottom = false;
        },
        // activated(){
        //     this.$parent.isBottom = false;
        // }
    }
</script>

<style lang="scss" scoped>
    .user-container{
        .basic{
            .logo{
                background-color: #fff;
                display: flex;
                align-items: center;
                padding: 10px 20px;
                img{
                    width: 20%;
                    margin-right: 100px;
                }
                .name{
                    font-size: 18px;
                    color: #5D5555;
                }
            }
            .site{
                margin-bottom: 20px;
            }
        }
        .logout{
            position: fixed;
            bottom: 0px;
        }
    }
</style>
