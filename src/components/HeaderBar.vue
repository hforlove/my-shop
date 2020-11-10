<template>
  <div class="header_bar">
    <div class="bar_left">
      <slot name="left">
        <van-icon name="arrow-left" @click="toBack" />
      </slot>
    </div>
    <div class="bar_mid">
      <slot name="middle"></slot>
    </div>
    <div v-if="!hideRight" class="bar_right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    hideRight: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    toBack () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="less" scope>
.header_bar{
  width: 100%;
  height: 46rem/@dpi;
  position: fixed;
  left: 0;
  top: 0;
  overflow: hidden;
  display: flex;
  align-items: center;
  background: #fff;
  z-index: 999;
  border-bottom: 1px solid @gray;
  .bar_left,.bar_right{
    width: 52rem/@dpi;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16rem/@dpi;
  }
  .bar_mid{
    font-size: 16rem/@dpi;
    flex: 1;
    display: flex;
    justify-content: center;
  }
}
</style>
