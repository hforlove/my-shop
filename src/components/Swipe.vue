<template>
  <van-swipe class="my-swipe" :autoplay="3000" indicator-color="red">
    <van-swipe-item
      v-for="(item,index) in list"
      :key="index"
    >
      <img :src="$getImg(item.carouselUrl)" />
    </van-swipe-item>
</van-swipe>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default () {
        return []
      }
    }
  }
}
</script>

<style lang="less" scope>
.my-swipe .van-swipe-item {
  img {
    width: 100%;
  }
}
</style>
