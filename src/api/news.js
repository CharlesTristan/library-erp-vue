import request from '@/utils/request'
export function newsList() {
  return request({
    url: '/news/list',
    method: 'get'
  })
}
export function activeList() {
  return request({
    url: '/news/active',
    method: 'get'
  })
}
