<template>
  <div class="cart_page">
    <header-bar>
      <template v-slot:middle>购物车</template>
    </header-bar>

    <div class="cart_list">
      <cart-item @deleteCart="deleteCart(item)" v-for="item in cartList" :key="item.cartItemId" :goods.sync="item" />
    </div>

  <van-submit-bar :price="total" button-text="提交订单" @submit="onSubmit">
    <van-checkbox v-model="checked" @click="selectAll">全选</van-checkbox>
  </van-submit-bar>

  </div>
</template>

<script>

import HeaderBar from 'comp/HeaderBar'
import cartItem from './cartItem'

import { getCartList, deleteCart } from 'api/index'

export default {
  components: { HeaderBar, cartItem },
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
      this.checked = false
    },
    selectAll (val) {
      this.cartList.map(item => {
        item.checked = this.checked
      })
    },
    getCartList () {
      getCartList().then(res => {
        res.data.map(item => {
          item.checked = true
        })
        this.cartList.push(...res.data)
      })
    },
    deleteCart (cart) {
      const index = this.cartList.findIndex(item => item === cart)
      if (index >= 0) {
        deleteCart(cart.cartItemId).then(res => {
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
  padding-top: 46rem/@dpi;
  padding-bottom: 50rem/@dpi;
  padding-left: 16px;
}
.cart_page{
  background: #fff;
  min-height: 100vh;
}
</style>
