import request from '../utils/request'

export function getHomeData (params) {
  return request({
    method: 'get',
    url: '/index-infos',
    params
  })
}

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
