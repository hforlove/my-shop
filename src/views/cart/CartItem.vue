<template>
  <van-swipe-cell>
    <div class="cart_item">
      <div class="cl">
        <van-checkbox v-model="goods.checked"></van-checkbox>
      </div>
      <div class="cr">
        <van-card
          class="goods-card"
          :title="goods.goodsName"
          :thumb="$getImg(goods.goodsCoverImg)"
        >
          <template #price>
            <div class="cart_price">￥{{goods.sellingPrice}}</div>
            <van-stepper v-model="goods.goodsCount" />
          </template>
        </van-card>
      </div>
    </div>
    <template #right>
      <van-button square text="删除" type="danger" class="delete-button" @click="deleteCart" />
    </template>
  </van-swipe-cell>
</template>

<script>
export default {
  props: {
    goods: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      checked: true
    }
  },
  methods: {
    deleteCart () {
      this.$emit('deleteCart')
    }
  }
}
</script>

<style lang="less" scope>
.cart_item{
  display: flex;
  .cl{
    width: 20rem/@dpi;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .cr{
    flex: 1;
  }
  .van-card{
    padding-left: 0;
    padding-right: 0;
    background: #fff;
    border: none;
  }
  .van-card__price{
    display: flex;
    justify-content: space-between;
    color: @red;
  }
  .van-swipe-cell__right{
    display: flex;
    align-items: center;
  }
}
</style>
