<template>
  <div class="cate_item">
    <h4>{{title}}</h4>
    <ul>
      <li v-for="item in list" :key="item.categoryId" @click="$router.push({name:'goods',query:{categoryId:item.categoryId}})">
        <div><van-icon name="photo" size="60" color="#8c8e90" /></div>
        <span>{{item.categoryName}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
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
.cate_item{
  h4{
    font-size: 16rem/@dpi;
    padding: 16px 0 0 16px;
  }
  ul{
    display: flex;
    flex-wrap: wrap;
    padding-bottom: 10px;
  }
  li{
    width: 33.33%;
    display: flex;
    padding: 10px 0;
    flex-direction: column;
    align-items: center;
  }
  span{
    font-size: 12rem/@dpi;
    margin-top: -6px;
  }
}
</style>
