<template>
  <div class="order_container">
    <van-tabs v-model="active">
      <van-tab v-for="item in tabList" :key="item.status" :title="item.title">
        <van-card
          v-for="goods in getOrderData(item.status)"
          :key="goods.id"
          :num="goods.number"
          :price="goods.total_price"
          desc=""
          :title="goods.message[0].title"
          :thumb="goods.message[0].thumb_path"
        >
          <template #tags>
            <van-tag plain type="danger">付款方式：{{ goods.pay_way }}</van-tag>
          </template>
          <template #footer>
            <van-button :type="getOrderStatusColor(goods.status).type" size="mini">{{ getOrderStatusColor(goods.status).status }}</van-button>
            <van-button type="danger" size="mini">联系客服</van-button>
          </template>
        </van-card>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getOrder, isToken, getShopCarList } from "@/api/index.js";
import { Tab, Tabs, Card,Tag, Button,} from "vant";
export default {
  data() {
    return {
      active: 0,
      allOrder: [],
      tabList: [
        { title: "全部", status: "all" },
        { title: "未付款", status: "0" },
        { title: "已付款", status: "1" },
        { title: "已完成", status: "2" },
      ],
    };
  },
  methods: {
    //   获取订单数据
    async getAllOrder() {
      // 获得登录的用户
      var user = this.$store.state.userinfo;
      // 获取所有的订单
      var res = await getOrder(user.id);
      // console.log(Array.isArray(res));
      // 请求成功的类型为[]
      if (Array.isArray(res)) {
        // 存储所有的商品数据（Promise）
        var data = [];
        // 获取商品数据
        res.forEach((v) => {
          data.push(getShopCarList(v.goods_ids));
        });
        // 获取所有商品数据
        var goodsData = await Promise.all(data);
        // 把所有商品数据加到res里
        res.forEach((v, index) => {
          v.message = goodsData[index].message;
        });
        this.allOrder = res;
      } else {
        this.$toast(orderData.message);
      }
    },
    // 获得各种状态的数据
    getOrderData(status) {
      // 状态为全部返回所有数据
      if (status == "all") {
        return this.allOrder;
      }
      var orderData = [];
      // 找出对应状态的数据
      this.allOrder.filter((v) => {
        v.status == parseInt(status) && orderData.push(v);
      });
      return orderData;
    },
    // 根据状态获取对应的按钮颜色和状态
    getOrderStatusColor(status){
        var orderStatus = [
            {"type":"danger","status":"未付款"},
            {"type":"primary","status":"已付款"},
            {"type":"default","status":"完成"},
        ];
        return orderStatus[status]
    }

  },
  async created() {
    await isToken();
    this.$parent.title = "我的订单";
    this.$parent.isBottom = false;
    this.getAllOrder();
  },
  components: {
    "van-tabs": Tabs,
    "van-tab": Tab,
    "van-card": Card,
    "van-tag":Tag,
    "van-button":Button,
  },
};
</script>

<style lang="scss" scoped>
.van-card:first-child {
  margin-top: 10px;
}
</style>
