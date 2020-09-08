<template>
  <div class="addSite-container">
    <van-address-edit
      :area-list="areaList"
      show-postal
      show-set-default
      show-search-result
      :search-result="searchResult"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @change-area="changeArea"
    />
  </div>
</template>

<script>
import { AddressEdit } from "vant";
import areaList from "@/util/area.js";
import {addAddress} from "@/api/index.js"
export default {
  data() {
    return {
      areaList,
      searchResult: [],
      country:"",
    };
  },
  methods: {
    //   用户新增地址
    async onSave(site) {
        
        site.country = this.country;
        site.isDefault = site.isDefault == true ? 1 : 0

        var userId = this.$store.state.userinfo.id;
        var {status,message} = await addAddress(userId,site);
        this.$toast(message);
        if(status == 0){
            this.$router.push("/siteList");
        }


    },
    // 修改收件地区时触发
    changeArea(val) {
        console.log(val[2]);
        this.country=val[2].name;
    },
  },
  created() {
    this.$parent.title = "添加地址";
    this.$parent.isBottom = false;
  },
  components:{
      "van-address-edit":AddressEdit,
  }
};
</script>

<style lang="scss" scoped>
</style>
