
import { addCart, editCart } from 'api'

export default {
  methods: {
    submitCart (params, type) {
      const cartList = this.$store.state.cartList
      const cart = cartList.filter(g => g.goodsId === parseInt(params.goodsId))

      if (cart && cart.length > 0) {
        const editParams = {
          cartItemId: cart[0].cartItemId,
          goodsCount: cart[0].goodsCount + 1
        }
        editCart(editParams).then(res => {
          if (res.resultCode === 200) {
            if (type === 1) {
              this.$router.push('/cart')
            } else {
              this.$toast.success('已添加到购物车')
            }
          }
        })
      } else {
        addCart(params).then(res => {
          if (res.resultCode === 200) {
            if (type === 1) {
              this.$router.push('/cart')
            } else {
              this.$toast.success('已添加到购物车')
            }
            this.$store.dispatch('initCart')
          }
        })
      }
    }
  }
}
