<template>
  <div class="page_wrap order_detail">
    <header-bar home>
      <template v-slot:middle>订单详情</template>
    </header-bar>
    <div class="detail_top">
      <p><span>订单状态：</span>{{orderInfo.orderStatusString}}</p>
      <p><span>订单编号：</span>{{orderInfo.orderNo}}</p>
      <p><span>下单时间：</span>{{orderInfo.payTime}}</p>
      <van-button v-if="orderInfo.orderStatus>=0" block type="default" @click="showConfirm(orderInfo.orderNo)">取消订单</van-button>
    </div>
    <div class="detail_top">
      <p><span>商品金额：</span>￥{{orderInfo.totalPrice}}</p>
      <p><span>支付方式：</span>{{orderInfo.payTypeString}}</p>
      <p><span>配送方式：</span>普通快递</p>
    </div>
    <van-card
      v-for="item in orderList"
      :key="item.goodsId"
      :num="item.goodsCount"
      :price="item.sellingPrice"
      desc="全场包邮"
      :title="item.goodsName"
      :thumb="$getImg(item.goodsCoverImg)"
    />
  </div>
</template>

<script>

import HeaderBar from 'comp/HeaderBar'

export default {
  components: { HeaderBar },
  data () {
    return {
      orderInfo: {},
      orderList: []
    }
  },
  created () {
    if (this.$route.params.id) this.getOrderDetail(this.$route.params.id)
  },
  methods: {
    getOrderDetail (id) {
      this.$api.getOrderDetail(id).then(res => {
        this.orderInfo = res.data
        this.orderList = res.data.newBeeMallOrderItemVOS
      })
    },
    showConfirm (orderNo) {
      this.$dialog.confirm({
        title: '确定取消该订单？'
      }).then(_ => {
        this.cancelOrder(orderNo)
      })
    },
    cancelOrder (orderNo) {
      this.$api.cancelOrder(orderNo).then(res => {
        this.getOrderDetail(orderNo)
      })
    }
  }
}

</script>

<style lang="less" scope>
.order_detail{
  .van-card{
    background: #fff;
  }
  .van-card:not(:first-child){
    margin-top:0;
  }
}
.detail_top{
  padding: 10px 20px;
  background: #fff;
  margin-bottom: 16px;
  font-size: 16rem/@dpi;
  p{
    margin-bottom: 10px;
    span{
      color:#999;
    }
  }
}
</style>
