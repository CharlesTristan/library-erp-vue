import request from '@/utils/request'
import { praseStrEmpty } from '@/utils/util'
export function roleList(data) {
  return request({
    url: '/role',
    method: 'get',
    params: data
  })
}
export function selectRole(data) {
  return request({
    url: '/role/' + praseStrEmpty(data),
    method: 'get'
  })
}
export function insertRole(data) {
  return request({
    url: '/role',
    method: 'post',
    data: data
  })
}
export function updateRole(data) {
  return request({
    url: '/role',
    method: 'put',
    data: data
  })
}
export function delRole(data) {
  return request({
    url: '/role/' + praseStrEmpty(data),
    method: 'delete'
  })
}
