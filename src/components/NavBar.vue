<template>
  <van-nav-bar left-arrow fixed>
    <template #title>
      <slot name="title"></slot>
    </template>
    <template #right>
      <slot name="right"></slot>
    </template>
  </van-nav-bar>
</template>

<script>
export default {
  methods: {
    toBack () {
      this.$route.go(-1)
    }
  }
}
</script>

<style>
.van-nav-bar{
  overflow: hidden;
}
</style>
