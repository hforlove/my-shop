<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

import { getToken } from 'utils'
import { getCartList } from 'api'

export default {
  created () {
    if (getToken()) {
      this.$store.dispatch('initCart')
    }
  }
}
</script>

<style lang="less">

</style>
