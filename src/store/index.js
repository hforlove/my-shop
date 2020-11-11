import Vue from 'vue'
import Vuex from 'vuex'

import { getCartList } from 'api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cartList: []
  },
  mutations: {
    initCart (state, data) {
      state.cartList = data
    },
    addCart (state, cart) {
      state.cartList.push(cart)
    },
    deleteCart (state, index) {
      state.cartList.splice(index, 1)
    }
  },
  getters: {
    cartCount (state) {
      return state.cartList.length
    }
  },
  actions: {
    initCart (context) {
      getCartList().then(res => {
        context.commit('initCart', res.data)
      })
    }
  }
})
