<template>
  <div class="home">
    <header-bar>
      <template v-slot:left>
        <van-icon @click="$router.push('/category')" name="wap-nav" size="18" color="#fff" />
      </template>
      <template v-slot:middle>
        <van-search v-model="keyword" shape="round" placeholder="搜索商品" @click="$router.push('/goods')" />
      </template>
      <template v-slot:right>
        <van-icon @click="$router.push('/user')" name="manager" size="18" color="#fff" />
      </template>
    </header-bar>

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

import TabBar from 'comp/TabBar'
import HeaderBar from 'comp/HeaderBar'
import Swipe from 'comp/Swipe'
import midNav from './midNav'
import goodsBlock from './goodsBlock'

export default {
  name: 'Home',
  components: { Swipe, TabBar, HeaderBar, midNav, goodsBlock },
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
      this.$api.getHomeData().then(res => {
        this.homeData = res.data
      })
    }
  }
}

</script>

<style lang="less" scoped>
.header_bar{
  background: #1baeae;
}
.home{
 .van-nav-bar{
    background: #1baeae;
  }
  .van-search{
    background: none;
  }
}
</style>
