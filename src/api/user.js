import request from '@/utils/request'
import { praseStrEmpty } from '@/utils/util'
// 登录
export function login(data) {
  return request({
    url: '/api/login',
    method: 'post',
    data
  })
}
// 登录账号的信息
export function getInfo() {
  return request({
    url: '/user/getInfo',
    method: 'get'
  })
}
// 退出登录
export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
// 用户信息列表
export function userInfo(data) {
  return request({
    url: '/user/userInfo',
    method: 'get',
    params: data
  })
}

// 用户状态修改
export function changeUserStatus(id, status) {
  const data = {
    id,
    status
  }
  return request({
    url: '/user/changeUserStatus',
    method: 'put',
    data: data
  })
}

// id查用户
export function getUser(data) {
  return request({
    url: '/user/' + praseStrEmpty(data),
    method: 'get'
  })
}

// 修改用户
export function updateUser(data) {
  return request({
    url: '/user',
    method: 'put',
    data: data
  })
}

// 添加用户
export function inserUser(data) {
  return request({
    url: '/user',
    method: 'post',
    data: data
  })
}

// 删除用户
export function delUser(data) {
  return request({
    url: '/user/' + praseStrEmpty(data),
    method: 'delete'
  })
}
