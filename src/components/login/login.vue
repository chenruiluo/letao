<template>
    <div class="login-container">
        <van-form @submit="onSubmit">
            <van-field
                v-model="username"
                name="username"
                label="用户名"
                placeholder="用户名"
                :rules="[{ required: true, message: '请填写用户名' }]"
            />
            <van-field
                v-model="password"
                type="password"
                name="password"
                label="密码"
                placeholder="密码"
                :rules="[{ required: true, message: '请填写密码' }]"
            />
            <div style="margin: 16px;">
                <van-button round block type="info" native-type="submit">
                    登录
                </van-button>
            </div>
        </van-form>
        <div class="text">
           <router-link tag="span" to="/register">注册新用户</router-link>
        </div>
    </div>
</template>

<script>

import { Form,Field,Button  } from 'vant';
import { getLogin } from '@/api/index.js'
export default {
    data() {
        return {
            username: '',
            password: '',
        }
    },
    methods: {
        // 登录请求
        async onSubmit(data) {
            // 提示
            this.$toast.loading({
                message: '加载中...',
                forbidClick: true,
                duration:0,
            })
            var {status,message,userInfo,token} = await getLogin(data);

            this.$toast.clear();
            this.$toast(message);

            if(status == 0){
                // 存储到本地
                localStorage.setItem("token",token);
                localStorage.setItem("userInfo",JSON.stringify(userInfo) );
                this.$router.push("/home");
            }

        },

    },
    created(){
        this.$parent.title = "登录乐淘";
        this.$parent.isBottom = false;
    },
    components:{
        "van-form":Form,
        "van-field":Field,
        "van-button":Button,

    },
}
</script>

<style lang="scss" scoped>
    .login-container{
        .van-form {
            margin-top: 20px;
        }
        .text{
            display: flex;
            justify-content: center;
            padding: 10px;
            color: #666;
            font-size: 16px;
        }
    }
</style>
