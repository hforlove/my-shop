import request from '../utils/request'

export function getHomeData (params) {
  return request({
    method: 'get',
    url: '/api/v1/index-infos',
    params
  })
}
