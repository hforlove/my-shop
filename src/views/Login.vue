<template>
  <div class="login">
    <nav-bar>登陆</nav-bar>
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

import { login, register } from 'api/index'
import { setStorage } from 'utils/index'

import NavBar from 'comp/NavBar'

export default {
  name: 'login',
  components: { NavBar },
  data () {
    return {
      isLogin: true,
      userForm: {
        loginName: '',
        password: ''
      }
    }
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
      login(params).then(res => {
        if (res.resultCode === 200) {
          setStorage('token', res.data)
          this.$router.push('/home')
        }
      })
    },
    register () {
      register(this.userForm).then(res => {
        if (res.resultCode === 200) {
          this.isLogin = true
          this.resetForm()
        } else {
          this.$notify({ type: 'danger', message: res.message })
        }
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
