<template>
  <ul class="mid_nav">
    <li v-for="item in list" :key="item.id">
      <img :src="getNavImg(item)">
      <span>{{item.title}}</span>
    </li>
  </ul>
</template>

<script>
export default {
  data () {
    return {
      list: [
        { id: 1, title: '毫米超市' },
        { id: 2, title: '数码电器' },
        { id: 3, title: '毫米服饰' },
        { id: 4, title: '毫米生鲜' },
        { id: 5, title: '毫米到家' },
        { id: 6, title: '充值缴费' },
        { id: 7, title: '9.9元拼' },
        { id: 8, title: '领 劵' },
        { id: 9, title: '领金贴' },
        { id: 10, title: 'PLUS会议' }
      ]
    }
  },
  methods: {
    getNavImg (item) {
      return require('@/assets/images/nav/' + item.id + '.png')
    }
  }
}
</script>

<style lang="less" scope>
.mid_nav{
  display: flex;
  flex-wrap: wrap;
  padding: 16px 0;
  background: #fff;
  li{
    width: 20%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    padding-bottom: 6px;
  }
  img{
    width: 70%;
  }
  span{
    padding-top: 4px;
    font-size: 12rem/@dpi;
  }
}
</style>
