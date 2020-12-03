<template>
  <div class="page_wrap order_detail">

    <header-bar home>订单详情</header-bar>

    <div class="detail_top">
      <p><span>订单状态：</span>{{orderInfo.orderStatusString}}</p>
      <p><span>订单编号：</span>{{orderInfo.orderNo}}</p>
      <p><span>下单时间：</span>{{orderInfo.createTime}}</p>
      <van-button v-if="orderInfo.orderStatus===0" block type="info" @click="payShow=true">去支付</van-button>
      <van-button v-if="orderInfo.orderStatus>=0" block type="default" @click="showConfirm">取消订单</van-button>
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

    <van-action-sheet
      v-model="payShow"
      :actions="actions"
      cancel-text="取消"
      close-on-click-action
      @select="selectPay"
    />

  </div>
</template>

<script>

import HeaderBar from 'comp/HeaderBar'

export default {
  components: { HeaderBar },
  data () {
    return {
      payShow: false,
      actions: [
        { name: '支付宝', value: 1 },
        { name: '微信', value: 2 }
      ],
      orderNo: '',
      orderInfo: {},
      orderList: []
    }
  },
  created () {
    this.orderNo = this.$route.params.id
    if (this.orderNo) this.getOrderDetail()
  },
  methods: {
    getOrderDetail () {
      this.$api.getOrderDetail(this.orderNo).then(res => {
        this.orderInfo = res.data
        this.orderList = res.data.newBeeMallOrderItemVOS
      })
    },
    showConfirm () {
      this.$dialog.confirm({
        title: '确定取消该订单？'
      }).then(_ => {
        this.cancelOrder(this.orderNo)
      })
    },
    cancelOrder () {
      this.$api.cancelOrder(this.orderNo).then(res => {
        this.getOrderDetail()
      })
    },
    selectPay (item) {
      const params = {
        orderNo: this.orderNo,
        payType: item.value
      }
      this.$api.payOrder(params).then(res => {
        this.$router.push('/order')
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
  .van-button--block{
    margin-top: 10px;
  }
  p{
    margin-top: 10px;
    span{
      color:#999;
    }
  }
}
</style>
