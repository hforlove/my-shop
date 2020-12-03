<template>
  <div class="page_wrap order_create">
    <header-bar home>生产订单</header-bar>
    <div class="address_bar" @click="selectAddress">
      <div class="l">
        <p><span>{{address.userName}}</span> {{address.userPhone}}</p>
        <div>
          {{address.cityName}}{{address.provinceName}}{{address.regionName}}{{address.detailAddress}}
        </div>
      </div>
      <van-icon name="arrow" />
    </div>
    <van-card
      v-for="item in orderList"
      :key="item.goodsId"
      :num="item.goodsCount"
      :price="item.sellingPrice"
      :title="item.goodsName"
      :thumb="$getImg(item.goodsCoverImg)"
    />
    <van-action-sheet
      v-model="payShow"
      :actions="actions"
      cancel-text="取消"
      close-on-click-action
      @select="selectPay"
      @cancel="cancelPay"
    />
    <van-submit-bar :price="price" button-text="提交订单" @submit="onSubmit" />
  </div>
</template>

<script>

import HeaderBar from 'comp/HeaderBar'

import { getStorage, removeStorage } from 'utils'

export default {
  components: { HeaderBar },
  data () {
    return {
      payShow: false,
      actions: [
        { name: '支付宝', value: 1 },
        { name: '微信', value: 2 }
      ],
      orderList: [],
      address: {},
      cartIds: [],
      orderNo: ''
    }
  },
  computed: {
    price () {
      return this.orderList.reduce((prev, cur) => {
        return prev + cur.goodsCount * cur.sellingPrice * 100
      }, 0)
    }
  },
  created () {
    this.getAddress()
    this.getCartGoods()
  },
  methods: {
    getAddress () {
      const addressId = this.$route.query.address
      if (addressId) {
        this.$api.getAddressDetail(addressId).then(res => {
          this.address = res.data
        })
      } else {
        this.$api.getAddressByDefault().then(res => {
          this.address = res.data
          if (!this.address) this.$router.push({ name: 'address', query: { type: 'cart' } })
        })
      }
    },
    getCartGoods () {
      const ids = getStorage('cartIds')
      this.cartIds = ids.split(',')
      if (ids) {
        const params = {
          cartItemIds: ids
        }
        this.$api.getCartByIds(params).then(res => {
          this.orderList = res.data
        })
      }
    },
    selectAddress () {
      this.$router.push({ name: 'address', query: { type: 'cart' } })
    },
    onSubmit () {
      const params = {
        addressId: this.address.addressId,
        cartItemIds: this.cartIds
      }
      this.$api.createOrder(params).then(res => {
        this.payShow = true
        this.orderNo = res.data
        this.$store.dispatch('initCart')
        removeStorage('cartIds')
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
    },
    cancelPay () {
      this.$router.push('/order')
    }
  }
}

</script>

<style lang="less" scope>
.order_create{
  .van-card{
    background: #fff;
  }
  .van-card:not(:first-child){
    margin-top: 0;
  }
  .van-card__content{
    padding: 20px 0 0;
  }
  .van-card__price{
    color:@red
  }
  .van-popup--bottom.van-popup--round{
    border-radius: 0;
  }
  .van-action-sheet__item{
    border-bottom: 1px solid #fafafa;
  }
}
.address_bar{
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  font-size: 13rem/@dpi;
  position: relative;
  background: #fff;
  margin-bottom: 20px;
  .van-icon{
    font-size: 18rem/@dpi;
  }
  &:before{
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    height: 2px;
    background: -webkit-repeating-linear-gradient(135deg, #ff6c6c 0, #ff6c6c 20%, transparent 0, transparent 25%, #1989fa 0, #1989fa 45%, transparent 0, transparent 50%);
    background: repeating-linear-gradient(-45deg, #ff6c6c 0, #ff6c6c 20%, transparent 0, transparent 25%, #1989fa 0, #1989fa 45%, transparent 0, transparent 50%);
    background-size: 80px;
    content: '';
  }
  .l{
    line-height: 24rem/@dpi;
    p{
      color: #646566;
      span{
        font-size: 14rem/@dpi;
        color:#000;
      }
    }
  }
}
</style>
