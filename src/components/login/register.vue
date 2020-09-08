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
            <van-field
                v-model="surePassword"
                type="password"
                name="surePassword"
                label="确定密码"
                placeholder="确定密码"
                :rules="[{ validator, message: '两次密码不一致' }]"
            />
            <div style="margin: 16px;">
                <van-button round block type="info" native-type="submit">
                    注册
                </van-button>
            </div>
        </van-form>
        <div class="text">
           <router-link tag="span" to="/login">登录</router-link>
        </div>
    </div>
</template>

<script>

import { Form,Field,Button  } from 'vant';
import { registerUser } from '@/api/index.js'
export default {
    data() {
        return {
            username: '',
            password: '',
            surePassword:"",
        }
    },
    methods: {
        // 用来判断密码是否一致
        validator(){
            return this.password == this.surePassword;
        },
        // 登录请求
        async onSubmit(data) {
            // 删除掉确认密码
            delete data.surePassword;
            var {status,message} = await registerUser(data)
            this.$toast(message);
            if(status == 0){
                this.$router.push("/login");
            }
        },

    },
    created(){
        this.$parent.title = "注册账号";
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
