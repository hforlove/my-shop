<template>
  <div class="goods_detail">

    <header-bar>
      <template v-slot:middle>商品详情</template>
    </header-bar>
    <div class="goods_main">
      <swipe :list="goodsCarouselList" />

      <div class="goods_info">
        <h3>{{detail.goodsName}}</h3>
        <div>{{detail.goodsIntro}}</div>
        <p>￥{{detail.sellingPrice}}</p>
      </div>

      <div class="goods_cont" v-html="detail.goodsDetailContent"></div>
    </div>

    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服" />
      <van-goods-action-icon icon="cart-o" text="购物车" :badge="$store.getters.cartCount" to="/cart" />
      <van-goods-action-button type="warning" text="加入购物车" @click="addCart" />
      <van-goods-action-button type="danger" text="立即购买" />
    </van-goods-action>
  </div>
</template>

<script>

import { getGoodsDetail } from 'api'

import Swipe from 'comp/Swipe'
import HeaderBar from 'comp/HeaderBar'

import cartMixin from 'mixin/cart'

export default {
  components: { Swipe, HeaderBar },
  mixins: [cartMixin],
  data () {
    return {
      goodsId: '',
      goodsCarouselList: [],
      detail: {

      }
    }
  },
  created () {
    this.goodsId = this.$route.params.id
    this.getGoodsDetail()
  },
  methods: {
    getGoodsDetail () {
      getGoodsDetail(this.goodsId).then(res => {
        this.goodsCarouselList = res.data.goodsCarouselList.map(item => {
          return { carouselUrl: item }
        })
        this.detail = res.data
      })
    },
    addCart () {
      const params = {
        goodsCount: 1,
        goodsId: this.goodsId
      }
      this.submitCart(params)
    }
  }
}
</script>

<style lang="less" scope>
.goods_main{
  padding-top: 46rem/@dpi;
  padding-bottom: 52rem/@dpi;
}
.goods_info{
  padding: 16px;
  background: #fff;
  h3{
    font-size: 16rem/@dpi;
  }
  div{
    font-size: 12rem/@dpi;
    color: #666;
    padding: 10px 0;
  }
  p{
    color: @red;
    font-size: 14rem/@dpi;
  }
}
.goods_cont{
  margin-top: 10px;
  background: #fff;
  padding: 16px;
}
</style>
