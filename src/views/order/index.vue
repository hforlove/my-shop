<template>
  <div class="page_wrap">
    <header-bar home>
      <template v-slot:middle>我的订单</template>
    </header-bar>
    <van-tabs v-model="params.status" class="order_tab" @change="tabChange">
      <van-tab title="全部" name=""></van-tab>
      <van-tab title="代付款" name="0"></van-tab>
      <van-tab title="待确认" name="1"></van-tab>
      <van-tab title="代发货" name="2"></van-tab>
      <van-tab title="已收货" name="3"></van-tab>
      <van-tab title="交易完成" name="4"></van-tab>
    </van-tabs>
    <div class="order_list">
      <van-list
        :offset="60"
        :immediate-check="false"
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="loadMore"
      >
        <order-item
          v-for="item in order"
          :key="item.orderId"
          :data="item"
          @click.native="$router.push({name:'orderDetail',params:{id:item.orderNo}})"
        />
      </van-list>
    </div>
  </div>
</template>

<script>

import HeaderBar from 'comp/HeaderBar'
import OrderItem from './orderItem'

export default {
  components: { HeaderBar, OrderItem },
  data () {
    return {
      loading: false,
      finished: false,
      totalPage: 0,
      order: [],
      params: {
        status: '',
        pageNumber: 1
      }
    }
  },
  created () {
    this.getOrder()
  },
  methods: {
    tabChange () {
      this.params.pageNumber = 1
      this.loading = true
      this.finished = false
      this.order = []
      this.getOrder()
    },
    getOrder () {
      this.$api.getOrder(this.params).then(res => {
        this.loading = false
        this.totalPage = res.data.totalPage
        if (this.totalPage < 2) this.finished = true
        this.order.push(...res.data.list)
      })
    },
    loadMore () {
      this.params.pageNumber++
      if (this.params.pageNumber > this.totalPage) {
        this.finished = true
        return
      }
      this.getOrder()
    }
  }
}

</script>

<style lang="less" scope>
.order_list{
  padding-top: 44rem/@dpi;
}
.order_tab{
  position: fixed;
  top:46rem/@dpi;
  z-index: 9;
}
.van-address-item__tag{
  border-radius: 2px;
  font-size: 10rem/@dpi;
}
</style>
