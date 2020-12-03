<template>
  <div class="page_wrap cart_page">
    <header-bar home>购物车</header-bar>
    <tab-bar :index="2"></tab-bar>

    <van-empty v-if="cartList.length<1" description="暂无商品" />

    <div class="cart_list">
      <cart-item @deleteCart="deleteCart(item)" v-for="item in cartList" :key="item.cartItemId" :goods.sync="item" />
    </div>

  <van-submit-bar :price="total" button-text="结算" @submit="onSubmit">
    <van-checkbox v-model="checked" @click="selectAll">全选</van-checkbox>
  </van-submit-bar>

  </div>
</template>

<script>

import HeaderBar from 'comp/HeaderBar'
import TabBar from 'comp/TabBar'
import CartItem from './CartItem'

import { setStorage } from 'utils'

export default {
  components: { HeaderBar, TabBar, CartItem },
  data () {
    return {
      checked: true,
      loading: false,
      finished: false,
      cartList: []
    }
  },
  created () {
    this.getCartList()
  },
  computed: {
    total () {
      const checks = this.cartList.filter(item => item.checked)
      if (checks.length > 0) {
        return this.cartList.filter(item => item.checked).reduce((prev, cur) => {
          return prev + cur.goodsCount * cur.sellingPrice * 100
        }, 0)
      }
      return 0
    }
  },
  methods: {
    onSubmit () {
      const ids = this.cartList.filter(item => item.checked).map(item => item.cartItemId)
      setStorage('cartIds', ids.join(','))
      this.$router.push('/orderCreate')
    },
    selectAll (val) {
      this.cartList.map(item => {
        item.checked = this.checked
      })
    },
    getCartList () {
      this.$api.getCartList().then(res => {
        res.data.map(item => {
          item.checked = true
        })
        this.cartList.push(...res.data)
      })
    },
    deleteCart (cart) {
      const index = this.cartList.findIndex(item => item === cart)
      if (index >= 0) {
        this.$api.deleteCart(cart.cartItemId).then(res => {
          this.cartList.splice(index, 1)
          this.$store.dispatch('initCart')
        })
      }
    }
  },
  watch: {
    total () {
      this.checked = !this.cartList.filter(item => !item.checked).length > 0
    }
  }
}
</script>

<style lang="less" scope>
.van-swipe-cell__wrapper{
  padding-right: 16px;
}
.cart_list{
  padding-bottom: 106rem/@dpi;
  padding-left: 16px;
}
.cart_page{
  background: #fff;
  min-height: 100vh;
  .van-submit-bar{
    bottom:56rem/@dpi
  }
}
</style>
