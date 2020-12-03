<template>
  <div class="page_wrap goods">
    <header-bar>
      <van-search v-model="params.keyword" shape="round" placeholder="搜索商品"></van-search>
      <template v-slot:right>
        <span @click="onSearch">搜索</span>
      </template>
    </header-bar>
    <div class="goods_list">
      <van-list
        :offset="60"
        :immediate-check="false"
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="loadMore"
      >
        <van-card
          v-for="item in goods"
          :key="item.goodsId"
          :price="item.sellingPrice"
          :desc="item.goodsIntro"
          :title="item.goodsName"
          :thumb="$getImg(item.goodsCoverImg)"
          @click="$router.push({name:'goodsDetail',params:{id:item.goodsId}})"
        />
      </van-list>
    </div>
  </div>
</template>

<script>
import HeaderBar from 'comp/HeaderBar'

export default {
  components: { HeaderBar },
  data () {
    return {
      loading: false,
      finished: false,
      goods: [],
      totalPage: 0,
      params: {
        keyword: '',
        pageNumber: 1,
        goodsCategoryId: ''
      }
    }
  },
  created () {
    this.params.goodsCategoryId = this.$route.query.categoryId
    this.getGoodsList()
  },
  methods: {
    onSearch () {
      this.params.pageNumber = 1
      this.loading = true
      this.finished = false
      this.goods = []
      this.getGoodsList()
    },
    loadMore () {
      this.params.pageNumber++
      if (this.params.pageNumber > this.totalPage) {
        this.finished = true
        return
      }
      this.getGoodsList()
    },
    getGoodsList () {
      this.$api.getGoodsList(this.params).then(res => {
        this.loading = false
        this.totalPage = res.data.totalPage
        if (this.totalPage < 2) this.finished = true
        this.goods.push(...res.data.list)
      })
    }
  }
}
</script>

<style lang="less" scope>
.goods{
  background: #fff;
  min-height: 100vh;
  .van-card{
    border-bottom: 1px solid #ccc;
    background: #fff;
  }
  .van-card__price{
    color: @red;
  }
}
</style>
