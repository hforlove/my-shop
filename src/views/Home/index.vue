<template>
  <div class="home">
    <van-nav-bar>
      <template #left>
        <van-icon name="wap-nav" size="18" color="#fff" />
      </template>
      <template #title>
        <van-search v-model="keyword" shape="round" placeholder="搜索商品" />
      </template>
      <template #right>
        <van-icon name="manager" size="18" color="#fff" />
      </template>
    </van-nav-bar>
    <swipe :list="homeData.carousels" />
    <van-tabbar v-model="active">
      <van-tabbar-item icon="wap-home-o">首页</van-tabbar-item>
      <van-tabbar-item icon="bag-o">分类</van-tabbar-item>
      <van-tabbar-item icon="shopping-cart-o">购物车</van-tabbar-item>
      <van-tabbar-item icon="contact">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>

import { getHomeData } from 'api/index'

import swipe from 'comp/Swipe'

export default {
  name: 'Home',
  components: { swipe },
  data () {
    return {
      active: 0,
      keyword: '',
      homeData: {
        carousels: [],
        hotGoodses: [],
        newGoodses: [],
        recommendGoodses: []
      }
    }
  },
  mounted () {
    this.getHomeData()
  },
  methods: {
    getHomeData () {
      getHomeData().then(res => {
        if (res.resultCode === 200) {
          this.homeData = res.data
        }
      })
    }
  }
}

</script>

<style lang="less" scoped>
.home{
 .van-nav-bar{
    background: #1baeae;
  }
  .van-search{
    background: none;
  }
}
</style>
