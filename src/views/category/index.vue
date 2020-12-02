<template>
  <div>
    <tab-bar :index="1"></tab-bar>
    <header-bar hide-right>
      <template v-slot:middle>
        <van-search v-model="keyword" shape="round" placeholder="搜索商品" @click="$router.push('/goods')" />
      </template>
    </header-bar>
    <div class="category_list">
      <div class="list_left">
        <scroll-list :active="listActive">
          <cate-list :list="category" @changeCategory="changeCategory"></cate-list>
        </scroll-list>
      </div>
      <div class="list_right">
        <scroll-list :active="cateActive">
          <cate-item
            v-for="item in cateItems"
            :key="item.categoryId"
            :title="item.categoryName"
            :list="item.thirdLevelCategoryVOS"
          />
        </scroll-list>
      </div>
    </div>
  </div>
</template>

<script>
import ScrollList from 'comp/ScrollList'
import HeaderBar from 'comp/HeaderBar'
import TabBar from 'comp/TabBar'
import cateList from './cateList'
import cateItem from './cateItem'

export default {
  components: { ScrollList, HeaderBar, TabBar, cateList, cateItem },
  data () {
    return {
      keyword: '',
      category: [],
      cateItems: [],
      listActive: false,
      cateActive: false
    }
  },
  mounted () {
    this.getCateGory()
  },
  methods: {
    getCateGory () {
      this.$api.getCateGory().then(res => {
        this.category = res.data
        this.listActive = !this.listActive
      })
    },
    changeCategory (data) {
      this.cateItems = data.secondLevelCategoryVOS
      this.cateActive = !this.cateActive
    }
  }
}
</script>

<style lang="less" scope>
.van-search{
  width: 100%;
}
.category_list{
  display: flex;
  height: 100vh;
  padding-top: 46rem/@dpi;
  padding-bottom: 50rem/@dpi;
  .list_left{
    width: 110rem/@dpi;
    height: 100%;
  }
  .list_right{
    flex: 1;
  }
  .list_right{
    height: 100%;
    background: #fff;
  }
}
</style>
