<template>
  <div class="car_container">
    <div class="vacancy" v-if="isShow">
      <h3>
        亲，您的购物车为空，去
        <router-link to="/home">首页</router-link>逛逛吧!
      </h3>
      <van-divider />
      <div class="car_img">
        <img src="../../assets/images/car.png" alt />
      </div>
      <div class="login">
        <router-link to="/home">登录</router-link>后可以同步电脑与手机购物车中的商品
      </div>
    </div>
    <div class="shop_car" v-else>
      <van-divider>收货地址</van-divider>

      <van-address-list
        v-model="chosenAddressId"
        :list="list"
        default-tag-text="默认"
        @edit="onEdit"
      />
      <van-divider>购买的商品</van-divider>
      <div class="item">
        <div class="shop" v-for="(item,i) in carList" :key="item.id">
          <div class="switch">
            <van-switch
              @change="switchover(item.id,$store.getters.getSelected[item.id])"
              v-model="$store.getters.getSelected[item.id]"
            />
          </div>
          <!-- <div class="goods-img"> -->
          <img :src="item.thumb_path" />
          <!-- </div> -->
          <div class="info">
            <div class="title overflow_ellipsis">{{ item.title }}</div>
            <div class="row">
              <span class="price">¥{{item.sell_price}}</span>
              <van-stepper
                @change="changeNumber(item.id,$store.getters.getNumber[item.id])"
                v-model="$store.getters.getNumber[item.id]"
              />
              <van-button type="danger" @click="delCar(item.id,i)">删除</van-button>
            </div>
          </div>
        </div>

        <van-cell title="微信支付" icon="gold-coin-o" is-link />

        <div class="submit-bar">
          <van-submit-bar
            :price="$store.getters.buyCountAndTotal.total"
            button-text="提交订单"
            @submit="onSubmit"
          >
            <span>共{{$store.getters.buyCountAndTotal.count}}件商品</span>
            <template #tip>默认微信支付</template>
          </van-submit-bar>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getShopCarList,
  getAddress,
  isToken,
  commitOrder,
} from "@/api/index.js";
import {
  Divider,
  AddressList,
  Switch,
  Stepper,
  Button,
  SubmitBar,
  Cell,
  CellGroup,
  Dialog,
} from "vant";
import { getOrderId } from "@/util/tool.js";

export default {
  data() {
    return {
      blank: true,
      chosenAddressId: "1",
      list: [],
      carList: [],
    };
  },
  methods: {
    // 请求购物车数据
    async getShopList() {
      // 获得购物车id
      var ids = this.$store.getters.carIds;
      if (!ids) {
        return;
      }
      // 获取购物车商品
      var { message } = await getShopCarList(ids);
      // console.log(message);
      this.carList = message;
    },
    // 编辑地址
    onEdit(item, index) {
      // console.log(item);
      // console.log(index);
      item = JSON.stringify(item);
      this.$router.push(`/editSite/${item}`);
    },
    // 提交生成订单
    async onSubmit() {
      // 获取订单id
      var orderId = getOrderId();
      // console.log(orderId);
      // 创建订单对象
      var order = {
        user_id: this.$store.state.userinfo.id, // 用户id
        order_id: orderId,  // 订单id
        address_id: this.chosenAddressId, // 地址id
        total_price: this.$store.getters.buyCountAndTotal.total / 100, // 价钱
        number: this.$store.getters.buyCountAndTotal.count, // 数量
        goods_ids: this.$store.getters.orderCarIds,// 商品id
      };
      var _this = this;
      // console.log(2);
      this.$toast.loading({
        message: "支付中...",
        forbidClick: true,
        duration: 1000,
        onClose() {
          // 询问用户是否支付完成
          Dialog.alert({
            message: "支付是否完成",
          }).then( async () => {
            var res = await commitOrder(order);

            //   console.log(res.data);
            //   跳转支付页面
            //   if(res.data){
            //       location.href = data;
            //   }
            //.清空购物车
            localStorage.removeItem('shopping');
            _this.$store.commit("logoutCar");
            _this.$router.push("/order");
          });
        },
      });


    },
    // 删除购物车数据
    delCar(id, index) {
      // 删除vuex里购物车的数据
      this.$store.commit("delCar", id);
      // 删除显示的数据
      this.carList.splice(index, 1);
    },
    // 切换商品的状态
    switchover(id, selected) {
      this.$store.commit("switchoverCar", { id, selected });
    },
    // 步进器
    changeNumber(id, number) {
      this.$store.commit("carNumber", { id, number });
    },
    // 默认的收货地址
    async setDefault() {
      // 获取用户信息
      var user = this.$store.state.userinfo;
      var res = await getAddress(user.id);
      // 将数组的默认状态转成flase值
      res.forEach((v) => {
        if (v.isDefault == true) {
          this.chosenAddressId = v.id;
          v.address = `${v.province}-${v.city}-${v.country}-${v.addressDetail}`;
          this.list.push(v);
        }
      });
    },
  },
 async created(){
    // 判断是否登录
    await isToken();
    this.setDefault();
    this.$parent.title = "我的购物车";
    // this.$parent.active = -1;
    this.$parent.isBottom = false;

    this.getShopList();
  },
  computed: {
    // 判断是否登录
    isShow() {
      if (this.carList.length == 0) {
        // this.blank = false;
        return true;
      }
      return false;
    },
  },
  components: {
    "van-divider": Divider,
    "van-address-list": AddressList,
    "van-switch": Switch,
    "van-stepper": Stepper,
    "van-button": Button,
    "van-submit-bar": SubmitBar,
    "van-cell": Cell,
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/common.scss";
.car_container {
  .vacancy {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin-top: 40px;
    overflow: hidden;
    background-color: #eee;
    h3 {
      text-align: center;
    }
    .van-divider {
      border-color: #333;
      width: 100%;
    }
    .login {
      align-items: center;
    }
  }
  .shop_car {
    .van-divider {
      font-size: 16px;
      color: #6f7370;
      border-color: #545e6c;
      margin: 2px;
    }
    .van-address-list {
      padding-bottom: 20px;
      .van-address-list__bottom {
        // display: none;
        visibility: hidden;
      }
    }
  }
  .item {
    padding-bottom: 80px;
    background-color: #f1f1f1;
    .shop {
      display: flex;
      align-items: center;
      padding: 10px 8px;
      margin: 10px;
      background-color: #fff;
      border-radius: 8px;
      .switch {
        display: inline-block;
      }
      img {
        width: 50px;
        height: 60px;
        margin: 0 4px;
      }
      .info {
        .title {
          font-size: 16px;
        }
        .row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          .price {
            font-size: 16px;
            color: #ff0000;
          }
        }
      }
    }
  }
  .van-cell {
    width: 94%;
    margin: 10px 10px;
    margin-top: 20px;
    border-radius: 8px;
  }
}
</style>
