<template>
  <div class="goods_block">
    <h3>{{title}}</h3>
    <ul>
      <li v-for="item in list" :key="item.goodsId">
        <div @click="$router.push({name:'goodsDetail',params:{id:item.goodsId}})">
          <img :src="getImg(item.goodsCoverImg)" alt="">
          <p>{{item.goodsName}}</p>
          <span>￥{{item.sellingPrice}}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { getImg } from 'utils/index'

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
  },
  methods: {
    getImg
  }
}
</script>

<style lang="less" scope>
.goods_block{
  h3{
    height: 56rem/@dpi;
    line-height: 56rem/@dpi;
    text-align: center;
    font-size: 18rem/@dpi;
    color: #ff6522;
  }
  ul{
    display: flex;
    flex-wrap: wrap;
    padding: 0 5px;
  }
  li{
    width: 50%;
    padding: 0 5px 10px;
  }
  img{
    width: 100%;
    margin: 0 auto;
  }
  div{
    background: #fff;
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    overflow: hidden;
    font-size: 12rem/@dpi;
  }
  p{
    height: 26rem/@dpi;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    padding: 0 10px;
  }
  span{
    padding: 10px;
    font-size: 14rem/@dpi;
    color: #ff5500;
  }
}
</style>
