<template>
    <div class="photo-cantainer">
        <van-tree-select
            @click-nav="navHandle"
            :items="items"
            :active-id.sync="activeId"
            :main-active-index.sync="activeIndex"
        >
            <template #content>
                <photoData v-if="isShow" :children="items[activeIndex].children"> </photoData>
            </template>
        </van-tree-select>
    </div>
</template>

<script>
import { TreeSelect } from 'vant';
import photoData from "@/components/list/common/photoData.vue"
import { getCateGory,getCateData } from "@/api/index.js"
    export default {
        data() {
            return {
                items:[],
                activeId: 1,
                activeIndex: 0,
                isShow:false,
            }
        },
        methods:{
            async getCateGory(){
                // 获取图片分类
                var {message} = await getCateGory()
                // 防止没有数据报错
                if(message.length == 0){
                    return;
                }
                // 因为组件内部需要text属性 将数组的tilte 换成text
                message.forEach(v => {
                    v.text = v.title;
                    delete v.title;
                });
                // 获取第一个分类的所有数据
                var children =  await this.getCateDataList(message[0].id)
                message[0].children = children
                this.items = message;
                this.isShow = true
            },
            // 获取分类的所有数据
            async getCateDataList(id){
                var {message} = await getCateData(id);
                // 数组的tilte 换成text
                 message.forEach(v => {
                    v.text = v.title;
                    delete v.title;
                });
                return message;
            },
            async navHandle(index){

                // children存在了就不在请求
                if(this.items[index].children){
                    return;
                }
                this.isShow = false;
                var children = await this.getCateDataList(this.items[index].id)
                this.items[index].children = children;
                this.isShow = true;
            }


        },
        components:{
            "van-tree-select":TreeSelect,
            photoData,
        },
        created(){
            this.$parent.title = "美图欣赏";
            this.$parent.active = -1;
            this.getCateGory();
        }
    }
</script>

<style lang="scss" scoped>
    .photo-cantainer{
        .van-tree-select{
            height: 100vh !important
        }
    }
</style>
