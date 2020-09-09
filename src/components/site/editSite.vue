<template>
  <div class="editSite-container">
    <van-address-edit
      :area-list="areaList"
      :address-info="addressInfo"
      show-postal
      show-delete
      show-set-default
      show-search-result
      :search-result="searchResult"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @delete="onDelete"
      @change-area="changeArea"
    />
  </div>
</template>

<script>
import { AddressEdit, } from "vant";
import areaList from "@/util/area.js";
import { deleteAddress,updateAddress,getAddress } from "@/api/index.js"
export default {
  props: ["site"],
  data() {
    return {
      areaList,
      searchResult: [],
      addressInfo:JSON.parse(this.site),
      country:"",
    };
  },
  methods: {
    // 编辑收货地址
   async onSave(addressInfo) {
        // addressInfo 修改地址内容
        if(addressInfo.isDefault){
            var user = this.$store.state.userinfo;
            var res = await getAddress(user.id);
                // 将数组的默认状态转成flase值
                res.forEach(async (v) =>{
                    v.isDefault = false
                    await updateAddress(v.id,v);
                })
        }
        // 没修改地区就用原来的地区
        addressInfo.country = this.country == "" ? this.addressInfo.country : this.country;
        console.log(addressInfo.isDefault);
        var {status,message} = await updateAddress(addressInfo.id,addressInfo);
        this.$toast(message)
        if(status == 0){
            this.$router.push("/siteList");
        }
    },
    // 删除收货地址
    async onDelete() {
        var addressId = this.addressInfo.id;
        var {status,message} = await deleteAddress(addressId);
        this.$toast(message)
        if(status == 0){
            this.$router.push("/siteList");
        }
    },

    // 修改收件地区时触发
    changeArea(val) {
        this.country=val[2].name;
    },

  },
  created() {

    this.$parent.title = "编辑地址";
    // this.$parent.active = -1;
    this.$parent.isBottom = true;
  },
  components:{
      "van-address-edit":AddressEdit,
  }
};
</script>

<style lang="scss" scoped>
</style>
