<template>
  <div class="page_wrap user_page">
    <header-bar>我的</header-bar>
    <tab-bar :index="3"></tab-bar>
    <div class="user_cont">
      <div class="user_info">
        <div class="img">
          <img src="../../assets/images/avatar.png" alt="">
        </div>
        <div class="info">
          <p>昵称：{{userInfo.nickName}}</p>
          <p>登录名：{{userInfo.loginName}}</p>
          <p>个性签名：{{userInfo.introduceSign}}</p>
        </div>
      </div>
      <div class="user_other">
        <van-cell is-link title="我的订单" to="order" />
        <van-cell is-link title="账号管理" to="userForm" />
        <van-cell is-link title="地址管理" to="address" />
        <van-cell is-link title="关于我们" to="about" />
      </div>
    </div>
  </div>
</template>

<script>

import TabBar from 'comp/TabBar'
import HeaderBar from 'comp/HeaderBar'

export default {
  components: { TabBar, HeaderBar },
  data () {
    return {
      userInfo: {}
    }
  },
  created () {
    this.getUserInfo()
  },
  methods: {
    getUserInfo () {
      this.$api.getUserInfo().then(res => {
        this.userInfo = res.data
      })
    }
  }
}

</script>

<style lang="less" scope>
.user_cont{
  padding:0 15px;
  padding-top: 10rem/@dpi;
}
.user_info{
  display: flex;
  align-items: center;
  padding: 20px 15px;
  border-radius: 4px;
  background: linear-gradient(90deg, #44a6f4, #92b6de);
  .img{
    width: 70rem/@dpi;
    height: 70rem/@dpi;
    img{
      width: 100%;
      height: 100%;
    }
  }
  .info{
    font-size: 14rem/@dpi;
    padding-left: 20px;
    color: #fff;
    p{
      margin: 10px 0;
    }
  }
}
.user_other{
  padding-top: 30px;
}
</style>
