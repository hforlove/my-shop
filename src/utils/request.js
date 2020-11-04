import axios from 'axios'

const request = axios.create({
  baseURL: process.env.VUE_APP_API + '/api/v1',
  timeout: 1000
})

request.interceptors.request.use(config => {
  config.headers.token = 123321
  return config
}, err => {
  return Promise.reject(err)
})

request.interceptors.response.use(res => {
  if (res.data.resultCode === 416) {
    this.$notify({ type: 'danger', message: res.data.message })
    this.$route.push('/login')
    return
  }
  return res.data
}, err => {
  return Promise.reject(err)
})

export default request
