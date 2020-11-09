<template>
  <div>
    <nav-bar>
      <template v-slot:title>
        <van-search v-model="keyword" shape="round" placeholder="搜索商品" />
      </template>
    </nav-bar>
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
import NavBar from 'comp/NavBar'
import cateList from './cateList'
import cateItem from './cateItem'

import { getCateGory } from 'api/index'

export default {
  components: { ScrollList, NavBar, cateList, cateItem },
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
      getCateGory().then(res => {
        if (res.resultCode === 200) {
          this.category = res.data
          this.listActive = !this.listActive
        }
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
.category_list{
  display: flex;
  height: 100vh;
  padding-top: 46rem/@dpi;
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
