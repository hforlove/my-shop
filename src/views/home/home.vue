<template>
  <div class="page_wrap home">
    <header-bar>
      <template v-slot:left>
        <van-icon @click="$router.push('/category')" name="wap-nav" size="18" color="#fff" />
      </template>
      <van-search v-model="keyword" shape="round" placeholder="搜索商品" @click="$router.push('/goods')" />
      <template v-slot:right>
        <van-icon @click="$router.push('/user')" name="manager" size="18" color="#fff" />
      </template>
    </header-bar>

    <tab-bar :index="0"/>

    <swipe :list="homeData.carousels" />

    <home-nav />

    <home-goods :list="homeData.newGoodses" title="新品" />
    <home-goods :list="homeData.hotGoodses" title="热门" />
    <home-goods :list="homeData.recommendGoodses" title="推荐" />

    <div class="footer_space"></div>
  </div>
</template>

<script>

import TabBar from 'comp/TabBar'
import HeaderBar from 'comp/HeaderBar'
import Swipe from 'comp/Swipe'
import HomeNav from './HomeNav'
import HomeGoods from './HomeGoods'

export default {
  name: 'Home',
  components: { Swipe, TabBar, HeaderBar, HomeNav, HomeGoods },
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
