<template>
  <div class="page_wrap">
    <tab-bar :index="1"></tab-bar>
    <header-bar hide-right>
        <van-search v-model="keyword" shape="round" placeholder="搜索商品" @click="$router.push('/goods')" />
    </header-bar>
    <div class="category_list">
      <div class="list_left">
        <scroll-list :active="listActive">
          <category-list :list="category" @changeCategory="changeCategory" />
        </scroll-list>
      </div>
      <div class="list_right">
        <scroll-list :active="cateActive">
          <category-item
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
import CategoryList from './CategoryList'
import CategoryItem from './CategoryItem'

export default {
  components: { ScrollList, HeaderBar, TabBar, CategoryList, CategoryItem },
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
