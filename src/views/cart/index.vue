<template>
  <div class="cart_page">
    <header-bar>
      <template v-slot:middle>购物车</template>
    </header-bar>

    <div class="cart_list">
      <cart-item v-for="item in carts" :key="item.cartItemId" :goods.sync="item" />
    </div>

  <van-submit-bar :price="total" button-text="提交订单" @submit="onSubmit">
    <van-checkbox v-model="checked" @click="selectAll">全选</van-checkbox>
  </van-submit-bar>

  </div>
</template>

<script>

import HeaderBar from 'comp/HeaderBar'
import cartItem from './cartItem'

import { getCartList } from 'api/index'

export default {
  components: { HeaderBar, cartItem },
  data () {
    return {
      checked: true,
      loading: false,
      finished: false,
      carts: [],
      params: {
        pageNumber: 1
      }
    }
  },
  created () {
    this.getCartList()
  },
  computed: {
    total () {
      const checks = this.carts.filter(item => item.checked)
      if (checks.length > 0) {
        return this.carts.filter(item => item.checked).reduce((prev, cur) => {
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
      this.carts.map(item => {
        item.checked = this.checked
      })
    },
    getCartList () {
      getCartList(this.params).then(res => {
        if (res.resultCode === 200) {
          res.data.map(item => {
            item.checked = true
          })
          this.carts.push(...res.data)
        }
      })
    }
  },
  watch: {
    total () {
      this.checked = !this.carts.filter(item => !item.checked).length > 0
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
