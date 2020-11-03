<template>
  <van-nav-bar left-text="返回" left-arrow>
    <template #title>
      <slot></slot>
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

</style>
