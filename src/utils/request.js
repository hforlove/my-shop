import axios from 'axios'
import { Notify } from 'vant'
import router from '../router'
import { getToken, removeToken } from './index'

const request = axios.create({
  baseURL: process.env.VUE_APP_API + '/api/v1',
  timeout: 1000
})

request.interceptors.request.use(config => {
  config.headers.token = getToken()
  return config
}, err => {
  return Promise.reject(err)
})

request.interceptors.response.use(res => {
  if (res.data.resultCode === 416) {
    Notify({ type: 'danger', message: res.data.message })
    removeToken()
    router.push('/login')
    return Promise.reject(res)
  }
  if (res.data.resultCode === 200) {
    return res.data
  } else {
    Notify({ type: 'danger', message: res.data.message })
    return Promise.reject(res)
  }
}, err => {
  return Promise.reject(err)
})

export default request
