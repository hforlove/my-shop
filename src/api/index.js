// 接口参考网站 https://github.com/newbee-ltd/newbee-mall-vue-app

import request from '../utils/request'

export function login (data) {
  return request({
    method: 'post',
    url: '/user/login',
    data
  })
}

export function register (data) {
  return request({
    method: 'post',
    url: '/user/register',
    data
  })
}

export function getHomeData (params) {
  return request({
    method: 'get',
    url: '/index-infos',
    params
  })
}

export function getCateGory (params) {
  return request({
    method: 'get',
    url: '/categories',
    params
  })
}

export function getGoodsList (params) {
  return request({
    method: 'get',
    url: '/search',
    params
  })
}

export function getGoodsDetail (id) {
  return request({
    method: 'get',
    url: '/goods/detail/' + id
  })
}

export function getCartList (params) {
  return request({
    method: 'get',
    url: '/shop-cart',
    params
  })
}
