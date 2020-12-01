<template>
  <div class="login">
    <header-bar>
      <template v-slot:middle>登陆</template>
    </header-bar>
    <div class="login_main">
      <van-form @submit="onSubmit" validate-trigger="onSubmit">
        <van-field
          v-model="userForm.loginName"
          size="large"
          name="用户名"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="userForm.password"
          size="large"
          type="password"
          name="密码"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <div class="other_btn" @click="switchType">立即{{isLogin?'注册':'登陆'}}</div>
        <div>
          <van-button block type="info" native-type="submit">
          {{isLogin?'登 陆':'注 册'}}
          </van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>

import md5 from 'js-md5'

import { login, register } from 'api'
import { setToken, getToken, setStorage } from 'utils'

import HeaderBar from 'comp/HeaderBar'

export default {
  name: 'login',
  components: { HeaderBar },
  data () {
    return {
      isLogin: true,
      userForm: {
        loginName: '',
        password: ''
      }
    }
  },
  created () {
    if (getToken()) this.$router.push('/home')
  },
  methods: {
    resetForm () {
      this.userForm.loginName = ''
      this.userForm.password = ''
    },
    switchType () {
      this.resetForm()
      this.isLogin = !this.isLogin
    },
    onSubmit () {
      this.isLogin ? this.login() : this.register()
    },
    login () {
      const params = {
        loginName: this.userForm.loginName,
        passwordMd5: md5(this.userForm.password)
      }
      setStorage('password', this.userForm.password)
      login(params).then(res => {
        setToken(res.data)
        this.$store.dispatch('initCart')
        this.$router.push('/home')
      })
    },
    register () {
      register(this.userForm).then(res => {
        this.$toast.success('注册成功')
        this.isLogin = true
        this.resetForm()
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login_main{
  padding: 60rem/@dpi 16rem/@dpi;
}
.other_btn{
  margin: 16px;
  color: #1989fa;
  display: inline-block;
  font-size: 12rem/@dpi;
}
</style>>
