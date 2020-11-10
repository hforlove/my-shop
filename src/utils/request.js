import axios from 'axios'
import { Notify } from 'vant'
import router from '../router'
import { getToken } from './index'

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
    router.push('/login')
    return {}
  }
  return res.data
}, err => {
  return Promise.reject(err)
})

export default request
