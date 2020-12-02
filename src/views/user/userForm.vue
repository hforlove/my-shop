<template>
  <div class="user_form">
    <header-bar home>
      <template v-slot:middle>账号管理</template>
    </header-bar>
    <div class="form_cont">
      <van-form ref="userForm" @submit="onSubmit">
        <van-field
          v-model="nickName"
          name="昵称"
          label="昵称"
          placeholder="昵称"
          :rules="[{ required: true, message: '请填写昵称' }]"
        />
        <van-field
          v-model="introduceSign"
          name="个性签名"
          label="个性签名"
          placeholder="个性签名"
          autocomplete="off"
          :rules="[{ required: true, message: '请填写个性签名' }]"
        />
        <van-field
          v-model="password"
          name="密码"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
      </van-form>
      <div class="btn">
        <van-button block type="info" @click="saveForm">
          保存
        </van-button>
        <van-button block type="danger" @click="logout">
          退出登录
        </van-button>
      </div>
    </div>
  </div>
</template>

<script>

import md5 from 'js-md5'

import HeaderBar from 'comp/HeaderBar'

import { removeToken, getStorage, setStorage } from 'utils'

export default {
  components: { HeaderBar },
  data () {
    return {
      nickName: '',
      introduceSign: '',
      password: ''
    }
  },
  created () {
    this.getUserInfo()
  },
  methods: {
    getUserInfo () {
      this.$api.getUserInfo().then(res => {
        this.password = getStorage('password')
        this.nickName = res.data.nickName
        this.introduceSign = res.data.introduceSign
      })
    },
    updateUserInfo () {
      const params = {
        introduceSign: this.introduceSign,
        nickName: this.nickName,
        passwordMd5: md5(this.password)
      }
      this.$api.updateUserInfo(params).then(res => {
        setStorage('password', this.password)
        this.$router.push('/user')
      })
    },
    logout () {
      removeToken()
      this.$router.push('/login')
    },
    onSubmit () {
      this.updateUserInfo()
    },
    saveForm () {
      this.$refs.userForm.submit()
    }
  }
}

</script>

<style lang="less" scope>
.form_cont{
  padding-top: 46rem/@dpi;
  .btn{
    padding: 30px;
    margin:0 auto;
  }
  .van-button--block{
    margin-bottom: 10px;
  }
}
</style>
