<template>
    <div class="siteList-container">
        <van-address-list
        v-model="chosenAddressId"
        :list="list"
        default-tag-text="默认"
        @add="onAdd"
        @edit="onEdit"
        />
    </div>
</template>

<script>
import { AddressList } from 'vant';
import { getAddress } from "@/api/index.js"
    export default {
        data() {
            return {
                chosenAddressId: '1',
                list:[],
            }
        },
        methods: {
            // 添加地址
            onAdd() {
                this.$router.push("/addSite")
            },
            // 修改地址
            onEdit(item, index) {
                // console.log(item);
                // console.log(index);
                item = JSON.stringify(item);
               this.$router.push(`/editSite/${item}`);
            },
            // 获取用户的所有收货地址
            async getSite(){
                // 获取用户信息
                var user = this.$store.state.userinfo;
                var res = await getAddress(user.id);
                // 将数组的默认状态转成Boolean值
                res.forEach(v =>{
                    v.county = v.country;
                    (v.isDefault = v.isDefault == 1 ? true : false) && (this.chosenAddressId = v.id)
                    v.address =  `${v.province}-${v.city}-${v.country}-${v.addressDetail}`
                })
                this.list = res
            },

        },
        created(){
            this.getSite();
            this.$parent.title = "地址管理";
            this.$parent.isBottom = true;
        },
        components:{
            "van-address-list":AddressList,
        }
    }
</script>

<style lang="scss" scoped>

</style>
