import axios from 'axios'

const request = axios.create({
  baseURL: 'http://47.99.134.126:28019/api/v1',
  timeout: 1000
})

request.interceptors.request.use(config => {
  config.headers.token = 123321
  return config
}, err => {
  return Promise.reject(err)
})

request.interceptors.response.use(res => {
  return res.data
}, err => {
  return Promise.reject(err)
})

export default request
