<template>
  <div class="wrapper" ref="wrapper">
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from '@better-scroll/core'

export default {
  props: {
    active: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      scroll: null
    }
  },
  watch: {
    active () {
      this.$nextTick(_ => {
        this.scroll ? this.scroll.refresh() : this.scroll = new BScroll(this.$refs.wrapper, { click: true, tap: true })
      })
      // setTimeout(_ => {
      //   console.log(111)
      //   this.scroll ? this.scroll.refresh() : this.scroll = new BScroll('.wrapper', { click: true, tap: true })
      // }, 10000)
    }
  }
}
</script>

<style lang="less" scope>
.wrapper{
  height: 100%;
  overflow: hidden;
}
</style>
