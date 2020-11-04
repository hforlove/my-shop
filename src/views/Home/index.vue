<template>
  <div class="home">
    <van-nav-bar fixed>
      <template #left>
        <van-icon @click="redirect('/category')" name="wap-nav" size="18" color="#fff" />
      </template>
      <template #title>
        <van-search v-model="keyword" shape="round" placeholder="搜索商品" />
      </template>
      <template #right>
        <van-icon @click="redirect('/user')" name="manager" size="18" color="#fff" />
      </template>
    </van-nav-bar>
    <tab-bar :index="0"></tab-bar>

    <div class="header_space"></div>

    <swipe :list="homeData.carousels" />
    <mid-nav></mid-nav>
    <goods-block :list="homeData.newGoodses" title="新品"></goods-block>
    <goods-block :list="homeData.hotGoodses" title="热门"></goods-block>
    <goods-block :list="homeData.recommendGoodses" title="推荐"></goods-block>

    <div class="footer_space"></div>
  </div>
</template>

<script>

import { getHomeData } from 'api/index'

import TabBar from 'comp/TabBar'
import midNav from './midNav'
import goodsBlock from './goodsBlock'
import swipe from 'comp/Swipe'

export default {
  name: 'Home',
  components: { swipe, TabBar, midNav, goodsBlock },
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
    },
    redirect (path) {
      this.$router.push(path)
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
