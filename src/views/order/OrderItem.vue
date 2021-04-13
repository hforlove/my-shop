<template>
  <div class="order_item">
    <div class="order_time">
      <span>订单时间：{{data.createTime}}</span>
      <span>{{data.orderStatusString}}</span>
    </div>
    <div v-if="data.newBeeMallOrderItemVOS&&data.newBeeMallOrderItemVOS.length>0">
      <van-card
        v-for="item in data.newBeeMallOrderItemVOS"
        :key="item.goodsId"
        :num="item.goodsCount"
        :price="item.sellingPrice"
        :title="item.goodsName"
        :thumb="$getImg(item.goodsCoverImg)"
        desc="全场包邮"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default () {
        return {}
      }
    }
  }
}

</script>

<style lang="less" scope>
.order_item{
  margin-bottom: 16px;
  background: #fff;
  .van-card{
    border-bottom: none;
    background: #fff;
  }
  .van-card__content{
    padding: 8px 0;
  }
}
.order_time{
  padding: 10px 20px 0;
  display: flex;
  justify-content: space-between;
  font-size: 12rem/@dpi;
}
</style>
