<template>
  <div class="goods_detail">
    <swipe :list="goodsCarouselList" />

    <div class="goods_info">
      <h3>{{detail.goodsName}}</h3>
      <div>{{detail.goodsIntro}}</div>
      <p>￥{{detail.sellingPrice}}</p>
    </div>

    <div class="goods_cont" v-html="detail.goodsDetailContent"></div>

    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服" />
      <van-goods-action-icon icon="cart-o" text="购物车" badge="5" />
      <van-goods-action-button type="warning" text="加入购物车" />
      <van-goods-action-button type="danger" text="立即购买" />
    </van-goods-action>
  </div>
</template>

<script>

import { getGoodsDetail } from 'api/index'

import Swipe from 'comp/Swipe'

export default {
  components: { Swipe },
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
        if (res.resultCode === 200) {
          this.goodsCarouselList = res.data.goodsCarouselList.map(item => {
            return { carouselUrl: item }
          })
          this.detail = res.data
        }
      })
    }
  }
}
</script>

<style lang="less" scope>
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
